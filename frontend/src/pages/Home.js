import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatContainer } from "../components/chat";
import WhatsappHome from "../components/chat/Welcome/WhatsappHome";
import { Sidebar } from "../components/sidebar";
import {
  getConversations,
  resetActiveConversation,
} from "../features/chatSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  useEffect(() => {
    if (user?.access_token) {
      dispatch(getConversations(user.access_token));
    }
    dispatch(resetActiveConversation());
  }, [dispatch, user]);
  return (
    <div className="min-h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
      {/* container */}
      <div className="container  flex">
        {/* Sidebar */}
        <Sidebar />
        {activeConversation._id ? <ChatContainer /> : <WhatsappHome />}
      </div>
    </div>
  );
};

export default Home;
