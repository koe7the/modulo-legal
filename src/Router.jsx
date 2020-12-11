import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import View1 from "./views/View1";
import View2 from "./views/View2";
import View3_1 from "./views/View3-1";
import View3_2 from "./views/View3-2";

export const Router = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={View1} />
      <Route exact path="/seguimiento" component={View2} />
      <Route exact path="/refinanciamiento" component={View3_1} />
      <Route exact path="/embargo" component={View3_2} />
    </BrowserRouter>
  );
};
