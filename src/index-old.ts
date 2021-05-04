import { Color } from "three";
import "./styles.scss";
import { Orientation } from "./utils";
const Div = "div";
const Input = "input";
const Span = "span";
const makeDiv = ({
  className,
  colour,
  lengthPercent,
  widthPercent,
}: {
  className: string;
  colour?: CSSStyleDeclaration["color"];
  lengthPercent: number;
  widthPercent: number;
}) => {
  const div = document.createElement(Div);
  div.className = className;
  div.style.width = `${widthPercent}%`;
  div.style.height = `${lengthPercent}%`;
  if (colour) {
    div.style.backgroundColor = colour;
  }

  return div;
};

const makeInput = ({ className, setLongDimension }) => {
  const div = document.createElement(Div);
  div.className = `input ${className}`;

  const plus = document.createElement(Span);
  plus.className = " plus";
  plus.textContent = "⊕";
  div.appendChild(plus);

  const input = document.createElement(Input);
  input.className = "";
  div.appendChild(input);

  const minus = document.createElement(Span);
  minus.className = " minus";
  minus.textContent = "⊖";

  div.appendChild(minus);
  return div;
};

class RaisedBedCalculator extends HTMLElement {
  orientation: Orientation = Orientation.Tall;
  outerWidth: number = 1200;
  outerLength: number = 600;

  widthPercent: number = 50;

  layers = 1;
  constructor() {
    super();
    console.log("RaisedBedDesign constructor");
  }

  setOuterWidth = (value: number) => {
    this.outerWidth = value;
  };
  setOuterLength = (value: number) => {
    this.outerLength = value;
  };

  recalculate = () => {};

  connectedCallback() {
    // const outer = makeDiv({ className: "outer" });
    const top = makeDiv({
      className: "top horizontal piece",
      colour: "red",
      lengthPercent: 60,
      widthPercent: this.widthPercent,
    });
    // const left = makeDiv({ className: "left vertical piece", colour: "green" });
    // const right = makeDiv({
    //   className: "right vertical piece",
    //   colour: "purple",
    // });
    // const bototm = makeDiv({
    //   className: "bottom horizontal piece",
    //   colour: "blue",
    // });
    const inputTop = makeInput({
      className: "horizontal",
      setLongDimension: this.setOuterLength,
    });
    this.appendChild(inputTop);
    this.appendChild(top);
    const inputLeft = makeInput({
      className: "vertical",
      setLongDimension: this.setOuterWidth,
    });
    this.appendChild(inputLeft);
    // this.appendChild(left);
    // this.appendChild(right);
    // this.appendChild(bototm);

    // this.appendChild(outer);
    setTimeout(() => {
      this.widthPercent = 100;
      console.log("this.widthPercent 2", this.widthPercent);
    }, 1000);
    console.log("this.widthPercent", this.widthPercent);
  }
}
customElements.define("raised-bed-design", RaisedBedCalculator);
