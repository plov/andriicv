import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MainBlockItemComponent } from '../main-block-item/main-block-item.component';
import { DataProviderService } from '../../data-provider/data-provider.service';
import { MainBlockModel } from '../../models/main-block/main-block-model';

@Component({
  selector: 'app-main-blocks-container',
  standalone: true,
  imports: [CommonModule, MainBlockItemComponent],
  templateUrl: './main-blocks-container.component.html',
  styleUrl: './main-blocks-container.component.scss'
})

export class MainBlocksContainerComponent {
  mainBlocksInfo: Array<MainBlockModel> = [];
  constructor(private dataProviderService: DataProviderService) { }

  ngOnInit() {
    this.dataProviderService.getMainBlockInfo().subscribe(data => {
      this.mainBlocksInfo = data;
      console.log(this.mainBlocksInfo);
    });
  }
}
