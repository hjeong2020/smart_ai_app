import React, { useEffect, useState } from "react";
import ReviewTable from "./ReviewTable";
import { TextField, Typography } from "@mui/material";
import { LinearProgress } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { agentReview } from "../assets/query";

export default function Review() {
  const [message, setMessage] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");
  // const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ newPostData }) => agentReview(newPostData),
    onSuccess: (data, variables, onMutateResult, context) => {
      console.log(data);
      setMessage(JSON.stringify(data, null, 2));
    },
  });

  const handleSendMessage = async (message: string) => {
    const newPostData = { prompt: message };
    // Clear input field after sending a message
    setInputValue("");
    mutation.mutate({ newPostData });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <Typography variant="h5" sx={{ marginBottom: 2 }} color="textPrimary">
        Structured Output Playgroud
      </Typography>
      <TextField
        sx={{ marginBottom: 2 }}
        label="Analyze a review for sentiment. Type a review and press Enter."
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSendMessage(inputValue);
            event.preventDefault();
          }
        }}
        fullWidth
      />
      {mutation.isPending ? (
        <Typography variant="h6" color="secondary">
          Agent is generating a response...
          <LinearProgress />
          <br />
        </Typography>
      ) : (
        <span></span>
      )}
      {mutation.isSuccess ? (
        <Typography variant="body1" color="secondary">
          {message}
        </Typography>
      ) : (
        <span></span>
      )}
      <ReviewTable />
    </>
  );
}
