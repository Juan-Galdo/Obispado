import { User } from './../models/user';
import { Observable } from 'rxjs/internal/Observable';
import { PaginationService } from './pagination.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Response } from './../models/response';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string='';

  constructor(private http : HttpClient, private PaginationService : PaginationService) {
    this.baseUrl=environment.appUrl+'api/user';
   }

   saveUser(User:any): Observable<Response>{
    return this.http.post<Response>(this.baseUrl, JSON.stringify(User));
  }

  getUsers(): Observable<Response>{
    return this.http.get<Response>(this.baseUrl+'?filter='+this.PaginationService.filterData.filter+
    '&PageSize='+this.PaginationService.filterData.PageSize+
    '&PageNumber='+this.PaginationService.filterData.PageNumber)
  }

  getUser(Id: number): Observable<Response>{
    return this.http.get<Response>(this.baseUrl +"/"+ Id);
  }

  updateUser(User : User): Observable<User>{
    return this.http.put<User>(this.baseUrl +"/"+ User.Id, JSON.stringify(User));
  }


  deleteUser(userId: number): Observable<User>{
    return this.http.delete(this.baseUrl+ "?id=" +userId);
  }

}
