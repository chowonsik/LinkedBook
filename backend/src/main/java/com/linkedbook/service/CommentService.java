package com.linkedbook.service;

import com.linkedbook.dto.comment.CommentInput;
import com.linkedbook.response.Response;

public interface CommentService {
    Response<Object> createComment(CommentInput commentInput);
    Response<Object> updateComment(int id, CommentInput commentInput);
    Response<Object> deleteComment(int id);
}
