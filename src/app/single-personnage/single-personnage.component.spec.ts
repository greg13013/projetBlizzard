import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePersonnageComponent } from './single-personnage.component';

describe('SinglePersonnageComponent', () => {
  let component: SinglePersonnageComponent;
  let fixture: ComponentFixture<SinglePersonnageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglePersonnageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePersonnageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
