import React, { FC, useState } from "react";
import styled from "styled-components";
import { makeValue, Name } from "./Contants";
const Div = styled.div`
  position: absolute;
  border: 2px dashed lightgrey;
  box-sizing: border-box;
  background: lightcyan;
  cursor: pointer;
  pointer-events: initial;
  &:hover {
    background: darkgrey;
  }
`;

type Props = {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  height?: number;
  width?: number;
  beam1: Name;
  beam2: Name;
  current: Name;
  setOverlap: any;
};

const Overlap: FC<Props> = ({
  bottom,
  left,
  right,
  top,
  width,
  height,
  beam1,
  beam2,
  current,
  setOverlap,
}: Props) => {
  return (
    <Div
      style={{
        top: makeValue(top),
        left: makeValue(left),
        right: makeValue(right),
        bottom: makeValue(bottom),
        width: makeValue(width),
        height: makeValue(height),
      }}
      onClick={() => {
        setOverlap(current === beam1 ? beam2 : beam1);
      }}
    ></Div>
  );
};
export default Overlap;
