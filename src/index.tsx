import App from "./App";
import Frame, { FrameContextConsumer } from "react-frame-component";
import { StyleSheetManager } from "styled-components";

import { ReactCustomElement } from "web-components-with-react";
import React, { ReactNode } from "react";
const TagName = "raised-bed-design";

const Styled = () => {
  const root = document.getElementsByTagName("raised-bed-design")[0];
  return (
    <StyleSheetManager
      //@ts-ignore
      target={root.shadowRoot}
    >
      <App />
    </StyleSheetManager>
  );
};

if (!customElements.get(TagName)) {
  customElements.define(TagName, ReactCustomElement(Styled));
}
