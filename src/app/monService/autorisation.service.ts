import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutorisationService {

  private urlAPI = 'https://reservation-ccit.onrender.com/api'

  constructor( private http : HttpClient) { }

remplissage(doneeUtilisateur:any) : Observable<any>{
    return this.http.post (`${this.urlAPI}/inscription`, doneeUtilisateur)
  }

isAuthentifi():boolean{
  return !! localStorage.getItem('access_token') && !! localStorage.getItem('role')
}

connexion(infoIdentif : any):Observable<any> {
  return this.http.post(`${this.urlAPI}/connexion`, infoIdentif)

}

deconnecter():void{
  localStorage.removeItem('access_token')
  localStorage.removeItem('role')
}

getRole(): string | null{ // get role => ADMIN || CLIENT
 return localStorage.getItem('role')
}
getToken() {
  return localStorage.getItem('access_token')
}

isAdmin():boolean{
  return this.getRole() === 'ADMIN'
}

isClient():boolean{
  return this.getRole() === 'CLIENT'
}
}