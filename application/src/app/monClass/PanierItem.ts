export interface PanierItem {
total_prix: number 
  id: number 
  quantite: number 
  ticket_type: {
    id: number 
    nom: string 
    prix: number 
  } 
  evenement: {
    id: number 
    nomEvenement: string 
    dateEvenement: string 
    typeEvenement: string 
    PrixEvenement: number 
    adresse: string 
  } 
}
