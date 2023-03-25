import { PaginationService } from './pagination.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Certificate } from '../models/certificate';
import { Response } from './../models/response';

@Injectable({
  providedIn: 'root'
})


export class CertificateService {

  baseUrl: string='';


  constructor(private http : HttpClient,private PaginationService: PaginationService) {
    this.baseUrl=environment.appUrl+'api/certificate';
  }


  saveCertificate(Certificate:Certificate): Observable<Response>{
    Certificate.Verified=true;
    Certificate.Printed=true;
    return this.http.post<Response>(this.baseUrl, JSON.stringify(Certificate));
  }

  saveCertificatePending(Certificate:Certificate): Observable<Response>{
    Certificate.Verified=false;
    Certificate.Printed=false;
    return this.http.post<Response>(this.baseUrl, JSON.stringify(Certificate));
  }

  getCertificates(): Observable<Response>{
    return this.http.get<Response>(this.baseUrl+'?filter='+this.PaginationService.filterData.filter+
    '&PageSize='+this.PaginationService.filterData.PageSize+
    '&PageNumber='+this.PaginationService.filterData.PageNumber)
  }

  getCertificateParish(id: any): Observable<Response>{
    return this.http.get<Response>(this.baseUrl+"/CertificateParish"+'?filter='+this.PaginationService.filterData.filter+
    '&PageSize='+this.PaginationService.filterData.PageSize+
    '&PageNumber='+this.PaginationService.filterData.PageNumber+
    '&id='+Number(id))
  }

  getCertificateParishPrint(id: any,since: any,until: any,action: any): Observable<Response>{
    return this.http.get<Response>(this.baseUrl+"/CertificateParish"+'?filter='+this.PaginationService.filterData.filter+
    '&PageSize='+this.PaginationService.filterData.PageSize+
    '&PageNumber='+this.PaginationService.filterData.PageNumber+
    '&id='+Number(id)+
    '&since='+since+
    '&until='+until+
    '&action='+action
    )
  }

  CertificateParishAll(): Observable<Response>{
    return this.http.get<Response>(this.baseUrl+"/CertificateParish"+'?filter='+this.PaginationService.filterData.filter+
    '&PageSize='+1000+
    '&PageNumber='+this.PaginationService.filterData.PageNumber+
    '&id='+localStorage.getItem('ParishId'))
  }

  getCertificate(Id: number): Observable<Response>{
    return this.http.get<Response>(this.baseUrl +"/"+ Id);
  }

  deleteCertificate(CertificateId: number): Observable<Certificate>{
    return this.http.delete(this.baseUrl+ "?id=" +CertificateId);
  }

  updateCertificate(Certificate : Certificate): Observable<Certificate>{
    return this.http.put<Certificate>(this.baseUrl +"/"+ Certificate.Id, JSON.stringify(Certificate));
  }

  getCertificatesPending(): Observable<Response>{
    return this.http.get<Response>(this.baseUrl+"/CertificatePending"+'?filter='+this.PaginationService.filterData.filter+
    '&PageSize='+this.PaginationService.filterData.PageSize+
    '&PageNumber='+this.PaginationService.filterData.PageNumber)
  }




}
