import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParishEditComponent } from './parish-edit.component';

describe('ParishEditComponent', () => {
  let component: ParishEditComponent;
  let fixture: ComponentFixture<ParishEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParishEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParishEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
