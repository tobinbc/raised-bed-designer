import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  Object3D,
  PerspectiveCamera,
  Raycaster,
  Scene,
  Vector2,
  WebGLRenderer,
} from "three";
import { createBeam } from "./beam";
import init from "./init";
import "./styles.scss";
import {
  getParent,
  ObjectNameGround,
  onResize,
  Orientation,
  TagName,
  Viewpoint,
} from "./utils";

class RaisedBedCalculator extends HTMLElement {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  ready: boolean;
  orientation: Orientation = Orientation.Tall;
  constructor() {
    super();
    console.log("RaisedBedCalculator constructor");
  }

  addBeam = ({ length = 1000, layer = 0 }) => {
    const beam = createBeam({ orientation: this.orientation, length, layer });
    this.scene.add(beam);
  };
  setViewpoint = (which: Viewpoint) => {
    switch (which) {
      case Viewpoint.Front:
        this.camera.position.z = 15;
    }
  };
  attributeChangedCallback(name, oldValue, newValue) {
    console.log("attributeChangedCallback", name, oldValue, newValue);
    // this.scene.clear();
    switch (name) {
      case "config":
        console.log("config", JSON.parse(oldValue), JSON.parse(newValue));
        this.dispatchEvent(
          new CustomEvent("attributeChanged", {
            detail: { name, oldValue, newValue },
          })
        );
    }
  }
  static get observedAttributes() {
    return ["config"];
  }

  animatomatic = () => {
    requestAnimationFrame(this.animatomatic);

    this.renderer.render(this.scene, this.camera);
  };

  clickedOnBeam = (object: Object3D) => {
    //@ts-ignore
    console.log("intersects", intersects?.[0].object);
    //@ts-ignore
    const material: MeshLambertMaterial = intersects?.[0].object.material;
    material.emissive.setHex(0xff0000);
    // if (intersects?.[0].object) {
    //   attach({ object: intersects?.[0].object });
    // }
  };
  onClick = (event) => {
    event.preventDefault();
    const raycaster = new Raycaster();
    const mouse = new Vector2();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, this.camera);

    var intersects = raycaster.intersectObject(this.scene, true);
    if (
      intersects.length === 1 &&
      intersects[0].object.name === ObjectNameGround
    ) {
      this.clickedOnBeam(undefined);
    } else if (intersects.length) {
      this.clickedOnBeam(intersects[0].object);
    }
  };
  connectedCallback() {
    const { aspect, height, width, parent } = getParent();
    this.scene = new Scene();

    this.camera = new PerspectiveCamera(30, aspect, 0.1, 10000);

    this.renderer = new WebGLRenderer({
      antialias: true,
    });

    this.setViewpoint(Viewpoint.Front);
    init({ scene: this.scene, renderer: this.renderer, camera: this.camera });
    parent.appendChild(this.renderer.domElement);
    this.animatomatic();
    this.addBeam({});
    window.addEventListener("resize", () => {
      onResize(this.renderer, this.camera);
    });
    this.renderer.domElement.addEventListener("click", this.onClick, false);
    this.ready = true;
  }
}
customElements.define(TagName, RaisedBedCalculator);
