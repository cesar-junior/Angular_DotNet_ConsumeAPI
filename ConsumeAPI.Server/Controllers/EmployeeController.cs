using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ConsumeAPI.Server.Records;
using ConsumeAPI.Server.Models;

namespace ConsumeAPI.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EmployeeController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Employee
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ViewEmployeeRecord>>> GetEmployee()
        {
            return await _context.Employees.Select(static e => new ViewEmployeeRecord(e.Id, $"{e.FirstName} {e.LastName}", e.Email, e.ContactNumber, e.DateOfBirth, e.Country, e.Address)).ToListAsync();
        }

        // GET: api/Employee/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeRecord>> GetEmployee(int id)
        {
            var e = await _context.Employees.FindAsync(id);

            if (e == null)
            {
                return NotFound();
            }

            return new EmployeeRecord(e.Id, e.FirstName, e.LastName, e.Email, e.ContactNumber, e.DateOfBirth, e.Country, e.Address);
        }

        // PUT: api/Employee/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, EmployeeRecord employee)
        {
            if (id != employee.id)
            {
                return BadRequest();
            }

            var employeeModel = new Employee(employee.firstName, employee.lastName, employee.email, employee.contactNumber, employee.dateOfBirth, employee.country, employee.address);
            employeeModel.SetId(id);
            _context.Entry(employeeModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Employee
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(AddEmployeeRecord employeeRecord)
        {
            var employee = new Employee(employeeRecord.firstName, employeeRecord.lastName, employeeRecord.email, employeeRecord.contactNumber, employeeRecord.dateOfBirth, employeeRecord.country, employeeRecord.address);
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployee", new { id = employee.Id }, employeeRecord);
        }

        // DELETE: api/Employee/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployeeExists(int id)
        {
            return _context.Employees.Any(e => e.Id == id);
        }
    }
}
