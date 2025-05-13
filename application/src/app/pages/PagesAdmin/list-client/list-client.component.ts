import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/monService/client.service';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit{
  router: any;
clients: any[];
  nbrClient: number;

constructor(private clientService : ClientService){}



  ngOnInit(): void {
    this.getClient()

  }
getClient(): void{
  this.clientService.getListClient().subscribe((data:any[])=>{
     console.log(data)
     this.clients=data
    this.nbrClient=data.length
  })
}
  ajoutClient() {
    this.router.navigate(['/admin/listeClient'])
    
    }

}
