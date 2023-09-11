import React from "react";
import { useState } from "react";
import CallAction from "./CallAction";
import CallArea from "./CallArea";
import Header from "./Header";
import Ringing from "./Ringing";

const Call = ({
  call,
  setCall,
  callAccepted,
  userVideo,
  myVideo,
  stream,
  answerCall,
  show,
  endCall,
  totalSecInCall,
  setTotalSecInCall,
}) => {
  const { receiveingCall, callEnded, name } = call;
  const [showActions, setShowActions] = useState(false);
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[550px] z-10 rounded-2xl overflow-hidden callbg ${
          receiveingCall && !callAccepted ? "hidden" : ""
        }`}
        onMouseOver={() => setShowActions(true)}
        onMouseOut={() => setShowActions(false)}
      >
        {/* Container */}
        <div>
          <div>
            {/* Header */}
            <Header />
            {/* Call area */}
            <CallArea
              name={name}
              totalSecInCall={totalSecInCall}
              setTotalSecInCall={setTotalSecInCall}
              callAccepted={callAccepted}
            />
            {/* Call actions */}
            {showActions && <CallAction endCall={endCall} />}
          </div>
          {/* Video streams */}
          <div>
            {/* User video */}
            {callAccepted && !callEnded && (
              <div>
                <video
                  ref={userVideo}
                  playsInline
                  muted
                  autoPlay
                  className={!toggle ? "largeVideoCall" : "smallVideoCall"}
                  onClick={() => setToggle((prev) => !prev)}
                />
              </div>
            )}

            {/* My video */}
            {stream && (
              <div>
                <video
                  ref={myVideo}
                  playsInline
                  muted
                  autoPlay
                  className={`${toggle ? "largeVideoCall" : "smallVideoCall"} ${
                    showActions ? "moveVideoCall" : ""
                  }`}
                  onClick={() => setToggle((prev) => !prev)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Ringing */}
      {receiveingCall && !callAccepted && (
        <Ringing
          call={call}
          setCall={setCall}
          answerCall={answerCall}
          endCall={endCall}
        />
      )}
      {/* Calling ringtone */}
      {!callAccepted && show && (
        <audio src="../audio/ringing.mp3" autoPlay loop />
      )}
    </>
  );
};

export default Call;
