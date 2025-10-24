import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import Text from "./Text";
import FormatText from "./FormatText";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { chatMsg, chatMsgV1, deleteMsg } from "../assets/query";
import { v4 as uuidv4 } from "uuid";
// import { ChatMessage } from "../assets/model";

interface ChatMessage {
  text: string;
  user?: boolean; // true if sent by the current user, false if received from AI
}

// Replace with your actual POST endpoint
// const API_ENDPOINT = "http://localhost:8000/chat";

// Define a query key (should be unique for this data)
const queryKey = ["message"];

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [sessionId, setSessionId] = useState("");
  const queryClient = useQueryClient();

  useEffect(() => {
    let currentSessionId = sessionStorage.getItem("sessionId");
    if (!currentSessionId) {
      currentSessionId = uuidv4();
      sessionStorage.setItem("sessionId", currentSessionId);
    }
    setSessionId(currentSessionId);
  }, []);

  const mutation = useMutation({
    mutationFn: ({ newPostData, queryParams }) =>
      chatMsgV1(newPostData, queryParams),
    onSuccess: (data, variables, onMutateResult, context) => {
      console.log(data.response);
      setMessages((prevMessages) => [...prevMessages, { text: data.response }]);
    },
  });

  const handleSendMessage = async (message: string) => {
    const newPostData = { prompt: message };
    console.log(sessionId);
    const queryParams = { thread_id: sessionId };
    // Add user's message to the state
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, user: true },
    ]);

    // Clear input field after sending a message
    setInputValue("");

    mutation.mutate({ newPostData, queryParams });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClearChat = () => {
    setMessages([]);
    deleteMsg();
  };

  return (
    <>
      <Container
        fixed
        sx={{
          bgcolor: "background.paper",
          boxShadow: 1,
          borderRadius: 2,
          p: 3,
          // mt: 2,
          minWidth: 300,
        }}
      >
        <Box
          sx={{
            height: 380, // Fixed height in pixels
            overflow: "auto", // Enables scrolling when content overflows
            border: "1px solid grey", // Optional: for visual clarity
            padding: 2,
          }}
        >
          {messages.map((msg, index) => (
            <div key={index}>
              {msg.user ? (
                <>
                  <Typography variant="caption" color="primary">
                    You
                  </Typography>
                  <br />
                  <Text text={msg.text} />
                  <br />
                </>
              ) : (
                <>
                  <Typography variant="caption" color="primary">
                    AI
                  </Typography>
                  <FormatText textWithNewlines={msg.text} />
                  <Divider />
                </>
              )}
            </div>
          ))}
        </Box>
        <Box
          sx={{
            height: 160,
            overflow: "auto",
            padding: 2,
          }}
        >
          {mutation.isPending ? (
            <>
              <TextField
                label="Type your message"
                value="Loading.."
                // onChange={handleInputChange}
                // onKeyDown={(event) => {
                //   if (event.key === "Enter") {
                //     handleSendMessage(inputValue);
                //     event.preventDefault(); // Prevent form submission if needed
                //   }
                // }}
                fullWidth
                disabled
              />
              <Box
                sx={{
                  height: 20,
                  padding: 2,
                }}
              >
                <Button
                  size="large"
                  onClick={() => handleSendMessage(inputValue)}
                  disabled
                >
                  Send
                </Button>

                <Button
                  size="large"
                  variant="contained"
                  sx={{ float: "right" }}
                  onClick={() => handleClearChat()}
                  endIcon={<DeleteIcon />}
                  color="success"
                  disabled
                >
                  Clear Chat
                </Button>
              </Box>
            </>
          ) : (
            <>
              <TextField
                label="Type your message"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSendMessage(inputValue);
                    event.preventDefault(); // Prevent form submission if needed
                  }
                }}
                fullWidth
              />
              <Box
                sx={{
                  height: 20,
                  padding: 2,
                }}
              >
                <Button
                  size="large"
                  onClick={() => handleSendMessage(inputValue)}
                >
                  Send
                </Button>

                <Button
                  size="large"
                  variant="contained"
                  sx={{ float: "right" }}
                  onClick={() => handleClearChat()}
                  endIcon={<DeleteIcon />}
                  color="success"
                >
                  Clear Chat
                </Button>
              </Box>
            </>
          )}

          {mutation.isError && <p>Error: {mutation.error.message}</p>}
          {/* {mutation.isSuccess && <p>Post created successfully!</p>} */}
        </Box>
      </Container>
    </>
  );
};

export default Chat;
