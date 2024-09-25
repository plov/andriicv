import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { StaticConf } from '../../staticconf';
import { environment } from '../../../environments/environment';
import { ModalService } from '../../services/modal-servise/modal.service';

@Component({
  selector: 'app-skills-description',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills-description.component.html',
  styleUrl: './skills-description.component.scss'
})
export class SkillsDescriptionComponent implements OnInit {
  @Input() title: string = '';
  @Input() image: string = '';

  isVisible: boolean = false;
  isOpen = false;

  constructor(private modalService: ModalService) { }

  ngOnInit() {
    if (environment.production) {
      this.image = StaticConf.s3backetPath + StaticConf.iconsPath + this.image;
    } else {
      this.image = StaticConf.localPath + StaticConf.iconsPath + this.image;
    }
    this.modalService.modalState$.subscribe(state => {
      this.isOpen = state;
    });
  }

  closeModal() {
    this.modalService.closeModal();
  }

  /*open() {
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
  }*/
}
