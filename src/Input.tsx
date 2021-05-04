import React, { FC, useState } from "react";
import styled, { css } from "styled-components";
import { Name } from "./Contants";

const span = css`
  cursor: pointer;
`;

const SpanPlus = styled.span`
  /* font-size: large; */
  ${span}/* margin-right:1rem; */
`;
const SpanMinus = styled.span`
  /* font-size: large; */
  ${span}/* margin-left:1rem; */
`;
function horizOrVert(name: Name) {
  if ([Name.Left, Name.Right].includes(name)) {
    return css`
      width: 10%;
      top: 60%;
      transform: translateY(-50%);
      flex-direction: column;
      input {
        width: 100%;
      }
    `;
  } else {
    return css`
      width: 90%;
      top: 0%;
      left: 10%;
    `;
  }
}

const Container = styled.div<{ name: Name }>`
  position: absolute;
  width: 80%;
  top: 0%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  input {
    font-size: 2rem;
    text-align: center;
    background: none;
  }
  ${({ name }) => horizOrVert(name)}
`;
type Props = {
  value: number;
  setValue: any;
  step?: number;
  name: Name;
};

const Input: FC<Props> = ({
  value = 1000,
  step = 100,
  setValue,
  name,
}: Props) => {
  const changeValue = (value: number) => {
    if (value < 0) {
      value = 0;
    }
    setValue(value);
  };
  return (
    <Container name={name}>
      <SpanPlus
        onClick={() => {
          changeValue(value + step);
        }}
      >
        ⊕
      </SpanPlus>
      <input
        value={`${value}`}
        onChange={(e) => {
          let value = parseInt(e.target.value || "0");
          changeValue(value);
        }}
      />
      <SpanMinus
        onClick={() => {
          changeValue(value - step);
        }}
      >
        ⊖
      </SpanMinus>
    </Container>
  );
};

export default Input;
