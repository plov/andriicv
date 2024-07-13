import { Component, Input, OnInit } from '@angular/core';
import { MainBlockModel } from '../../models/main-block/main-block-model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { SkillsBlockComponent } from '../../skills-block/skills-block.component';
import { DataProviderService } from '../../data-provider/data-provider.service';

@Component({
  selector: 'app-full-description',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    RouterModule,
    HeaderComponent,
    SkillsBlockComponent
  ],
  templateUrl: './full-description.component.html',
  styleUrl: './full-description.component.scss'
})
export class FullDescriptionComponent implements OnInit {

  mainBlockInfo: MainBlockModel = new MainBlockModel();

  title: string = "";
  time: string = "";
  description: string = "";
  lDescription: string = "";
  position: string = "";
  location: string = "";

  constructor(private router: Router, private dataProviderService: DataProviderService) {

  }

  ngOnInit(): void {
    console.log("---FullDescriptionComponent");
    let id = this.dataProviderService.getBlockId();
    if (id !== 0) {
      this.dataProviderService.getMainBlockById(id).subscribe(data => {
        this.mainBlockInfo = data;
        console.log(this.mainBlockInfo);
        this.title = this.mainBlockInfo.blockName;
        this.time = this.mainBlockInfo.years;
        this.description = this.mainBlockInfo.shortDescription;
        this.lDescription = this.mainBlockInfo.longDescription;
        this.position = this.mainBlockInfo.position;
        this.location = this.mainBlockInfo.location;
      });
    }
  }

  onButtonClick(): void {
    this.dataProviderService.setBlockId(0);
    this.router.navigate(['/']);
  }

}
