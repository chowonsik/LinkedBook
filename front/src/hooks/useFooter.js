import { useState, useEffect } from "react";
import { useHistory } from "react-router";
const useFooter = () => {
  const history = useHistory();
  const onClick = (e) => {
    const beforeActive = document.querySelector("#active");
    const curActive = e.target;
    if (beforeActive) beforeActive.id = "";
    if (curActive.classList.contains("home-btn")) {
      history.push("/");
    } else if (curActive.classList.contains("search-book")) {
      history.push("/books");
    } else if (curActive.classList.contains("new-post")) {
      history.push("/create/deal");
    } else if (curActive.classList.contains("chat")) {
    } else if (curActive.classList.contains("profile")) {
      history.push("/test");
    }
  };
  return { onClick };
};

export default useFooter;
