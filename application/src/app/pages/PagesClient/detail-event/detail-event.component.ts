import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categorie } from 'src/app/monClass/categorie';
import { Evenement } from 'src/app/monClass/evenement';
import { EvenementService } from 'src/app/monService/evenement.service';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrls: ['./detail-event.component.css']
})
export class DetailEventComponent implements OnInit{
  predefinedTicketTypes = [
  { nom: 'Classe A', prix: 30 },
  { nom: 'Classe B', prix: 20 },
  { nom: 'Familial', prix: 15 }
];

selectedTicketTypeNom: string = '';
quantite: number = 1; // optionnel pour quantité

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
  eventId: number;

  // appel service evenement
  constructor(
    private http:HttpClient,
    private evenementService: EvenementService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // declare const eventId  from url 
    this.eventId = +this.route.snapshot.paramMap.get('id')!;

    // recherche par id 
    this.evenementService.getEvenementById(this.eventId).subscribe((data) => {
      this.event = data; 
  })
}
ajouterAuPanier() {
  const ticket = this.predefinedTicketTypes.find(t => t.nom === this.selectedTicketTypeNom);
  if (!ticket) return alert("Type de ticket non valide");

  const data = {
    evenement_id: this.eventId,
    ticket_type_nom: ticket.nom,
    prix: ticket.prix,
    quantite: this.quantite
  };

  this.http.post('http://localhost:5000/api/commandePanier', data, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  }).subscribe({
    next: () => alert("Ajouté au panier !"),
    error: () => alert("Erreur lors de l'ajout")
  });
}

}