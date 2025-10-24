import React from "react";
import { Typography } from "@mui/material";

function Text({ text }) {
  // Convert newline characters to <br /> before rendering
  // const formattedText = textWithNewlines.replace(/\n/g, "<br />");
  // console.log(textWithNewlines)
  return (
    <Typography variant="body1" sx={{ mt: 1 }} color="textSecondary">{text}</Typography>
  );
}

export default Text;