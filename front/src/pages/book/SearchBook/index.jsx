import { useEffect, useState } from "react";
import { KakaoBook } from "../../../api";
import { Link } from "react-router-dom";
import BookItem from "../../../components/BookItem";
import { Wrapper } from "./styles";
import axios from "axios";

const SearchBook = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  useEffect(() => {
    if (query.length > 0) {
      getBooksData(query, true);
    }
  }, [query]);
  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll);
    return () => {
      window.removeEventListener("scroll", infiniteScroll);
    };
  });
  // text 검색어가 바뀔 때 호출되는 함수.
  const onTextUpdate = (e) => {
    setQuery(e.target.value);
  };

  const getBooksData = async (query, reset) => {
    const params = {
      query: query,
      sort: "accuracy",
      page: pageNum,
      size: 10,
    };
    const { data } = await KakaoBook(params);
    if (reset) {
      setBooks(data.documents);
    } else {
      setBooks(books.concat(data.documents));
    }
  };

  const infiniteScroll = () => {
    let scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    let scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    let clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight === scrollHeight) {
      setPageNum(pageNum + 1);
      console.log(pageNum);
      getBooksData(query, false);
    }
  };
  const saveBookData = () => {
    axios.post();
  };
  return (
    <Wrapper>
      <input
        type="search"
        name="query"
        value={query}
        placeholder="책이름"
        onChange={onTextUpdate}
      />
      <ul>
        {books.map((book, index) => (
          <li key={index}>
            <Link
              to={{
                pathname: `/books/${book.isbn}`,
                state: book,
              }}
            >
              <BookItem bookObj={book} />
            </Link>
          </li>
        ))}
      </ul>
    </Wrapper>
  );
};

export default SearchBook;
