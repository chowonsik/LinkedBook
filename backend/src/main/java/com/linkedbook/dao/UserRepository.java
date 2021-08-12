package com.linkedbook.dao;

import com.linkedbook.dto.user.selectprofile.SelectProfileOutput;
import com.linkedbook.entity.UserDB;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserDB, Integer> {
    List<UserDB> findByEmailAndStatus(String email, String status);

    List<UserDB> findByNicknameAndStatus(String nickname, String status);

    UserDB findByIdAndStatus(int toUserId, String status);

    Page<UserDB> findByStatusAndNicknameContaining(String status, String nickname, Pageable paging);

    @Query(value = "select u.id as userId, u.nickname as nickname, u.info as info, u.image as image, dong.dongmyeonri as dong, ifnull(deal.dealCnt,0) as dealCnt, ifnull(follower.followerCnt,0) as followerCnt, ifnull(following.followingCnt,0) as followingCnt, round(ifnull(manner.mannerScore,0),1) as mannerScore, case when u.id = ?2 then 1 else 0 end as isMine, case when exists(select * from follow f where f.to_user_id = ?2 and f.from_user_id = ?1) then 1 else 0 end as isFollow "
            + "from user u "
            + "inner join(select ua.user_id, a.dongmyeonri from user_area ua join area a on a.id = ua.area_id where ua.order = 1) as dong on dong.user_id = u.id "
            + "left outer join(select user_id, count(id) as dealCnt from deal group by user_id) as deal on deal.user_id = u.id "
            + "left outer join(select from_user_id, count(id) as followerCnt from follow group by from_user_id) as follower on follower.from_user_id = u.id "
            + "left outer join(select to_user_id, count(id) as followingCnt from follow group by to_user_id) as following on following.to_user_id = u.id "
            + "left outer join(select user_id, avg(score) as mannerScore from user_deal group by user_id) as manner on manner.user_id = u.id "
            + "where u.id = ?1", nativeQuery = true)
    SelectProfileOutput findUserProfile(int id, int myId);

    @Query("select u " + "from UserDB u " + "inner join UserAreaDB ua on u.id = ua.user.id "
            + "and u.status = 'ACTIVATE' and ua.orders = 1 " + "where u.id <> ?1 and ua.area.id = ?2")
    Page<UserDB> findAreaStar(int userId, int areaId, Pageable paging);

    Optional<UserDB> findByEmail(String email);
}