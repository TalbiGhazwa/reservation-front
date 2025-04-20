import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AutorisationService } from 'src/app/monService/autorisation.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
  infoIdentif={
    email:'',
    motPasse:''
  }

  constructor(private autorisationService : AutorisationService, private router : Router){}

  // methode pour connexion role = client || admin
toConnect(form:NgForm):void {
  console.log(form.value)
  this.autorisationService.connexion(form.value).subscribe((data:any)=>{
    console.log(data)
    localStorage.setItem("access_token", data.access_token)
    localStorage.setItem("role",data.role)
    const access_token = this.autorisationService.getRole()
    const role = this.autorisationService.getToken()

    if (access_token && role){
      alert ("Bienvenue !!")
      this.router.navigate(['/'])
    }
    else {
      alert ("veuiller verifier votre email ou mot de passe !! ")
      this.router.navigate(['/login'])
    }
  })

}


}
