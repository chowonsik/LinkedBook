package com.linkedbook.service;

import com.linkedbook.dto.book.search.BookInfoInput;
import com.linkedbook.dto.book.search.BookSearchOutput;
import com.linkedbook.response.Response;

public interface BookService {
    Response<Object> createBookInfo(BookInfoInput bookInfoInput);
    Response<BookSearchOutput> getBookInfo(String isbn);
}
