import { useHistory } from "react-router";
const useFooter = () => {
  const history = useHistory();

  const onClick = (e) => {
    const LOGIN_USER_ID = JSON.parse(
      window.localStorage.getItem("loginUser")
    )?.id;
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
      history.push("/chat");
    } else if (curActive.classList.contains("profile")) {
      history.push(`/profile/${LOGIN_USER_ID}`);
    }
  };
  return { onClick };
};

export default useFooter;
