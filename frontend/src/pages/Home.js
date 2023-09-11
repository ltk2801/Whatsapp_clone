import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatContainer } from "../components/chat";
import Call from "../components/chat/call/Call";
import WhatsappHome from "../components/chat/Welcome/WhatsappHome";
import { Sidebar } from "../components/sidebar";
import SocketContext from "../context/SocketContext";
import {
  getConversations,
  resetActiveConversation,
  updateMessagesAndConversation,
} from "../features/chatSlice";

const callData = {
  receiveingCall: false,
  callEnded: false,
};

const Home = ({ socket }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typing, setTyping] = useState(false);
  // call
  const [call, setCall] = useState(callData);
  const { receiveingCall, callEnded } = call;
  const [callAccepted, setCallAccepted] = useState(false);

  // join user into the socket io
  useEffect(() => {
    socket.emit("join", user?._id);
    // get online users
    socket.on("get-online-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user, socket]);

  // get conversations
  useEffect(() => {
    if (user?.access_token) {
      dispatch(getConversations(user.access_token));
    }
    dispatch(resetActiveConversation());
  }, [dispatch, user]);

  // listening to received messages
  useEffect(() => {
    socket.on("receive message", (message) => {
      dispatch(updateMessagesAndConversation(message));
    });
    //  typing stop typing message when user is typing
    socket.on("typing", (conversation) => setTyping(conversation));
    socket.on("stop typing", () => setTyping(false));
  }, [socket, dispatch]);
  return (
    <>
      <div className="min-h-screen dark:bg-dark_bg_1 flex items-center justify-center  overflow-hidden">
        {/* container */}
        <div className="container h-screen py-[19px] flex ">
          {/* Sidebar */}
          <Sidebar onlineUsers={onlineUsers} typing={typing} />
          {activeConversation._id ? (
            <ChatContainer onlineUsers={onlineUsers} typing={typing} />
          ) : (
            <WhatsappHome />
          )}
        </div>
      </div>
      {/* Call */}
      <Call call={call} setCall={setCall} callAccepted={callAccepted} />
    </>
  );
};

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default HomeWithSocket;
