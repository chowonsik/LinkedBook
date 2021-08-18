import { useEffect, useState, useRef } from "react";
import { KakaoBook } from "../../../api.js";
import { useHistory } from "react-router-dom";
import { Upc, Search } from "react-bootstrap-icons";
import BookItem from "../../../components/book/BookItem";
import { Wrapper, InputContainer, BookList } from "./styles";
import { request } from "../../../api";
import Footer from "../../../components/Layout/Footer";
import Header from "../../../components/Layout/Header/index.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  setQuery,
  setBookList,
  setScroll,
  doNotRefresh,
  doRefresh,
  setIsLoading,
} from "../../../actions/Books/index.js";

const SearchBook = () => {
  const booksData = useSelector((state) => state.bookReducer.bookList);
  const queryData = useSelector((state) => state.bookReducer.query);
  const scroll = useSelector((state) => state.bookReducer.scroll);
  const needRefresh = useSelector((state) => state.bookReducer.needRefresh);

  const [keyword, setKeyword] = useState("");
  const [books, setBooks] = useState([]);
  const [listHeight, setListHeight] = useState(window.innerHeight - 260);
  let history = useHistory();
  const dispatch = useDispatch();
  const dealListRef = useRef(null);

  useEffect(() => {
    window.addEventListener("resize", getListHeight);
    return () => {
      window.removeEventListener("resize", getListHeight);
    };
  });

  useEffect(() => {
    if (!needRefresh) {
      dealListRef.current.scrollTo(0, scroll);
      setBooks(booksData);
      setKeyword(queryData);
    }
    dispatch(doRefresh());
  }, []);

  function getListHeight() {
    setListHeight(window.innerHeight - 260);
  }

  // text 검색어가 바뀔 때 호출되는 함수.
  const onTextUpdate = (e) => {
    setKeyword(e.target.value);
    getBooksData(e.target.value);
  };

  const getBooksData = async (query = "", page = 1) => {
    if (query.length === 0) return;
    const params = {
      query: query,
      sort: "accuracy",
      page: page,
      size: 10,
    };
    const { data } = await KakaoBook(params);
    if (page === 1) {
      setBooks(data.documents);
    } else {
      const newBookList = books.concat(data.documents);
      setBooks(newBookList);
    }
  };

  const infiniteScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (parseInt(scrollTop) + parseInt(clientHeight) !== parseInt(scrollHeight))
      return;
    dispatch(setScroll(scrollTop));
    if (books && books.length % 10 !== 0) return;
    const page = parseInt(books.length / 10) + 1;
    getBooksData(keyword, page);
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
    await request("post", `/books`, data);
  };

  const handleBookItemClick = async (bookObj) => {
    dispatch(setIsLoading(true));
    await dispatch(setBookList(books));
    saveBookData(bookObj);
    dispatch(setQuery(keyword));
    dispatch(doNotRefresh());
    history.push(`/books/${bookObj.isbn.split(" ")[1]}`);
  };

  return (
    <>
      <Header isLogo isSearch isAlarm />
      <Wrapper>
        <InputContainer>
          <div className="input-container">
            <input
              type="search"
              name="keyword"
              value={keyword || ""}
              placeholder="책이름"
              onChange={onTextUpdate}
            />
            <span className="search-icon">
              <Search />
            </span>
          </div>
          <span className="barcode-icon">
            <Upc />
          </span>
        </InputContainer>

        <BookList
          height={listHeight}
          onScroll={infiniteScroll}
          ref={dealListRef}
        >
          <ul className="book-list">
            {books ? (
              books.map((book, index) => (
                <li key={index} onClick={() => handleBookItemClick(book)}>
                  <BookItem bookObj={book} />
                </li>
              ))
            ) : (
              <span className="book-list-blank">검색어를 입력해주세요</span>
            )}
          </ul>
        </BookList>
      </Wrapper>
      <Footer />
    </>
  );
};

export default SearchBook;
