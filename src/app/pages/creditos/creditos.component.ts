import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Plazo } from 'src/app/models/Plazo.model';
import { Producto } from 'src/app/models/Producto.model';
import { PlazoService } from 'src/app/services/plazo.service';

@Component({
  selector: 'app-creditos',
  templateUrl: './creditos.component.html',
  styleUrls: ['./creditos.component.css']
})
export class CreditosComponent implements OnInit {

  plazos:Plazo[];
  producto:Producto;
  abonoNormal:number;
  abonoPuntual:number;

  form = this.fb.group({
    plazo: []
  });

  constructor(
    private plazosServices:PlazoService,
    private fb: FormBuilder
  ) { 
    this.plazos=[];
    this.producto=new Producto();
    this.abonoNormal=0;
    this.abonoPuntual=0;
    this.obtenerAllPlazos();
  }

  ngOnInit(): void {
  }

  incrementPageNo(value:Producto){
    this.producto=value;
  }

  obtenerAllPlazos(){
    this.plazosServices.obtenerAllPlazos().subscribe(res => {
      this.plazos=res;
    },error => console.error(error));
  }

  cotizarCredito(){
    const tazaNormal = this.form.controls['plazo'].value.tazaNormal;
    const tazaPuntual = this.form.controls['plazo'].value.tazaPuntual;
    const plazo = this.form.controls['plazo'].value.plazo;
    if(this.producto.sku){
      this.abonoNormal = ((this.producto.precio*tazaNormal) + this.producto.precio)/plazo;
      this.abonoPuntual = ((this.producto.precio*tazaPuntual) + this.producto.precio)/plazo;
    }
    console.log(this.form.controls['plazo'].value);   
  }
}
