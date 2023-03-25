import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatoriesComponent } from './signatories.component';

describe('SignatoriesComponent', () => {
  let component: SignatoriesComponent;
  let fixture: ComponentFixture<SignatoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignatoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignatoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
