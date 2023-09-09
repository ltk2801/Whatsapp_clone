import React from "react";
import { useState } from "react";
import { Conversations } from "./conversations";
import { SidebarHeader } from "./header";
import { Notification } from "./notifications";
import Search from "./search/Search";
import SearchResult from "./search/SearchResult";

const Sidebar = ({ onlineUsers, typing }) => {
  const [searchResult, setSearchResult] = useState([]);

  return (
    <div className="flex0030 max-w-[40%] h-full select-none">
      {/* Sidebar Header */}
      <SidebarHeader />
      {/* Notifications */}
      <Notification />
      {/* Search */}
      <Search
        searchLength={searchResult.length}
        setSearchResult={setSearchResult}
      />
      {/* Conversations && SearchResults */}
      {searchResult.length > 0 ? (
        <>
          <SearchResult
            searchResult={searchResult}
            setSearchResult={setSearchResult}
          />
        </>
      ) : (
        <>
          {" "}
          <Conversations onlineUsers={onlineUsers} typing={typing} />
        </>
      )}
    </div>
  );
};

export default Sidebar;
