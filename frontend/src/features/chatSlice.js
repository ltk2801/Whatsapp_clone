import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const CONVERSATION_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/conversation`;
const MESSAGE_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/message`;

const initialState = {
  status: "",
  error: "",
  conversations: [],
  activeConversation: {},
  messages: [],
  notifications: [],
  files: [],
};

// functions get & create_open conversation
export const getConversations = createAsyncThunk(
  "conversation/all",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(CONVERSATION_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // trả về response
      return data;
    } catch (error) {
      // ở đây ra về message trong error khi lỗi
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const open_create_conversation = createAsyncThunk(
  "conversation/open_create",
  async (values, { rejectWithValue }) => {
    const { token, receiver_id } = values;
    try {
      const { data } = await axios.post(
        CONVERSATION_ENDPOINT,
        { receiver_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // trả về response
      return data;
    } catch (error) {
      // ở đây ra về message trong error khi lỗi
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const getConversationMessages = createAsyncThunk(
  "conversation/messages",
  async (values, { rejectWithValue }) => {
    const { token, convo_id } = values;
    try {
      const { data } = await axios.get(`${MESSAGE_ENDPOINT}/${convo_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // trả về response
      return data;
    } catch (error) {
      // ở đây ra về message trong error khi lỗi
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const sendMessages = createAsyncThunk(
  "message/send",
  async (values, { rejectWithValue }) => {
    const { token, convo_id, message, files } = values;
    try {
      const { data } = await axios.post(
        MESSAGE_ENDPOINT,
        {
          message,
          convo_id,
          files,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // trả về response
      return data;
    } catch (error) {
      // ở đây ra về message trong error khi lỗi
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },
    resetActiveConversation: (state, action) => {
      state.activeConversation = {};
    },
    logoutChat: (state) => {
      state.status = "";
      state.error = "";
      state.conversations = [];
      state.activeConversation = {};
      state.messages = [];
      state.notifications = [];
      state.files = [];
    },
    updateMessagesAndConversation: (state, action) => {
      // update messages
      let convo = state.activeConversation;
      if (convo._id === action.payload.conversation._id) {
        state.messages = [...state.messages, action.payload];
      }
      // update conversations
      let conversation = {
        ...action.payload.conversation,
        latestMessage: action.payload,
      };
      let newConvos = [...state.conversations].filter(
        (c) => c._id !== conversation._id
      );
      newConvos.unshift(conversation);
      state.conversations = newConvos;
    },
    addFiles: (state, action) => {
      state.files = [...state.files, action.payload];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getConversations.pending, (state, action) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(getConversations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.conversations = action.payload;
        state.error = "";
      })
      .addCase(getConversations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(open_create_conversation.pending, (state, action) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(open_create_conversation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.activeConversation = action.payload;
        state.error = "";
      })
      .addCase(open_create_conversation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getConversationMessages.pending, (state, action) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(getConversationMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload;
        state.error = "";
      })
      .addCase(getConversationMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(sendMessages.pending, (state, action) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(sendMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = [...state.messages, action.payload];
        state.error = "";
        // Sau khi gửi tin nhắn mới, sẽ thêm latestMessage vào cuộc trò chuyện, lọc ra các cuộc trò chuyện khác => nối cuộc trò chuyện đang gửi tn vào (unshift)
        let conversation = {
          ...action.payload.conversation,
          latestMessage: action.payload,
        };
        let newConvos = [...state.conversations].filter(
          (c) => c._id !== conversation._id
        );
        newConvos.unshift(conversation);
        state.conversations = newConvos;
      })
      .addCase(sendMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  setActiveConversation,
  resetActiveConversation,
  updateMessagesAndConversation,
  addFiles,
  logoutChat,
} = chatSlice.actions;

export default chatSlice.reducer;
