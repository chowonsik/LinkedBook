package com.linkedbook.serviceImpl;

import com.linkedbook.configuration.ValidationCheck;
import com.linkedbook.dao.BookRepository;
import com.linkedbook.dao.CommentRepository;
import com.linkedbook.dao.LikeCommentRepository;
import com.linkedbook.dto.comment.*;
import com.linkedbook.entity.BookDB;
import com.linkedbook.entity.CommentDB;
import com.linkedbook.entity.UserDB;
import com.linkedbook.response.Response;
import com.linkedbook.service.CommentService;
import com.linkedbook.service.JwtService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.linkedbook.response.ResponseStatus.*;

@Service("CommentService")
@AllArgsConstructor
@Slf4j
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final LikeCommentRepository likeCommentRepository;
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
            if (!isExistBookDB) {
                return new Response<>(NOT_FOUND_BOOK);
            }

            commentDB = CommentDB.builder()
                    .user(new UserDB(userId))
                    .book(new BookDB(isbn))
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

    @Override
    public Response<Object> updateComment(int id, CommentInput commentInput) {
        // 1. 값 형식 체크
        if (commentInput == null) return new Response<>(NO_VALUES);
        if (!ValidationCheck.isValidId(id)
                || !ValidationCheck.isValid(commentInput.getContent())
                || !ValidationCheck.isValidScore(commentInput.getScore())
        )
            return new Response<>(BAD_REQUEST);
        // 2. 한줄평 정보 수정
        CommentDB commentDB;
        try {
            commentDB = commentRepository.findById(id).orElse(null);
            if (commentDB == null) {
                return new Response<>(NOT_FOUND_COMMENT);
            }
            commentDB.setScore(commentInput.getScore());
            commentDB.setContent(commentInput.getContent());

            commentRepository.save(commentDB);
        } catch (Exception e) {
            log.error("[comments/patch] database error", e);
            return new Response<>(DATABASE_ERROR);
        }
        // 3. 결과 return
        return new Response<>(null, SUCCESS_CHANGE_COMMENT);
    }

    @Override
    public Response<Object> deleteComment(int id) {
        // 1. 값 형식 체크
        if (!ValidationCheck.isValidId(id)) return new Response<>(BAD_REQUEST);
        // 2. 한줄평 정보 삭제
        try {
            commentRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            log.error("[comments/delete] not found entity error", e);
            return new Response<>(NOT_FOUND_COMMENT);
        } catch (Exception e) {
            log.error("[comments/delete] database error", e);
            return new Response<>(DATABASE_ERROR);
        }
        // 3. 결과 return
        return new Response<>(null, SUCCESS_DELETE_COMMENT);
    }

    @Override
    public Response<CommentOutput> getCommentListByUser(CommentSearchInput commentSearchInput) {
        // 1. 값 형식 체크
        if(!ValidationCheck.isValidPage(commentSearchInput.getPage())
                || !ValidationCheck.isValidId(commentSearchInput.getSize()))  return new Response<>(BAD_REQUEST);
        // 2. 일치하는 한줄평 정보 가져오기
        CommentOutput response;
        try {
            Pageable paging = PageRequest.of(commentSearchInput.getPage(), commentSearchInput.getSize(), Sort.Direction.DESC, "id");
            UserDB findUserDB = new UserDB(commentSearchInput.getUserId());

            // 필요한 정보 가공
            List<CommentByUserOutput> searchByUserList = new ArrayList<>();
            List<CommentDB> commentDBList = commentRepository.findByUser(findUserDB, paging);

            for (CommentDB commentDB : commentDBList) {
                BookDB commentBookDB = commentDB.getBook();
                boolean isUserLikeComment = likeCommentRepository.existsByUserAndComment(findUserDB, commentDB);
                searchByUserList.add(
                        CommentByUserOutput.builder()
                                .commentId(commentDB.getId())
                                .score(commentDB.getScore())
                                .content(commentDB.getContent())
                                .created_at(commentDB.getCreated_at())
                                .updated_at(commentDB.getUpdated_at())
                                .bookId(commentBookDB.getId())
                                .bookTitle(commentBookDB.getTitle())
                                .bookImage(commentBookDB.getImage())
                                .likeCnt(commentDB.getLikeCnt())
                                .userLikeComment(isUserLikeComment)
                                .build()
                );
            }

            // 최종 출력값 정리
            response = CommentOutput.builder()
                    .searchByUserList(searchByUserList)
                    .build();
        } catch (Exception e) {
            log.error("[users?userId/get] database error", e);
            return new Response<>(DATABASE_ERROR);
        }
        // 3. 결과 return
        return new Response<>(response, SUCCESS_GET_COMMENT_LIST);
    }

    @Override
    public Response<CommentOutput> getCommentListByBook(CommentSearchInput commentSearchInput) {
        // 1. 값 형식 체크
        if(!ValidationCheck.isValidPage(commentSearchInput.getPage())
                || !ValidationCheck.isValidId(commentSearchInput.getSize()))  return new Response<>(BAD_REQUEST);
        // 2. 일치하는 한줄평 정보 가져오기
        CommentOutput response;
        try {
            Pageable paging = PageRequest.of(commentSearchInput.getPage(), commentSearchInput.getSize(), Sort.Direction.DESC, "id");
            BookDB findBookDB = new BookDB(commentSearchInput.getBookId());

            // 필요한 정보 가공
            List<CommentByBookOutput> searchByBookList = new ArrayList<>();
            List<CommentDB> commentDBList = commentRepository.findByBook(findBookDB, paging);

            for (CommentDB commentDB : commentDBList) {
                UserDB commentUserDB = commentDB.getUser();
                boolean isUserLikeComment = likeCommentRepository.existsByUserAndComment(commentUserDB, commentDB);
                searchByBookList.add(
                        CommentByBookOutput.builder()
                                .commentId(commentDB.getId())
                                .score(commentDB.getScore())
                                .content(commentDB.getContent())
                                .created_at(commentDB.getCreated_at())
                                .updated_at(commentDB.getUpdated_at())
                                .userId(commentUserDB.getId())
                                .nickname(commentUserDB.getNickname())
                                .image(commentUserDB.getImage())
                                .likeCnt(commentDB.getLikeCnt())
                                .userLikeComment(isUserLikeComment)
                                .build()
                );
            }

            // 책의 한줄평 평균 점수 구하기
            double bookScoreAvg = commentRepository.findByBook(findBookDB).stream()
                    .mapToDouble(CommentDB::getScore).average().orElse(Double.NaN);

            // 최종 출력값 정리
            response = CommentOutput.builder()
                    .searchByBookList(searchByBookList)
                    .bookScoreAvg(bookScoreAvg)
                    .build();
        } catch (Exception e) {
            log.error("[users?bookId/get] database error", e);
            return new Response<>(DATABASE_ERROR);
        }
        // 3. 결과 return
        return new Response<>(response, SUCCESS_GET_COMMENT_LIST);
    }
}
