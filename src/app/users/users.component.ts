import { LoginService } from './../services/login.service';
import { MetaData } from './../models/metaData';
import { ParishService } from './../services/parish.service';
import { UserService } from './../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { PaginationService } from './../services/pagination.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  load: boolean= false;
  usersList:any;
  metaData : MetaData = new MetaData;
  list:string[]=["5","15","30","50"];
  find='';
  optionSelect:string="5";

  constructor(private UserService: UserService,
    private PaginationService: PaginationService,
    private toastr: ToastrService,
    private ParishService: ParishService,
    private LoginService: LoginService) { }

  ngOnInit(): void {

    this.PaginationService.filterData.filter='';
    this.PaginationService.filterData.PageSize=5;
    this.PaginationService.filterData.PageNumber=1;
    this.ListUsers();
  }

  ngOnDestroy(): void {
    this.PaginationService.filterData.filter='';
    this.PaginationService.filterData.PageNumber=1;
    this.PaginationService.filterData.PageSize=5;
   }

  ListUsers() {
    this.load=false;
    this.UserService.getUsers().subscribe( response=>
      {
        this.metaData= response.meta;
        this.usersList= response.data;

        this.metaData.TotalPages= response.meta.totalPages;
        this.metaData.CurrentPage= response.meta.currentPage;
        this.metaData.HasNextPage = response.meta.hasNextPage;
        this.metaData.HasPreviousPage = response.meta.hasPreviousPage;

        for (let i = 0; i <  this.usersList.length; i++) {

          this.ParishService.getParish(this.usersList[i].parishId).
          subscribe(
              res=>{
                  this.usersList[i].ParishName=res.data.name;
              }
          )
        }
        this.load=true;
      }
    )
  }

  delete(parishId: any){
    const res = confirm('Seguro que desea eliminar el usuario');
    if (res){
        this.UserService.deleteUser(parishId).subscribe((data) => {
          this.ListUsers();
          this.toastr.success("se elimino el usuario selccionada","Usuario Eliminado.")
        });
    }
  }

  Find() {
    this.PaginationService.filterData.PageNumber=1;
    this.PaginationService.Find(this.find);
    this.ListUsers();
  }

  Quantity(PageSize: any) {
    this.PaginationService.Quantity(Number(PageSize.target.value));
    this.optionSelect= (PageSize.target.value);
    this.ListUsers();
  }

  Preview(){
    this.PaginationService.Preview();
    this.ListUsers();
  }

  Next(){
    this.PaginationService.Next();
    this.ListUsers();
  }
}
