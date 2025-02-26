export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  dateOfBirth: string;
  country?: string;
  address?: string;
};

export type AddEmployee = Omit<Employee, 'id'>;

export type ViewEmployee = {
  id: number;
  fullName: string;
  email: string;
  contactNumber: string;
  dateOfBirth: string;
  country?: string;
  address?: string;
};
