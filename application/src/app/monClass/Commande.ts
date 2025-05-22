import { Evenement } from "./evenement" 


export interface TicketType {
  id: number 
  nom: string 
  prix: number 
}

export interface CommandeItem {
  quantite: number 
  ticket_type: TicketType 
  evenement: Evenement 
}

export interface Commande {
  commande_id: number 
  total: number 
  date_commande: string 
  items: CommandeItem[] 
}
