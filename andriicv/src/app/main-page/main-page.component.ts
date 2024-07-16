import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SkillsBlockComponent } from '../skills-block/skills-block.component';
import { MainBlocksContainerComponent } from '../main-blocks/main-blocks-container/main-blocks-container.component';
import { DynamicComponentDirective } from '../directives/dynamic-component.directive';
import { DataProviderService } from '../data-provider/data-provider.service';
import { FullDescriptionComponent } from '../full-descript/full-description/full-description.component';
import { TabBarComponent } from '../tabs/tab-bar/tab-bar.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    RouterModule,
    HeaderComponent,
    SkillsBlockComponent,
    MainBlocksContainerComponent,
    FullDescriptionComponent,
    DynamicComponentDirective,
    TabBarComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  @ViewChild(DynamicComponentDirective, { static: true }) dynamicComponent!: DynamicComponentDirective;

  constructor(private dataProviderService: DataProviderService) { }

  ngOnInit() {
    this.loadDynamicComponent(MainBlocksContainerComponent);
    this.subscribeToData();
  }

  loadDynamicComponent(component: any) {
    const viewContainerRef = this.dynamicComponent.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(component);
    // componentRef.instance.someInput = 'Your data';
  }

  private subscribeToData() {
    this.dataProviderService.componenState.subscribe(() => {
      const blockId = this.dataProviderService.getBlockId();
      if (blockId !== 0)
        this.loadDynamicComponent(FullDescriptionComponent)
      else
        this.loadDynamicComponent(MainBlocksContainerComponent)
    });

  }
}
