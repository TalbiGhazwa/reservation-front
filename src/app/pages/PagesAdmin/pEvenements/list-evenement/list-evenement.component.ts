import { Component,OnInit } from '@angular/core' 
import { Router } from '@angular/router' 
import { Evenement } from 'src/app/monClass/evenement' 
import { AutorisationService } from 'src/app/monService/autorisation.service' 
import { EvenementService } from 'src/app/monService/evenement.service' 


@Component({
  selector: 'app-list-evenement',
  templateUrl: './list-evenement.component.html',
  styleUrls: ['./list-evenement.component.css']
})
export class ListEvenementComponent implements OnInit {
ajoutEvent() {
this.router.navigate(['/admin/pEvenement/ajoutEvenement'])
}
  listEvenement: Evenement[] 

  constructor(private router : Router,private autorisationService:AutorisationService, private evnService: EvenementService){} //appel categorie service

  ngOnInit():void {

    if(this.autorisationService.isAdmin() == true){ //verifier qui l'utilsateur connecter est un admin
      this.evnService.listEvenementAdmin().subscribe((rep:Evenement[])=>{ // recuperer liste evenement pour admin
        this.listEvenement = rep // sauvgarder le resultat de l'aopi dans une table listEvenement     
      })
    }else{
      this.router.navigate(['/connexion'])
    }
  }
  modifEvenement(id: number) { //  mofification par id
this.router.navigate(['/admin/pEvenement/modifEvenement', {id} ])
    }

    supprimEvent(id:number) {
      if(confirm("vous le vous supprimer cette evenemente ?")){ // confirmation de suppression
        this.evnService.delete(id).subscribe((data:any)=>{
          if(data){
        alert("evenement supprimer avec sucess") //  suppression validé

          }
        location.reload() // rechargement
      })
      }
      
    }
}
