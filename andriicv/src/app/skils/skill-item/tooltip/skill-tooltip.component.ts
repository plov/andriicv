import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { StaticConf } from '../../../staticconf';
import { environment } from '../../../../environments/environment';
import { ModalService } from '../../../services/modal-servise/modal.service';

@Component({
  selector: 'app-skill-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skill-tooltip.component.html',
  styleUrls: ['./skill-tooltip.component.scss']
})
export class SkillTooltipComponent implements OnInit {
  @Input() title: string = '';
  @Input() image: string = '';
  @Input() years: number = 0;
  @Input() description: string = '';

  constructor(private modalService: ModalService) { }

  ngOnInit() {
    if (environment.production) {
      this.image = StaticConf.s3backetPath + StaticConf.iconsPath + this.image;
    } else {
      this.image = StaticConf.localPath + StaticConf.iconsPath + this.image;
    }
  }

  openModal() {
    this.modalService.openModal();
  }
}