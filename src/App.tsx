import React from "react";
import { Route, Link, Routes, useLocation, Location } from "react-router-dom";
import Home from "./components/Home";
import Contact from "./components/Contact";
import About from "./components/About";
import Modal from "./components/Modal";

import "./styles/main.css";

const App: React.FC = () => {
  const location = useLocation();
  const routerState = location.state as unknown as { modal: boolean };

  const [previousLocation, setPreviousLocation] = React.useState<
    Location | undefined
  >(undefined);
  const isModal =
    routerState && routerState.modal && previousLocation !== location;

  React.useEffect(() => {
    if (!(routerState && routerState.modal)) {
      setPreviousLocation(location);
    }

    return () => {
      setPreviousLocation(undefined);
    };
  }, [location, routerState]);

  return (
    <div className="app">
      <div className="menu">
        <Link className="link" to="/">
          Home
        </Link>
        <Link className="link" to="/about">
          About
        </Link>
        <Link className="link" to="/contact">
          Contact
        </Link>
      </div>
      <Routes location={isModal ? previousLocation : location}>
        <Route path="/" element={<Home />} />
        <Route path="/contact/" element={<Contact />} />
        <Route path="/about" element={<About />}>
          <Route
            path="/about/modal/:id"
            element={<Modal isModal={isModal} />}
          />
        </Route>
        <Route path="/modal/:id" element={<Modal isModal={isModal} />} />
        <Route>{"no match"}</Route>
      </Routes>

      {isModal ? (
        <Routes>
          <Route path="/modal/:id" element={<Modal isModal={isModal} />} />
          <Route path="/about/modal/:id" element={<Modal isModal={isModal} />} />
        </Routes>
      ) : null}
    </div>
  );
};

export default App;
