import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environnement } from '../environnement/environnement';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  

  constructor(private http:HttpClient) { }
  
  getListClient():Observable<any>{
    return this.http.get<any>(`${environnement.urlAdmin}`)
  }
}
