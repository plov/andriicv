import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MainBlockItemComponent } from '../main-block-item/main-block-item.component';
import { MainBlockModel } from '../../models/main-block/main-block-model';
import { StaticConf } from '../../staticconf';
import { MainBlockProviderService } from '../../services/data-provider/main-block-provider.service';

@Component({
  selector: 'app-main-blocks-container',
  standalone: true,
  imports: [CommonModule, MainBlockItemComponent],
  templateUrl: './main-blocks-container.component.html',
  styleUrl: './main-blocks-container.component.scss'
})

export class MainBlocksContainerComponent {
  mainBlocksInfo: Array<MainBlockModel> = [];
  constructor(private mainBlockProvider: MainBlockProviderService) { }

  ngOnInit() {
    this.mainBlockProvider.getMainBlocksInfo().subscribe(data => {
      this.mainBlocksInfo = data;
      console.log(this.mainBlocksInfo);
    });
  }
}
