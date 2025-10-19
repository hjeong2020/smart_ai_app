import { Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";


function Test() {
  // Convert newline characters to <br /> before rendering
  // const formattedText = textWithNewlines.replace(/\n/g, "<br />");
  // console.log(textWithNewlines)
  return (
    <ReactMarkdown>**TEST** This is a test component</ReactMarkdown>
  );
}

export default Test;