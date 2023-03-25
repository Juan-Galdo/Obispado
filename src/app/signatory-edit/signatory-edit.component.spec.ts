import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatoryEditComponent } from './signatory-edit.component';

describe('SignatoryEditComponent', () => {
  let component: SignatoryEditComponent;
  let fixture: ComponentFixture<SignatoryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignatoryEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignatoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
