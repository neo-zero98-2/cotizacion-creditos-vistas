import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Plazo } from 'src/app/models/Plazo.model';
import { PlazoService } from 'src/app/services/plazo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plazos',
  templateUrl: './plazos.component.html',
  styleUrls: ['./plazos.component.css']
})
export class PlazosComponent implements OnInit {
  pageNo:number;
  pageSize=2;
  countPaginas:number;
  matrizPaginas:number[];

  plazo:Plazo;
  plazos:Plazo[];

  form = this.fb.group({
    idplazos: [''],
    plazo: [,[
      Validators.required
    ]],
    taza_normal: [,[
      Validators.required
    ]],
    taza_puntual: [,[
      Validators.required
    ]],
  });

  constructor(
    private fb: FormBuilder,
    private plazosService: PlazoService
  ) { 
    this.pageNo=1;
    this.countPaginas=0;
    this.matrizPaginas=[];
    this.plazo=new Plazo();
    this.plazos=[];
    this.obtenerPlazos();
  }

  ngOnInit(): void {
  }

  obtenerPlazos(){
    this.plazosService.obtenerPlazos(this.pageNo).subscribe(res => {
      this.plazos = res;
      this.countPlazos();
    },error => console.error(error));
  }

  addPlazo(){
    this.plazosService.addPlazo(this.plazo).subscribe(res => {
      console.log(res);
      this.alert(res);
      this.obtenerPlazos();
    }, error => console.error(error));
  }

  eliminarPlazo(id:string){
    this.plazosService.eliminarPlazo(id).subscribe(res => {
      console.log(res);
      this.alert(res);
      this.obtenerPlazos();
    }, error => console.error(error));
  }

  countPlazos(){
    this.plazosService.countPlazos().subscribe(res => {
      let paginas = Math.floor(res / this.pageSize);
      const residuo = res % this.pageSize;
      paginas = residuo === 0 ? paginas : paginas+1;
      this.countPaginas = paginas;
      this.matrizPaginas = [];
      for (let i = 0; i < this.countPaginas; i++) {
        this.matrizPaginas.push(i);
      }    
    },error => console.error(error));
  }

  vaciarFormBuilder(){
    this.form.reset();
  }

  enviarFormulario(){
    if(this.form.valid === false){
      console.log("formulario no valido");
      return;
    }
    this.setPlazoNuevo();
    this.addPlazo();
    this.vaciarFormBuilder();
    console.log("form validado");
  }

  setPageNo(item:number){
    if(item===-1){
      const decrement = this.pageNo-1;
      this.pageNo = this.pageNo===1 ? 1:decrement;
    }else if(item===-2){
      const increment = this.pageNo+1;
      this.pageNo = (this.pageNo+1) <= this.countPaginas ? increment : this.pageNo;
    }else if(item >= 1){
      this.pageNo = item;
    }
    this.obtenerPlazos();
  }

  setPlazoNuevo() {
    this.plazo.idplazos = ""+Date.now();
    this.plazo.plazo = this.form.value.plazo;
    this.plazo.taza_normal = this.form.value.taza_normal;
    this.plazo.taza_puntual = this.form.value.taza_puntual;
  }

  alert(res:any){
    const typeIcon = res.status === 200 ? 'success' : 'error';
    Swal.fire({
      position: 'top-end',
      icon: typeIcon,
      title: res.mensaje,
      showConfirmButton: false,
      timer: 1500
    });
  }

}
