import type { TStack } from "react-nami";
import styled from "styled-components";

import Container from "./Container";

type StackProps = { component: TStack };

const Stack = styled(Container)<StackProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  > * {
    position: absolute;
  }
`;

export default Stack;
