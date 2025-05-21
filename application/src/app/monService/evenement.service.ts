import { HttpClient , HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Categorie } from '../monClass/categorie';
import { Evenement } from '../monClass/evenement';
import { environnement } from '../environnement/environnement';
 

@Injectable({
  providedIn: 'root'
})
export class EvenementService {
 // Evennement => liste 
constructor(private http:HttpClient) { } 
public listEvenement():Observable <Evenement[]>
{
  return this.http.get<Evenement[]>(`${environnement.urlpath+"/evenements"}`) // appel api liste evenement
}
public editEvent(id:number , event:Evenement):Observable <Evenement>
{
  return this.http.put<Evenement>(`${environnement.urlAdmin+"/evenements/"+id}`, event) // appel api modif evenement
}
public listEvenementAdmin():Observable <Evenement[]>
{
  return this.http.get<Evenement[]>(`${environnement.urlAdmin+"/evenements"}`)
}

public delete(id:number):Observable <Evenement>
{
  return this.http.delete<Evenement>(`${environnement.urlAdmin+"/evenements/"+id}`)
}

public ajoutEvenement(event : Evenement):Observable <Evenement>{
  return this.http.post<Evenement>(`${environnement.urlAdmin}/evenements`, event).pipe(
    catchError(this.gestionErreur)
  )
}
getEvenementById(id: number): Observable<any> {// affichage public des evendetail event id
  return this.http.get<any>(`${environnement.urlpath}/evenements/${id}`);
}
getEvenementByAdmin(id: number): Observable<any> { // admin obtenir les evenements
  return this.http.get<any>(`${environnement.urlAdmin}/evenements/${id}`);
}
//gestion d'erreur
private gestionErreur(erreur:HttpErrorResponse){
  let msgErreur = 'erreur inconnu'
  if (erreur.error instanceof ErrorEvent){
    msgErreur = `erreur coté client : ${erreur.error.message}`
  } 
  else{
    msgErreur = `erreur coté serveur : ${erreur.error.message}`
  }
  return throwError(()=>new Error(msgErreur))
}
}
