import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Plazo } from '../models/Plazo.model';

@Injectable({
  providedIn: 'root'
})
export class PlazoService {
  urlLocal='http://localhost:8080/cotizacion-creditos';
  urlMicroservicio = 'https://app-cotizacion-credito.herokuapp.com/cotizacion-creditos';

  urlLocalNestjs = 'http://localhost:3000/cotizacion-creditos';
  urlMicroserviciosNestjs = 'https://app-cotizacion-credito-nestjs.herokuapp.com/cotizacion-creditos';

  constructor(private http: HttpClient) {

  }

  obtenerAllPlazos():Observable<Plazo[]>{
    return this.http.get<Plazo[]>(`${this.urlMicroserviciosNestjs}/plazos`)
              .pipe(
                map((data:any)=>{
                  return data.body;
                })
              );
  }
  obtenerPlazos(pageNo:number):Observable<Plazo[]>{
    return this.http.get<Plazo[]>(`${this.urlMicroserviciosNestjs}/plazos-pagination?pageNo=${pageNo}`)
              .pipe(
                map((data:any)=>{
                  return data.body;
                })
              );
  }

  addPlazo(plazo:Plazo):Observable<any>{
    return this.http.post<any>(`${this.urlMicroserviciosNestjs}/add/plazo`,plazo)
            .pipe(
              map((data:any)=>{
                return data;
              })
            );
  }

  eliminarPlazo(id:string):Observable<any>{
    return this.http.post<any>(`${this.urlMicroserviciosNestjs}/delete/plazo/${id}`,id)
            .pipe(
              map((data:any)=>{
                return data;
              })
            );
  }

  countPlazos():Observable<any>{
    return this.http.get<any>(`${this.urlMicroserviciosNestjs}/plazos-count`)
          .pipe(
            map((data:any)=>{
              return data.body;
            })
          );
  }

  
}
