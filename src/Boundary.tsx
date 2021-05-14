import React, { ReactNode, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const ViewDiv = styled.div`
  width: 90%;
  height: 90%;
  top: 10%;
  left: 10%;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  pointer-events: none;
  border: 2px dashed grey;
`;
const LayoutDiv = styled.div<{ height; width }>`
  width: ${(p) => p.width}%;
  height: ${(p) => p.height}%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  /* background-color: lightcoral; */
  /* border: 2px solid darkblue; */
  pointer-events: none;
`;
type Props = {
  children: ReactNode;
  outerWidth: number;
  outerHeight: number;
  setAspect: any;
};
const Boundary = ({ children, outerWidth, outerHeight, setAspect }: Props) => {
  const ratio = outerWidth / outerHeight;
  if (ratio >= 1) {
    outerWidth = 100;
    outerHeight = outerWidth / ratio;
  } else {
    outerHeight = 100;
    outerWidth = outerHeight * ratio;
  }
  const ref = useRef(null);
  //
  function getAspect() {
    if (ref.current) {
      const height = ref.current.offsetHeight;
      const width = ref.current.offsetWidth;
      const aspect = height / width;
      setAspect(aspect);
    }
  }
  useEffect(getAspect, [ref]);
  useEffect(() => {
    window.addEventListener("resize", getAspect);
    return () => {
      window.removeEventListener("resize", getAspect);
    };
  }, []);
  //   console.log("Boundary", { height, width, outerHeight, outerWidth });
  //   const childrenWithDimensions = React.Children.map(children, (child) => {
  //     if (React.isValidElement(child)) {
  //       return React.cloneElement(child, {
  //         //@ts-ignore
  //         parentHeight: height,
  //         //@ts-ignore
  //         parentWidth: width,
  //       });
  //     }
  //     return child;
  //   });
  return (
    <ViewDiv ref={ref}>
      <LayoutDiv height={outerHeight} width={outerWidth}>
        {children}
        {/* {childrenWithDimensions} */}
      </LayoutDiv>
    </ViewDiv>
  );
};
export default Boundary;
