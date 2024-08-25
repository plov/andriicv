(function() {
  if (typeof global === 'undefined') {
    (window as any).global = window;
  }
})();

import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SkillsBlockComponent } from '../skils/skills-block/skills-block.component';
import { MainBlocksContainerComponent } from '../main-blocks/main-blocks-container/main-blocks-container.component';
import { DynamicComponentDirective } from '../directives/dynamic-component.directive';
import { FullDescriptionComponent } from '../full-descript/full-description.component';
import { TabBarComponent } from './tab-bar/tab-bar.component';
import { AppStateService } from '../services/state-servises/app-state-service.service';
import { MainBlockProviderService } from '../services/data-providers/main-block-provider.service';


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

  constructor(private dataProviderService: MainBlockProviderService, private appStateService: AppStateService) { }

  ngOnInit() {
    this.loadDynamicComponent(MainBlocksContainerComponent);
    this.subscribeToData();
  }

  loadDynamicComponent(component: any) {
    const viewContainerRef = this.dynamicComponent.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(component);
  }

  private subscribeToData() {
    this.appStateService.componenState.subscribe(() => {
      const blockId = this.appStateService.getBlockId();
      if (blockId !== 0)
        this.loadDynamicComponent(FullDescriptionComponent)
      else
        this.loadDynamicComponent(MainBlocksContainerComponent)
    });
  }
}
