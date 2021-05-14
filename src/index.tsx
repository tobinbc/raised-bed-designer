import React from "react";
import { StyleSheetManager } from "styled-components";
import { ReactCustomElementWithProps } from "web-components-with-react";
import App from "./App";
import { TagName } from "./Contants";
import { getTag } from "./utils";

const Styled = (props) => {
  const dataBeamX = parseInt(props.dataBeamX);
  const dataBeamY = parseInt(props.dataBeamY);
  const pageReady = String(props.dataPageReady) === "true";
  return (
    <StyleSheetManager
      //@ts-ignore
      target={getTag().shadowRoot}
    >
      <App dataBeamX={dataBeamX} dataBeamY={dataBeamY} pageReady={pageReady} />
    </StyleSheetManager>
  );
};

if (!customElements.get(TagName)) {
  customElements.define(
    TagName,
    ReactCustomElementWithProps(Styled, [
      "data-beam-x",
      "data-beam-y",
      "data-page-ready",
    ])
  );
}
