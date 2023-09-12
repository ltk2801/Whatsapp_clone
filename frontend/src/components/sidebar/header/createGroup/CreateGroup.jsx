import axios from "axios";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ReturnIcon } from "../../../../svg";
import MultipleSelect from "./MultipleSelect";
import UnderlineInput from "./UnderlineInput";
import { ClipLoader } from "react-spinners";
import { FaCheck } from "react-icons/fa";

const CreateGroup = ({ setShowCreateGroup }) => {
  const { user } = useSelector((state) => state.user);
  const { status } = useSelector((state) => state.chat);
  const [name, setName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSearch = async (e) => {
    if (e.target.value.length && e.key === "Enter") {
      setSearchResults([]);
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/user?search=${e.target.value}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        if (data.length > 0) {
          let tempArray = [];
          data.forEach((user) => {
            let temp = {
              value: user._id,
              label: user.name,
              picture: user.picture,
            };
            tempArray.push(temp);
          });
          setSearchResults(tempArray);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.log(error.response.data.error.message);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="createGroupAnimation relative flex0030 h-full z-40">
      {/* Container */}
      <div className="mt-5">
        {/* Return/Close button */}
        <button
          className="btn w-6 h-6 border"
          onClick={() => setShowCreateGroup(false)}
        >
          <ReturnIcon className="fill-white" />
        </button>
        {/* Group name input */}
        <UnderlineInput name={name} setName={setName} />
        {/* Multiple select */}
        <MultipleSelect
          selectedUsers={selectedUsers}
          searchResults={searchResults}
          setSelectedUsers={setSelectedUsers}
          handleSearch={handleSearch}
        />
        {/* CREATE GROUP button */}
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 ">
          <button className="btn bg-green_1 scale-150 hover:bg-green-500 ">
            {status === "loading" ? (
              <ClipLoader color="#E9EDEF" size={25} />
            ) : (
              <FaCheck className="fill-white w-[22px] h-[22px] h-full " />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
