import React, { FC, useState } from "react";
import styled from "styled-components";
import { Name } from "./Contants";
const Div = styled.div`
  position: absolute;
  border: 2px solid black;
  box-sizing: border-box;
  background: lightcoral;
  pointer-events: initial;
`;

const NameSpan = styled.span`
  margin: 0 auto;
`;

type Props = {
  //   parentHeight?: number;
  //   parentWidth?: number;
  //   longOuterDimension: number;
  //   startOverlap: Name;
  //   endOverlap: Name;
  //   thickness: number;
  name: Name;
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  height?: number;
  width?: number;
};

const Beam: FC<Props> = ({
  //   parentHeight,
  //   endOverlap,
  //   longOuterDimension,
  //   parentWidth,
  //   startOverlap,
  //   thickness,
  name,
  bottom,
  left,
  right,
  top,
  width,
  height,
}: Props) => {
  //   const isSideways = [Name.Bottom, Name.Top].includes(name);

  //   //   const height = heightPx / parentHeight + "%";
  //   //   const width = widthPx / parentWidth + "%";

  //   const longBeamDimension =
  //     100 -
  //     (startOverlap === name ? thickness : 0) -
  //     (endOverlap === name ? thickness : 0);
  //   const shortBeamDimension = thickness;

  //   const heightPx = isSideways ? shortBeamDimension : longBeamDimension;
  //   const widthPx = isSideways ? longBeamDimension : shortBeamDimension;
  const makeValue = (input) =>
    typeof input === "number" ? `${input}%` : undefined;
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
    >
      <NameSpan>{name}</NameSpan>
    </Div>
  );
};
export default Beam;
