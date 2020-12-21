import React, { useContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Message from "../components/Message";
import useSlackApi from "../lib/useSlackApi";
import { CompactMode } from "../lib/CompactMode";

export default function ConversationThread() {
  const { channel = "" } = useParams();
  const history = useSlackApi(
    "conversations.history?channel=" + encodeURIComponent(channel)
  );
  const { isCompact } = useContext(CompactMode);

  return (
    <Container style={{ padding: isCompact ? "0.5rem" : "1.5rem" }}>
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

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
