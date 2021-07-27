import { HashRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import SignIn from "./routes/user/SignIn";
import SignUp from "./routes/user/SignUp";

function App() {
  return (
    <div className="App">
      <SignIn />
      {/* <SignUp /> */}
    </div>
  );
}

export default App;
