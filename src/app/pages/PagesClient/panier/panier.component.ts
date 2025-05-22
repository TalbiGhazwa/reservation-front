//importation
import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { PanierItem } from 'src/app/monClass/PanierItem'
import { AutorisationService } from 'src/app/monService/autorisation.service'
import { PanierCommandeService } from 'src/app/monService/PanierCommande.service'
 
@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html'
})
export class PanierComponent implements OnInit {

  panierItems: PanierItem[] = []
  message: any

  constructor(private panierService: PanierCommandeService , 
    private router:Router , private http:HttpClient , private authService:AutorisationService) {}

  ngOnInit(): void {
    this.loadPanier()
  }
  //validation du comande
  validerCommande() {
  this.panierService.validerCommande().subscribe({
    next: (res: any) => {
      this.message = res.message
      this.panierItems = []  // Vider le panier après validation
      this.router.navigate(['/payer'])
    },
    error: err => {
      console.log(err)
      this.message = err.error.erreur  
    }
  })
}
  loadPanier(): void {
    this.panierService.getPanier().subscribe((data:PanierItem[])=>{
      //console.log(data)
      this.panierItems=data
    })
  }
}
