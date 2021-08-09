package com.linkedbook.serviceImpl;

import com.linkedbook.configuration.ValidationCheck;
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

import static com.linkedbook.response.ResponseStatus.*;

@Service("LikeCommentService")
@AllArgsConstructor
@Slf4j
public class LikeCommentServiceImpl implements LikeCommentService {

    private final LikeCommentRepository likeCommentRepository;
    private final JwtService jwtService;

    @Override
    public Response<Object> createLikeComment(LikeCommentInput likeCommentInput) {
        // 1. 값 형식 체크
        if(likeCommentInput == null)  return new Response<>(NO_VALUES);
        if (!ValidationCheck.isValidId(likeCommentInput.getId()))  return new Response<>(BAD_REQUEST);
        // 2. 관심등록된 한줄평 정보 생성
        LikeCommentDB likeCommentDB;
        try {
            int userId = jwtService.getUserId();
            likeCommentDB = LikeCommentDB.builder()
                    .user(new UserDB(userId))
                    .comment(new CommentDB(likeCommentInput.getId()))
                    .build();
            likeCommentRepository.save(likeCommentDB);
        } catch (Exception e) {
            log.error("[like-comments/post] database error", e);
            return new Response<>(DATABASE_ERROR);
        }
        // 3. 결과 return
        return new Response<>(null, CREATED_LIKE_COMMENT);
    }
}
