import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
  Fog,
  AmbientLight,
  DirectionalLight,
  TextureLoader,
  sRGBEncoding,
  RepeatWrapping,
  MeshLambertMaterial,
  PlaneGeometry,
  Mesh,
  Raycaster,
  Vector2,
  MeshBasicMaterial,
  ConeGeometry,
  CylinderGeometry,
  Group,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { attach } from "./arrow";

import { getParent, onResize } from "./utils";

export default ({
  renderer,
  camera,
  scene,
}: {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
}) => {
  //scene
  camera.position.set(1000, 50, 1500);

  scene.background = new Color(0xcce0ff);
  //   scene.fog = new Fog(0xcce0ff, 500, 10000);
  // lights

  scene.add(new AmbientLight(0x666666));

  const light = new DirectionalLight(0xdfebff, 1);
  light.position.set(50, 200, 100);
  light.position.multiplyScalar(1.3);

  light.castShadow = true;

  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;

  const d = 300;

  light.shadow.camera.left = -d;
  light.shadow.camera.right = d;
  light.shadow.camera.top = d;
  light.shadow.camera.bottom = -d;

  light.shadow.camera.far = 1000;

  scene.add(light);

  const loader = new TextureLoader();
  const groundTexture = loader.load(
    "https://static.wixstatic.com/media/271770_ee0ca7756c6c4208ae8ffc480cbe9608~mv2.jpeg"
  );
  groundTexture.wrapS = groundTexture.wrapT = RepeatWrapping;
  groundTexture.repeat.set(25, 25);
  groundTexture.anisotropy = 16;
  groundTexture.encoding = sRGBEncoding;

  const groundMaterial = new MeshLambertMaterial({ map: groundTexture });
  let mesh = new Mesh(new PlaneGeometry(20000, 20000), groundMaterial);
  mesh.name = "ground";
  //   mesh.position.y = -100;
  mesh.rotation.x = -Math.PI / 2;
  mesh.receiveShadow = true;
  scene.add(mesh);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;

  // controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.maxPolarAngle = Math.PI * 0.5;
  controls.minDistance = 1000;
  controls.maxDistance = 5000;

  //window
};
