// importation
import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Categorie } from 'src/app/monClass/categorie'
import { Evenement } from 'src/app/monClass/evenement'
import { EvenementService } from 'src/app/monService/evenement.service'
import { PanierCommandeService } from 'src/app/monService/PanierCommande.service'

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrls: ['./detail-event.component.css']
})
export class DetailEventComponent implements OnInit{
  predefinedTicketTypes = [
  { nom: 'SOLO', prix: 250 },
  { nom: 'DUO ', prix: 480 },
  { nom: 'Familial', prix: 900 }
];

selectedTicketTypeNom: string = ''
quantite: number = 1; 

  event: Evenement ={
    id: 0,
    nomEvenement: '',
    typeEvenement: '',
    dateEvenement: '',
    PrixEvenement: '',
    adresse: '',
    category_id: 0,
    categorie: {
      id: 0,
      nomCategori: ''
    }
  }; 
  eventId: number

  // appel service evenement
  constructor(
    private http:HttpClient,
    private evenementService: EvenementService,
    private route: ActivatedRoute ,
    private panierCommandeService:PanierCommandeService
  ) {}

  ngOnInit(): void {
    // declare const eventId  depui url 
    this.eventId = +this.route.snapshot.paramMap.get('id')!;

    // recherche par id 
    this.evenementService.getEvenementById(this.eventId).subscribe((data) => {
      this.event = data
  })
}
//ajout au panier
ajouterAuPanier() {
  const ticket = this.predefinedTicketTypes.find(t => t.nom === this.selectedTicketTypeNom);
  if (!ticket) return alert("Type de ticket non valide");

  this.panierCommandeService
    .ajouterAuPanierDepuisDetail(this.eventId, ticket.nom, ticket.prix, this.quantite)
    .subscribe({
      next: () => alert("Ajouté au panier !"),
      error: () => alert("Veuillez vous connecter !")
    });
}


}