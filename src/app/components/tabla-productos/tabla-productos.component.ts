import { isNgTemplate } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Producto } from 'src/app/models/Producto.model';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-productos',
  templateUrl: './tabla-productos.component.html',
  styleUrls: ['./tabla-productos.component.css']
})
export class TablaProductosComponent implements OnInit {
  @Input() btnBotones=true;
  @Output() newItemEvent = new EventEmitter<Producto>();

  productos:Producto[];
  keyWord = new FormControl('');
  pageNo:number;
  cantidadProductos:number;
  countPaginas:number;
  pageSize=4;
  matrizPaginas:number[];
  btnActualizar:boolean;
  producto:Producto;

  matrizClases = [
    {id:1, btn:false},
    {id:2, btn:false},
    {id:3, btn:false},
    {id:4, btn:false}
  ];

  form = this.fb.group({
    sku: [''],
    descripcion: [''],
    imagen: [null],
    nombre: ['',[
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]],
    precio: [null,[
      Validators.required
    ]],
  });

  constructor(
    private fb: FormBuilder,
    private productoService :ProductoService
  ) { 
    this.productos=[];
    this.pageNo=0;
    this.cantidadProductos = 0;
    this.countPaginas=0;
    this.matrizPaginas=[];
    this.btnActualizar=false;
    this.producto=new Producto();
    this.obtenerProductos();
  }

  ngOnInit(): void {  

  }

  

  vaciarFormBuilder(){
    this.form.reset();
  }

  buscar() {
    this.productoService.buscarProductos(this.keyWord.value).subscribe(res => {
      this.productos = res;
      this.keyWord.reset();
    }, error => console.error(error));
  }

  obtenerProductos(){
    this.productoService.getProductos(this.pageNo).subscribe(res => {
      this.productos = res;    
      this.countProductos();  
    }, error => console.error(error));
  }

  obtenerProducto(id:string){
    this.productoService.getProducto(id).subscribe(res => {
      this.producto = res;
      this.form.controls['sku'].setValue(this.producto.sku);
      this.form.controls['nombre'].setValue(this.producto.nombre);
      this.form.controls['precio'].setValue(this.producto.precio);
      this.form.controls['descripcion'].setValue(this.producto.descripcion);
      this.form.controls['imagen'].setValue(this.producto.imagen);
    },error => console.error(error));
  }

  countProductos(){
    this.productoService.countProductos().subscribe(res=> {
        let paginas = Math.floor(res / this.pageSize);
        const residuo = res % this.pageSize;
        paginas = residuo === 0 ? paginas : paginas+1;
        this.cantidadProductos = res;
        this.countPaginas = paginas;
        this.matrizPaginas = [];
        for (let i = 0; i < this.countPaginas; i++) {
          this.matrizPaginas.push(i);
        }
    },error => console.error(error));
  }

  addProducto(){
    this.productoService.addProducto(this.producto).subscribe(res => {
      this.obtenerProductos();
      console.log(res);
      this.alert(res);
    },error => {
      console.error(error);
      this.alert(error);
    });
  }

  eliminarProducto(id:string){
    this.productoService.eliminarProducto(id).subscribe(res => {
      this.obtenerProductos();
      console.log(res);
      this.alert(res);
    }, error => {
      console.error(error)
      this.alert(error);
    });
  }

  setPageNo(item:number){
    if(item===-1){
      const decrement = this.pageNo-1;
      this.pageNo = this.pageNo===0 ? 0:decrement;
    }else if(item===-2){
      const increment = this.pageNo+1;
      this.pageNo = (this.pageNo+1) < this.countPaginas ? increment : this.pageNo;
    }else if(item >= 0){
      this.pageNo = item;
    }
    this.obtenerProductos();
  }

  enviarFormulario(){
    if(this.form.valid === false){
      console.log("formulario no valido");
      return;
    }
    this.setProductoNuevo();
    this.addProducto();
    this.vaciarFormBuilder();
    console.log("form validado");
  }

  setProductoNuevo() {
    this.producto.sku = this.btnActualizar ? this.producto.sku : "" + Date.now();
    this.producto.nombre = this.form.value.nombre;
    this.producto.precio = this.form.value.precio;
    this.producto.descripcion = this.form.value.descripcion;
    this.producto.imagen = this.form.value.imagen;
  }

  setProductoActualizar(id:string){
    this.btnActualizar = true;
    this.obtenerProducto(id);
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

  setarClase(pos:number, item:Producto){
    this.matrizClases.map( item => {
      item.btn=false;
      return item;
    });
    this.matrizClases[pos].btn=true;   
  }
  addNewItem(pos:number, item:Producto) {
    this.matrizClases.map( item => {
      item.btn=false;
      return item;
    });
    this.matrizClases[pos].btn=true; 
    this.newItemEvent.emit(item);
  }
}
