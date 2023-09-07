import React from "react";
import { useState } from "react";
import { Conversations } from "./conversations";
import { SidebarHeader } from "./header";
import { Notification } from "./notifications";
import Search from "./search/Search";
import SearchResult from "./search/SearchResult";

const Sidebar = () => {
  const [searchResult, setSearchResult] = useState([]);

  return (
    <div className="w-[40%] h-full select-none">
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
          <SearchResult searchResult={searchResult} />
        </>
      ) : (
        <>
          {" "}
          <Conversations />
        </>
      )}
    </div>
  );
};

export default Sidebar;
