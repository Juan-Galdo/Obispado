import { Signatory } from './../models/signatory';
import { PaginationService } from './pagination.service';
import { Response } from './../models/response';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class SignatoryService {

  baseUrl: string='';


  constructor(private http : HttpClient, private PaginationService : PaginationService) {
    this.baseUrl=environment.appUrl+'api/signatory';
  }

  getSignatory(Id: number): Observable<Response>{
    return this.http.get<Response>(this.baseUrl +"/"+ Id);
  }

  getSignatories(): Observable<Response>{

    return this.http.get<Response>(this.baseUrl+'?filter='+this.PaginationService.filterData.filter+
    '&PageSize='+this.PaginationService.filterData.PageSize+
    '&PageNumber='+this.PaginationService.filterData.PageNumber)
  }

  saveSignatory(signatory:any): Observable<Response>{
    return this.http.post<Response>(this.baseUrl, JSON.stringify(signatory));
  }

  deleteSignatory(id: number): Observable<Signatory>{
    return this.http.delete(this.baseUrl+ "?id=" +id);
  }

  updateSignatory(Signatory : Signatory): Observable<Signatory>{
    return this.http.put<Signatory>(this.baseUrl +"/"+ Signatory.Id, JSON.stringify(Signatory));
  }

  getSignatorySelect(): Observable<Response>{
    return this.http.get<Response>(this.baseUrl +"/SignatorySelect");
  }



}
