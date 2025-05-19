import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PanierItem } from '../monClass/PanierItem';
import { Commande } from '../monClass/Commande';


@Injectable({
    providedIn: 'root'
})
export class PanierCommandeService {
 API_URL = 'http://localhost:5000/api/commandePanier'; // ajustez si nécessaire



    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('access_token'); // assurez-vous que le token est bien stocké ici
        return new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        });
    }
  getUserCommandes(): Observable<Commande[]> {
    const token = localStorage.getItem('token'); // or sessionStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Commande[]>(this.API_URL+"/commande/info", { headers });
  }
    getUtilisateur(): Observable<any> {
        return this.http.get<any>(`${this.API_URL}/utilisateur/info`);
    }
    getPanierCount(): Observable<number> {
        return this.http.get<{ count: number }>(`${this.API_URL + "/count"}`)
            .pipe(map(response => response.count));
    }

    ajouterAuPanier(ticket_type_id: number, quantite: number = 1): Observable<any> {
        return this.http.post(`${this.API_URL}`, {
            ticket_type_id,
            quantite
        }, {
            headers: this.getHeaders()
        });
    }

    /**
     * Récupérer les items du panier
     */
    getPanier(): Observable<PanierItem[]> {
        return this.http.get<PanierItem[]>(`${this.API_URL}/view`, {
            headers: this.getHeaders()
        });
    }

    /**
     * Valider la commande (payer les éléments du panier)
     */
    validerCommande(): Observable<any> {
        return this.http.post(`${this.API_URL}/valider_commande`, {}, {
            headers: this.getHeaders()
        });
    }
}
