import React from "react";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import GlobalStyled from "./styles/global";

const App: React.FC = () => (
  <>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
    <GlobalStyled />
  </>
);

export default App;
