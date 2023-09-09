import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatContainer } from "../components/chat";
import WhatsappHome from "../components/chat/Welcome/WhatsappHome";
import { Sidebar } from "../components/sidebar";
import SocketContext from "../context/SocketContext";
import {
  getConversations,
  resetActiveConversation,
} from "../features/chatSlice";

const Home = ({ socket }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  // join user into the socket io
  useEffect(() => {
    socket.emit("join", user?._id);
  }, [user, socket]);

  // get conversations
  useEffect(() => {
    if (user?.access_token) {
      dispatch(getConversations(user.access_token));
    }
    dispatch(resetActiveConversation());
  }, [dispatch, user]);
  return (
    <div className="min-h-screen dark:bg-dark_bg_1 flex items-center justify-center  overflow-hidden">
      {/* container */}
      <div className="container h-screen py-[19px] flex ">
        {/* Sidebar */}
        <Sidebar />
        {activeConversation._id ? <ChatContainer /> : <WhatsappHome />}
      </div>
    </div>
  );
};

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default HomeWithSocket;
