import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environnement } from '../environnement/environnement';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  
  constructor(private http : HttpClient) { }
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

