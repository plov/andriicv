import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { StaticConf } from '../../staticconf';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth/auth.service';
import { InfoLabelTooltipComponent } from './info-label-tooltip/info-label-tooltip.component';

@Component({
  selector: 'app-info-label',
  standalone: true,
  imports: [CommonModule, InfoLabelTooltipComponent],
  templateUrl: './info-label.component.html',
  styleUrl: './info-label.component.scss'
})
export class InfoLabelComponent implements OnChanges, OnDestroy {

  @Input() textValue: string = "";
  @Input() linkValue: string = "";
  @Input() linkText: string = "";
  @Input() iconSrc: string = "";
  @Input() isBlurred: boolean = false;
  
  public lockIcon: string = StaticConf.localPath + StaticConf.lockIcon;
  public showTooltip: boolean = false;
  private tooltipTimeout: any;
  private windowClickListener!: () => void; 

  constructor(private authService: AuthService, private renderer: Renderer2, private el: ElementRef) {
    if (environment.production) {
      this.lockIcon = StaticConf.s3backetPath + StaticConf.lockIcon;
    }
  }

  toggleTooltip() {
    if (this.isBlurred) {
      this.showTooltip = !this.showTooltip;
      if (this.showTooltip) {
        this.startTooltipTimer();
        this.addFocusListeners();
      } else {
        this.clearTooltipTimer();
        this.removeFocusListeners();
      }
    }
  }

  startTooltipTimer() {
    this.clearTooltipTimer();
    this.tooltipTimeout = setTimeout(() => {
      this.showTooltip = false;
      this.removeFocusListeners();
    }, 3000);
  }

  clearTooltipTimer() {
    if (this.tooltipTimeout) {
      clearTimeout(this.tooltipTimeout);
      this.tooltipTimeout = null;
    }
  }

  addFocusListeners() {
    this.windowClickListener = this.renderer.listen('window', 'click', this.onWindowClick.bind(this));
  }

  removeFocusListeners() {
    if (this.windowClickListener) {
      this.windowClickListener();
    }
  }

  onWindowClick(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.showTooltip = false;
      this.clearTooltipTimer();
      this.removeFocusListeners();
    }
  }

  ngOnDestroy() {
    this.clearTooltipTimer();
    this.removeFocusListeners();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isBlurred']){
      this.authService.isLoggedIn().subscribe(isLoggedIn => {
        if (isLoggedIn) {
          this.isBlurred = false;
        }
      });
    }
  }
}
