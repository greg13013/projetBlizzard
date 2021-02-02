import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TftDetailComponent } from './tft-detail.component';

describe('TftDetailComponent', () => {
  let component: TftDetailComponent;
  let fixture: ComponentFixture<TftDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TftDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TftDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
