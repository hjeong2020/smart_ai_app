import React from "react";
import ReactMarkdown from "react-markdown";
import { Typography } from "@mui/material";

function FormatText({ textWithNewlines }) {
  // Convert newline characters to <br /> before rendering
  // const formattedText = textWithNewlines.replace(/\n/g, "<br />");
  // console.log(textWithNewlines)
  return (
    <ReactMarkdown>{textWithNewlines}</ReactMarkdown>
  );
}

export default FormatText;
