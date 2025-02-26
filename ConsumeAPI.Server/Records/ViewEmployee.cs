namespace ConsumeAPI.Server.Records
{
    public record ViewEmployeeRecord(int id, string fullName, string email, string contactNumber, DateOnly dateOfBirth, string? country, string? address);
}
