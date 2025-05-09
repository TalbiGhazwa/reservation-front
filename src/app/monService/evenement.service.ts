import { HttpClient , HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Categorie } from '../monClass/categorie';
import { Evenement } from '../monClass/evenement';
 

@Injectable({
  providedIn: 'root'
})

//integration => connexion

export class EvenementService {
  urlpath = "https://reservation-ccit.onrender.com/api/public"  // url back pour tout les utilisateur
  urlAdmin = "https://reservation-ccit.onrender.com/api/admin"   // url back pour admin

  constructor(private http:HttpClient) { } 

//methode =>liaison entre front * back

  

// Evennement => liste , ajout

public listEvenement():Observable <Evenement[]>
{
  return this.http.get<Evenement[]>(`${this.urlpath+"/evenements"}`)
}

public listEvenementAdmin():Observable <Evenement[]>
{
  return this.http.get<Evenement[]>(`${this.urlAdmin+"/evenements"}`)
}

public ajoutEvenement(event : Evenement):Observable <Evenement>{
  return this.http.post<Evenement>(`${this.urlAdmin}/evenements`, event).pipe(
    catchError(this.gestionErreur)
  )
}

// affiche evendetail event par id

getEvenementById(id: number): Observable<any> {
  return this.http.get<any>(`${this.urlpath}/evenements/${id}`);
}

getEvenementByAdmin(id: number): Observable<any> {
  return this.http.get<any>(`${this.urlAdmin}/evenements/${id}`);
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
