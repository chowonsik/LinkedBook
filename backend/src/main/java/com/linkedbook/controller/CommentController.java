package com.linkedbook.controller;

import com.linkedbook.dto.comment.CommentInput;
import com.linkedbook.response.Response;
import com.linkedbook.service.CommentService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comments")
@AllArgsConstructor
@Slf4j
public class CommentController {

    private final CommentService commentService;

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
}
