import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AutorisationService } from 'src/app/monService/autorisation.service'
import { PanierCommandeService } from 'src/app/monService/PanierCommande.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {
  panierCount: number;
  constructor ( public autorisationService : AutorisationService, 
    private panierService:PanierCommandeService,private router : Router) {}

  ngOnInit(): void {
this.panierService.getPanierCount().subscribe(count => {
 // console.log(count)
    this.panierCount = count;
  });
  }
// permet de se deconnecter
  deconnecter() : void {
  this.autorisationService.deconnecter()
  this.router.navigate(['/connexion'])
}

}
