using Microsoft.AspNetCore.SignalR;

namespace Signal_ChatR_WebApi.Hubs
{
    public class ChatHub : Hub
    {
        public async Task Notify(string msg)
        {
            await Clients.All.SendAsync(msg);
        }
    }
}
