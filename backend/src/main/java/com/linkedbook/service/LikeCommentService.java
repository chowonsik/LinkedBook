package com.linkedbook.service;

import com.linkedbook.dto.comment.like.LikeCommentInput;
import com.linkedbook.dto.comment.like.LikeCommentSearchOutput;
import com.linkedbook.dto.comment.like.LikeCommentSearchInput;
import com.linkedbook.response.PageResponse;
import com.linkedbook.response.Response;

public interface LikeCommentService {
    Response<Object> createLikeComment(LikeCommentInput likeCommentInput);
    Response<Object> deleteLikeComment(int id);
    PageResponse<LikeCommentSearchOutput> getLikeComment(LikeCommentSearchInput likeCommentSearchInput);
}
