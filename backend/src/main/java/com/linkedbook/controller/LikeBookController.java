package com.linkedbook.controller;

import com.linkedbook.configuration.ValidationCheck;
import com.linkedbook.dto.book.like.LikeBookInput;
import com.linkedbook.dto.book.like.LikeBookSearchInput;
import com.linkedbook.dto.book.like.LikeBookSearchOutput;
import com.linkedbook.response.PageResponse;
import com.linkedbook.response.Response;
import com.linkedbook.service.LikeBookService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import static com.linkedbook.response.ResponseStatus.BAD_REQUEST;

@RestController
@RequestMapping("/like-books")
@AllArgsConstructor
@Slf4j
public class LikeBookController {

    private final LikeBookService likeBookService;

    /**
     * 관심 책 조회 API
     * [GET] /like-books
     * @return PageResponse<LikeCommentSearchOutput>
     */
    // Params
    @ResponseBody
    @GetMapping
    public PageResponse<LikeBookSearchOutput> getLikeBookList(LikeBookSearchInput likeBookSearchInput) {
        if(!ValidationCheck.isValidId(likeBookSearchInput.getUserId()) && !ValidationCheck.isValid(likeBookSearchInput.getBookId())) {
            log.info("[GET] /like-books?NO_VALID_STATUS");
            return new PageResponse<>(BAD_REQUEST);
        }

        if(ValidationCheck.isValidId(likeBookSearchInput.getUserId())) {
            log.info("[GET] /like-books?userId=" + likeBookSearchInput.getUserId());
            return likeBookService.getLikeBookList(likeBookSearchInput, true);
        } else {
            log.info("[GET] /like-books?bookId=" + likeBookSearchInput.getBookId());
            return likeBookService.getLikeBookList(likeBookSearchInput, false);
        }
    }

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
