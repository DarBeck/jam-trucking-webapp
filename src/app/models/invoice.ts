export interface Invoice {
  referenceNumber: number;
  total: number;
  status: string;
  date: string;
  dueDate: string;
  dateCreated: string;
  rentalId: number;
  datePaid: string;
}
