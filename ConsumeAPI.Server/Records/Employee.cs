namespace ConsumeAPI.Server.Records
{
    public record EmployeeRecord(int id, string firstName, string lastName, string email, string contactNumber, DateOnly dateOfBirth, string? country, string? address);
}
