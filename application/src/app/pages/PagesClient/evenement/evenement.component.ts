//importation
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/monClass/categorie';
import { Evenement } from 'src/app/monClass/evenement';
import { CategorieService } from 'src/app/monService/categorie.service';
import { EvenementService } from 'src/app/monService/evenement.service';

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.css']
})
export class EvenementComponent implements OnInit{
goToDetailsEvent(id: number) {
this.router.navigate(['/detailEvenement',{id}])
}
  listCategory: Categorie[];
  listEvenement: Evenement[];
    constructor(private catService:CategorieService ,  private router:Router , private evnService: EvenementService ){} //constructeur
  
    // recuperer liste de tout les categorie
  ngOnInit(): void {  
     this.catService.listCategorie().subscribe((rep:Categorie[])=>{ 
        this.listCategory = rep
        
      })
      // recuperer liste de tout les evenement
      this.evnService.listEvenement().subscribe((rep:Evenement[])=>{ 
        this.listEvenement = rep

        
      })

      
  }

  
} 
