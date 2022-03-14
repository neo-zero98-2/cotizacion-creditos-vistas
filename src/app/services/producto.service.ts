import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Producto } from '../models/Producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  urlLocal = 'http://localhost:8080/cotizacion-creditos';

  constructor(private http: HttpClient) { 
  }

  getProductos(pageNo:number):Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.urlLocal}/productos-pagination?pageNo=${pageNo}`)
            .pipe(
              map((data:any)=>{
                return data.body;
              })
            );
  }

  getProducto(id:string):Observable<Producto>{
    return this.http.get<Producto>(`${this.urlLocal}/producto/${id}`)
          .pipe(
            map((data:any)=>{
              return data.body;
            })
          );
  }

  buscarProductos(keyWord:string):Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.urlLocal}/search/producto/${keyWord}`)
            .pipe(
              map((data:any)=>{
                return data.body;
              })
            );
  }

  countProductos():Observable<number>{
    return this.http.get<number>(`${this.urlLocal}/productos-count`)
            .pipe(
              map((data:any)=>{
                return data.body;
              })
            );
  }

  addProducto(producto:Producto):Observable<any>{
    return this.http.post<any>(`${this.urlLocal}/add/producto`, producto)
          .pipe(
            map((data:any)=>{
              return data;
            })
          );
  }

  eliminarProducto(id:string):Observable<any>{
    return this.http.post<any>(`${this.urlLocal}/delete/producto/${id}`,id)
          .pipe(
            map((data:any)=>{
              return data;
            })
          );
  }

}