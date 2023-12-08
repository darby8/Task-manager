export class taskData {
  name: string | null | undefined;

  description: string | null | undefined;
  date:string| Date | null | undefined;
  priority: string | null | undefined;
  createdOn = new Date() ;
  status = 'Pending';
  id: string | null | undefined;
}
