import { Component, OnInit } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { AlertService } from '../services/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser;
  bookings;
  filteredBookings;
  bookingId;
  loading = true;
  bookingPrice;

    constructor(private bookingService: BookingService,
      private alertService: AlertService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
      this.getBookings()
    }

    getBookings(){
      this.loading = true;
      this.bookingService.getList('contacto@tuten.cl',this.currentUser)
        .pipe(first())
        .subscribe(
            data => {
              this.loading = false;
              console.log(data);
              this.bookings = data;
              this.filteredBookings = this.bookings;
            },
            err => {
              this.loading = false;
              this.alertService.error(err);
            });
    }

    filter(){
      
      if(this.bookingId !== undefined && this.bookingId !== ''){
        this.filteredBookings = this.bookings.filter(booking => {
          return booking.bookingId.toString().includes(this.bookingId)
        } );
      }
      if(this.bookingPrice !== undefined && this.bookingPrice !== ''){
        this.filteredBookings = this.bookings.filter(booking => {
          return booking.bookingPrice.toString().includes(this.bookingPrice)
        } );
      }

      if((this.bookingId === undefined || this.bookingId === '')  &&
        (this.bookingPrice === undefined || this.bookingPrice === '')){
          this.filteredBookings = this.bookings;
      }
      
      
    }


}
