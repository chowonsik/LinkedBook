package com.linkedbook.controller;

import com.linkedbook.dto.comment.like.LikeCommentInput;
import com.linkedbook.response.Response;
import com.linkedbook.service.LikeCommentService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/like-comments")
@AllArgsConstructor
@Slf4j
public class LikeCommentController {

    private final LikeCommentService likeCommentService;

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
}
