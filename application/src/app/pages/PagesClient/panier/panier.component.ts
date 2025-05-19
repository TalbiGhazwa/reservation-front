import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PanierItem } from 'src/app/monClass/PanierItem';
import { AutorisationService } from 'src/app/monService/autorisation.service';
import { PanierCommandeService } from 'src/app/monService/PanierCommande.service';
 
@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html'
})
export class PanierComponent implements OnInit {

  panierItems: PanierItem[] = [];
  message: any;

  constructor(private panierService: PanierCommandeService , 
    private router:Router , private http:HttpClient , private authService:AutorisationService) {}

  ngOnInit(): void {
    this.loadPanier();
  }
validerCommande() {
    const token = this.authService.getToken();
    this.http.post('http://localhost:5000/api/commande/valider', {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res: any) => {
        this.message = res.message;
        // vider localement le panier ou rafraîchir la liste
        this.panierItems = [];
this.router.navigate(['/payer'])
      },
      error: err => {
        this.message = err.error?.erreur || 'Erreur lors de la validation';
      }
    });
  }
  loadPanier(): void {
    this.panierService.getPanier().subscribe((data:PanierItem[])=>{
      console.log(data)
      this.panierItems=data
    })
  }
}
