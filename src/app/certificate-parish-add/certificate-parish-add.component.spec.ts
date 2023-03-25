import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateParishAddComponent } from './certificate-parish-add.component';

describe('CertificateParishAddComponent', () => {
  let component: CertificateParishAddComponent;
  let fixture: ComponentFixture<CertificateParishAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificateParishAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateParishAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
