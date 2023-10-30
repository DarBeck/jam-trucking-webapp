import { trigger, transition, style, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription, fromEvent, debounceTime } from 'rxjs';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ width: 0 }),
        animate('0.3s ease-out', style({ width: 250 })),
      ]),
      transition(':leave', [
        style({ width: 250 }),
        animate('0.3s ease-in', style({ width: 0 })),
      ]),
    ]),
  ],
})
export class SideMenuComponent implements OnInit {
  constructor() {}
  @Input('showMenu') showMenu!: boolean;

  mustShow: boolean = true;

  resizeObservable$!: Observable<any>;
  resizeSubscription$!: Subscription;
  openBillsSubscription!: Subscription;

  openBillsCount: number = 0;

  ngOnInit(): void {
    console.log('Window Width', window.innerWidth);

    if (window.innerWidth < 1000) {
      console.log('Window is small');
      //this.showMenu = false;
      this.mustShow = false;
    }

    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$
      .pipe(debounceTime(100))
      .subscribe((evt) => {
        console.log('event: ', evt.target.innerWidth);
        if (evt.target.innerWidth > 1000) {
          this.mustShow = true;
        } else {
          this.mustShow = false;
        }
      });
  }

  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe();
  }
}
