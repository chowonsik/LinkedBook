import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact={true} component={Home} />
      </Router>
    </div>
  );
}

export default App;
