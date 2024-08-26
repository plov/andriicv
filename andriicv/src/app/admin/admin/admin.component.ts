import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { ViwerModel } from '../../models/viwer/viwer-model';
import * as bcrypt from 'bcryptjs';


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
  hash:string = "";
  expirationDate:string = "";

  api:ApiService;
  constructor(private apiSersices:ApiService) {
    this.api = apiSersices;
  }

  onGenerate(){
    this.generatePin();
    this.generateHash();
  }

  onSend(){
    this.api.addViwer(new ViwerModel(this.name, this.email,this.pincode, this.hash, this.expirationDate, "" )).subscribe( data => {
        console.log("AdminComponent.onSend() data: " + data.toString());}); 
  }

  generatePin() {
    this.pincode = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Generated PIN: " + this.pincode);
  }

  async generateHash() {
    const salt = await bcrypt.genSalt(10);
    this.hash = await bcrypt.hash(this.pincode, salt);
    console.log("Generated Hash: " + this.hash);
  }

  async checkPinCode(pin: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(pin, this.hash);
    return isMatch;
  }
}
