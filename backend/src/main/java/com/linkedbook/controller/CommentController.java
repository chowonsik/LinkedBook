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
    // Body
    @ResponseBody
    @DeleteMapping("/{id}")
    public Response<Object> deleteComment(@PathVariable("id") int id) {
        log.info("[DELETE] /comments/" + id);
        return commentService.deleteComment(id);
    }
}
