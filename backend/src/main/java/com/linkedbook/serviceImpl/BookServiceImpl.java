package com.linkedbook.serviceImpl;

import com.linkedbook.configuration.ValidationCheck;
import com.linkedbook.dao.*;
import com.linkedbook.dto.book.search.BookInput;
import com.linkedbook.dto.book.search.BookPopularOutput;
import com.linkedbook.dto.book.search.BookSearchOutput;
import com.linkedbook.dto.common.CommonLikeOutput;
import com.linkedbook.entity.*;
import com.linkedbook.response.Response;
import com.linkedbook.service.BookService;
import com.linkedbook.service.JwtService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.linkedbook.response.ResponseStatus.*;

@Service("BookService")
@AllArgsConstructor
@Slf4j
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final LikeBookRepository likeBookRepository;
    private final PopularCategoryRepository popularCategoryRepository;
    private final PopularCommentRepository popularCommentRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Override
    @Transactional
    public Response<Object> createBookInfo(BookInput bookInput) {
        // 1. 값 형식 체크
        if (bookInput == null) return new Response<>(NO_VALUES);
        if (!ValidationCheck.isValid(bookInput.getIsbn())
                || !ValidationCheck.isValid(bookInput.getTitle())
                || !ValidationCheck.isValidId(bookInput.getPrice())
                || !ValidationCheck.isValid(bookInput.getAuthor())
                || !ValidationCheck.isValidDate(bookInput.getDateTime())
                || !ValidationCheck.isValid(bookInput.getThumbnail())
        )
            return new Response<>(BAD_REQUEST);

        // 2. 책 정보 생성
        BookDB bookDB;
        try {
            String isbn = bookInput.getIsbn();
            BookDB existBook = bookRepository.findById(isbn).orElse(null);
            if (existBook == null) {
                bookDB = BookDB.builder()
                        .id(isbn)
                        .title(bookInput.getTitle())
                        .price(bookInput.getPrice())
                        .author(bookInput.getAuthor())
                        .publisher(bookInput.getPublisher())
                        .contents(bookInput.getContents())
                        .dateTime(bookInput.getDateTime())
                        .image(bookInput.getThumbnail())
                        .status(bookInput.getStatus())
                        .build();
            } else {
                bookDB = existBook;
                existBook.setTitle(bookInput.getTitle());
                existBook.setPrice(bookInput.getPrice());
                existBook.setAuthor(bookInput.getAuthor());
                existBook.setPublisher(bookInput.getPublisher());
                existBook.setContents(bookInput.getContents());
                existBook.setDateTime(bookInput.getDateTime());
                existBook.setImage(bookInput.getThumbnail());
                existBook.setStatus(bookInput.getStatus());
            }

            bookRepository.save(bookDB);

        } catch (Exception e) {
            log.error("[books/post] database error", e);
            return new Response<>(DATABASE_ERROR);
        }
        // 3. 결과 return
        return new Response<>(null, CREATED_BOOK);
    }

    @Override
    public Response<BookSearchOutput> getBookInfo(String isbn) {
        // 1. 값 형식 체크
        if(!ValidationCheck.isValid(isbn)) return new Response<>(NO_VALUES);
        // 2. isbn와 일치하는 책 정보 가져오기
        BookSearchOutput bookSearchOutput;
        try {
            UserDB loginUserDB = userRepository.findById(jwtService.getUserId()).orElse(null);
            BookDB bookDB = bookRepository.findById(isbn).orElse(null);
            if (loginUserDB == null) {
                log.error("[books/get] NOT FOUND USER error");
                return new Response<>(NOT_FOUND_USER);
            }
            if (bookDB == null) {
                log.error("[books/get] NOT FOUND BOOK error");
                return new Response<>(NOT_FOUND_BOOK);
            }
            // 서버에서 클라이언트로 null값을 보내지 않도록 가공
            if (bookDB.getPublisher() == null) bookDB.setPublisher("");
            if (bookDB.getContents() == null) bookDB.setContents("");
            if (bookDB.getStatus() == null) bookDB.setStatus("");

            // 책 한줄평 평균 점수 구하기
            double commentAvgScore = bookDB.getComments().stream()
                    .mapToDouble(CommentDB::getScore).average().orElse(Double.NaN);
            commentAvgScore = Math.round(commentAvgScore * 10) / 10.0; // 소수점 1자리까지 보내도록 가공

            // 로그인된 유저의 관심 책 등록 여부 확인하기
            LikeBookDB likeBookDB = likeBookRepository.findByUserAndBook(loginUserDB, bookDB);

            // 최종 출력값 정리
            bookSearchOutput = BookSearchOutput.builder()
                    .id(bookDB.getId())
                    .title(bookDB.getTitle())
                    .price(bookDB.getPrice())
                    .author(bookDB.getAuthor())
                    .publisher(bookDB.getPublisher())
                    .contents(bookDB.getContents())
                    .dateTime(bookDB.getDateTime())
                    .image(bookDB.getImage())
                    .status(bookDB.getStatus())
                    .popular(
                            BookPopularOutput.builder()
                                    .avgScore(commentAvgScore)
                                    .categories(popularCategoryRepository.findTop3ByBookId(bookDB.getId())) // 가장 많이 언급된 카테고리 3개 구하기
                                    .comments(popularCommentRepository.findTop2ByBookId(bookDB.getId())) // 좋아요 많은 한줄평 2개 구하기
                                    .build()
                    )
                    .like(
                            CommonLikeOutput.builder()
                                    .totalLikeCnt(bookDB.getLikeBooks().size())
                                    .userLike(likeBookDB != null)
                                    .id(likeBookDB == null ? 0 : likeBookDB.getId())
                                    .build()
                    )
                    .build();
        } catch (Exception e) {
            log.error("[books/get] database error", e);
            return new Response<>(DATABASE_ERROR);
        }
        // 3. 결과 return
        return new Response<>(bookSearchOutput, SUCCESS_SELECT_BOOK);
    }
}