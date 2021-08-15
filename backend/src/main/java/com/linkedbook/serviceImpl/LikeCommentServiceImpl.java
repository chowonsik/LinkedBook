package com.linkedbook.serviceImpl;

import com.linkedbook.configuration.ValidationCheck;
import com.linkedbook.dao.CommentRepository;
import com.linkedbook.dao.FollowRepository;
import com.linkedbook.dao.LikeCommentRepository;
import com.linkedbook.dto.comment.like.LikeCommentInput;
import com.linkedbook.dto.comment.like.LikeCommentSearchOutput;
import com.linkedbook.dto.comment.like.LikeCommentSearchInput;
import com.linkedbook.dto.common.CommonFollowOutput;
import com.linkedbook.dto.common.CommonUserOutput;
import com.linkedbook.entity.CommentDB;
import com.linkedbook.entity.FollowDB;
import com.linkedbook.entity.LikeCommentDB;
import com.linkedbook.entity.UserDB;
import com.linkedbook.response.PageResponse;
import com.linkedbook.response.Response;
import com.linkedbook.service.JwtService;
import com.linkedbook.service.LikeCommentService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.linkedbook.response.ResponseStatus.*;

@Service("LikeCommentService")
@AllArgsConstructor
@Slf4j
public class LikeCommentServiceImpl implements LikeCommentService {

    private final LikeCommentRepository likeCommentRepository;
    private final CommentRepository commentRepository;
    private final FollowRepository followRepository;
    private final JwtService jwtService;

    @Override
    @Transactional
    public Response<Object> createLikeComment(LikeCommentInput likeCommentInput) {
        // 1. 값 형식 체크
        if(likeCommentInput == null)  return new Response<>(NO_VALUES);
        if (!ValidationCheck.isValidId(likeCommentInput.getId()))  return new Response<>(BAD_REQUEST);
        // 2. 관심등록된 한줄평 정보 생성
        LikeCommentDB likeCommentDB;
        try {
            UserDB loginUserDB = jwtService.getUserDB();
            if(loginUserDB == null) {
                log.error("[like-comments/post] NOT FOUND LOGIN USER error");
                return new Response<>(NOT_FOUND_USER);
            }
            CommentDB commentDB = commentRepository.findById(likeCommentInput.getId()).orElse(null);
            if(commentDB == null) {
                log.error("[like-comments/post] NOT FOUND COMMENT error");
                return new Response<>(NOT_FOUND_COMMENT);
            }
            if(likeCommentRepository.existsByUserAndComment(loginUserDB, commentDB)) {
                log.error("[like-comments/post] DUPLICATE LIKE-COMMENT INFO error");
                return new Response<>(EXISTS_INFO);
            }

            likeCommentDB = LikeCommentDB.builder()
                    .user(loginUserDB)
                    .comment(commentDB)
                    .build();
            likeCommentRepository.save(likeCommentDB);
        } catch (Exception e) {
            log.error("[like-comments/post] database error", e);
            return new Response<>(DATABASE_ERROR);
        }
        // 3. 결과 return
        return new Response<>(null, CREATED_LIKE_COMMENT);
    }

    @Override
    @Transactional
    public Response<Object> deleteLikeComment(int id) {
        // 1. 값 형식 체크
        if (!ValidationCheck.isValidId(id)) return new Response<>(BAD_REQUEST);
        // 2. 관심등록된 한줄평 정보 삭제
        try {
            int loginUserId = jwtService.getUserId();
            if(loginUserId < 0) {
                log.error("[like-comments/delete] NOT FOUND LOGIN USER error");
                return new Response<>(NOT_FOUND_USER);
            }
            LikeCommentDB likeCommentDB = likeCommentRepository.findById(id).orElse(null);
            if(likeCommentDB == null || likeCommentDB.getUser().getId() != loginUserId) {
                log.error("[like-comments/delete] NOT FOUND LIKE-COMMENT error");
                return new Response<>(NOT_FOUND_COMMENT);
            }

            likeCommentRepository.deleteById(id);
        } catch (Exception e) {
            log.error("[like-comments/delete] database error", e);
            return new Response<>(DATABASE_ERROR);
        }
        // 3. 결과 return
        return new Response<>(null, SUCCESS_DELETE_LIKE_COMMENT);
    }

    @Override
    public PageResponse<LikeCommentSearchOutput> getLikeComment(LikeCommentSearchInput likeCommentSearchInput) {
        // 1. 값 형식 체크
        if(likeCommentSearchInput == null) return new PageResponse<>(NO_VALUES);
        if(!ValidationCheck.isValidId(likeCommentSearchInput.getId())
                || !ValidationCheck.isValidPage(likeCommentSearchInput.getPage())
                || !ValidationCheck.isValidId(likeCommentSearchInput.getSize()))  return new PageResponse<>(BAD_REQUEST);
        // 2. 일치하는 관심 한줄평 정보 가져오기
        Page<LikeCommentSearchOutput> responseList;
        try {
            int loginUserId = jwtService.getUserId();
            if(loginUserId < 0) {
                log.error("[like-comments/get] NOT FOUND LOGIN USER error");
                return new PageResponse<>(NOT_FOUND_USER);
            }
            CommentDB commentDB = commentRepository.findById(likeCommentSearchInput.getId()).orElse(null);
            if(commentDB == null) {
                log.error("[like-comments/get] NOT FOUND COMMENT error");
                return new PageResponse<>(NOT_FOUND_COMMENT);
            }
            // 필요한 정보 가공
            Pageable paging = PageRequest.of(likeCommentSearchInput.getPage(), likeCommentSearchInput.getSize(), Sort.Direction.DESC, "id");
            Page<LikeCommentDB> likeCommentDBList = likeCommentRepository.findByComment(commentDB, paging);
            // 최종 출력값 정리
            responseList = likeCommentDBList.map(likeCommentDB -> {
                UserDB targetUserDB = likeCommentDB.getUser();
                FollowDB loginAndTargetDB = followRepository.findByFromUserIdAndToUserId(loginUserId, targetUserDB.getId());

                return LikeCommentSearchOutput.builder()
                        .id(likeCommentDB.getId())
                        .user(
                                CommonUserOutput.builder()
                                        .id(targetUserDB.getId())
                                        .email(targetUserDB.getEmail())
                                        .nickname(targetUserDB.getNickname())
                                        .image(targetUserDB.getImage())
                                        .created_at(targetUserDB.getCreated_at())
                                        .updated_at(targetUserDB.getUpdated_at())
                                        .build()
                        )
                        .follow(
                                CommonFollowOutput.builder()
                                        .f4f(loginAndTargetDB != null)
                                        .id(loginAndTargetDB == null ? 0 : loginAndTargetDB.getId())
                                        .build()
                        )
                        .created_at(likeCommentDB.getCreated_at())
                        .updated_at(likeCommentDB.getUpdated_at())
                        .build();
            });
        } catch (Exception e) {
            log.error("[comments/get] database error", e);
            return new PageResponse<>(DATABASE_ERROR);
        }
        // 3. 결과 return
        return new PageResponse<>(responseList, SUCCESS_GET_LIKE_COMMENT_LIST);
    }
}
