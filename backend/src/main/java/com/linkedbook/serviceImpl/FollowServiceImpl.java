package com.linkedbook.serviceImpl;

import com.linkedbook.configuration.ValidationCheck;
import com.linkedbook.dao.FollowRepository;
import com.linkedbook.dao.UserRepository;
import com.linkedbook.dto.alert.AlertStatus;
import com.linkedbook.dto.common.CommonFollowOutput;
import com.linkedbook.dto.common.CommonUserOutput;
import com.linkedbook.dto.follow.*;
import com.linkedbook.entity.AlertDB;
import com.linkedbook.entity.FollowDB;
import com.linkedbook.entity.UserDB;
import com.linkedbook.response.PageResponse;
import com.linkedbook.response.Response;
import com.linkedbook.service.AlertService;
import com.linkedbook.service.FollowService;
import com.linkedbook.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.linkedbook.response.ResponseStatus.*;

@Service("FollowService")
@RequiredArgsConstructor
@Slf4j
public class FollowServiceImpl implements FollowService {

    private final FollowRepository followRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AlertService alertService;

    @Override
    public PageResponse<FollowSearchOutput> getFollowList(String info, FollowSearchInput followSearchInput) {
        // 1. 값 형식 체크
        if(followSearchInput == null)  return new PageResponse<>(NO_VALUES);
        if (info == null || !ValidationCheck.isValidFollowInfo(info))
            return new PageResponse<>(BAD_FOLLOW_INFO_VALUE);
        if (!ValidationCheck.isValidId(followSearchInput.getId()))  return new PageResponse<>(BAD_ID_VALUE);
        if(!ValidationCheck.isValidPage(followSearchInput.getPage())
                || !ValidationCheck.isValidId(followSearchInput.getSize()))  return new PageResponse<>(BAD_REQUEST);
        // 2. follow 유저 정보 가져오기
        Page<FollowSearchOutput> followOutput;
        try {
            int userId = followSearchInput.getId();
            if(!userRepository.existsById(userId)) {
                log.error("[users/get] NOT FOUND TARGET USER error");
                return new PageResponse<>(BAD_ID_VALUE);
            }
            int loginUserId = jwtService.getUserId();
            if(loginUserId < 0) {
                log.error("[users/get] NOT FOUND LOGIN USER error");
                return new PageResponse<>(BAD_ID_VALUE);
            }

            Pageable paging = PageRequest.of(followSearchInput.getPage(), followSearchInput.getSize(), Sort.Direction.DESC, "id");;
            Page<FollowDB> followDBList;
            if (info.equals("follower")) { // 유저의 팔로워 리스트
                followDBList = followRepository.findByToUserIdAndFromUserStatus(userId, "ACTIVATE", paging);
            } else { // 유저의 팔로잉 리스트
                followDBList = followRepository.findByFromUserIdAndToUserStatus(userId, "ACTIVATE", paging);
            }
            // 3. 팔로우 리스트에 필요한 최종 결과 가공
            followOutput = followDBList.map(followDB -> {
                UserDB targetUser = info.equals("follower") ? followDB.getFromUser() : followDB.getToUser();
                FollowDB loginAndTargetDB = followRepository.findByFromUserIdAndToUserId(loginUserId, targetUser.getId());

                return FollowSearchOutput.builder()
                        .id(followDB.getId())
                        .user(CommonUserOutput.builder()
                                .id(targetUser.getId())
                                .email(targetUser.getEmail())
                                .nickname(targetUser.getNickname())
                                .image(targetUser.getImage())
                                .created_at(targetUser.getCreated_at())
                                .updated_at(targetUser.getUpdated_at())
                                .build()
                        )
                        .follow(CommonFollowOutput.builder()
                                .f4f(loginAndTargetDB != null)
                                .id(loginAndTargetDB == null ? 0 : loginAndTargetDB.getId())
                                .build()
                        )
                        .created_at(followDB.getCreated_at())
                        .updated_at(followDB.getUpdated_at())
                        .build();
            });
        } catch (Exception e) {
            log.error("[follow/get] database error", e);
            return new PageResponse<>(DATABASE_ERROR);
        }
        // 4. 결과 return
        return new PageResponse<>(followOutput, SUCCESS_GET_FOLLOW_LIST);
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

            followRepository.save(
                    FollowDB.builder()
                    .toUser(toUser)
                    .fromUser(fromUser)
                    .build());

            // 신규 팔로우 알림(follow_id, to_user_id)
            if(!alertService.checkDuplicateUncheckedAlert(AlertStatus.FOLLOW, null, null, null, fromUser, toUser)) {
                AlertDB alertDB = AlertDB.builder()
                        .type(AlertStatus.FOLLOW)
                        .fromUser(fromUser)
                        .toUser(toUser)
                        .status("UNCHECKED")
                        .build();
                alertService.createAlertInfo(alertDB);
            }
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
            if (existFollowRelation == null
                    || (existFollowRelation.getFromUser().getId() != loginUserId && existFollowRelation.getToUser().getId() != loginUserId)) {
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
