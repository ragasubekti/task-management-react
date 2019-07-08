import React from "react";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  min-height: 100vh;
  height: 100%;
`;

export default props => <Wrapper>{props.children}</Wrapper>;
