package com.linkedbook.serviceImpl;

import com.linkedbook.configuration.ValidationCheck;
import com.linkedbook.dao.FollowRepository;
import com.linkedbook.dao.UserRepository;
import com.linkedbook.dto.follow.*;
import com.linkedbook.dto.user.signup.SignUpOutput;
import com.linkedbook.entity.FollowDB;
import com.linkedbook.entity.UserDB;
import com.linkedbook.response.Response;
import com.linkedbook.service.FollowService;
import com.linkedbook.service.JwtService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.linkedbook.model.Role.EMPLOYEE;
import static com.linkedbook.response.ResponseStatus.*;

@Service("FollowService")
@AllArgsConstructor
public class FollowServiceImpl implements FollowService {

    private final FollowRepository followRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Override
    public Response<List<FollowUserOutput>> getFollowList(String info) {
        // 1. 값 형식 체크
        if (info == null) return new Response<>(NO_VALUES);
        if (!ValidationCheck.isValidFollowInfo(info))
            return new Response<>(BAD_FOLLOW_INFO_VALUE);

        // 2. follow 유저 정보 가져오기
        List<FollowDB> followDBs;
        try {
            int userId = jwtService.getUserId();
            if (info.equals("follower")) {
                followDBs = followRepository.findByFromUserIdAndStatus(userId, FollowStatus.ACTIVATE);
            } else {
                followDBs = followRepository.findByToUserIdAndStatus(userId, FollowStatus.ACTIVATE);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new Response<>(DATABASE_ERROR);
        }

        // 3. 결과 return
        List<FollowUserOutput> followUserOutput = new ArrayList<>();

        for (FollowDB db : followDBs) {
            // 팔로우 리스트에 필요한 유저 정보만 가공
            UserDB user;
            if (info.equals("follower")) {
                user = db.getToUser();
            } else {
                user = db.getFromUser();
            }

            if (user.getStatus().equals("DELETED")) // 삭제된 유저는 보여주지 않는다.
                continue;

            FollowUser filteredUser = new FollowUser(
                    user.getId(), user.getEmail(), user.getNickname(), user.getImage(),
                    user.getStatus(), user.getCreated_at(), user.getUpdated_at());

            // 최종 결과 값 완성
            followUserOutput.add(new FollowUserOutput(
                    db.getId(), filteredUser, db.getStatus(),
                    db.getCreated_at(), db.getUpdated_at()));
        }

        return new Response<>(followUserOutput, SUCCESS_GET_FOLLOW_LIST);
    }

    @Override
    public Response createFollowRelation(FollowInput followInput) {
        // 1. 값 형식 체크
        if (followInput == null) return new Response<>(NO_VALUES);
        if (!ValidationCheck.isValidId(followInput.getFromUserId()) ||
                !ValidationCheck.isValidId(followInput.getToUserId()))
            return new Response<>(BAD_ID_VALUE);
        if (followInput.getFromUserId() == followInput.getToUserId()) return new Response<>(BAD_ID_VALUE);
        if (!ValidationCheck.isValid(followInput.getStatus())) return new Response<>(BAD_STATUS_VALUE);

        // 2. 팔로우 관계 생성
        int to_user_id = followInput.getToUserId();
        int from_user_id = followInput.getFromUserId();

        FollowDB followDB = FollowDB.builder()
                .toUser(new UserDB(to_user_id))
                .fromUser(new UserDB(from_user_id))
                .status(FollowStatus.valueOf(followInput.getStatus()))
                .build();

        try {
            UserDB toUser = userRepository.findById(to_user_id).orElse(null);
            UserDB fromUser = userRepository.findById(from_user_id).orElse(null);
            if (toUser == null || fromUser == null) {
                return new Response<>(BAD_ID_VALUE);
            }
            FollowDB existRelation = followRepository.findByFromUserIdAndToUserId(from_user_id, to_user_id);
            if (existRelation != null) {
                return new Response<>(EXISTS_FOLLOW);
            }

            followRepository.save(followDB);

        } catch (Exception e) {
            return new Response<>(DATABASE_ERROR);
        }

        // 3. 결과 return
        return new Response<>(null, CREATED_FOLLOW);
    }
}
