import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ApiService } from '../services/api/api.service';
import { StaticConf } from '../staticconf';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-loginform',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, FormsModule, FontAwesomeModule],
  templateUrl: './loginform.component.html',
  styleUrl: './loginform.component.scss'
})
export class LoginformComponent implements OnInit, AfterViewInit {
  isVisible: boolean = false;
  pinParts: string[] = ['', '', '', '', '', ''];
  pin: string = "";
  comment: string = "Enter your pin code";
  labelColor: string = "white";
  xIcon = StaticConf.localPath + StaticConf.xIcon;

  @ViewChildren('pinInput') pinInputs!: QueryList<ElementRef>;

  constructor(private api: ApiService) { 
    if (environment.production) {
      this.xIcon = StaticConf.s3backetPath + StaticConf.xIcon;
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initializeFields();
  }

  clearChars() {
    this.pinParts = ['', '', '', '', '', ''];
  }


  initializeFields(): void {
    const fields = this.pinInputs.toArray().map(input => input.nativeElement) as HTMLInputElement[];
    (fields[0] as HTMLInputElement)?.focus();

    fields.sort((a, b) => {
      const indexA = parseInt(a.id.split('-')[1], 10);
      const indexB = parseInt(b.id.split('-')[1], 10);
      return indexA - indexB;
    });

    fields.forEach((field, index) => {
      field.addEventListener('input', (e) => {
        const inputElement = e.target as HTMLInputElement;
        if (inputElement.value.length === 1 && index < fields.length - 1) {
          (fields[index + 1] as HTMLInputElement).focus();
        }
        this.pinParts[index] = inputElement.value;
        //this.updateChar(index, inputElement.value);
      });

      field.addEventListener('paste', (e) => {
        e.preventDefault();
        const clipboardEvent = e as ClipboardEvent;
        const paste = clipboardEvent.clipboardData?.getData('text') || '';
        paste.split('').forEach((char, i) => {
          if (fields[i]) {
            (fields[i] as HTMLInputElement).value = char;
            this.pinParts[i] = char;
          }
        });
      });

      field.addEventListener('keydown', (e) => {
        const keyboardEvent = e as KeyboardEvent;
        const inputElement = e.target as HTMLInputElement;
        if (keyboardEvent.key === 'Backspace' && inputElement.value === '' && index > 0) {
          (fields[index - 1] as HTMLInputElement).focus();
        }
      });

      field.addEventListener('focus', (e) => {
        this.comment = "Enter your pin code";
        this.labelColor = "white";
      });
    });
  }

  open() {
    this.isVisible = true;
    setTimeout(() => this.initializeFields(), 0);
  }

  close() {
    this.isVisible = false;
    this.clearChars();
  }

  onSubmitClick() {
    this.pin = this.pinParts.join('');
    if (this.pin.length != 6) {
      return
    }
    this.api.login(this.pin).subscribe({
      next: (data) => {
        console.log(data)
        if (data.statusCode === 200) {
          window.location.reload();
        } else {
          this.pin = "";
          this.labelColor = "red";
          this.comment = "User not found or pin is incorrect";
          this.clearChars();
        }

      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }
}