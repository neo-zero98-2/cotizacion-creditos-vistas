import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as moment from 'moment';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  date:any;
  constructor(
    private router:Router
  ) { 
    this.date= moment().format('DD-MM-YYYY');
  }

  ngOnInit(): void {
  }

  goToProductos(){
    this.router.navigate(['/productos']);
  }

  goToPlazos(){
    this.router.navigate(['/plazos']);
  }

  goToCreditos(){
    this.router.navigate(['/creditos']);
  }



}
