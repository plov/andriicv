import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SkillsBlockComponent } from '../skills-block/skills-block.component';
import { MainBlocksContainerComponent } from '../main-blocks/main-blocks-container/main-blocks-container.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    RouterModule,
    HeaderComponent, 
    SkillsBlockComponent, 
    MainBlocksContainerComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}
