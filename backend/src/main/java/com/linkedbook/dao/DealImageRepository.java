package com.linkedbook.dao;

import com.linkedbook.dto.deal.selectDealDetail.SelectDealImage;
import com.linkedbook.entity.DealImageDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DealImageRepository extends JpaRepository<DealImageDB, Integer> {
    @Query("select new com.linkedbook.dto.deal.selectDealDetail.SelectDealImage(i.imageurl ,di.orders) from DealImageDB di join di.image i where di.deal.id = ?1")
    List<SelectDealImage> findByDealImages(int dealId);
}
