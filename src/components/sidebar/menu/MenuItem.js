import React from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";

const MenuItem = ({ title, active, icon }) => {
  return (
    <Container active={active?"true":"false"}>
      <IconCustom active={active?"true":"false"} icon={`mdi-light:${icon}`} inline={false} />
      <Title active={active?"true":"false"}>{title}</Title>
    </Container>
  );
};

export default MenuItem;

const Container = styled.div`
  border-left: 3px solid
    ${(props) => (props.active ? props.theme.activeMenu : "transparent")};
  width: 100%;
  padding: 0.3rem;
  padding-left: 2rem;
  cursor: pointer;
  display: flex;
  flex-direction: center;
  margin-bottom: 1rem;
  transition: 0.2s all ease-out;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;
const IconCustom = styled(Icon)`
  color: ${(props) => (props.active ? props.theme.activeMenu : "#AAA5A5")};
  font: 1rem;
  margin-right: 1rem;
  align-self: center;
`;

const Title = styled.h1`
  color: ${(props) => (props.active ? props.theme.activeMenu : "#AAA5A5")};
  font-size: 0.9rem;
  margin-right: 1rem;
  font-weight: 300;
`;
