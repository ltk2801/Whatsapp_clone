import React, { useEffect, useRef, useState } from "react";
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
import {
  getConversationId,
  getConversationName,
  getConversationPicture,
} from "../utils/chat";
import Peer from "simple-peer";

const callData = {
  socketId: "",
  receiveingCall: false,
  callEnded: false,
  name: "",
  picture: "",
};

const Home = ({ socket }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typing, setTyping] = useState(false);
  // call
  const [call, setCall] = useState(callData);
  const [stream, setStream] = useState();
  const { receiveingCall, callEnded } = call;
  const [callAccepted, setCallAccepted] = useState(false);
  const myVideo = useRef();
  const userVideo = useRef();

  // join user into the socket io
  useEffect(() => {
    socket.emit("join", user?._id);
    // get online users
    socket.on("get-online-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user, socket]);

  // Call stream,
  useEffect(() => {
    setupMedia();
    socket.on("setup socket", (id) => {
      setCall({ ...call, socketId: id });
    });
    // khi nhận được sự kiện call user từ server
    socket.on("call user", (data) => {
      setCall({
        ...call,
        socketId: data.from,
        name: data.name,
        picture: data.picture,
        signal: data.signal,
        receiveingCall: true,
      });
    });
  }, []);
  // call user function
  const callUser = () => {
    enableMedia();
    setCall({
      ...call,
      name: getConversationName(user, activeConversation.users),
      picture: getConversationPicture(user, activeConversation.users),
    });
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("call user", {
        userToCall: getConversationId(user, activeConversation.users),
        signal: data,
        from: call.socketId,
        name: user.name,
        picture: user.picture,
      });
    });
  };
  // set up media function
  const setupMedia = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
      });
  };
  // mở media user
  const enableMedia = () => {
    myVideo.current.srcObject = stream;
  };

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
            <ChatContainer
              onlineUsers={onlineUsers}
              typing={typing}
              callUser={callUser}
            />
          ) : (
            <WhatsappHome />
          )}
        </div>
      </div>
      {/* Call */}
      <Call
        call={call}
        setCall={setCall}
        callAccepted={callAccepted}
        userVideo={userVideo}
        myVideo={myVideo}
        stream={stream}
      />
    </>
  );
};

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default HomeWithSocket;
