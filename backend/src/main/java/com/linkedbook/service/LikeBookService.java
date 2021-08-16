package com.linkedbook.service;

import com.linkedbook.dto.book.like.LikeBookInput;
import com.linkedbook.dto.book.like.LikeBookSearchInput;
import com.linkedbook.dto.book.like.LikeBookSearchOutput;
import com.linkedbook.response.PageResponse;
import com.linkedbook.response.Response;

public interface LikeBookService {
    PageResponse<LikeBookSearchOutput> getLikeBookList(LikeBookSearchInput likeBookSearchInput, boolean isUserPage);
    Response<Object> createLikeBook(LikeBookInput likeBookInput);
    Response<Object> deleteLikeBook(int id);
}
