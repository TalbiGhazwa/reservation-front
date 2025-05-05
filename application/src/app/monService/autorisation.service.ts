import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environnement } from '../environnement/environnement';

@Injectable({
  providedIn: 'root'
})
export class AutorisationService {

 

  constructor( private http : HttpClient) { }

remplissage(doneeUtilisateur:any) : Observable<any>{
    return this.http.post (`${environnement.autorisationURL}/inscription`, doneeUtilisateur)
  }

isAuthentifi():boolean{
  return !! localStorage.getItem('access_token') && !! localStorage.getItem('role')
}

connexion(infoIdentif : any):Observable<any> {
  return this.http.post(`${environnement.autorisationURL}/connexion`, infoIdentif)

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