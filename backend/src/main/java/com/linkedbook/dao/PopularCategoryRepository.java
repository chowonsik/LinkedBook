package com.linkedbook.dao;

import com.linkedbook.entity.PopularCategoryView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PopularCategoryRepository extends JpaRepository<PopularCategoryView, Long> {
    List<PopularCategoryView> findTop3ByBookId(String id);
}
