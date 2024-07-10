import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MainBlockModel } from '../../models/main-block/main-block-model';
import { Router } from '@angular/router';
import { DataProviderService } from '../../data-provider/data-provider.service';

@Component({
  selector: 'app-main-block-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-block-item.component.html',
  styleUrl: './main-block-item.component.scss'
})

export class MainBlockItemComponent implements OnInit {

  @Input() experience: MainBlockModel = new MainBlockModel();

  private id: number = 0;
  title: string = "";
  time: string = "";
  description: string = "";
  position: string = "";
  location: string = "";

  constructor(private router: Router, private dataProviderService: DataProviderService) { }

  ngOnInit(): void {

    this.id = this.experience.id;
    this.title = this.experience.blockName;
    this.time = this.experience.years;
    this.description = this.experience.shortDescription;
    this.position = this.experience.position;
    this.location = this.experience.location;
  }

  onButtonClick(): void {
    this.dataProviderService.setBlockId(this.id);
    this.router.navigate(['/app-full-description']);
  }

}
