let onlineUsers = [];

export default function (socket, io) {
  // user joins or opens the application
  socket.on("join", (user) => {
    socket.join(user);
    // add joined user to online users
    if (!onlineUsers.some((u) => u.userId === user)) {
      onlineUsers.push({
        userId: user,
        socketId: socket.id,
      });
    }
    // send online users to frontend
    io.emit("get-online-users", onlineUsers);
    // send socket id
    io.emit("setup socket", socket.id);
  });
  // socket disconnect
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("get-online-users", onlineUsers);
  });
  // socket offline

  // join a conversation room
  socket.on("join conversation", (conversation) => {
    socket.join(conversation);
  });
  // send and receive message
  socket.on("send message", (message) => {
    let conversation = message.conversation;
    if (!conversation.users) return;
    conversation.users.forEach((user) => {
      if (user._id === message.sender._id) return;
      // socket của thằng mà nhận được thì mới có sự kiện này
      socket.in(user._id).emit("receive message", message);
    });
  });

  // receive new group chat
  socket.on("new group", (conversation) => {
    conversation.users.forEach((user) => {
      if (user._id === conversation.admin._id) return;
      // socket của thằng mà nhận được thì mới có sự kiện này
      socket.in(user._id).emit("new group");
    });
  });

  // typing
  socket.on("typing", (conversation) => {
    // socket của conversation
    socket.in(conversation).emit("typing", conversation);
  });
  socket.on("stop typing", (conversation) => {
    // socket của conversation
    socket.in(conversation).emit("stop typing");
  });
  // call
  // ------ call user
  socket.on("call user", (data) => {
    // nhận được id của người nhận cuộc gọi
    let userId = data.userToCall;
    // Tìm kiếm người nhận cuộc gọi có onl không
    let userSocketId = onlineUsers.find((user) => user.userId === userId);
    // nếu có sẽ gửi sự kiện call user cho socketID của người nhận
    io.to(userSocketId.socketId).emit("call user", {
      signal: data.signal,
      from: data.from,
      name: data.name,
      picture: data.picture,
    });
  });
  // ------- answer call user
  socket.on("answer call", (data) => {
    io.to(data.to).emit("call accepted", data.signal);
  });

  // -------- end call
  socket.on("end call", (id) => {
    io.to(id).emit("end call");
  });
}
