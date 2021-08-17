package com.linkedbook.dao;

import com.linkedbook.dto.userArea.selectUserArea.SelectUserAreaOutput;
import com.linkedbook.entity.UserAreaDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserAreaRepository extends JpaRepository<UserAreaDB, Integer> {
    Optional<UserAreaDB> findByUserIdAndOrders(int userId, int orders);

    @Query("select new com.linkedbook.dto.userArea.selectUserArea.SelectUserAreaOutput(a.id, ua.orders, a.dongmyeonri)"
            + " from UserAreaDB ua join AreaDB a on ua.area.id = a.id where ua.user.id = ?1 order by ua.orders")
    List<SelectUserAreaOutput> findByUserId(int userId);
}
