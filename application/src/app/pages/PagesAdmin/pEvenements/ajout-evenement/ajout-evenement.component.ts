import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from 'src/app/monClass/categorie';
import { Evenement } from 'src/app/monClass/evenement';
import { CategorieService } from 'src/app/monService/categorie.service';
import { EvenementService } from 'src/app/monService/evenement.service';

@Component({
  selector: 'app-ajout-evenement',
  templateUrl: './ajout-evenement.component.html',
  styleUrls: ['./ajout-evenement.component.css']
})
export class AjoutEvenementComponent implements OnInit {


  msg: string = ''
  id: any;
  msgErreur: any;

  event: any = {
     nomEvenement: '',
    typeEvenement: '',
    dateEvenement: '',
    PrixEvenement: '',
    adresse: '',
   category_id: 0 
  };
  categorie: Categorie[];


  constructor(private activatedRoute: ActivatedRoute, private catService: CategorieService, private router: Router, private evnService: EvenementService) { }
  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.params["id"]
    this.evnService.getEvenementById(this.id).subscribe((data:any)=>{
      console.log(data)
      this.event = data
    })
    this.catService.listCategorie().subscribe((rep: Categorie[]) => { 
      this.categorie = rep
     
    })
  }
//ajouter evenemnt
  ajoutEvenement(form: NgForm) {
    this.evnService.ajoutEvenement(this.event).subscribe((data:any)=>{
        //console.log(data)
        if(data.message="Événement créé avec succès"){ // en cas succée d'ajout evenement
          alert(data.message) 
          this.router.navigate(['/admin/listeEvenement']) // naviguer vers 
        }else if (data.message!=="Événement créé avec succès"){ // si erreur se produit
           alert(data.message)
          this.router.navigate(['/admin/pEvenement/ajoutEvenement']) // naviguer vers 
        }
    })
  }
  // modifier un evenement
  modifEvenement(form: NgForm) {
    this.evnService.editEvent(this.id , this.event).subscribe((data:any)=>{
        //console.log(data)
        if(data.message="Événement modifier avec succès"){ // en cas de succée de modification
          alert(data.message) 
          this.router.navigate(['/admin/listeEvenement'])
        }else if (data.message!=="Événement modifier avec succès"){ 
           alert(data.message)
          this.router.navigate(['/admin/pEvenement/ajoutEvenement'])
        }
        
     
    })
  }
}
