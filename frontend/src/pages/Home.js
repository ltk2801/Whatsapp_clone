import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sidebar } from "../components/sidebar";
import { getConversations } from "../features/chatSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  // get all conversations
  useEffect(() => {
    if (user?.access_token) {
      dispatch(getConversations(user.access_token));
    }
  }, [dispatch, user]);
  return (
    <div className="min-h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
      {/* container */}
      <div className="container min-h-screen flex">
        {/* Sidebar */}
        <Sidebar />
      </div>
    </div>
  );
};

export default Home;
