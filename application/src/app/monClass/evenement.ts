export class Evenement {
    id: number;
    nomEvenement: string;
    typeEvenement: string;
    dateEvenement: string;
    PrixEvenement: string;
    adresse: string;
    category_id: number;
    categorie: {
      id: number;
      nomCategori: string; // adapte ça selon les attributs de ta classe `Categories`
    };
  }
  