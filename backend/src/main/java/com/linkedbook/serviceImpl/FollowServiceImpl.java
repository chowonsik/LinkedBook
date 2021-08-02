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
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.linkedbook.response.ResponseStatus.*;

@Service("FollowService")
@AllArgsConstructor
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

        // 2. follow 유저 정보 가져오기
        List<FollowDB> followDBs;
        try {
            int userId = jwtService.getUserId();
            if (info.equals("follower")) { // 유저의 팔로워 불러오기
                followDBs = followRepository.findByToUserIdAndStatus(userId, FollowStatus.ACTIVATE);
            } else { // 팔로잉하는 유저 불러오기
                followDBs = followRepository.findByFromUserIdAndStatus(userId, FollowStatus.ACTIVATE);
            }
        } catch (Exception e) {
            return new Response<>(DATABASE_ERROR);
        }

        // 3. 결과 return
        List<FollowOutput> followOutput = new ArrayList<>();

        for (FollowDB db : followDBs) {
            // 팔로우 리스트에 필요한 유저 정보만 가공
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
            try {
                int fromId, toId;
                if (info.equals("follower")) {
                    fromId = jwtService.getUserId();
                    toId = user.getId();
                } else {
                    fromId = user.getId();
                    toId = jwtService.getUserId();
                }

                if(followRepository.findByFromUserIdAndToUserId(fromId, toId) != null) {
                    filteredUserF4F = true;
                }

            } catch(Exception e) {
                return new Response<>(DATABASE_ERROR);
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

        return new Response<>(followOutput, SUCCESS_GET_FOLLOW_LIST);
    }

    @Override
    public Response<Object> createFollowRelation(FollowInput followInput) {
        // 1. 값 형식 체크
        Response<Object> isValid = validateInputValue(followInput, true);
        if (isValid != null) return isValid;

        // 2. 팔로우 관계 생성
        int toUserId = followInput.getToUserId();
        int fromUserId = followInput.getFromUserId();

        FollowDB followDB = FollowDB.builder()
                .toUser(new UserDB(toUserId))
                .fromUser(new UserDB(fromUserId))
                .status(FollowStatus.valueOf(followInput.getStatus()))
                .build();

        try {
            FollowDB existRelation = followRepository.findByFromUserIdAndToUserId(fromUserId, toUserId);
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

    @Override
    public Response<Object> deleteFollowRelation(FollowInput followInput) {
        // 1. 값 형식 체크
        Response<Object> isValid = validateInputValue(followInput, false);
        if (isValid != null) return isValid;

        // 2. 팔로우 관계 상태 값을 ACTIVATE -> DELETED로 변경
        try {
            int toUserId = followInput.getToUserId();
            int fromUserId = followInput.getFromUserId();

            FollowDB followDB = followRepository.findByFromUserIdAndToUserId(fromUserId, toUserId);
            if (followDB == null) {
                return new Response<>(NOT_FOUND_FOLLOW);
            } else {
                followDB.setStatus(FollowStatus.DELETED);
            }

            followRepository.save(followDB); // ACTIVATE->DELETE 로 상태 업데이트

        } catch (Exception e) {
            return new Response<>(DATABASE_ERROR);
        }

        // 3. 결과 return
        return new Response<>(null, SUCCESS_DELETE_FOLLOW);
    }

    private Response<Object> validateInputValue(FollowInput followInput, Boolean isCreatedMethod) {
        if (followInput == null) return new Response<>(NO_VALUES);

        if (!ValidationCheck.isValidId(followInput.getFromUserId()) ||
                !ValidationCheck.isValidId(followInput.getToUserId()))
            return new Response<>(BAD_ID_VALUE);

        if (followInput.getFromUserId() == followInput.getToUserId()) return new Response<>(BAD_ID_VALUE);

        if (isCreatedMethod) {
            if (!ValidationCheck.isValid(followInput.getStatus())) return new Response<>(BAD_STATUS_VALUE);
        }

        // DB 접근 validation
        try {
            int toUserId = followInput.getToUserId();
            int fromUserId = followInput.getFromUserId();

            UserDB toUser = userRepository.findById(toUserId).orElse(null);
            UserDB fromUser = userRepository.findById(fromUserId).orElse(null);

            if (toUser == null || fromUser == null) {
                return new Response<>(BAD_ID_VALUE);
            }
        } catch (Exception e) {
            return new Response<>(DATABASE_ERROR);
        }

        return null;
    }


}
