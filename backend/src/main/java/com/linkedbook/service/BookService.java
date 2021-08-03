package com.linkedbook.service;

import com.linkedbook.dto.book.search.BookSearchInput;
import com.linkedbook.response.Response;

public interface BookService {
    Response<Object> createBookInfo(BookSearchInput bookSearchInput);
}
