import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBlocksContainerComponent } from './main-blocks-container.component';

describe('MainBlocksContainerComponent', () => {
  let component: MainBlocksContainerComponent;
  let fixture: ComponentFixture<MainBlocksContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainBlocksContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainBlocksContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
