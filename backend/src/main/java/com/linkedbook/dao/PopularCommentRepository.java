package com.linkedbook.dao;

import com.linkedbook.entity.PopularCommentView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PopularCommentRepository extends JpaRepository<PopularCommentView, Integer> {
    List<PopularCommentView> findTop2ByBookId(String id);
}
