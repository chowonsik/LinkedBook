package com.linkedbook.dao;

import com.linkedbook.entity.CategoryDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryDB, Integer> {
}
