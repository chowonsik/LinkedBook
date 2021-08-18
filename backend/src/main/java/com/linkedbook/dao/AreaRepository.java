package com.linkedbook.dao;

import com.linkedbook.dto.area.selectArea.SelectAreaOutput;
import com.linkedbook.entity.AreaDB;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AreaRepository extends JpaRepository<AreaDB, Integer> {
    @Query("select new com.linkedbook.dto.area.selectArea.SelectAreaOutput(a.id, a.dongmyeonri, concat(a.sido, ' ', a.sigungu, ' ', a.dongmyeonri))"
            + " from AreaDB a where concat(a.sido, ' ', a.sigungu, ' ', a.dongmyeonri) like %?1%")
    Page<SelectAreaOutput> findByArea(String search, Pageable pageable);
}
