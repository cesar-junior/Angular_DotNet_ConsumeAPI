using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ConsumeAPI.Server.Models
{
    public class Employee
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; private set; }
        [Required]
        [MaxLength(50)]
        public string FirstName { get; private set; }
        [Required]
        [MaxLength(100)]
        public string LastName { get; private set; }
        [Required]
        [MaxLength(50)]
        public string Email { get; private set; }
        [Required]
        public DateOnly DateOfBirth { get; private set; }
        [Required]
        [MaxLength(10)]
        public string ContactNumber { get; private set; }
        [MaxLength(50)]
        public string? Country { get; private set; }
        [MaxLength(100)]
        public string? Address { get; private set; }

        public Employee(string firstName, string lastName, string email, string contactNumber, DateOnly dateOfBirth,  string? country, string? address)
        {
            (FirstName, LastName, Email, ContactNumber, Country, Address, DateOfBirth) = (firstName, lastName, email, contactNumber, country, address, dateOfBirth);
        }

        public void UpdateEmployee(string firstName, string lastName, string email, string contactNumber, DateOnly dateOfBirth, string? country, string? address)
        {
            (FirstName, LastName, Email, ContactNumber, Country, Address, DateOfBirth) = (firstName, lastName, email, contactNumber, country, address, dateOfBirth);
        }

        public void SetId(int id)
        {
            Id = id;
        }

        public string GetFullName() { return $"{FirstName} {LastName}"; }
    }
}
