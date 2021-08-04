package com.linkedbook.serviceImpl;

import com.linkedbook.configuration.ValidationCheck;
import com.linkedbook.dao.FollowRepository;
import com.linkedbook.dao.UserRepository;
import com.linkedbook.dto.follow.*;
import com.linkedbook.entity.FollowDB;
import com.linkedbook.entity.UserDB;
import com.linkedbook.response.Response;
import com.linkedbook.response.ResponseStatus;
import com.linkedbook.service.FollowService;
import com.linkedbook.service.JwtService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static com.linkedbook.response.ResponseStatus.*;

@Service("FollowService")
@AllArgsConstructor
@Slf4j
public class FollowServiceImpl implements FollowService {

    @Autowired
    private final FollowRepository followRepository;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
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
                followDBs = followRepository.findByToUserIdAndStatus(userId, FollowStatus.ACTIVATE);
            } else { // 팔로잉하는 유저 불러오기
                followDBs = followRepository.findByFromUserIdAndStatus(userId, FollowStatus.ACTIVATE);
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

                FollowDB findF4FUser = followRepository.findByFromUserIdAndToUserId(fromId, toId);
                if (findF4FUser != null && findF4FUser.getStatus() == FollowStatus.ACTIVATE) {
                    filteredUserF4F = true;
                }

                // 최종 결과 값 완성
                followOutput.add(
                        FollowOutput.builder()
                                .followId(db.getId())
                                .user(filteredUser)
                                .f4f(filteredUserF4F)
                                .status(db.getStatus())
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
    public Response<Object> changeFollowRelation(FollowInput followInput) {
        // 1. 값 형식 체크
        if (followInput == null) return new Response<>(NO_VALUES);
        if (!ValidationCheck.isValid(followInput.getStatus())) return new Response<>(NO_VALUES);
        if (!ValidationCheck.isValidId(followInput.getToUserId())
                || !ValidationCheck.isValidId(followInput.getFromUserId())) return new Response<>(NO_VALUES);
        if (followInput.getToUserId() == followInput.getFromUserId()) return new Response<>(BAD_ID_VALUE);

        // 2. 팔로우 관계 생성
        ResponseStatus resultStatus = CREATED_FOLLOW;
        try {
            int toUserId = followInput.getToUserId();
            int fromUserId = followInput.getFromUserId();
            FollowStatus followStatus = FollowStatus.valueOf(followInput.getStatus());

            UserDB toUser = userRepository.findById(toUserId).orElse(null);
            UserDB fromUser = userRepository.findById(fromUserId).orElse(null);
            if (toUser == null || fromUser == null) {
                return new Response<>(BAD_ID_VALUE);
            }

            FollowDB followDB;
            FollowDB existRelation = followRepository.findByFromUserIdAndToUserId(fromUserId, toUserId);
            if (existRelation == null) {
                followDB = FollowDB.builder()
                        .toUser(toUser)
                        .fromUser(fromUser)
                        .status(followStatus)
                        .build();
            } else {
                followDB = existRelation;
                followDB.setStatus(followStatus);
                resultStatus = SUCCESS_CHANGE_FOLLOW;
            }

            followRepository.save(followDB);

        } catch (IllegalArgumentException e) {
            log.error("[follow/post] undefined status exception", e);
            return new Response<>(BAD_STATUS_VALUE);
        } catch (Exception e) {
            log.error("[follow/post] database error", e);
            return new Response<>(DATABASE_ERROR);
        }
        // 3. 결과 return
        return new Response<>(null, resultStatus);
    }
}
