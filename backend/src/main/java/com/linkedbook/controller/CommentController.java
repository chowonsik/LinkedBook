package com.linkedbook.controller;

import com.linkedbook.configuration.ValidationCheck;
import com.linkedbook.dto.comment.CommentInput;
import com.linkedbook.dto.comment.CommentSearchOutput;
import com.linkedbook.dto.comment.CommentSearchInput;
import com.linkedbook.response.PageResponse;
import com.linkedbook.response.Response;
import com.linkedbook.service.CommentService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import static com.linkedbook.response.ResponseStatus.*;

@RestController
@RequestMapping("/comments")
@AllArgsConstructor
@Slf4j
public class CommentController {

    private final CommentService commentService;

    /**
     * 한줄평 조회 API
     * [GET] /comments?userId={userId}
     * [GET] /comments?bookId={bookId}
     * @return PageResponse<CommentSearchOutput>
     */
    // Params
    @ResponseBody
    @GetMapping
    public PageResponse<CommentSearchOutput> getCommentList(CommentSearchInput commentSearchInput) {
        if(!ValidationCheck.isValidId(commentSearchInput.getUserId()) && !ValidationCheck.isValid(commentSearchInput.getBookId())) {
            log.info("[GET] /comments?NO_VALID_STATUS");
            return new PageResponse<>(BAD_REQUEST);
        }

        if(ValidationCheck.isValidId(commentSearchInput.getUserId())) {
            log.info("[GET] /comments?userId=" + commentSearchInput.getUserId());
            return commentService.getCommentList(commentSearchInput, true);
        } else {
            log.info("[GET] /comments?bookId=" + commentSearchInput.getBookId());
            return commentService.getCommentList(commentSearchInput, false);
        }
    }

    /**
     * 한줄평 생성 API
     * [POST] /comments
     * @return Response<Object>
     */
    // Body
    @ResponseBody
    @PostMapping
    public Response<Object> createComment(@RequestBody CommentInput commentInput) {
        log.info("[POST] /comments");
        return commentService.createComment(commentInput);
    }

    /**
     * 한줄평 수정 API
     * [PATCH] /comments/{id}
     * @return Response<Object>
     */
    // Body
    @ResponseBody
    @PatchMapping("/{id}")
    public Response<Object> updateComment(@PathVariable("id") int id, @RequestBody CommentInput commentInput) {
        log.info("[PATCH] /comments/" + id);
        return commentService.updateComment(id, commentInput);
    }

    /**
     * 한줄평 삭제 API
     * [DELETE] /comments/{id}
     * @return Response<Object>
     */
    // Path-Variable
    @ResponseBody
    @DeleteMapping("/{id}")
    public Response<Object> deleteComment(@PathVariable("id") int id) {
        log.info("[DELETE] /comments/" + id);
        return commentService.deleteComment(id);
    }
}
