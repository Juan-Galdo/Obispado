import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParishAddeditComponent } from './parish-addedit.component';

describe('ParishAddeditComponent', () => {
  let component: ParishAddeditComponent;
  let fixture: ComponentFixture<ParishAddeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParishAddeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParishAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
