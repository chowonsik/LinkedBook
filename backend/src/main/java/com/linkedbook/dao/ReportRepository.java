package com.linkedbook.dao;

import com.linkedbook.entity.ReportDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<ReportDB, Integer> {
}
