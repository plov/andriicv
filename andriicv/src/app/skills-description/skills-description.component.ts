import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { StaticConf } from '../staticconf';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-skills-description',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills-description.component.html',
  styleUrl: './skills-description.component.scss'
})
export class SkillsDescriptionComponent implements OnInit {
  @Input() title: string = '';
  @Input() image: string = '';

  isVisible: boolean = false;

  constructor() { }

  ngOnInit() {
    if (environment.production) {
      console.log("environment.production: " + environment.production)
      this.image = StaticConf.s3backetPath + StaticConf.iconsPath + this.image;
    } else {
      this.image = StaticConf.localPath + StaticConf.iconsPath + this.image;
    }
  }

  open() {
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
  }
}
