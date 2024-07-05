import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBlockItemComponent } from './main-block-item.component';

describe('MainBlocksItemComponent', () => {
  let component: MainBlockItemComponent;
  let fixture: ComponentFixture<MainBlockItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainBlockItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainBlockItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
