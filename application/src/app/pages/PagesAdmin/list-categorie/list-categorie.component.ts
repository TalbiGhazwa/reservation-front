import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CategorieService } from 'src/app/monService/categorie.service';
import { Categorie } from 'src/app/monClass/categorie';

@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
  styleUrls: ['./list-categorie.component.css']
})


export class ListCategorieComponent implements OnInit{
deleteCat(id: number) {
if(confirm("vous le vouss supprimer le categories est le evenement relie avec cette categories")){
  this.catService.delteCat(id).subscribe((data:any)=>{
  alert("categories est evenement relie a ete supprimer")
  this.listCat()
  })
}
}
  updatedCat:   Categorie={
    id: 0,
    nomCategori: ''
  };
updateCat(id: number) {
this.catService.getCatByID(id).subscribe((data:Categorie)=>{
  this.updatedCat=data
  console.log(this.updatedCat)
})
}
modifierCat(form: NgForm) {
 this.catService.editCat(this.updatedCat.id , this.updatedCat).subscribe({
    next:(rep)=>{
      alert('category modifier avec succée')
        this.listCat()

      location.reload() // actualisation
      this.msgErreur = '' //clear
    },

    error: (error)=>{
      this.msgErreur = error.message
      alert(this.msgErreur)
    }
    
  })
}
  listCategory: Categorie[];
  msgErreur : string;

  constructor(private catService:CategorieService ){

  }

ngOnInit(): void {
  this.listCat()
}
public listCat(){
  this.catService.listCategorie().subscribe((rep:Categorie[])=>{ // =>appel methode pour affiche liste
    this.listCategory = rep
    
  })
}
cat: Categorie={
  id: 0,
  nomCategori: ''
};

ajoutCategorie(form:NgForm) { // fn ajout cat
  this.catService.ajoutCategorie(this.cat).subscribe({
    next:(rep)=>{
      alert('category ajoutée avec succée')
        this.listCat()

      location.reload() // actualisation
      this.msgErreur = '' //clear
    },

    error: (error)=>{
      this.msgErreur = error.message
      alert(this.msgErreur)
    }
    
  })
}

}
