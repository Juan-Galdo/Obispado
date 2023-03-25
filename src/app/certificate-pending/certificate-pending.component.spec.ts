import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatePendingComponent } from './certificate-pending.component';

describe('CertificatePendingComponent', () => {
  let component: CertificatePendingComponent;
  let fixture: ComponentFixture<CertificatePendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificatePendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificatePendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
