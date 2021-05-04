export const TagName = "raised-bed-calculator";
export const ObjectNameGround = "ground";
export enum Viewpoint {
  Front,
}
export enum Orientation {
  Tall,
  Flat,
}
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
