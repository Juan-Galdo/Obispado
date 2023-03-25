import { SignatoryService } from './../services/signatory.service';
import { Signatory } from './../models/signatory';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signatory-add',
  templateUrl: './signatory-add.component.html',
  styleUrls: ['./signatory-add.component.css']
})
export class SignatoryAddComponent implements OnInit {
  signatory: Signatory =new Signatory();
  public isChecked = true;
  constructor(private SignatoryService : SignatoryService, private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.signatory.Verified=false;
  }


  saveSignatory(): void {

    this.SignatoryService.saveSignatory(this.signatory)
      .subscribe(
        response => {
          this.toastr.success("se guardo exitosamente el nuevo firmante","Guardado.")
          this.router.navigate(['/signatory']);
        },
        error => {
          this.toastr.warning("no se guardo el firmante","Error.")
          console.log(error);
   });
  }
}
