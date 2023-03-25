import { Injectable } from '@angular/core';
import { QueryFilter } from '../models/queryFilter';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  filterData: QueryFilter = new QueryFilter;

  constructor() {
    this.filterData.PageNumber=1;
    this.filterData.PageSize=5;
    this.filterData.filter="";
  }


  Find(filter : string) {
    this.filterData.filter = filter;
    }

  Quantity(PageSize: number) {
      this.filterData.PageSize = PageSize;
      this.filterData.PageNumber=1;
    }

  Preview() {
      this.filterData.PageNumber=(Number)(this.filterData.PageNumber)-1;
      }

  Next() {
        this.filterData.PageNumber=(Number)(this.filterData.PageNumber)+1;
      }
}
