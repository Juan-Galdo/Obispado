import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute,Router } from '@angular/router';
import { SignatoryService } from './../services/signatory.service';
import { Signatory } from './../models/signatory';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signatory-edit',
  templateUrl: './signatory-edit.component.html',
  styleUrls: ['./signatory-edit.component.css']
})
export class SignatoryEditComponent implements OnInit {


  signatory: Signatory = new Signatory;

  constructor(private SignatoryService: SignatoryService,
              private Router: Router ,
              private Route : ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getSignatory(this.Route.snapshot.params.Id);
  }

  getSignatory(id: number): void {
    this.SignatoryService.getSignatory(id)
      .subscribe(
        data => {
          this.signatory.Name = data.data.name;
          this.signatory.SurName = data.data.surName;
          this.signatory.Position = data.data.position;
          this.signatory.Verified = data.data.verified;
          this.signatory.Id = data.data.id;
        },
        error => {
          console.log(error);
        });
  }

  update(): void {
    this.SignatoryService.updateSignatory(this.signatory)
    .subscribe(
      response => {
        this.toastr.success("se guardo exitosamente los nuevos datos del firmante","Guardado.")
        this.Router.navigate(['/signatory']);
      },
      error => {
        this.toastr.warning("no se guardo los nuevos datos del firmante","Error.")
        console.log(error);
      }

      );
  }




}
