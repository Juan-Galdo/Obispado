import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParishesComponent } from './parishes.component';

describe('ParishesComponent', () => {
  let component: ParishesComponent;
  let fixture: ComponentFixture<ParishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParishesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
