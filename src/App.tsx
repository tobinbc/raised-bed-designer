import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DesignChanged, maxBeamLength, Name, Orientation } from "./Contants";
import Input from "./Input";
import Layer from "./Layer";
import { calculateOutputs, getTag } from "./utils";
const PlayArea = styled.div`
  /* background: lightgrey; */
  height: 100%;
  position: relative;
`;

const App = ({ dataBeamX, dataBeamY, pageReady }) => {
  const [orientation, setOrientation] = useState(Orientation.Tall);
  const [beamThickness, beamHeight] =
    orientation === Orientation.Tall
      ? [dataBeamX, dataBeamY]
      : [dataBeamY, dataBeamX];
  const [currentLayerIndex, setCurrentLayerIndex] = useState(0);
  const [outerWidth, setOuterWidth] = useState(120);
  const [outerHeight, setOuterHeight] = useState(60);
  const [layers, setLayers] = useState([
    {
      overlap: {
        LeftTop: Name.Top,
        TopRight: Name.Top,
        RightBottom: Name.Bottom,
        BottomLeft: Name.Bottom,
      },
      used: {
        [Name.Top]: true,
        [Name.Right]: true,
        [Name.Bottom]: true,
        [Name.Left]: true,
      },
    },
  ]);
  useEffect(() => {
    const { beams, corners, verticals } = calculateOutputs({
      beamThickness,
      layers,
      outerWidth,
      outerHeight,
    });
    const detail = {
      beams,
      corners,
      verticals,
      layers,
      outerWidth,
      outerHeight,
      orientation,
      pageReady,
      beamThickness,
    };
    // console.log(DesignChanged, { detail });
    if (pageReady) {
      getTag().dispatchEvent(
        new CustomEvent(DesignChanged, {
          detail,
        })
      );
    }
  }, [layers, outerWidth, outerHeight, orientation, beamThickness, pageReady]);
  const setOverlap = (beam1: Name, beam2: Name, name: Name) =>
    setLayers((layers) => {
      layers[currentLayerIndex].overlap[`${beam1}${beam2}`] = name;
      return [...layers];
    });
  const overlap = layers[currentLayerIndex].overlap;

  const setUsed = (beam: Name, used: boolean) =>
    setLayers((layers) => {
      layers[currentLayerIndex].used[beam] = used;
      return [...layers];
    });
  const used = layers[currentLayerIndex].used;

  const max = maxBeamLength + beamThickness + beamThickness;
  return (
    <PlayArea>
      <Input
        value={outerWidth}
        setValue={setOuterWidth}
        name={Name.Top}
        max={max}
      />
      <Input
        value={outerHeight}
        setValue={setOuterHeight}
        name={Name.Left}
        max={max}
      />
      <Layer
        beamThickness={beamThickness}
        orientation={orientation}
        used={used}
        setUsed={setUsed}
        overlap={overlap}
        setOverlap={setOverlap}
        outerHeight={outerHeight}
        outerWidth={outerWidth}
      ></Layer>
    </PlayArea>
  );
};
export default App;
