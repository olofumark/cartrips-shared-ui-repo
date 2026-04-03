import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Seat } from '../seat';
import { Vehicleconfig } from '../vehicleconfig';

@Component({
  selector: 'csui-seatpicker',
  standalone: true,
  imports: [],
  templateUrl: './seatpicker.html',
  styleUrl: './seatpicker.css',
})
export class Seatpicker implements OnChanges{ 

  @Input()
  vehicleConfig: Vehicleconfig = new Vehicleconfig();

  @Input()
  unavailableSeats: number[] = [];

  @Input()
  bookedSeats: number[] = [];

  @Input()
  readonly: boolean = false;

  seats: Seat[] = [];

  @Input()
  bookingMode: boolean = false;

  @Output()
  onAction = new EventEmitter<number>();


  constructor() {
    
  }

  ngOnInit(): void {
    this.reconstructSeats();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.reconstructSeats();
  }

  ///frontrow is manually handled
  reconstructSeats() {
    this.seats = [];
    let rows = this.vehicleConfig.numberofrows;
    let seatsperrow = this.vehicleConfig.seatsperrow;
    // let totalseats = this.vehicleConfig.totalavailableseats;
    // let totalseats = (rows * seatsperrow);
    // let totalseats = 2 + (rows-1 * seatsperrow);//i.e driver and front seat, plus the other rows

    console.log("The unavailable seats are:: "+this.unavailableSeats);
    console.log("The unavailable seats array length:: "+this.unavailableSeats.length);

    let totalseats = ((rows - 1) * seatsperrow);

    //Handle first seat
    let frontSeat = new Seat();
    frontSeat.seatnumber = 1;
    frontSeat.isavailable = this.unavailableSeats.indexOf(frontSeat.seatnumber) == -1;
    console.log("Frontseat available:: "+frontSeat.isavailable);
    this.seats.push(frontSeat);

    for (let a = 1; a <= totalseats; a++) {
      let seat = new Seat();

      seat.seatnumber = a + 1;
      seat.isavailable = this.unavailableSeats.indexOf(seat.seatnumber) == -1;
      console.log(a+" seat available:: "+seat.isavailable);
      this.seats.push(seat);

    }

  }


  isEnabledAtIndex(index: any): boolean {
    if (this.bookingMode) {
      return this.seats.at(index)!.isavailable && !this.seats.at(index)!.booked;
    }else{
      return true;
    }
  }

  isAvailableAtIndex(index: any): boolean {
    if (this.bookingMode) {
      // return this.seats.at(index)!.isavailable && !this.seats.at(index)!.booked && !this.selectedAtIndex(index);
      return this.seats.at(index)!.isavailable && !this.seats.at(index)!.booked;
    }
    return this.seats.at(index)!.isavailable && !this.seats.at(index)!.booked;
  }

  selectedAtIndex(index: any): boolean {
    return this.seats.at(index)!.selected;
  }

  public getAllFreeSeats(): Seat[] {
    return this.seats.filter(seat => {
      return seat.isavailable && !seat.booked;
    });
  }


  public getSelectedSeats(): Seat[] {
    return this.seats.filter(seat => {
      return seat.selected;
    });
  }

  toggleSeatAvailability(index: number) {
    if (this.readonly) {
      return;
    }
    console.log(index)
    console.log("this.seats.at(index)!.isavailable:: "+this.seats.at(index)!.isavailable)
    console.log("!(this.seats.at(index)!.selected):: "+!(this.seats.at(index)!.selected))
    console.log("!(this.seats.at(index)!.booked):: "+!(this.seats.at(index)!.booked))

    if (index >= 0) {
      if (this.bookingMode) {

        if (this.seats.at(index)!.isavailable && !(this.seats.at(index)!.booked)) {
          this.seats.at(index)!.selected = !this.seats.at(index)!.selected;
          console.log("Selected >> " + this.seats.at(index)!.selected)
        }

      } else {
        this.seats.at(index)!.isavailable = !(this.seats.at(index)!.isavailable);
        console.log(">> " + this.seats.at(index)!.isavailable)
      }

      this.onAction.emit(1);

    }

    console.log("AFTER:: this.seats.at(index)!.isavailable:: "+this.seats.at(index)!.isavailable)
    console.log("AFTER:: !(this.seats.at(index)!.selected):: "+!(this.seats.at(index)!.selected))
    console.log("AFTER:: !(this.seats.at(index)!.booked):: "+!(this.seats.at(index)!.booked))
  }

  //More comfortable, less expensive journeys




 
}
