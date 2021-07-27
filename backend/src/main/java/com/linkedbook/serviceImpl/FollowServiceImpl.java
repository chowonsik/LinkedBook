package com.linkedbook.serviceImpl;

import com.linkedbook.configuration.ValidationCheck;
import com.linkedbook.dao.FollowRepository;
import com.linkedbook.dto.follow.FollowInput;
import com.linkedbook.dto.follow.FollowOutput;
import com.linkedbook.dto.follow.FollowUser;
import com.linkedbook.entity.FollowDB;
import com.linkedbook.dto.follow.FollowStatus;
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
    private final JwtService jwtService;

    @Override
    public Response<List<FollowOutput>> getFollowList(FollowInput followInput) {
        // 1. 값 형식 체크
        if (followInput == null) return new Response<>(NO_VALUES);
        if (!ValidationCheck.isValidFollowInfo(followInput.getInfo()))
            return new Response<>(BAD_FOLLOW_STATUS_VALUE);

        // 2. follow 유저 정보 가져오기
        List<FollowDB> followDBs;
        String info = followInput.getInfo();
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
        List<FollowOutput> followOutput = new ArrayList<>();

        for (FollowDB db : followDBs) {
            // 팔로우 리스트에 필요한 유저 정보만 가공
            UserDB user;
            if(info.equals("follower")) {
                user = db.getToUser();
            } else {
                user = db.getFromUser();
            }

            if(user.getStatus().equals("DELETED")) // 삭제된 유저는 보여주지 않는다.
                continue;

            FollowUser filteredUser = new FollowUser(
                    user.getId(), user.getEmail(), user.getNickname(), user.getImage(),
                    user.getStatus(), user.getCreated_at(), user.getUpdated_at());

            // 최종 결과 값 완성
            followOutput.add(new FollowOutput(
                    db.getId(), filteredUser, db.getStatus(),
                    db.getCreated_at(), db.getUpdated_at()));
        }

        return new Response<>(followOutput, SUCCESS_GET_FOLLOW_LIST);
    }
}
