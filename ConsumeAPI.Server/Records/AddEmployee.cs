namespace ConsumeAPI.Server.Records
{
    public record AddEmployeeRecord(string firstName, string lastName, string email, string contactNumber, DateOnly dateOfBirth, string? country, string? address);
}
