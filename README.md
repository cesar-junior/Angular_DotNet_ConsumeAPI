# Employee Management

A simple CRUD application built with .NET (REST API) and Angular for managing employee records. The frontend is structured with modular components, featuring add/edit operations in a modal and toast notifications for user feedback.

## Features

- Employee list
- Add/Edit employee using a modal
- Delete employee with confirmation
- Toast notifications for user feedback
- Modular Angular components

## Technologies Used

### Backend (.NET)
- ASP.NET Core Web API
- Entity Framework Core with Migrations
- SQLLite
- Swagger for API documentation

### Frontend (Angular)
- Angular Framework
- Angular Material
- RxJS for state management
- ngx-toastr for notifications

## Installation

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/cesar-junior/Angular_DotNet_ConsumeAPI.git
   cd Angular_DotNet_ConsumeAPI/ConsumeAPI.Server
   ```
2. Restore dependencies:
   ```sh
   dotnet restore
   ```
3. Update database:
   ```sh
   dotnet ef database update
   ```
4. Run the API:
   ```sh
   dotnet run
   ```
   This will start both the front and back end of the application. It'll start at the Swagger page. If you want to see the front end, go to the home page ('/').

## API Endpoints

| Method | Endpoint       | Description          |
|--------|---------------|----------------------|
| GET    | /api/employees | Get all employees   |
| GET    | /api/employees/{id} | Get employee by ID |
| POST   | /api/employees | Create new employee |
| PUT    | /api/employees/{id} | Update employee |
| DELETE | /api/employees/{id} | Delete employee |

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License.
