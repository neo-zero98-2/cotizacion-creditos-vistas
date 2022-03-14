import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Plazo } from '../models/Plazo.model';
import { Producto } from '../models/Producto.model';

@Injectable({
  providedIn: 'root'
})
export class PlazoService {
  urlLocal='http://localhost:8080/cotizacion-creditos';

  constructor(private http: HttpClient) {

  }

  obtenerAllPlazos():Observable<Plazo[]>{
    return this.http.get<Plazo[]>(`${this.urlLocal}/plazos`)
              .pipe(
                map((data:any)=>{
                  return data.body;
                })
              );
  }
  obtenerPlazos(pageNo:number):Observable<Plazo[]>{
    return this.http.get<Plazo[]>(`${this.urlLocal}/plazos-pagination?pageNo=${pageNo}`)
              .pipe(
                map((data:any)=>{
                  return data.body;
                })
              );
  }

  addPlazo(plazo:Plazo):Observable<any>{
    return this.http.post<any>(`${this.urlLocal}/add/plazo`,plazo)
            .pipe(
              map((data:any)=>{
                return data;
              })
            );
  }

  eliminarPlazo(id:string):Observable<any>{
    return this.http.post<any>(`${this.urlLocal}/delete/plazo/${id}`,id)
            .pipe(
              map((data:any)=>{
                return data;
              })
            );
  }

  countPlazos():Observable<any>{
    return this.http.get<any>(`${this.urlLocal}/plazos-count`)
          .pipe(
            map((data:any)=>{
              return data.body;
            })
          );
  }

  
}
