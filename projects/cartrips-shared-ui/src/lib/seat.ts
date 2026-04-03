export class Seat {
    id: number = 0;
    trip_id: string = "";
    ticketnumber: string = "";
    seatnumber: number = 0;
    isavailable: boolean = true;//if available for selection
    locked: boolean = false;//if available for selection
    booked: boolean = false;//Unavailable if booked
    selected: boolean = false;
    self: boolean = false;
    boarded: boolean = false;
    offlinepassenger?: string;
    reservedby?: string;
}
