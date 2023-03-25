import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateParishComponent } from './certificate-parish.component';

describe('CertificateParishComponent', () => {
  let component: CertificateParishComponent;
  let fixture: ComponentFixture<CertificateParishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificateParishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateParishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
