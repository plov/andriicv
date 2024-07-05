import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MainBlockModel } from '../../models/main-block/main-block-model';

@Component({
  selector: 'app-main-block-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-block-item.component.html',
  styleUrl: './main-block-item.component.scss'
})

export class MainBlockItemComponent implements OnInit {

  @Input() experience: MainBlockModel = new MainBlockModel();

  title: string = "";
  time: string = "";
  description: string = "";
  position: string = "";
  location: string = "";

  constructor() { }

  ngOnInit(): void {

    this.title = this.experience.blockName;
    this.time = this.experience.years;
    this.description = this.experience.shortDescription;
    this.position = this.experience.position;
    this.location = this.experience.location;
  }

}
