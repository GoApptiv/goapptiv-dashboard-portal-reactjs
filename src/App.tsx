import React from "react";
import { createElement } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import indexRoutes, { pageRoutes } from "./routes";

function App() {
  console.log(localStorage.getItem("otp"));
  React.useEffect(() => {
    document
      .getElementById("dashboard")
      ?.addEventListener("contextmenu", (e) => {
        return document.getElementById("dashboard")?.remove();
      });
  }, [document, localStorage]);
  return (
    <>
      <div>
        {/* <ChangePasswordPage remoteChangePassword={} /> */}
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
    </>
  );
}

export default App;
