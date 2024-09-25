import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { ViewerModel } from '../../models/viewer/viewer-model';
import * as bcrypt from 'bcryptjs';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  email: string = "";
  name: string = "";
  pincode: string = "";
  hash: string = "";
  expirationDays: string = "20";
  viewers: ViewerModel[] = [];
  selectedViewerIds: Set<number> = new Set<number>();

  api: ApiService;
  constructor(private apiSersices: ApiService,
    public authService: AuthService,
    private router: Router) {
    this.api = apiSersices;
  }

  ngOnInit(): void {
    this.getViwers();
  }

  getViwers() {
    this.api.getViwers().subscribe(data => {
      if (data && data.body) {
        try {
          const parsedBody = JSON.parse(data.body);
          console.log("AdminComponent.ngOnInit() parsedBody: ", parsedBody);
          if (Array.isArray(parsedBody.viewers)) {
            this.viewers = parsedBody.viewers.map((item: {
              id: number,
              name: string;
              email: string;
              pincode: string;
              hash: string;
              created: string;
              expiration: number
              visit: string;
            }) => new ViewerModel(
              item.id,
              item.name,
              item.email,
              item.pincode,
              item.hash,
              this.dataConvert(item.created),
              item.expiration,
              item.visit
            ));
          } else {
            console.error("Expected an array but got: ", parsedBody.viewers);
          }
        } catch (e) {
          console.error("Failed to parse JSON body: ", e);
        }
      } else {
        console.error("Expected an object with a body property but got: ", data);
      }
      console.log("AdminComponent.ngOnInit() parsedBody: ", this.viewers.toString());
    });
  }

  dataConvert(isoString: string): string {
    const dateObj: Date = new Date(isoString);
    const month: string = ('0' + (dateObj.getMonth() + 1)).slice(-2); // Months are zero-based, so +1
    const day: string = ('0' + dateObj.getDate()).slice(-2);
    const year: number = dateObj.getFullYear();
    const formattedDate: string = `${month}/${day}/${year}`;
    return formattedDate;
  }

  onGenerate() {
    this.generatePin();

  }

  onSend() {
    this.generateHash();
    this.api.addViwer(new ViewerModel(0, this.name, this.email, this.pincode, this.hash, "", +this.expirationDays)).subscribe(data => {
      console.log("AdminComponent.onSend() data: " + data.toString());
      this.getViwers();
    });
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

  onCheckboxChange(event: Event, viewerId: number): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedViewerIds.add(viewerId);
    } else {
      this.selectedViewerIds.delete(viewerId);
    }
  }

  onDeleteViewer(): void {
    const selectedViewers = this.viewers.filter(viewer => this.selectedViewerIds.has(+viewer.id));
    const selectedViewersWOone = selectedViewers.filter(viewer => viewer.id !== 1);
    //selectedViewersWOone.forEach(viewer => console.log("Deleting viewer -1: ", viewer));
    this.api.deleteViewers(selectedViewersWOone).subscribe(response => {
      // Handle response
      this.viewers = this.viewers.filter(viewer => !this.selectedViewerIds.has(+viewer.id));
      this.selectedViewerIds.clear();
    });
  }
  onRefreshViewer() {
    this.getViwers();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
