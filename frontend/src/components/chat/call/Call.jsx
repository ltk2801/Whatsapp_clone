import React from "react";
import { useState } from "react";
import CallAction from "./CallAction";
import CallArea from "./CallArea";
import Header from "./Header";
import Ringing from "./Ringing";

const Call = ({ call, setCall, callAccepted, userVideo, myVideo, stream }) => {
  const { receiveingCall, callEnded } = call;
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[550px] z-10 rounded-2xl overflow-hidden callbg`}
      onMouseOver={() => setShowActions(true)}
      onMouseOut={() => setShowActions(false)}
    >
      {/* Container */}
      <div>
        <div>
          {/* Header */}
          <Header />
          {/* Call area */}
          <CallArea name="Ace" />
          {/* Call actions */}
          {showActions && <CallAction />}
        </div>
        {/* Video streams */}
        <div>
          {/* User video */}
          <div>
            <video
              ref={userVideo}
              playsInline
              muted
              autoPlay
              className="largeVideoCall"
            ></video>
          </div>
          {/* My video */}
          <div>
            <video
              ref={myVideo}
              playsInline
              muted
              autoPlay
              className={`smallVideoCall ${showActions ? "moveVideoCall" : ""}`}
            ></video>
          </div>
        </div>
      </div>

      {/* Ringing */}
      {receiveingCall && !callAccepted && (
        <Ringing call={call} setCall={setCall} />
      )}
    </div>
  );
};

export default Call;
