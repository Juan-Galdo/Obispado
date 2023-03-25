import { User } from './../models/user';


import { ToastrService } from 'ngx-toastr';
import { ParishService } from './../services/parish.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.css']
})
export class UsersAddComponent implements OnInit {

  User: User = new User();
  parishesList: any;
  optionParish: number=0;
  constructor(private UserService: UserService,
    private toastr: ToastrService, private router: Router,
    private ParishService: ParishService) { }

  ngOnInit(): void {
    this.ListParishes();
  }


  ListParishes() {
    this.ParishService.getParishesAll().subscribe( response=>
      {
        this.parishesList= response.data;
      }
    )
    this.User.Role="Parishes";
  }

  saveCertificate(): void {


    this.UserService.saveUser(this.User)
    .subscribe(
      response => {
        this.toastr.success("se guardo exitosamente el nuevo usuario","Guardado.")
        this.router.navigate(['/user']);
      },
      error => {
        this.toastr.warning("no se guardo el nuevo usuario","Error.")
      });
  }
  capturer(id: string){
    this.User.ParishId = parseInt(id);
  }
  capturerRole(id: any)
  {
    this.User.Role = (id.target.value);
  }

}
