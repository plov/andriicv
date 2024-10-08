import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { ViewerModel } from '../../models/viewer/viewer-model';
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
              item.visit !=""? this.dataConvert(item.visit) : item.visit
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
    this.api.addViwer(new ViewerModel(0, this.name, this.email, this.pincode, this.hash, "", +this.expirationDays)).subscribe(data => {
      this.getViwers();
    });
  }

  generatePin() {
    this.pincode = Math.floor(100000 + Math.random() * 900000).toString();
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
    this.api.deleteViewers(selectedViewersWOone).subscribe(response => {
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
