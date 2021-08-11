package com.linkedbook.controller;

import com.linkedbook.configuration.ValidationCheck;
import com.linkedbook.dto.comment.CommentOutput;
import com.linkedbook.dto.comment.CommentSearchInput;
import com.linkedbook.dto.comment.like.LikeCommentInput;
import com.linkedbook.dto.comment.like.LikeCommentOutput;
import com.linkedbook.dto.comment.like.LikeCommentSearchInput;
import com.linkedbook.response.PageResponse;
import com.linkedbook.response.Response;
import com.linkedbook.service.LikeCommentService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import static com.linkedbook.response.ResponseStatus.BAD_REQUEST;

@RestController
@RequestMapping("/like-comments")
@AllArgsConstructor
@Slf4j
public class LikeCommentController {

    private final LikeCommentService likeCommentService;

    /**
     * 관심 한줄평 조회 API
     * [GET] /like-comments
     * @return PageResponse<LikeCommentOutput>
     */
    // Params
    @ResponseBody
    @GetMapping
    public PageResponse<LikeCommentOutput> getLikeCommentList(LikeCommentSearchInput likeCommentSearchInput) {
        log.info("[GET] /like-comments");
        return likeCommentService.getLikeComment(likeCommentSearchInput);
    }

    /**
     * 관심 한줄평 생성 API
     * [POST] /like-comments
     * @return Response<Object>
     */
    // Body
    @ResponseBody
    @PostMapping
    public Response<Object> createLikeComment(@RequestBody LikeCommentInput likeCommentInput) {
        log.info("[POST] /like-comments");
        return likeCommentService.createLikeComment(likeCommentInput);
    }

    /**
     * 관심 한줄평 삭제 API
     * [DELETE] /like-comments/{id}
     * @return Response<Object>
     */
    // Path-Variable
    @ResponseBody
    @DeleteMapping("/{id}")
    public Response<Object> deleteLikeComment(@PathVariable("id") int id) {
        log.info("[DELETE] /like-comments/" + id);
        return likeCommentService.deleteLikeComment(id);
    }
}
