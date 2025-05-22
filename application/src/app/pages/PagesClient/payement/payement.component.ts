import { Component, OnInit } from '@angular/core'
import { Commande } from 'src/app/monClass/Commande'
import { PanierCommandeService } from 'src/app/monService/PanierCommande.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import * as QRCode from 'qrcode'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-payement',
  templateUrl: './payement.component.html',
  styleUrls: ['./payement.component.css']
})
export class PayementComponent implements OnInit {
  utilisateur: any = {}
  commandes: Commande[] = []
  qrImageUrl: string = ''
  
  paymentForm: FormGroup
  submitted = false

  constructor(
    private commandeService: PanierCommandeService,
    private fb: FormBuilder , 
    private http:HttpClient 
  ) {
    this.paymentForm = this.fb.group({
      cardName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]]
    })
  }

  ngOnInit(): void {
    this.commandeService.getUtilisateur().subscribe({
      next: (data) => {
        this.utilisateur = data
        this.generateQrCode()
      },
      error: (err) => console.error('Erreur utilisateur:', err)
    })
    this.commandeService.getUserCommandes().subscribe({
      next: (data) => {
        this.commandes = data
        this.generateQrCode() 
      },
      error: (err) => console.error('Erreur commandes:', err)
    })
  }
  getTotal(): number {
    return this.commandes.reduce((acc, c) => acc + (c.total || 0), 0)
  }
 // generation de qr code 
  async generateQrCode(): Promise<void> {
    let qrData = `Utilisateur:\n`
    qrData += `Nom: ${this.utilisateur.nom}\n`
    qrData += `Prénom: ${this.utilisateur.prenom}\n`
    qrData += `Email: ${this.utilisateur.email}\n\n`
    qrData += `Commandes:\n`

    this.commandes.forEach((commande, index) => {
      qrData += `Commande ${index + 1}:\n`
      qrData += ` ID: ${commande.commande_id}\n`
      qrData += ` Total: ${commande.total || 0} £\n\n`
    })

    try {
      this.qrImageUrl = await QRCode.toDataURL(qrData)
    } catch (err) {
      console.error('Erreur QR:', err)
    }
  }
// telechargement de qr code
  downloadQr(): void { 
    const pdf = new jsPDF()
    const margin = 10
    const size = 100

    pdf.setFontSize(16)
    pdf.text('QR Code de confirmation', margin, margin + 5)

    if (this.qrImageUrl) {
      pdf.addImage(this.qrImageUrl, 'PNG', margin, margin + 10, size, size)
    }

    pdf.save('qr-code.pdf')
  }

  async onSubmit() {
    this.submitted = true

    if (this.paymentForm.invalid) {
      return;
    }

    alert('Paiement effectuer avec succès ')

    // Générer le QR code
    await this.generateQrCode()

    // Télécharger le PDF avec le QR code
    this.downloadQr()

    // Reset form
    this.paymentForm.reset()
    this.submitted = false

 }
 

}
