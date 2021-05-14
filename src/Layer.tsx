import React, { useState } from "react";
import Beam from "./Beam";
import Boundary from "./Boundary";
import { Name } from "./Contants";
import Overlap from "./Overlap";

const Layer = ({
  orientation,
  outerWidth,
  outerHeight,
  overlap,
  setOverlap,
  used,
  setUsed,
  beamThickness,
}) => {
  const [aspect, setAspect] = useState(1);
  const verticalBeamThickness = (100 * aspect * beamThickness) / outerWidth;
  const horizontalBeamThickness = (100 * beamThickness) / outerHeight;

  return (
    <Boundary
      outerHeight={outerHeight}
      outerWidth={outerWidth}
      setAspect={setAspect}
    >
      <Beam
        name={Name.Top}
        used={used}
        setUsed={setUsed}
        left={overlap.LeftTop === Name.Top ? 0 : verticalBeamThickness}
        top={0}
        right={overlap.TopRight === Name.Top ? 0 : verticalBeamThickness}
        height={horizontalBeamThickness}
      />
      <Beam
        name={Name.Right}
        used={used}
        setUsed={setUsed}
        top={overlap.TopRight === Name.Right ? 0 : horizontalBeamThickness}
        bottom={
          overlap.RightBottom === Name.Right ? 0 : horizontalBeamThickness
        }
        right={0}
        width={verticalBeamThickness}
      />
      <Beam
        name={Name.Bottom}
        used={used}
        setUsed={setUsed}
        left={overlap.BottomLeft === Name.Bottom ? 0 : verticalBeamThickness}
        bottom={0}
        right={overlap.RightBottom === Name.Bottom ? 0 : verticalBeamThickness}
        height={horizontalBeamThickness}
      />
      <Beam
        name={Name.Left}
        used={used}
        setUsed={setUsed}
        left={0}
        top={overlap.LeftTop === Name.Left ? 0 : horizontalBeamThickness}
        bottom={overlap.BottomLeft === Name.Left ? 0 : horizontalBeamThickness}
        width={verticalBeamThickness}
      />
      <Overlap
        overlap={overlap}
        setOverlap={setOverlap}
        beam1={Name.Top}
        beam2={Name.Right}
        height={horizontalBeamThickness}
        width={verticalBeamThickness}
      />
      <Overlap
        overlap={overlap}
        setOverlap={setOverlap}
        beam1={Name.Right}
        beam2={Name.Bottom}
        height={horizontalBeamThickness}
        width={verticalBeamThickness}
      />
      <Overlap
        overlap={overlap}
        setOverlap={setOverlap}
        beam1={Name.Bottom}
        beam2={Name.Left}
        height={horizontalBeamThickness}
        width={verticalBeamThickness}
      />
      <Overlap
        overlap={overlap}
        setOverlap={setOverlap}
        beam1={Name.Left}
        beam2={Name.Top}
        height={horizontalBeamThickness}
        width={verticalBeamThickness}
      />
    </Boundary>
  );
};
export default Layer;
