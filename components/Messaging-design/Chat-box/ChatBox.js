import React, { Component } from "react";
import ChatBot from "react-simple-chatbot";

class ChatBox extends Component {
  render() {
    return (
      <ChatBot
        steps={[
          {
            id: "1",
            message: "Welcome to PeoplesNect!",
            trigger: "2",
          },
          {
            id: "2",
            message: "Let's Start Chat",
            trigger: "3",
          },
          {
            id: "3",
            message: "Wating",
            trigger: "",
          },
        ]}
      />
    );
  }
}

export default ChatBox;
