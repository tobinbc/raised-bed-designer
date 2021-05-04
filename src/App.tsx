import React, { useEffect, useRef, useState } from "react";
import Input from "./Input";
import Beam from "./Beam";
import Boundary from "./Boundary";
import { Name } from "./Contants";
import Overlap from "./Overlap";
const App = () => {
  const [TopRightOverlap, setTopRightOverlap] = useState(Name.Top);
  const [RightBottomOverlap, setRightBottomOverlap] = useState(Name.Bottom);
  const [BottomLeftOverlap, setBottomLeftOverlap] = useState(Name.Bottom);
  const [LeftTopOverlap, setLeftTopOverlap] = useState(Name.Top);
  const [verticalBeamThickness, setVerticalBeamThickness] = useState(10);
  const [horizontalBeamThickness, setHorizontalBeamThickness] = useState(10);
  const [outerWidth, setOuterWidth] = useState(1200);
  const [outerHeight, setOuterHeight] = useState(600);
  const [zoom, setZoom] = useState(1);
  return (
    <>
      <Input value={outerWidth} setValue={setOuterWidth} name={Name.Top} />
      <Input value={outerHeight} setValue={setOuterHeight} name={Name.Left} />
      <Boundary zoom={zoom} outerHeight={outerHeight} outerWidth={outerWidth}>
        <Beam
          name={Name.Top}
          left={LeftTopOverlap === Name.Top ? verticalBeamThickness : 0}
          top={0}
          right={TopRightOverlap === Name.Top ? verticalBeamThickness : 0}
          height={horizontalBeamThickness}
        />
        <Beam
          name={Name.Right}
          top={TopRightOverlap === Name.Right ? horizontalBeamThickness : 0}
          bottom={
            RightBottomOverlap === Name.Right ? horizontalBeamThickness : 0
          }
          right={0}
          width={verticalBeamThickness}
        />
        <Beam
          name={Name.Bottom}
          left={BottomLeftOverlap === Name.Bottom ? verticalBeamThickness : 0}
          bottom={0}
          right={RightBottomOverlap === Name.Bottom ? verticalBeamThickness : 0}
          height={horizontalBeamThickness}
        />
        <Beam
          name={Name.Left}
          left={0}
          top={LeftTopOverlap === Name.Left ? horizontalBeamThickness : 0}
          bottom={BottomLeftOverlap === Name.Left ? horizontalBeamThickness : 0}
          width={verticalBeamThickness}
        />
        <Overlap
          current={TopRightOverlap}
          setOverlap={setTopRightOverlap}
          beam1={Name.Top}
          beam2={Name.Right}
          top={0}
          right={0}
          height={horizontalBeamThickness}
          width={verticalBeamThickness}
        />
        <Overlap
          current={RightBottomOverlap}
          setOverlap={setRightBottomOverlap}
          beam1={Name.Bottom}
          beam2={Name.Right}
          bottom={0}
          right={0}
          height={horizontalBeamThickness}
          width={verticalBeamThickness}
        />
        <Overlap
          current={BottomLeftOverlap}
          setOverlap={setBottomLeftOverlap}
          beam1={Name.Bottom}
          beam2={Name.Left}
          bottom={0}
          left={0}
          height={horizontalBeamThickness}
          width={verticalBeamThickness}
        />
        <Overlap
          current={LeftTopOverlap}
          setOverlap={setLeftTopOverlap}
          beam1={Name.Top}
          beam2={Name.Left}
          top={0}
          left={0}
          height={horizontalBeamThickness}
          width={verticalBeamThickness}
        />
      </Boundary>
    </>
  );
};
export default App;
