package com.linkedbook.controller;

import com.linkedbook.dto.book.search.BookInfoInput;
import com.linkedbook.dto.book.search.BookSearchOutput;
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
     * 책 상세 정보 조회 API
     * @param isbn 검색하고 싶은 책의 isbn
     * @return Response<BookSearchOutput>
     */
    // Params
    @ResponseBody
    @GetMapping("/{isbn}")
    public Response<BookSearchOutput> getBookInfo(@PathVariable("isbn") String isbn) {
        log.info("[GET] /books/" + isbn);
        return bookService.getBookInfo(isbn);
    }

    /**
     * 책 정보 생성 API
     * [POST] /books
     * @return Response<Object>
     */
    // Body
    @ResponseBody
    @PostMapping
    public Response<Object> createBookInfo(@RequestBody BookInfoInput bookInfoInput) {
        log.info("[POST] /books");
        return bookService.createBookInfo(bookInfoInput);
    }
}
