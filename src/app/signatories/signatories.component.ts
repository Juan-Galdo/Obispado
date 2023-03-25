import { Signatory } from './../models/signatory';
import { SignatoryService } from './../services/signatory.service';
import { Component, OnInit } from '@angular/core';
import { PaginationService } from './../services/pagination.service';
import { ToastrService } from 'ngx-toastr';
import { MetaData } from '../models/metaData';
@Component({
  selector: 'app-signatories',
  templateUrl: './signatories.component.html',
  styleUrls: ['./signatories.component.css']
})

export class SignatoriesComponent implements OnInit {
  load: boolean= false;
  signatory : Signatory = new Signatory();
  signatoriesList:any;
  metaData : MetaData =  new MetaData;
  list:string[]=["5","15","30","50"];
  find='';
  optionSelect:string="5";

  constructor( private SignatoryService: SignatoryService
              , private PaginationService: PaginationService,
              private toastr: ToastrService
              ) { }

  ngOnInit(): void {
    this.PaginationService.filterData.filter='';
    this.PaginationService.filterData.PageSize=5;
    this.PaginationService.filterData.PageNumber=1;
    this.ListSignatories();
  }

  ngOnDestroy(): void {
    this.PaginationService.filterData.filter='';
    this.PaginationService.filterData.PageNumber=1;
    this.PaginationService.filterData.PageSize=5;
   }

  ListSignatories() {
    this.load=false;
    this.SignatoryService.getSignatories().subscribe( response=>
      {
        this.metaData= response.meta;
        this.signatoriesList= response.data;

        this.metaData.TotalPages= response.meta.totalPages;
        this.metaData.CurrentPage= response.meta.currentPage;
        this.metaData.HasNextPage = response.meta.hasNextPage;
        this.metaData.HasPreviousPage = response.meta.hasPreviousPage;
        this.load=true;
      }

    )
  }

  delete(id: any){
    const res = confirm('Seguro que desea eliminar al firmante');
    if (res){
        this.SignatoryService.deleteSignatory(id).subscribe((data) => {
          this.ListSignatories();
          this.toastr.success("se elimino el firmante selccionado","Firmante Eliminado.")
        });
    }
  }

  Find() {
    this.PaginationService.filterData.PageNumber=1;
    this.PaginationService.Find(this.find);
    this.ListSignatories();
  }

  Quantity(PageSize: any) {
    this.PaginationService.Quantity(Number(PageSize.target.value));
    this.optionSelect= (PageSize.target.value);
    this.ListSignatories();
  }

  Preview(){
    this.PaginationService.Preview();
    this.ListSignatories();
  }

  Next(){
    this.PaginationService.Next();
    this.ListSignatories();
  }


  updateSignatory(id:number): void {
    this.SignatoryService.getSignatory(id) .subscribe(
      data => {
          this.signatory.Id = data.data.id;
          this.signatory.Name=data.data.name;
          this.signatory.SurName=data.data.surName;
          this.signatory.Position=data.data.position;
          this.signatory.Verified=true;
          this.SignatoryService.updateSignatory(this.signatory).subscribe(
            response => {
              this.ListSignatories();
              this.toastr.success("se guardo correctamente la seleccion del nuevo firmante","Firmante Seleccionado.")
            });;
      },
    );

   }


}
