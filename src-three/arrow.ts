import * as THREE from "three";
import {
  Group,
  Mesh,
  CylinderGeometry,
  MeshBasicMaterial,
  ConeGeometry,
  Object3D,
  Shape,
  ExtrudeGeometry,
} from "three";

export const attach = ({ object }: { object: Object3D }) => {
  const arrowGroup = new Group();

  const arrow1 = new Shape();
  arrow1.moveTo(0, 1000);
  arrow1.lineTo(0, 100);
  arrow1.lineTo(100, 100);

  const extrudeSettings = {
    depth: 800,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 2,
    bevelSize: 1,
    bevelThickness: 1,
  };

  const geometry = new ExtrudeGeometry(arrow1, extrudeSettings);

  const mesh = new Mesh(geometry, new THREE.MeshPhongMaterial());

  //   const arrowShaft = new Mesh(
  //     // We want to ensure our arrow is completely offset into one direction
  //     // So the translation ensure every bit of it is in Y+
  //     new CylinderGeometry(200, 200, 300, 100).translate(0, 1.5, 0),
  //     new MeshBasicMaterial({ color: "blue" })
  //   );
  //   const arrowPoint = new Mesh(
  //     // Same thing, translate to all vertices or +Y
  //     new ConeGeometry(400, 200, 100).translate(0, 1, 0),
  //     new MeshBasicMaterial({ color: "red" })
  //   );
  //   arrowShaft.add(arrowPoint);
  //   // Add the shaft to the global arrow group
  //   arrow.add(arrowShaft);
  // Add the arrow to the scene
  object.add(mesh);
};
