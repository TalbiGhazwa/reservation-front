import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Evenement } from 'src/app/monClass/evenement';
import { AutorisationService } from 'src/app/monService/autorisation.service';
import { EvenementService } from 'src/app/monService/evenement.service';


@Component({
  selector: 'app-list-evenement',
  templateUrl: './list-evenement.component.html',
  styleUrls: ['./list-evenement.component.css']
})
export class ListEvenementComponent implements OnInit {


ajoutEvent() {
this.router.navigate(['/admin/pEvenement/ajoutEvenement'])
}

  listEvenement: Evenement[];

  constructor(private router : Router,private autorisationService:AutorisationService, private evnService: EvenementService){} //appel categorie service

  ngOnInit():void {

    if(this.autorisationService.isAdmin() == true){
      this.evnService.listEvenementAdmin().subscribe((rep:Evenement[])=>{ 
        this.listEvenement = rep

        console.log(this.listEvenement)
      })
    }else{
      this.router.navigate(['/connexion'])
    }
   
      

  }
  modifEvenement(id: number) {
this.router.navigate(['/admin/listeEvenement', {id} ])
    }

    supprimEvent() {
      throw new Error('Method not implemented.');
      }
}
