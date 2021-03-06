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
    Optional<UserDB> findByEmail(String email);

    List<UserDB> findByEmailAndStatus(String email, String status);
    boolean existsByEmailAndStatus(String email, String status);

    boolean existsByNicknameAndStatus(String nickname, String status);

    UserDB findByIdAndStatus(int toUserId, String status);

    Page<UserDB> findByStatusAndNicknameContaining(String status, String nickname, Pageable paging);

    @Query(value = "select u.id as userId, u.nickname as nickname, u.info as info, u.image as image, dong.dongmyeonri as dong, ifnull(deal.dealCnt,0) as dealCnt, ifnull(follower.followerCnt,0) as followerCnt, ifnull(following.followingCnt,0) as followingCnt, round(ifnull(manner.mannerScore,0),1) as mannerScore, case when u.id = ?2 then 1 else 0 end as isMine, " +
            "case when exists(select * from follow f where f.to_user_id = ?1 and f.from_user_id = ?2) then (select f.id from follow f where f.to_user_id = ?1 and f.from_user_id = ?2) else 0 end as isFollow "
            + "from user u "
            + "inner join(select ua.user_id, a.dongmyeonri from user_area ua join area a on a.id = ua.area_id where ua.orders = 1) as dong on dong.user_id = u.id "
            + "left outer join(select user_id, count(id) as dealCnt from deal where status = 'ACTIVATE' group by user_id) as deal on deal.user_id = u.id "
            + "left outer join(select f.from_user_id, count(f.id) as followingCnt from follow f join user u on f.to_user_id = u.id where u.status = 'ACTIVATE' group by from_user_id) as following on following.from_user_id = u.id "
            + "left outer join(select f.to_user_id, count(f.id) as followerCnt from follow f join user u on f.from_user_id = u.id where u.status = 'ACTIVATE' group by to_user_id) as follower on follower.to_user_id = u.id "
            + "left outer join(select user_id, avg(score) as mannerScore from user_deal group by user_id) as manner on manner.user_id = u.id "
            + "where u.id = ?1", nativeQuery = true)
    SelectProfileOutput findUserProfile(int id, int myId);

    @Query(value = "select u.id as id, u.email as email, u.password as password, u.nickname as nickname, u.info as info, u.image as image," +
            " u.oauth as oauth, u.oauth_id as oauth_id, u.status as status, u.created_at as created_at, u.updated_at as updated_at" +
            " from user u" +
            " left outer join(select user_id, count(1) as deal_cnt from deal where deal.status <> 'DELETED' group by user_id) as d on d.user_id = u.id" +
            " inner join user_area ua on u.id = ua.user_id and u.status = 'ACTIVATE' and ua.orders = 1" +
            " where u.id <> ?1 and ua.area_id = ?2" +
            " order by d.deal_cnt DESC",
            countQuery = "select count(1) from user u" +
                    " left outer join(select user_id, count(1) as deal_cnt from deal where deal.status <> 'DELETED' group by user_id) as d on d.user_id = u.id" +
                    " inner join user_area ua on u.id = ua.user_id and u.status = 'ACTIVATE' and ua.orders = 1" +
                    " where u.id <> ?1 and ua.area_id = ?2",
            nativeQuery = true)
    Page<UserDB> findAreaStar(int userId, int areaId, Pageable paging);
}