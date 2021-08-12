package com.linkedbook.dao;

import com.linkedbook.dto.likeDeal.selectLikeDeal.SelectLikeDealOutput;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface LikeDealRepositoryCustom {
    Page<SelectLikeDealOutput> findByUserId(int userId, int myId, Pageable pageable);
}
