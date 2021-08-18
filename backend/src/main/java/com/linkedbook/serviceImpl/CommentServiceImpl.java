package com.linkedbook.serviceImpl;

import com.linkedbook.configuration.ValidationCheck;
import com.linkedbook.dao.*;
import com.linkedbook.dto.comment.*;
import com.linkedbook.dto.common.*;
import com.linkedbook.entity.*;
import com.linkedbook.response.PageResponse;
import com.linkedbook.response.Response;
import com.linkedbook.service.CommentService;
import com.linkedbook.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.linkedbook.response.ResponseStatus.*;

@Service("CommentService")
@RequiredArgsConstructor
@Slf4j
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final CategoryRepository categoryRepository;
    private final CommentCategoryRepository commentCategoryRepository;
    private final LikeCommentRepository likeCommentRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final JwtService jwtService;

    @Override
    @Transactional
    public Response<Object> createComment(CommentInput commentInput) {
        // 1. 값 형식 체크
        if (commentInput == null) return new Response<>(NO_VALUES);
        if (!ValidationCheck.isValid(commentInput.getIsbn())
                || !ValidationCheck.isValid(commentInput.getContent())
                || !ValidationCheck.isValidScore(commentInput.getScore())
                || !ValidationCheck.isValidCategoryArray(commentInput.getCategories())
        )
            return new Response<>(BAD_REQUEST);
        // 2. 한줄평 정보 생성
        CommentDB commentDB;
        try {
            UserDB loginUserDB = jwtService.getUserDB();
            if (loginUserDB == null) {
                log.error("[comments/post] NOT FOUND LOGIN USER error");
                return new Response<>(NOT_FOUND_USER);
            }
            BookDB bookDB = bookRepository.findById(commentInput.getIsbn()).orElse(null);
            if (bookDB == null) {
                log.error("[comments/post] NOT FOUND BOOK error");
                return new Response<>(NOT_FOUND_BOOK);
            }
            // 한줄평 저장
            commentDB = CommentDB.builder()
                    .user(loginUserDB)
                    .book(bookDB)
                    .score(commentInput.getScore())
                    .content(commentInput.getContent())
                    .build();
            // 카테고리 저장
            List<CommentCategoryDB> commentCategoryDBList = new ArrayList<>();
            for (int categoryId : commentInput.getCategories()) {
                CategoryDB categoryDB = categoryRepository.findById(categoryId).orElse(null);
                if (categoryId < 1 || categoryId > 23 || categoryDB == null) {
                    log.error("[comments/post] NOT FOUND CATEGORY error");
                    return new Response<>(NOT_FOUND_CATEGORY);
                }
                commentCategoryDBList.add(
                        CommentCategoryDB.builder()
                                .comment(commentDB)
                                .book(bookDB)
                                .category(categoryDB)
                                .build()
                );
            }
            commentRepository.save(commentDB);
            commentCategoryRepository.saveAll(commentCategoryDBList);
        } catch (Exception e) {
            log.error("[comments/post] database error", e);
            return new Response<>(DATABASE_ERROR);
        }
        // 3. 결과 return
        return new Response<>(null, CREATED_COMMENT);
    }

    @Override
    @Transactional
    public Response<Object> updateComment(int id, CommentInput commentInput) {
        // 1. 값 형식 체크
        if (commentInput == null) return new Response<>(NO_VALUES);
        if (!ValidationCheck.isValidId(id)
                || !ValidationCheck.isValid(commentInput.getContent())
                || !ValidationCheck.isValidScore(commentInput.getScore())
                || !ValidationCheck.isValidCategoryArray(commentInput.getCategories())
        )
            return new Response<>(BAD_REQUEST);
        // 2. 한줄평 정보 수정
        CommentDB commentDB;
        try {
            UserDB loginUserDB = jwtService.getUserDB();
            if (loginUserDB == null) {
                log.error("[comments/patch] NOT FOUND LOGIN USER error");
                return new Response<>(NOT_FOUND_USER);
            }
            commentDB = commentRepository.findById(id).orElse(null);
            if (commentDB == null || commentDB.getUser().getId() != loginUserDB.getId()) {
                log.error("[comments/patch] NOT FOUND COMMENT error");
                return new Response<>(NOT_FOUND_COMMENT);
            }
            List<CommentCategoryDB> commentCategoryDBList = commentDB.getCategories(); // 기존 카테고리 정보
            int idx = 0, size = commentCategoryDBList.size();
            for (int categoryId : commentInput.getCategories()) {
                CategoryDB categoryDB = categoryRepository.findById(categoryId).orElse(null);
                if (categoryId < 1 || categoryId > 23 || categoryDB == null) { // DB에 카테고리 존재 여부 체크
                    log.error("[comments/patch] NOT FOUND CATEGORY error");
                    return new Response<>(NOT_FOUND_CATEGORY);
                }
                if (idx < size) { // 기존 정보에서 카테고리 정보만 수정
                    commentCategoryDBList.get(idx++).setCategory(categoryDB);
                } else { // 새로운 카테고리 생성
                    commentCategoryDBList.add(
                            CommentCategoryDB.builder()
                                    .comment(commentDB)
                                    .book(commentDB.getBook())
                                    .category(categoryDB)
                                    .build()
                    );
                }
            }
            commentDB.setScore(commentInput.getScore());
            commentDB.setContent(commentInput.getContent());

            commentRepository.save(commentDB);
            for (int i = idx; i < size; i++) { // 삭제될 카테고리가 있으면 삭제
                commentCategoryRepository.delete(commentCategoryDBList.get(idx));
                commentCategoryDBList.remove(idx);
            }
            commentCategoryRepository.saveAll(commentCategoryDBList);
        } catch (Exception e) {
            log.error("[comments/patch] database error", e);
            return new Response<>(DATABASE_ERROR);
        }
        // 3. 결과 return
        return new Response<>(null, SUCCESS_CHANGE_COMMENT);
    }

    @Override
    @Transactional
    public Response<Object> deleteComment(int id) {
        // 1. 값 형식 체크
        if (!ValidationCheck.isValidId(id)) return new Response<>(BAD_REQUEST);
        // 2. 한줄평 정보 삭제
        try {
            int loginUserId = jwtService.getUserId();
            if (loginUserId < 0) {
                log.error("[comments/delete] NOT FOUND LOGIN USER error");
                return new Response<>(NOT_FOUND_USER);
            }
            CommentDB commentDB = commentRepository.findById(id).orElse(null);
            if (commentDB == null || commentDB.getUser().getId() != loginUserId) {
                log.error("[comments/delete] NOT FOUND COMMENT error");
                return new Response<>(NOT_FOUND_COMMENT);
            }

            commentRepository.deleteById(id);
        } catch (Exception e) {
            log.error("[comments/delete] database error", e);
            return new Response<>(DATABASE_ERROR);
        }
        // 3. 결과 return
        return new Response<>(null, SUCCESS_DELETE_COMMENT);
    }

    @Override
    public PageResponse<CommentSearchOutput> getCommentList(CommentSearchInput commentSearchInput, boolean isUserPage) {
        // 1. 값 형식 체크
        if (commentSearchInput == null) return new PageResponse<>(NO_VALUES);
        if (!ValidationCheck.isValidPage(commentSearchInput.getPage())
                || !ValidationCheck.isValidId(commentSearchInput.getSize())) return new PageResponse<>(BAD_REQUEST);
        // 2. 일치하는 한줄평 정보 가져오기
        Page<CommentSearchOutput> responseList;
        try {
            UserDB loginUserDB = jwtService.getUserDB();
            if (loginUserDB == null) {
                log.error("[comments/get] NOT FOUND LOGIN USER error");
                return new PageResponse<>(NOT_FOUND_USER);
            }
            Pageable paging = PageRequest.of(commentSearchInput.getPage(), commentSearchInput.getSize(), Sort.Direction.DESC, "id");
            // 필요한 정보 가공
            Page<CommentDB> commentDBList;
            if (isUserPage) { // 유저 프로필 페이지에서 조회할 때
                UserDB userDB;
                if (loginUserDB.getId() == commentSearchInput.getUserId()) {
                    userDB = loginUserDB;
                } else {
                    userDB = userRepository.findById(commentSearchInput.getUserId()).orElse(null);
                    if (userDB == null) {
                        log.error("[comments/get] NOT FOUND USER error");
                        return new PageResponse<>(NOT_FOUND_USER);
                    }
                }
                commentDBList = commentRepository.findByUser(userDB, paging);
            } else { // 책 상세 페이지에서 조회할 때
                BookDB bookDB = bookRepository.findById(commentSearchInput.getBookId()).orElse(null);
                if (bookDB == null) {
                    log.error("[comments/get] NOT FOUND BOOK error");
                    return new PageResponse<>(NOT_FOUND_BOOK);
                }
                commentDBList = commentRepository.findByBook(bookDB, paging);
            }
            // 최종 출력값 정리
            responseList = commentDBList.map(commentDB -> {
                LikeCommentDB likeCommentDB = likeCommentRepository.findByUserAndComment(loginUserDB, commentDB);
                UserDB targetUserDB = commentDB.getUser();
                BookDB targetBookDB = commentDB.getBook();

                return CommentSearchOutput.builder()
                        .comment(CommonCommentOutput.builder()
                                .id(commentDB.getId())
                                .score(commentDB.getScore())
                                .content(commentDB.getContent())
                                .categories(
                                        commentDB.getCategories().stream().map(
                                                categoryDB -> CommonCategoryOutput.builder()
                                                        .id(categoryDB.getCategory().getId())
                                                        .title(categoryDB.getCategory().getTitle()).build()
                                        ).collect(Collectors.toList())
                                )
                                .created_at(commentDB.getCreated_at())
                                .updated_at(commentDB.getUpdated_at())
                                .build())
                        .like(CommonLikeOutput.builder()
                                .totalLikeCnt(commentDB.getLikeComments().size())
                                .userLike(likeCommentDB != null)
                                .id(likeCommentDB == null ? 0 : likeCommentDB.getId())
                                .build())
                        .user(CommonUserOutput.builder()
                                .id(targetUserDB.getId())
                                .email(targetUserDB.getEmail())
                                .nickname(targetUserDB.getNickname())
                                .image(targetUserDB.getImage())
                                .created_at(targetUserDB.getCreated_at())
                                .updated_at(targetUserDB.getUpdated_at())
                                .build())
                        .book(CommonProfileBookOutput.builder()
                                .id(targetBookDB.getId())
                                .title(targetBookDB.getTitle())
                                .image(targetBookDB.getImage())
                                .build())
                        .build();
            });
        } catch (Exception e) {
            log.error("[comments/get] database error", e);
            return new PageResponse<>(DATABASE_ERROR);
        }
        // 3. 결과 return
        return new PageResponse<>(responseList, SUCCESS_GET_COMMENT_LIST);
    }
}