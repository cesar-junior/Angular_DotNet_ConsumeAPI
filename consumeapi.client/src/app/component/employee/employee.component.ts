import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { Employee, ViewEmployee } from '../../model/Employee';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-employee',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    CommonModule,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit, OnDestroy {
  empList: ViewEmployee[] = [];
  dataSource!: MatTableDataSource<ViewEmployee>;
  displayedColumns: string[] = [
    'fullName',
    'email',
    'contactNumber',
    'dateOfBirth',
    'country',
    'address',
    'action',
  ];
  subscription = new Subscription();

  constructor(
    private dialog: MatDialog,
    private employeeService: EmployeeService
  ) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.GetallEmployee();
  }

  GetallEmployee() {
    var sub = this.employeeService.GetAll().subscribe((employee) => {
      this.empList = employee;
      this.dataSource = new MatTableDataSource(this.empList);
    });
    this.subscription.add(sub);
  }

  addemployee() {
    this.openpopup(0);
  }

  DeleteEmployee(empId: number) {
    if (confirm('Are you sure?')) {
      let sub = this.employeeService.Delete(empId).subscribe((item) => {
        this.GetallEmployee();
      });
      this.subscription.add(sub);
    }
  }

  EditEmployee(empId: number) {
    this.openpopup(empId);
  }

  openpopup(empid: number) {
    this.dialog
      .open(AddEmployeeComponent, {
        width: '50%',
        exitAnimationDuration: '500ms',
        enterAnimationDuration: '500ms',
        data: {
          code: empid,
        },
      })
      .afterClosed()
      .subscribe((o) => {
        this.GetallEmployee();
      });
  }
}
