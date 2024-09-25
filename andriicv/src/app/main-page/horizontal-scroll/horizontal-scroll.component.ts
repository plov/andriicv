import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MainBlockModel } from '../../models/main-block/main-block-model';
import { MainBlockProviderService } from '../../services/data-providers/main-block-provider.service';
import { MainBlockItemComponent } from '../../main-blocks/main-block-item/main-block-item.component';
import { DynamicComponentDirective } from '../../directives/dynamic-component.directive';

@Component({
  selector: 'app-horizontal-scroll',
  standalone: true,
  imports: [CommonModule, MainBlockItemComponent, DynamicComponentDirective],
  templateUrl: './horizontal-scroll.component.html',
  styleUrls: ['./horizontal-scroll.component.scss']
})
export class HorizontalScrollComponent implements OnInit {
  @ViewChild('scrollWrapper', { static: true }) scrollWrapper!: ElementRef;
  currentIndex: number = 0;
  isMobile: boolean = false;

  contentArray: Array<MainBlockModel> = [];

  constructor(private mainBlockProvider: MainBlockProviderService) { }

  ngOnInit() {
    this.mainBlockProvider.getMainBlocksInfo().subscribe(data => {
      this.contentArray = data;
      this.loadComponent();
    });
    this.isMobile = window.innerWidth <= 768;
  }

  loadComponent() {
    this.updateTransform();
  }

  scrollLeft() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.loadComponent();
    }
  }

  scrollRight() {
    const maxIndex = this.contentArray.length - 1;
    if (this.currentIndex < maxIndex) {
      this.currentIndex++;
      this.loadComponent();
    }
  }

  updateTransform() {
    const width = this.scrollWrapper.nativeElement.clientWidth;
    this.scrollWrapper.nativeElement.style.transform = `translateX(-${this.currentIndex * width}px)`;
    this.updateContainerHeight();
  }

  updateContentArray(newContentArray: Array<MainBlockModel>) {
    this.contentArray = newContentArray;
    this.currentIndex = 0;
    this.loadComponent();
  }

  updateContainerHeight() {
    const currentItem = this.scrollWrapper.nativeElement.querySelector('.scroll-item');
    if (currentItem) {
      const height = currentItem.clientHeight;
      this.scrollWrapper.nativeElement.style.height = `${height}px`;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth <= 768;
    this.updateTransform();
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    if (this.isMobile) {
      this.startX = event.touches[0].clientX;
    }
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (this.isMobile) {
      this.endX = event.touches[0].clientX;
    }
  }

  @HostListener('touchend')
  onTouchEnd() {
    if (this.isMobile) {
      if (this.startX - this.endX > 50) {
        this.scrollRight();
      } else if (this.endX - this.startX > 50) {
        this.scrollLeft();
      }
    }
  }

  private startX = 0;
  private endX = 0;
}