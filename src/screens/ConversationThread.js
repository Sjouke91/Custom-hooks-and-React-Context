import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Message from "../components/Message";
import useSlackApi from "../lib/useSlackApi";

export default function ConversationThread() {
  const { channel = "" } = useParams();
  const history = useSlackApi(
    "conversations.history?channel=" + encodeURIComponent(channel)
  );

  return (
    <Container>
      <p>Channel: #{channel}</p>

      {history.status === "loading" && <p>Loading...</p>}
      {history.status === "error" && <p>Error :(</p>}
      {history.status === "success" &&
        history.data.messages.map((message) => {
          if (message.type !== "message") {
            return null;
          }

          return (
            <Message
              text={message.text}
              sender="(Unknown)"
              sentAt={message.ts}
            />
          );
        })}
    </Container>
  );
}

const Container = styled.div`
  flex: 1 0 auto;
  padding: 1.5rem;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
