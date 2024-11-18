import React, { useState } from "react";
import "./MessageContainer.css";
import { Container } from "@mui/system";

const MessageContainer = ({ messageList, user }) => {
  return (
      <div>
        {messageList.map((message, index) => {
          // 여기에 콘솔 로그 추가
          console.log("user:", user);
          console.log("message.user:", message.user);

          return (
              <Container key={message._id} className="message-container">
                {message.user.name === "system" ? (
                    <div className="system-message-container">
                      <p className="system-message">{message.chat}</p>
                    </div>
                ) : message.user.name === user.user.name ? ( // 여기 수정
                    <div className="my-message-container">
                      <div className="my-message">{message.chat}</div>
                    </div>
                ) : (
                    <div className="your-message-container">
                      <img
                          src="/profile.jpeg"
                          className="profile-image"
                          style={
                            (index === 0
                                ? { visibility: "visible" }
                                : messageList[index - 1].user.name === user.user.name) ||
                            messageList[index - 1].user.name === "system"
                                ? { visibility: "visible" }
                                : { visibility: "hidden" }
                          }
                      />
                      <div className="your-message">{message.chat}</div>
                    </div>
                )}

              </Container>
          );
        })}
      </div>
  );
};

export default MessageContainer;
