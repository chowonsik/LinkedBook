package com.linkedbook.serviceImpl;

import com.linkedbook.configuration.ValidationCheck;
import com.linkedbook.dao.BookRepository;
import com.linkedbook.dao.FollowRepository;
import com.linkedbook.dao.LikeBookRepository;
import com.linkedbook.dao.UserRepository;
import com.linkedbook.dto.book.like.LikeBookInput;
import com.linkedbook.dto.book.like.LikeBookSearchInput;
import com.linkedbook.dto.book.like.LikeBookSearchOutput;
import com.linkedbook.dto.common.CommonFollowOutput;
import com.linkedbook.dto.common.CommonProfileBookOutput;
import com.linkedbook.dto.common.CommonUserOutput;
import com.linkedbook.entity.*;
import com.linkedbook.response.PageResponse;
import com.linkedbook.response.Response;
import com.linkedbook.service.JwtService;
import com.linkedbook.service.LikeBookService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.linkedbook.response.ResponseStatus.*;

@Service("LikeBookService")
@AllArgsConstructor
@Slf4j
public class LikeBookServiceImpl implements LikeBookService {

    private final LikeBookRepository likeBookRepository;
    private final BookRepository bookRepository;
    private final FollowRepository followRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Override
    @Transactional
    public Response<Object> createLikeBook(LikeBookInput likeBookInput) {
        // 1. 값 형식 체크
        if (likeBookInput == null) return new Response<>(NO_VALUES);
        if (!ValidationCheck.isValid(likeBookInput.getId())) return new Response<>(BAD_REQUEST);
        // 2. 관심등록된 책 정보 생성
        LikeBookDB likeBookDB;
        try {
            UserDB loginUserDB = jwtService.getUserDB();
            if (loginUserDB == null) {
                log.error("[like-books/post] NOT FOUND LOGIN USER error");
                return new Response<>(NOT_FOUND_USER);
            }
            BookDB bookDB = bookRepository.findById(likeBookInput.getId()).orElse(null);
            if (bookDB == null) {
                log.error("[like-books/post] NOT FOUND BOOK error");
                return new Response<>(NOT_FOUND_BOOK);
            }
            if (likeBookRepository.existsByUserAndBook(loginUserDB, bookDB)) {
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
            if (loginUserId < 0) {
                log.error("[like-books/delete] NOT FOUND LOGIN USER error");
                return new Response<>(NOT_FOUND_USER);
            }
            LikeBookDB likeBookDB = likeBookRepository.findById(id).orElse(null);
            if (likeBookDB == null || likeBookDB.getUser().getId() != loginUserId) {
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

    @Override
    public PageResponse<LikeBookSearchOutput> getLikeBookList(LikeBookSearchInput likeBookSearchInput, boolean isUserPage) {
        // 1. 값 형식 체크
        if (likeBookSearchInput == null) return new PageResponse<>(NO_VALUES);
        if (!ValidationCheck.isValidPage(likeBookSearchInput.getPage())
                || !ValidationCheck.isValidId(likeBookSearchInput.getSize())) return new PageResponse<>(BAD_REQUEST);
        // 2. 일치하는 관심 책 정보 가져오기
        Page<LikeBookSearchOutput> responseList;
        try {
            UserDB loginUserDB = jwtService.getUserDB();
            if (loginUserDB == null) {
                log.error("[like-books/get] NOT FOUND LOGIN USER error");
                return new PageResponse<>(NOT_FOUND_USER);
            }
            Pageable paging = PageRequest.of(likeBookSearchInput.getPage(), likeBookSearchInput.getSize(), Sort.Direction.DESC, "id");
            // 필요한 정보 가공
            Page<LikeBookDB> likeBookDBList;
            if (isUserPage) { // 유저 프로필 페이지에서 조회할 때
                UserDB userDB;
                if (loginUserDB.getId() == likeBookSearchInput.getUserId()) {
                    userDB = loginUserDB;
                } else {
                    userDB = userRepository.findById(likeBookSearchInput.getUserId()).orElse(null);
                    if (userDB == null) {
                        log.error("[like-books/get] NOT FOUND USER error");
                        return new PageResponse<>(NOT_FOUND_USER);
                    }
                }
                likeBookDBList = likeBookRepository.findByUser(userDB, paging);
            } else { // 책 상세 페이지에서 조회할 때
                BookDB bookDB = bookRepository.findById(likeBookSearchInput.getBookId()).orElse(null);
                if (bookDB == null) {
                    log.error("[like-books/get] NOT FOUND BOOK error");
                    return new PageResponse<>(NOT_FOUND_BOOK);
                }
                likeBookDBList = likeBookRepository.findByBook(bookDB, paging);
            }
            // 최종 출력값 정리
            responseList = likeBookDBList.map(likeBookDB -> {
                UserDB targetUserDB = likeBookDB.getUser();
                BookDB targetBookDB = likeBookDB.getBook();
                FollowDB loginAndTargetDB = null;
                if(!isUserPage) {
                    loginAndTargetDB = followRepository.findByFromUserIdAndToUserId(loginUserDB.getId(), targetUserDB.getId());
                }

                return LikeBookSearchOutput.builder()
                        .id(likeBookDB.getId())
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
                        .book(
                                CommonProfileBookOutput.builder()
                                        .id(targetBookDB.getId())
                                        .title(targetBookDB.getTitle())
                                        .image(targetBookDB.getImage())
                                        .build()
                        )
                        .created_at(likeBookDB.getCreated_at())
                        .updated_at(likeBookDB.getUpdated_at())
                        .build();
            });
        } catch (Exception e) {
            log.error("[like-books/get] database error", e);
            return new PageResponse<>(DATABASE_ERROR);
        }
        // 3. 결과 return
        return new PageResponse<>(responseList, SUCCESS_GET_LIKE_BOOK_LIST);
    }
}