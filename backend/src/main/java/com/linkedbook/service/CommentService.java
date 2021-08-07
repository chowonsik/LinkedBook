package com.linkedbook.service;

import com.linkedbook.dto.comment.CommentInput;
import com.linkedbook.response.Response;

public interface CommentService {
    Response<Object> createComment(CommentInput commentInput);
}
