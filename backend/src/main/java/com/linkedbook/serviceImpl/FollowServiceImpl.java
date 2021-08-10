package com.linkedbook.serviceImpl;

import com.linkedbook.configuration.ValidationCheck;
import com.linkedbook.dao.FollowRepository;
import com.linkedbook.dao.UserRepository;
import com.linkedbook.dto.follow.*;
import com.linkedbook.entity.FollowDB;
import com.linkedbook.entity.UserDB;
import com.linkedbook.response.Response;
import com.linkedbook.service.FollowService;
import com.linkedbook.service.JwtService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static com.linkedbook.response.ResponseStatus.*;

@Service("FollowService")
@AllArgsConstructor
@Slf4j
public class FollowServiceImpl implements FollowService {

    private final FollowRepository followRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Override
    public Response<List<FollowOutput>> getFollowList(String info) {
        // 1. 값 형식 체크
        if (info == null) return new Response<>(NO_VALUES);
        if (!ValidationCheck.isValidFollowInfo(info))
            return new Response<>(BAD_FOLLOW_INFO_VALUE);

        List<FollowOutput> followOutput = new ArrayList<>();
        List<FollowDB> followDBs;
        try {
            // 2. follow 유저 정보 가져오기
            int userId = jwtService.getUserId();
            if (info.equals("follower")) { // 유저의 팔로워 불러오기
                followDBs = followRepository.findByToUserId(userId);
            } else { // 팔로잉하는 유저 불러오기
                followDBs = followRepository.findByFromUserId(userId);
            }

            // 3. 팔로우 리스트에 필요한 유저 정보만 가공
            for (FollowDB db : followDBs) {
                UserDB user;
                if (info.equals("follower")) {
                    user = db.getFromUser();
                } else {
                    user = db.getToUser();
                }

                if (user.getStatus().equals("DELETED")) // 삭제된 유저는 보여주지 않는다.
                    continue;

                FollowUser filteredUser = FollowUser.builder()
                        .userId(user.getId())
                        .email(user.getEmail())
                        .nickname(user.getNickname())
                        .image(user.getImage())
                        .status(user.getStatus())
                        .created_at(user.getCreated_at())
                        .updated_at(user.getUpdated_at())
                        .build();

                boolean filteredUserF4F = false; // 맞팔로우 관계 확인
                int fromId, toId;
                if (info.equals("follower")) {
                    fromId = jwtService.getUserId();
                    toId = user.getId();
                } else {
                    fromId = user.getId();
                    toId = jwtService.getUserId();
                }

                boolean findF4FUser = followRepository.existsByFromUserIdAndToUserId(fromId, toId);
                if (!findF4FUser) {
                    filteredUserF4F = true;
                }

                // 최종 결과 값 완성
                followOutput.add(
                        FollowOutput.builder()
                                .followId(db.getId())
                                .user(filteredUser)
                                .f4f(filteredUserF4F)
                                .created_at(db.getCreated_at())
                                .updated_at(db.getUpdated_at())
                                .build()
                );
            }
        } catch (Exception e) {
            log.error("[follow/get] database error", e);
            return new Response<>(DATABASE_ERROR);
        }
        // 4. 결과 return
        return new Response<>(followOutput, SUCCESS_GET_FOLLOW_LIST);
    }

    @Override
    @Transactional
    public Response<Object> createFollowRelation(FollowInput followInput) {
        // 1. 값 형식 체크
        if (followInput == null) return new Response<>(NO_VALUES);
        if (!ValidationCheck.isValidId(followInput.getToUserId())
                || !ValidationCheck.isValidId(followInput.getFromUserId())) return new Response<>(BAD_ID_VALUE);
        if (followInput.getToUserId() == followInput.getFromUserId()) return new Response<>(BAD_ID_VALUE);
        // 2. 팔로우 관계 생성
        try {
            int toUserId = followInput.getToUserId();
            int fromUserId = followInput.getFromUserId();

            UserDB toUser = userRepository.findByIdAndStatus(toUserId, "ACTIVATE");
            UserDB fromUser = userRepository.findByIdAndStatus(fromUserId, "ACTIVATE");
            if (toUser == null || fromUser == null) {
                log.error("[follow/post] NOT FOUND USER exception");
                return new Response<>(BAD_ID_VALUE);
            }

            boolean isExistsFollowRelation = followRepository.existsByFromUserIdAndToUserId(fromUserId, toUserId);
            if (isExistsFollowRelation) {
                log.error("[follow/post] DUPLICATE FOLLOW INFO exception");
                return new Response<>(EXISTS_INFO);
            }

            FollowDB followDB = FollowDB.builder()
                    .toUser(toUser)
                    .fromUser(fromUser)
                    .build();

            followRepository.save(followDB);
        } catch (Exception e) {
            log.error("[follow/post] database error", e);
            return new Response<>(DATABASE_ERROR);
        }
        // 3. 결과 return
        return new Response<>(null, CREATED_FOLLOW);
    }

    @Override
    @Transactional
    public Response<Object> deleteFollowRelation(int id) {
        // 1. 값 형식 체크
        if (!ValidationCheck.isValidId(id)) return new Response<>(BAD_ID_VALUE);
        // 2. 팔로우 관계 삭제
        try {
            int loginUserId = jwtService.getUserId();
            if (loginUserId < 0) {
                log.error("[follow/delete] NOT FOUND USER exception");
                return new Response<>(NOT_FOUND_USER);
            }

            FollowDB existFollowRelation = followRepository.findById(id).orElse(null);
            if (existFollowRelation == null || existFollowRelation.getFromUser().getId() != loginUserId) {
                log.error("[follow/delete] NOT FOUND FOLLOW RELATION exception");
                return new Response<>(NOT_FOUND_FOLLOW);
            }

            followRepository.deleteById(existFollowRelation.getId());
        } catch (Exception e) {
            log.error("[follow/delete] database error", e);
            return new Response<>(DATABASE_ERROR);
        }
        // 3. 결과 return
        return new Response<>(null, SUCCESS_DELETE_FOLLOW);
    }
}
