import { BoxGeometry, MeshLambertMaterial, Mesh } from "three";
import { Orientation } from "./utils";

export const createBeam = ({ orientation, length, layer }) => {
  if (layer > 0 && orientation === Orientation.Tall) {
    return;
  }
  const [height, width] =
    orientation === Orientation.Tall ? [200, 100] : [100, 200];
  const geometry = new BoxGeometry(length, height, width);

  const material = new MeshLambertMaterial({ color: "brown" });
  const cube = new Mesh(geometry, material);
  cube.position.setY(height / 2);
  return cube;
};
