using Microsoft.EntityFrameworkCore;
using Signal_ChatR_WebApi.Models;

public class Signal_ChatR_WebApiContext : DbContext
{
    public Signal_ChatR_WebApiContext(DbContextOptions<Signal_ChatR_WebApiContext> options)
        : base(options)
    {
    }

    public DbSet<Parties> Parties { get; set; } = default!;
    public DbSet<Message> Messages { get; set; } = default!;
    public DbSet<User> Users { get; set; } = default!;
    public DbSet<Room> Rooms { get; set; } = default!;
}
