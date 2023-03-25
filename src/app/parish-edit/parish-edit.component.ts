import { ToastrService } from 'ngx-toastr';
import { Parish } from './../models/parish';
import { ActivatedRoute,Router } from '@angular/router';
import { ParishService } from './../services/parish.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-parish-edit',
  templateUrl: './parish-edit.component.html',
  styleUrls: ['./parish-edit.component.css']
})
export class ParishEditComponent implements OnInit {

  parish: Parish = new Parish ();

  constructor(private ParishService : ParishService,
              private Router: Router ,
              private Route : ActivatedRoute,
              private toastr: ToastrService) {  }

  ngOnInit(): void {
    this.getParish(this.Route.snapshot.params.Id);
  }

  getParish(id: number): void {
    this.ParishService.getParish(id)
      .subscribe(
        data => {
          this.parish.Direction = data.data.direction;
          this.parish.Phone = data.data.phone;
          this.parish.Name = data.data.name;
          this.parish.Id = data.data.id;
        },
       );
  }

  update(): void {
    this.ParishService.updateParish(this.parish)
    .subscribe(
      response => {
        this.Router.navigate(['/parish']);
        this.toastr.success("se actualizo la informacion de la parroquia selccionada","Parroquia Editada.")
      },
      error => {
        this.toastr.warning("no se actualizo la informacion de la parroquia","Error.")
      });
  }


}
