import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatoryAddComponent } from './signatory-add.component';

describe('SignatoryAddComponent', () => {
  let component: SignatoryAddComponent;
  let fixture: ComponentFixture<SignatoryAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignatoryAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignatoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
