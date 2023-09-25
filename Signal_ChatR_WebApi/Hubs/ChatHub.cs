using Microsoft.AspNetCore.SignalR;

namespace Signal_ChatR_WebApi.Hubs
{
    public class ChatHub : Hub
    {
        // List keep active users id
        private static List<int> _usersId = new List<int>();

        // broadcasting if messages was sent or new user registered
        public async Task Broadcast(string msg)
        {
            await Clients.All.SendAsync("notify", msg);
        }

        // get loged in user id and send list of active users
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
