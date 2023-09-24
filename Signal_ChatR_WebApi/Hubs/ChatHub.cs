using Microsoft.AspNetCore.SignalR;

namespace Signal_ChatR_WebApi.Hubs
{
    public class ChatHub : Hub
    {
        private static List<int> _usersId = new List<int>();

        public async Task Broadcast(string msg)
        {
            await Clients.All.SendAsync("notify", msg);
        }

        public async Task WhoPresent(int userId)
        {
            if(!_usersId.Contains(userId))
            {
                _usersId.Add(userId);
            }
            await Clients.All.SendAsync("ImPresent", _usersId);
        }

        public async Task Logout(int userId)
        {  if(_usersId.Contains(userId)) { _usersId.Remove(userId); } }
    }
}
