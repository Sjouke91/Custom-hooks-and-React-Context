import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ConversationsList from "./screens/ConversationsList";
import ConversationThread from "./screens/ConversationThread";
import { AddCompactModeFeature } from "./lib/CompactMode";

export default function App() {
  return (
    <AddCompactModeFeature>
      <Router>
        <Container>
          <ConversationsList />
          <Route path="/c/:channel" component={ConversationThread} />
        </Container>
      </Router>
    </AddCompactModeFeature>
  );
}

const Container = styled.div`
  display: flex;
  align-items: stretch;
  height: 100vh;
`;
