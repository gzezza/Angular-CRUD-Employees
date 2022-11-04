import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { funcModel } from './model-funcionarios.model';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  urlApi:string = 'http://localhost:3000/post';

  constructor(private http:HttpClient) { }

  post(data:any){
    return this.http.post<any>(this.urlApi, data).pipe(map((res:any)=>{
      return res;
    }))    
  }

  get(){
    return this.http.get<any>(this.urlApi).pipe(map((res:any)=>{
      return res;
    }))    
  }

  update(id:number, data:any){
    return this.http.put<any>(`${this.urlApi}/${id}`, data).pipe(map((res:any)=>{
      return res;
    }))    
  }

  delete(id:number){
    return this.http.delete<any>(`${this.urlApi}/${id}`).pipe(map((res:any)=>{
      return res;
    }))    
  }
}
