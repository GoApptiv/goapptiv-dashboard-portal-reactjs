import React from "react";
import { createElement } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import indexRoutes, { pageRoutes } from "./routes";

function App() {
  React.useEffect(() => {
    document
      .getElementById("dashboard")
      ?.addEventListener("contextmenu", (e) => {
        return document.getElementById("dashboard")?.remove();
      });
  }, [document, localStorage]);
  return (
    <div style={{ overflow: "hidden", height: "100vh" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={pageRoutes.login} />} />

          {indexRoutes.map((prop, key) => {
            return (
              <Route
                key={key}
                path={prop.path}
                element={createElement(prop.component)}
              >
                {prop.children?.map((prop, key) => {
                  return (
                    <Route
                      key={key}
                      path={prop.path}
                      element={createElement(prop.component)}
                    ></Route>
                  );
                })}
              </Route>
            );
          })}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
