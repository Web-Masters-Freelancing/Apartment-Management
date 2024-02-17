enum EBillableStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export interface BillableValues {
  id: number;
  userId: number;
  roomId: number;
  dueDate: Date;
  amount: number;
  status: `${EBillableStatus}`;
}
