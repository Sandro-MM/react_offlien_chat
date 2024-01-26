import { useEffect, useRef } from "react";
import "../styles/MessageCard.css";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import { useAppSelector } from "../store/hooks";
import * as React from "react";
import { Message as MessageInterface } from "../interfaces";
import AvatarComponent from "./avatarComponent";

export const Messages = ({ user, currentUser }) => {
  const { messages } = useAppSelector((state) => state as { messages: MessageInterface[] });
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const filteredMessages = messages.filter(
      (message) =>
          (message.userId === user.id && message.myId === currentUser.id) ||
          (message.userId === currentUser.id && message.myId === user.id)
  );

  return (
      <div className="messages-card">
        {filteredMessages.map((message) => (
            <Message key={message.id} messageItem={message} userId={user.id} currentUser={currentUser} user={user} />
        ))}
        <div ref={messagesEndRef} />
      </div>
  );
};

const Message = ({ messageItem, userId,currentUser,user }) => {
  return (
      <>
        <div
            className={`message-box ${
                messageItem.userId === userId
                    ? "message-box-right"
                    : "message-box-left"
            }`}
        >
            {
                messageItem.userId === userId?
                    <AvatarComponent avatar={currentUser.avatar} name={currentUser.name} />
                    : <AvatarComponent avatar={user.avatar} name={user.name} />
            }
          <div>
            <div className="username">{messageItem.userName}</div>
            <div className="message">
              <div className="message-text">{messageItem.message}</div>
              <div className="message-time">{messageItem.time}</div>
            </div>
          </div>
        </div>
      </>
  );
};
