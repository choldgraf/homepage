import { Box } from "@chakra-ui/react";
import MarkdownIt from "markdown-it";
import React from "react";
import "./message.css";

const md = MarkdownIt();

const Message = ({ markdown, ...props }) => {
  return <Box {...props} className="message"
    dangerouslySetInnerHTML={{ __html: md.render(markdown) }} />
}

export { Message }