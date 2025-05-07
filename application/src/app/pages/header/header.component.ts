import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutorisationService } from 'src/app/monService/autorisation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent {
  constructor ( public autorisationService : AutorisationService, private router : Router) {}

  deconnecter() : void {
  this.autorisationService.deconnecter()
  this.router.navigate(['/connexion'])
}

}
