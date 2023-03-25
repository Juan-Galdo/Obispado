import { ToastrService } from 'ngx-toastr';
import { ParishService } from './../services/parish.service';

import { Parish } from './../models/parish';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-parish-addedit',
  templateUrl: './parish-addedit.component.html',
  styleUrls: ['./parish-addedit.component.css']
})
export class ParishAddeditComponent implements OnInit {
  parish: Parish = new Parish;

  constructor(private ParishService : ParishService, private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  saveParish(): void {

    this.ParishService.saveParish(this.parish)
      .subscribe(
        response => {
          this.router.navigate(['/parish']);
          this.toastr.success("se guardo exitosamente la nueva parroquia ","Guardado.")
        },
        error => {
          this.toastr.warning("no se guardo la parroquia","Error.")
        });
  }
}
