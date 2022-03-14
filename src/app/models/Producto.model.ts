export class Producto {
    sku:string;
    descripcion:string;
    imagen:any;
    nombre:string;
    precio:number;
    constructor(){
        this.sku='';
        this.descripcion='';
        this.imagen=null;
        this.nombre='';
        this.precio=0;
    }
}