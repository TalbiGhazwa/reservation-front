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
    return this.http.post (`${environnement.autorisationURL}/inscription`, doneeUtilisateur) // appel url de l api inscription du backend 
  }
// verif l'authentification
isAuthentifi():boolean{
  return !! localStorage.getItem('access_token') && !! localStorage.getItem('role') // stockage du token et role dans navigateur
}
//connexion
connexion(infoIdentif : any):Observable<any> {
  return this.http.post(`${environnement.autorisationURL}/connexion`, infoIdentif)
}
// deconnexion
deconnecter():void{
  localStorage.removeItem('access_token')
  localStorage.removeItem('role')
}

getRole(): string | null{ // get role => ADMIN ou CLIENT
 return localStorage.getItem('role')
}
getToken() {
  return localStorage.getItem('access_token')
}
 //verif si il est admin ou pas
isAdmin():boolean{
  return this.getRole() === 'ADMIN'
}
//verif si il est client ou pas
isClient():boolean{
  return this.getRole() === 'CLIENT'
}
}