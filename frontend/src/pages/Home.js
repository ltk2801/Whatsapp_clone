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
  signal: "",
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
  const [show, setShow] = useState(false);
  // const { receiveingCall, callEnded } = call;
  const [callAccepted, setCallAccepted] = useState(false);
  const [totalSecInCall, setTotalSecInCall] = useState(0);
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

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
    // khi nhận được sự kiện end call từ server
    socket.on("end call", () => {
      setShow(false);
      setCall({ ...call, callEnded: true, receiveingCall: false });
      myVideo.current.srcObject = null;
      if (callAccepted) {
        connectionRef?.current?.destroy();
      }
    });
  }, []);

  // call user function ( gọi đi )
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
      // gửi về cho server
      socket.emit("call user", {
        userToCall: getConversationId(user, activeConversation.users),
        signal: data,
        from: call.socketId,
        name: user.name,
        picture: user.picture,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
      console.log(userVideo.current.srcObject);
    });
    socket.on("call accepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
    connectionRef.current = peer;
  };
  // answer call function (Nhận cuộc gọi )
  const answerCall = () => {
    enableMedia();
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answer call", {
        signal: data,
        to: call.socketId,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
      console.log(userVideo.current.srcObject);
    });
    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  // -- end call function
  const endCall = () => {
    setShow(false);
    setCall({ ...call, callEnded: true, receiveingCall: false });
    myVideo.current.srcObject = null;
    socket.emit("end call", call.socketId);
    if (callAccepted) {
      connectionRef?.current?.destroy();
    }
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
    setShow(true);
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
      <div className={(show || call.signal) && !call.callEnded ? "" : "hidden"}>
        <Call
          call={call}
          setCall={setCall}
          callAccepted={callAccepted}
          userVideo={userVideo}
          myVideo={myVideo}
          stream={stream}
          answerCall={answerCall}
          show={show}
          endCall={endCall}
          totalSecInCall={totalSecInCall}
          setTotalSecInCall={setTotalSecInCall}
        />
      </div>
    </>
  );
};

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default HomeWithSocket;
