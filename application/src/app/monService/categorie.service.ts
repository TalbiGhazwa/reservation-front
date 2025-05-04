import { HttpClient , HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Categorie } from '../monClass/categorie';
 

@Injectable({
  providedIn: 'root'
})

//integration => connexion

export class CategorieService {
  urlpath = "https://reservation-ccit.onrender.com/api/public"  //url back
  urlAdmin = "https://reservation-ccit.onrender.com/api/admin"

  constructor(private http:HttpClient) { } 

//methode =>liaison entre front * back

// Categorie => liste , ajout

  public listCategorie():Observable<Categorie[]>{  //methode permet d'afficher la liste des categorie pour client => notre class
    return this.http.get<Categorie[]>(`${this.urlpath+"/categori"}`)
  }

  public listCategorieAdmin():Observable<Categorie[]>{  //methode permet d'afficher la liste des categorie pour admin => notre class
    return this.http.get<Categorie[]>(`${this.urlAdmin+"/categori"}`)
  }

  public ajoutCategorie(cat:Categorie):Observable<Categorie>{          //  => ajout categorie
    return this.http.post<Categorie>(`${this.urlAdmin}/categori`,cat).pipe(
      catchError(this.gestionErreur)
    )
  }

  

//gestion d'erreur
private gestionErreur(erreur:HttpErrorResponse){
  let msgErreur = 'erreur unconnu'
  if (erreur.error instanceof ErrorEvent){
    msgErreur = `erreur coté client : ${erreur.error.message}`
  } 
  else{
    msgErreur = `erreur coté serveur : ${erreur.error.message}`
  }
  return throwError(()=>new Error(msgErreur))
}
}
