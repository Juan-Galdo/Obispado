import { PaginationService } from './pagination.service';
import { Parish } from './../models/parish';
import { Response } from './../models/response';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs';
import { QueryFilter } from '../models/queryFilter';
import { MetaData } from '../models/metaData';


@Injectable({
  providedIn: 'root'
})
export class ParishService {

  baseUrl: string='';

  constructor(private http : HttpClient, private PaginationService: PaginationService) {
    this.baseUrl=environment.appUrl+'api/parish';
  }


  saveParish(Parish:any): Observable<Response>{
    return this.http.post<Response>(this.baseUrl, JSON.stringify(Parish));
  }

  getParishes(): Observable<Response>{
    return this.http.get<Response>(this.baseUrl+'?filter='+this.PaginationService.filterData.filter+
                                  '&PageSize='+this.PaginationService.filterData.PageSize+
                                  '&PageNumber='+this.PaginationService.filterData.PageNumber)
  }

  getParishesAll(): Observable<Response>{
    return this.http.get<Response>(this.baseUrl+'?filter='+""+
                                  '&PageSize='+10000+
                                  '&PageNumber='+1)
  }

  getParish(Id: number): Observable<Response>{
    return this.http.get<Response>(this.baseUrl +"/"+ Id);
  }

  deleteParish(parishId: number): Observable<Parish>{
    return this.http.delete(this.baseUrl+ "?id=" +parishId);
  }

  updateParish(Parish : Parish): Observable<Parish>{
    return this.http.put<Parish>(this.baseUrl +"/"+ Parish.Id, JSON.stringify(Parish));
  }




}
