package com.linkedbook.serviceImpl;

import com.linkedbook.configuration.ValidationCheck;
import com.linkedbook.dao.BookRepository;
import com.linkedbook.dao.CommentRepository;
import com.linkedbook.dto.comment.CommentInput;
import com.linkedbook.entity.BookDB;
import com.linkedbook.entity.CommentDB;
import com.linkedbook.entity.UserDB;
import com.linkedbook.response.Response;
import com.linkedbook.service.CommentService;
import com.linkedbook.service.JwtService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import static com.linkedbook.response.ResponseStatus.*;

@Service("CommentService")
@AllArgsConstructor
@Slf4j
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final BookRepository bookRepository;
    private final JwtService jwtService;

    @Override
    public Response<Object> createComment(CommentInput commentInput) {
        // 1. 값 형식 체크
        if (commentInput == null) return new Response<>(NO_VALUES);
        if (!ValidationCheck.isValid(commentInput.getIsbn())
                || !ValidationCheck.isValid(commentInput.getContent())
                || !ValidationCheck.isValidScore(commentInput.getScore())
        )
            return new Response<>(BAD_REQUEST);

        // 2. 한줄평 정보 생성
        CommentDB commentDB;
        try {
            int userId = jwtService.getUserId();
            String isbn = commentInput.getIsbn();

            boolean isExistBookDB = bookRepository.existsById(isbn);
            if(!isExistBookDB) {
                return new Response<>(NOT_FOUND_BOOK);
            }

            commentDB = CommentDB.builder()
                    .user(new UserDB(userId))
                    .bookId(isbn)
                    .score(commentInput.getScore())
                    .content(commentInput.getContent())
                    .build();

            commentRepository.save(commentDB);
        } catch (Exception e) {
            log.error("[comments/post] database error", e);
            return new Response<>(DATABASE_ERROR);
        }

        // 3. 결과 return
        return new Response<>(null, CREATED_COMMENT);

    }
}
