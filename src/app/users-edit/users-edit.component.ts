import { User } from './../models/user';
import { ParishService } from './../services/parish.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class UsersEditComponent implements OnInit {

  User : User = new User ();
  optionParish: number=0;
  parishesList: any;

  constructor(private UserService : UserService,
    private Router: Router ,
    private Route : ActivatedRoute,
    private toastr: ToastrService,
    private ParishService: ParishService,) { }

  ngOnInit(): void {
    this.ParishService.getParishesAll().subscribe( response=>
      {
        this.parishesList= response.data;
      }
    )
    this.getuser(this.Route.snapshot.params.Id);
  }

  getuser(Id: number) {
    this.UserService.getUser(Id)
      .subscribe(
        data => {
          console.log(data)
          this.User.Gmail= data.data.gmail;
          this.User.Id = data.data.id;
          this.User.ParishId = data.data.parishId;
          this.User.Password = "";
          this.User.Role = data.data.role;
          this.User.UserName = data.data.userName;
          this.optionParish= data.data.parishId;
        },
      );
  }



  update(): void {

    this.UserService.updateUser(this.User)
    .subscribe(
      response => {
        this.toastr.success("se actualizo la informacion del usuario seleccionado","Usuario Editado.")
        this.Router.navigate(['/user']);
      },
      error => {
        this.toastr.warning("no se actualizo la informacion del usuario","Error.")
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
