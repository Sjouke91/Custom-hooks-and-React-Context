import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import axios from "axios";

export default function ConversationsList() {
  const [conversations, setConversations] = useState({ status: "loading" });

  useEffect(() => {
    async function fetchData() {
      setConversations({ status: "loading" });
      try {
        const res = await axios.get(
          "https://slack.com/api/conversations.list?exclude_archived=true&token=" +
            process.env.REACT_APP_SLACK_TOKEN
        );
        if (!res.data.ok) {
          // it turns out that Slack gives back errors
          //  with a 200 status code, so this is necessary
          throw new Error(res.data.error);
        }
        if (Math.random() < 0.5) {
          throw "ERR";
        }
        setConversations({ status: "success", data: res.data });
      } catch (error) {
        setConversations({ status: "error", error });
      }
    }

    fetchData();
  }, [setConversations]);
  return (
    <Container>
      <Item to="/c/general">#general</Item>
      <Item to="/c/errors">#errors</Item>
      <Item to="/c/random">#random</Item>
    </Container>
  );
}

const Container = styled.div`
  flex: 0 0 260px;
  padding: 0.5rem 0;
  border-right: 1px solid #ddd;
`;

const Item = styled(NavLink)`
  display: block;
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  text-decoration: none;
  color: black;

  &:focus {
    background: #f5f5f5;
  }

  &:active {
    background: #eee;
  }

  /* automatically added by react-router-dom */
  &.active {
    color: white;
    background: #333;
  }
`;
