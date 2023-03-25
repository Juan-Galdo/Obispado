import { ToastrService } from 'ngx-toastr';
import { PaginationService } from './../services/pagination.service';
import { ParishService } from './../services/parish.service';
import { Component, OnInit } from '@angular/core';
import { MetaData } from '../models/metaData';
import { QueryFilter } from '../models/queryFilter';

@Component({
  selector: 'app-parishes',
  templateUrl: './parishes.component.html',
  styleUrls: ['./parishes.component.css']
})

export class ParishesComponent implements OnInit {

  load: boolean= false;
  parishesList:any;
  metaData : MetaData =  new MetaData;
  list:string[]=["5","15","30","50"];
  find='';
  optionSelect:string="5";

  constructor(private ParishService: ParishService,
              private PaginationService: PaginationService,
              private toastr: ToastrService){}

  ngOnInit(): void {
    this.PaginationService.filterData.filter='';
    this.PaginationService.filterData.PageSize=5;
    this.PaginationService.filterData.PageNumber=1;
    this.ListParishes();
  }


  ListParishes() {
    this.load=false;
    this.ParishService.getParishes().subscribe( response=>
      {
        this.metaData= response.meta;
        this.parishesList= response.data;

        this.metaData.TotalPages= response.meta.totalPages;
        this.metaData.CurrentPage= response.meta.currentPage;
        this.metaData.HasNextPage = response.meta.hasNextPage;
        this.metaData.HasPreviousPage = response.meta.hasPreviousPage;
        this.load=true;
      }
    )
  }

  delete(parishId: any){
    const res = confirm('Seguro que desea eliminar la parroquia');
    if (res){
        this.ParishService.deleteParish(parishId).subscribe((data) => {
          this.ListParishes();
          this.toastr.success("se elimino la parroquia selccionada","Parroquia Eliminado.")
        });
    }
  }

  Find() {
    this.PaginationService.filterData.PageNumber=1;
    this.PaginationService.Find(this.find);
    this.ListParishes();
  }

  Quantity(PageSize: any) {
    this.PaginationService.Quantity(Number(PageSize.target.value));
    this.optionSelect= (PageSize.target.value);
    this.ListParishes();
  }

  Preview(){
    this.PaginationService.Preview();
     this.ListParishes();
  }

  Next(){
    this.PaginationService.Next();
    this.ListParishes();
  }

}
