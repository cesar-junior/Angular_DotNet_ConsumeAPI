import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { AddEmployee, Employee } from '../../model/Employee';
import { EmployeeService } from '../../service/employee.service';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-employee',
  imports: [
    MatCardModule,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent implements OnInit {
  title = 'Add Employee';
  dialodata: any;
  isEdit = false;
  subscription = new Subscription();

  constructor(
    private ref: MatDialogRef<AddEmployeeComponent>,
    private toastr: ToastrService,
    private employeeService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.dialodata = this.data;
    if (this.dialodata.code > 0) {
      this.title = 'Edit Employee';
      this.isEdit = true;
      var sub = this.employeeService
        .Get(this.dialodata.code)
        .subscribe((employee) => {
          let {
            id,
            firstName,
            lastName,
            email,
            country,
            address,
            contactNumber,
          } = employee;
          let dateOfBirth = new Date(employee.dateOfBirth);
          country = country ?? '';
          address = address ?? '';
          this.empForm.setValue({
            id,
            firstName,
            lastName,
            email,
            dateOfBirth,
            country,
            address,
            contactNumber,
          });
        });
      this.subscription.add(sub);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  empForm = new FormGroup({
    id: new FormControl({ value: 0, disabled: true }),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    dateOfBirth: new FormControl(new Date(), Validators.required),
    country: new FormControl(''),
    address: new FormControl(''),
    contactNumber: new FormControl('', Validators.required),
  });

  SaveEmployee() {
    if (this.empForm.valid) {
      if (this.isEdit) {
        let _data: Employee = {
          id: this.dialodata.code,
          firstName: this.empForm.value.firstName as string,
          lastName: this.empForm.value.lastName as string,
          email: this.empForm.value.email as string,
          dateOfBirth:
            this.empForm.value.dateOfBirth?.toLocaleDateString('en-CA') ?? '',
          country: this.empForm.value.country as string,
          address: this.empForm.value.address as string,
          contactNumber: this.empForm.value.contactNumber?.toString() ?? '',
        };

        let sub = this.employeeService.Update(_data).subscribe((item) => {
          this.toastr.success('Saved successfully', 'Updated');
          this.closepopup();
        });
        this.subscription.add(sub);
      } else {
        let _data: AddEmployee = {
          firstName: this.empForm.value.firstName as string,
          lastName: this.empForm.value.lastName as string,
          email: this.empForm.value.email as string,
          dateOfBirth:
            this.empForm.value.dateOfBirth?.toLocaleDateString('en-CA') ?? '',
          country: this.empForm.value.country as string,
          address: this.empForm.value.address as string,
          contactNumber: this.empForm.value.contactNumber?.toString() ?? '',
        };

        let sub = this.employeeService.Create(_data).subscribe((item) => {
          this.toastr.success('Saved successfully', 'Created');
          this.closepopup();
        });
        this.subscription.add(sub);
      }
      this.closepopup();
    }
  }

  closepopup() {
    this.ref.close();
  }
}
