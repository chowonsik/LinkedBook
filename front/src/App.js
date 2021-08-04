import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import SearchBook from "./pages/book/SearchBook";
import "./App.css";
import BookDetail from "./pages/book/BookDetail";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/books" exact component={SearchBook}></Route>
        <Route path="/books/:isbn" component={BookDetail}></Route>
      </Router>
    </div>
  );
}

export default App;
