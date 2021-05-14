import React, { FC, useState } from "react";
import styled from "styled-components";
import { Name } from "./Contants";
import { displayName, makeValue } from "./utils";
const Div = styled.div<{ used: boolean }>`
  position: absolute;
  border: ${({ used }) => (used ? `2px solid black` : `1px dashed lightgrey`)};
  box-sizing: border-box;
  background: ${({ used }) => (used ? `#d1b076` : `transparent`)};
  pointer-events: initial;
  cursor: pointer;
  &:hover {
    background: ${({ used }) => (used ? `#ad9263` : `lightgrey`)};
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NameSpan = styled.span<{ used: boolean }>`
  /* margin: 0 auto; */
  font-size: 1.5rem;
  color: ${({ used }) => (used ? `black` : `grey`)};
`;

type Props = {
  used: any;
  setUsed: any;
  name: Name;
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  height?: number;
  width?: number;
};

const Beam: FC<Props> = ({
  used,
  name,
  bottom,
  left,
  right,
  top,
  width,
  height,
  setUsed,
}: Props) => {
  return (
    <Div
      used={used[name]}
      style={{
        top: makeValue(top),
        left: makeValue(left),
        right: makeValue(right),
        bottom: makeValue(bottom),
        width: makeValue(width),
        height: makeValue(height),
      }}
      onClick={() => setUsed(name, !used[name])}
    >
      <NameSpan used={used[name]}>
        {displayName(name)}
        {/* | {name} */}
      </NameSpan>
    </Div>
  );
};
export default Beam;
