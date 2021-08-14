package com.linkedbook.service;

import com.linkedbook.dto.book.like.LikeBookInput;
import com.linkedbook.response.Response;

public interface LikeBookService {
    Response<Object> createLikeBook(LikeBookInput likeBookInput);
    Response<Object> deleteLikeBook(int id);
}
