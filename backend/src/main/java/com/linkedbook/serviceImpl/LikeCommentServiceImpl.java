package com.linkedbook.serviceImpl;

import com.linkedbook.configuration.ValidationCheck;
import com.linkedbook.dao.CommentRepository;
import com.linkedbook.dao.LikeCommentRepository;
import com.linkedbook.dto.comment.like.LikeCommentInput;
import com.linkedbook.entity.CommentDB;
import com.linkedbook.entity.LikeCommentDB;
import com.linkedbook.entity.UserDB;
import com.linkedbook.response.Response;
import com.linkedbook.service.JwtService;
import com.linkedbook.service.LikeCommentService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.linkedbook.response.ResponseStatus.*;

@Service("LikeCommentService")
@AllArgsConstructor
@Slf4j
public class LikeCommentServiceImpl implements LikeCommentService {

    private final LikeCommentRepository likeCommentRepository;
    private final CommentRepository commentRepository;
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
}
