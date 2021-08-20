package com.linkedbook.service;

import com.linkedbook.dto.book.search.BookInput;
import com.linkedbook.dto.book.search.BookSearchOutput;
import com.linkedbook.response.Response;

public interface BookService {
    Response<Object> createBookInfo(BookInput bookInput);
    Response<BookSearchOutput> getBookInfo(String isbn);
}
