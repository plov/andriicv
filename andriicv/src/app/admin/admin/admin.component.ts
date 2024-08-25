import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { ViwerModel } from '../../models/viwer/viwer-model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  email:string = "";
  name:string = "";
  pincode:string = "";
  expirationDate:string = "";

  api:ApiService;
  constructor(private apiSersices:ApiService) {
    this.api = apiSersices;
  }

  onGenerate(){
    console.log("AdminComponent.onGenerate() called");
  }

  onSend(){
    console.log("AdminComponent.onSend() called");
    this.api.addViwer(new ViwerModel(this.name, this.email, this.pincode, this.expirationDate, "" )).subscribe( data => {
        console.log("AdminComponent.onSend() data: " + data.toString());}); 
  }
}
