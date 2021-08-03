package com.linkedbook.controller;

import com.linkedbook.dto.book.search.BookSearchInput;
import com.linkedbook.response.Response;
import com.linkedbook.service.BookService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/books")
@AllArgsConstructor
@Slf4j
public class BookController {

    private final BookService bookService;

    /**
     * 책 정보 생성 API
     * [POST] /books
     * @return Response<Object>
     */
    // Body
    @ResponseBody
    @PostMapping
    public Response<Object> createBookInfo(@RequestBody BookSearchInput bookSearchInput) {
        log.info("[POST] /books");
        return bookService.createBookInfo(bookSearchInput);
    }
}
