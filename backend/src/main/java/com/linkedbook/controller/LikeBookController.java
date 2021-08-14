package com.linkedbook.controller;

import com.linkedbook.dto.book.like.LikeBookInput;
import com.linkedbook.response.Response;
import com.linkedbook.service.LikeBookService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/like-books")
@AllArgsConstructor
@Slf4j
public class LikeBookController {

    private final LikeBookService likeBookService;

    /**
     * 관심 책 생성 API
     * [POST] /like-books
     * @return Response<Object>
     */
    // Body
    @ResponseBody
    @PostMapping
    public Response<Object> createLikeBook(@RequestBody LikeBookInput likeBookInput) {
        log.info("[POST] /like-books");
        return likeBookService.createLikeBook(likeBookInput);
    }

    /**
     * 관심 책 삭제 API
     * [DELETE] /like-books/{isbn}
     * @return Response<Object>
     */
    // Path-Variable
    @ResponseBody
    @DeleteMapping("/{id}")
    public Response<Object> deleteLikeBook(@PathVariable("id") int id) {
        log.info("[POST] /like-books/" + id);
        return likeBookService.deleteLikeBook(id);
    }
}
