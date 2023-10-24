const socketIo = require('socket.io');
const {
  handleChatEvent,
  handleSendFriendRequest,
  handleDeleteFriendRequest,
  handleAcceptRequest,
  handleCreateConversation,
} = require('./eventHandler');

function initializeSocket(server) {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    // Handle socket events here
    handleSendFriendRequest(socket);
    // delete friend request
    handleDeleteFriendRequest(socket);
    // accept friend request
    handleAcceptRequest(socket);
    // message
    handleChatEvent(socket);
    // conversation
    handleCreateConversation(socket);
    socket.on('disconnect', () => {});
  });

  return io;
}

module.exports = { initializeSocket };
