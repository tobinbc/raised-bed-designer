import { Name, TagName } from "./Contants";
export const getParent = () => {
  const parent = document.getElementsByTagName(TagName)[0];
  const { clientHeight, clientWidth } = parent;
  return {
    width: clientWidth,
    height: clientHeight,
    aspect: clientWidth / clientHeight,
    parent,
  };
};

export const onResize = (renderer, camera) => {
  const { aspect, width, height } = getParent();
  renderer.setSize(width, height);
  camera.aspect = aspect;
  camera.updateProjectionMatrix();
};

export const calculateOutputs = ({
  layers,
  beamThickness,
  outerHeight,
  outerWidth,
}) => {
  const beams = [];
  const corners = [];
  const verticals = [];
  layers.forEach(({ used, overlap }) => {
    Object.keys(overlap).forEach((corner) => {
      const [[, beam1], [, beam2]] = Object.entries(used).filter(([name]) =>
        corner.includes(name)
      );
      if (beam1 && beam2) {
        corners.push(corner);
      }
    });
    Object.entries(used)
      .filter(([, inUse]) => inUse)
      .forEach(([name]) => {
        const startOverlapKey = Object.keys(overlap).find((key) =>
          key.endsWith(name)
        );
        const endOverlapKey = Object.keys(overlap).find((key) =>
          key.startsWith(name)
        );

        const startOverlap = overlap[startOverlapKey];
        const endOverlap = overlap[endOverlapKey];
        const isStartOverlap = startOverlap === name;
        const isEndOverlap = endOverlap === name;
        const isVertical = [Name.Right, Name.Left].includes(name as Name);
        const distance = isVertical ? outerHeight : outerWidth;
        const length =
          distance -
          (isStartOverlap ? 0 : beamThickness) -
          (isEndOverlap ? 0 : beamThickness);

        const beam = {
          name,
          isStartOverlap,
          isEndOverlap,
          length,
        };
        beams.push(beam);
      });
  });
  return { beams, corners, verticals };
};

export const makeValue = (input) =>
  typeof input === "number" ? `${input}%` : undefined;

export const displayName = (name: Name) => {
  switch (name) {
    case Name.Top:
      return "A";
    case Name.Right:
      return "B";
    case Name.Bottom:
      return "C";
    case Name.Left:
      return "D";
  }
};

export const getTag = () => document.getElementsByTagName(TagName)[0];
