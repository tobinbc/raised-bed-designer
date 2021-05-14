import React, { FC, useState } from "react";
import styled from "styled-components";
import { Name } from "./Contants";
import { makeValue } from "./utils";
const Div = styled.div`
  position: absolute;

  box-sizing: border-box;
  /* background: lightcyan; */
  cursor: pointer;
  pointer-events: initial;
  &:hover {
    background: rgba(0, 0, 0, 0.4);
    /* border: 2px dashed lightgrey; */
  }
`;

type Props = {
  height?: number;
  width?: number;
  beam1: Name;
  beam2: Name;
  //   current: Name;
  setOverlap: any;
  overlap: any;
};

const Overlap: FC<Props> = ({
  width,
  height,
  beam1,
  beam2,
  //   current,
  setOverlap,
  overlap,
}: Props) => {
  const current = overlap[`${beam1}${beam2}`];

  return (
    <Div
      style={{
        [beam1.toLowerCase()]: 0,
        [beam2.toLowerCase()]: 0,

        width: makeValue(width),
        height: makeValue(height),
      }}
      onClick={() => {
        setOverlap(beam1, beam2, current === beam1 ? beam2 : beam1);
      }}
    ></Div>
  );
};
export default Overlap;
