import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import { PanierItem } from '../monClass/PanierItem'
import { Commande } from '../monClass/Commande'


@Injectable({
    providedIn: 'root'
})
export class PanierCommandeService {
    API_URL = 'http://localhost:5000/api/commandePanier'



    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('access_token')
        return new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        });
    }
    getUserCommandes(): Observable<Commande[]> {
        const token = localStorage.getItem('token')
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

        return this.http.get<Commande[]>(this.API_URL + "/commande/info", { headers })
    }
    getUtilisateur(): Observable<any> {
        return this.http.get<any>(`${this.API_URL}/utilisateur/info`)
    }
    getPanierCount(): Observable<number> {
        return this.http.get<{ count: number }>(`${this.API_URL + "/count"}`)
            .pipe(map(response => response.count))
    }

    ajouterAuPanierDepuisDetail(
        evenement_id: number,
        ticket_type_nom: string,
        prix: number,
        quantite: number = 1
    ): Observable<any> {
        const data = {
            evenement_id,
            ticket_type_nom,
            prix,
            quantite
        };

        return this.http.post(this.API_URL, data, {
            headers: this.getHeaders()
        });
    }

 

    // Récupérer les items du panier

    getPanier(): Observable<PanierItem[]> {
        return this.http.get<PanierItem[]>(`${this.API_URL}/view`, {
            headers: this.getHeaders()
        })
    }
    // Valider et payer la commande 

    validerCommande(): Observable<any> {
        return this.http.post(`${this.API_URL}/valider_commande`, {}, {
            headers: this.getHeaders()
        });
    }
}
