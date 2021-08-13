import { useEffect, useState } from "react";
import { KakaoBook } from "../../../api.js";
import { useHistory } from "react-router-dom";
import BookItem from "../../../components/book/BookItem";
import { Wrapper } from "./styles";
import { request } from "../../../api";

const SearchBook = () => {
  const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWR4IjoxOSwiaWF0IjoxNTk1NDAyMzU0LCJleHAiOjE2MjY5MzgzNTQsInN1YiI6InVzZXJJbmZvIn0.fzkgrs6wi4KPN2_TwFcvO2ab_dN2Ds46DEqQIvqBAD0";
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  let history = useHistory();

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

  // 카카오 서버로부터 책 데이터 받아 오는 함수
  const getBooksData = async (query, reset) => {
    const params = {
      query: query,
      sort: "accuracy",
      page: parseInt(books.length / 10) + 1,
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
      getBooksData(query, false);
    }
  };
  const saveBookData = async ({
    isbn,
    title,
    price,
    authors,
    publisher,
    contents,
    datetime,
    thumbnail,
    status,
  }) => {
    const data = {
      isbn: isbn.split(" ")[1],
      title,
      price,
      author: authors.join(", "),
      publisher,
      contents,
      dateTime: datetime,
      thumbnail,
      status,
    };

    await request("post", `/books`, data, {
      headers: {
        "X-ACCESS-TOKEN": TOKEN,
      },
    });
  };

  const handleBookItemClick = (bookObj) => {
    saveBookData(bookObj);
    history.push(`/books/${bookObj.isbn.split(" ")[1]}`);
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
          <li key={index} onClick={() => handleBookItemClick(book)}>
            <BookItem bookObj={book} />
          </li>
        ))}
      </ul>
    </Wrapper>
  );
};

export default SearchBook;
