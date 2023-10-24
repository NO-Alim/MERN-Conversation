const handleChatEvent = (socket) => {
  socket.on('message', (msg) => {
    // Handle the chat message logic here
    socket.emit('message', msg);
  });
};

const handleSendFriendRequest = (socket) => {
  socket.on('sendFriendRequest', (requestedId) => {
    socket.emit('sendFriendRequest', requestedId);
  });
};

const handleDeleteFriendRequest = (socket) => {
  socket.on('deleteFriendRequest', (requestedId) => {
    socket.emit('deleteFriendRequest', requestedId);
  });
};

const handleAcceptRequest = (socket) => {
  socket.on('acceptRequest', (acceptedFriendShip) => {
    socket.emit('acceptRequest', acceptedFriendShip);
  });
};
//createConversation

const handleCreateConversation = (socket) => {
  socket.on('createConversation', (createdConversation) => {
    socket.emit('createConversation', createdConversation);
  });
};

module.exports = {
  handleChatEvent,
  handleSendFriendRequest,
  handleDeleteFriendRequest,
  handleAcceptRequest,
  handleCreateConversation,
};
