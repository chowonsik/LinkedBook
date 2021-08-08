package com.linkedbook.service;

import com.linkedbook.dto.comment.CommentInput;
import com.linkedbook.dto.comment.CommentOutput;
import com.linkedbook.dto.comment.CommentSearchInput;
import com.linkedbook.response.Response;

import java.util.List;

public interface CommentService {
    Response<Object> createComment(CommentInput commentInput);
    Response<Object> updateComment(int id, CommentInput commentInput);
    Response<Object> deleteComment(int id);
    Response<List<CommentOutput>> getCommentList(CommentSearchInput commentSearchInput, boolean isUserPage);
}
