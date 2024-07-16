import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataProviderService } from '../../data-provider/data-provider.service';

@Component({
  selector: 'app-tab-bar',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './tab-bar.component.html',
  styleUrl: './tab-bar.component.scss'
})
export class TabBarComponent implements OnInit {

  tabs = [
    { id: 1, title: 'Jobs', content: 'Jobs' },
    { id: 2, title: 'Projects', content: 'Projects' },
    { id: 3, title: 'Education', content: 'Education' },
    { id: 4, title: 'Volonteering', content: 'Volonteering' }
  ];
  activeTab: number = this.tabs[0].id;

  constructor(private dataProviderService: DataProviderService) { }

  ngOnInit() { 
     
  }

  selectTab(id: number) {
    this.activeTab = id;
    this.dataProviderService.setBlockId(0);
    this.dataProviderService.setTabId(id);
    this.dataProviderService.updateState();
  }
}
