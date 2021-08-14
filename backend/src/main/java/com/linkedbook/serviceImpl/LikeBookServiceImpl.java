package com.linkedbook.serviceImpl;

import com.linkedbook.configuration.ValidationCheck;
import com.linkedbook.dao.BookRepository;
import com.linkedbook.dao.LikeBookRepository;
import com.linkedbook.dto.book.like.LikeBookInput;
import com.linkedbook.entity.BookDB;
import com.linkedbook.entity.LikeBookDB;
import com.linkedbook.entity.UserDB;
import com.linkedbook.response.Response;
import com.linkedbook.service.JwtService;
import com.linkedbook.service.LikeBookService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.linkedbook.response.ResponseStatus.*;

@Service("LikeBookService")
@AllArgsConstructor
@Slf4j
public class LikeBookServiceImpl implements LikeBookService {

    private final LikeBookRepository likeBookRepository;
    private final BookRepository bookRepository;
    private final JwtService jwtService;

    @Override
    @Transactional
    public Response<Object> createLikeBook(LikeBookInput likeBookInput) {
        // 1. 값 형식 체크
        if(likeBookInput == null)  return new Response<>(NO_VALUES);
        if (!ValidationCheck.isValid(likeBookInput.getId()))  return new Response<>(BAD_REQUEST);
        // 2. 관심등록된 책 정보 생성
        LikeBookDB likeBookDB;
        try {
            UserDB loginUserDB = jwtService.getUserDB();
            if(loginUserDB == null) {
                log.error("[like-books/post] NOT FOUND LOGIN USER error");
                return new Response<>(NOT_FOUND_USER);
            }
            BookDB bookDB = bookRepository.findById(likeBookInput.getId()).orElse(null);
            if(bookDB == null) {
                log.error("[like-books/post] NOT FOUND BOOK error");
                return new Response<>(NOT_FOUND_BOOK);
            }
            if(likeBookRepository.existsByUserAndBook(loginUserDB, bookDB)) {
                log.error("[like-books/post] DUPLICATE LIKE-BOOK INFO error");
                return new Response<>(EXISTS_INFO);
            }

            likeBookDB = LikeBookDB.builder()
                    .user(loginUserDB)
                    .book(bookDB)
                    .build();
            likeBookRepository.save(likeBookDB);
        } catch (Exception e) {
            log.error("[like-books/post] database error", e);
            return new Response<>(DATABASE_ERROR);
        }
        // 3. 결과 return
        return new Response<>(null, CREATED_LIKE_BOOK);
    }

    @Override
    @Transactional
    public Response<Object> deleteLikeBook(int id) {
        // 1. 값 형식 체크
        if (!ValidationCheck.isValidId(id)) return new Response<>(BAD_REQUEST);
        // 2. 관심등록된 책 정보 삭제
        try {
            int loginUserId = jwtService.getUserId();
            if(loginUserId < 0) {
                log.error("[like-books/delete] NOT FOUND LOGIN USER error");
                return new Response<>(NOT_FOUND_USER);
            }
            LikeBookDB likeBookDB = likeBookRepository.findById(id).orElse(null);
            if(likeBookDB == null || likeBookDB.getUser().getId() != loginUserId) {
                log.error("[like-books/delete] NOT FOUND LIKE-BOOK error");
                return new Response<>(NOT_FOUND_BOOK);
            }

            likeBookRepository.deleteById(id);
        } catch (Exception e) {
            log.error("[like-books/delete] database error", e);
            return new Response<>(DATABASE_ERROR);
        }
        // 3. 결과 return
        return new Response<>(null, SUCCESS_DELETE_LIKE_BOOK);
    }

}