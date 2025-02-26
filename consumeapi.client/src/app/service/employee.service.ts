import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddEmployee, Employee, ViewEmployee } from '../model/Employee';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  apiUrl = environment.api;

  constructor(private http: HttpClient) {}

  GetAll() {
    return this.http.get<ViewEmployee[]>(this.apiUrl);
  }

  Get(empId: number) {
    return this.http.get<Employee>(this.apiUrl + '/' + empId);
  }

  Create(data: AddEmployee) {
    return this.http.post(this.apiUrl, data);
  }

  Update(data: Employee) {
    return this.http.put(this.apiUrl + '/' + data.id, data);
  }

  Delete(empId: number) {
    return this.http.delete(this.apiUrl + '/' + empId);
  }
}
