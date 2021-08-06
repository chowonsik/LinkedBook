package com.linkedbook.serviceImpl;

import com.linkedbook.configuration.ValidationCheck;
import com.linkedbook.dao.BookRepository;
import com.linkedbook.dao.LikeBookRepository;
import com.linkedbook.dto.book.search.BookInfoInput;
import com.linkedbook.dto.book.search.BookSearchOutput;
import com.linkedbook.entity.BookDB;
import com.linkedbook.entity.UserDB;
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
    private final JwtService jwtService;

    @Override
    @Transactional
    public Response<Object> createBookInfo(BookInfoInput bookInfoInput) {
        // 1. 값 형식 체크
        if (bookInfoInput == null) return new Response<>(NO_VALUES);
        if (!ValidationCheck.isValid(bookInfoInput.getIsbn())
                || !ValidationCheck.isValid(bookInfoInput.getTitle())
                || !ValidationCheck.isValidId(bookInfoInput.getPrice())
                || !ValidationCheck.isValid(bookInfoInput.getAuthor())
                || !ValidationCheck.isValidDate(bookInfoInput.getDateTime())
                || !ValidationCheck.isValid(bookInfoInput.getThumbnail())
                || !ValidationCheck.isValid(bookInfoInput.getStatus())
        )
            return new Response<>(BAD_REQUEST);

        // 2. 책 정보 생성
        BookDB bookDB;
        try {
            String isbn = bookInfoInput.getIsbn();
            BookDB existBook = bookRepository.findById(isbn).orElse(null);
            if (existBook == null) {
                bookDB = BookDB.builder()
                        .id(isbn)
                        .title(bookInfoInput.getTitle())
                        .price(bookInfoInput.getPrice())
                        .author(bookInfoInput.getAuthor())
                        .publisher(bookInfoInput.getPublisher())
                        .contents(bookInfoInput.getContents())
                        .dateTime(bookInfoInput.getDateTime())
                        .image(bookInfoInput.getThumbnail())
                        .status(bookInfoInput.getStatus())
                        .build();
            } else {
                bookDB = existBook;
                existBook.setTitle(bookInfoInput.getTitle());
                existBook.setPrice(bookInfoInput.getPrice());
                existBook.setAuthor(bookInfoInput.getAuthor());
                existBook.setPublisher(bookInfoInput.getPublisher());
                existBook.setContents(bookInfoInput.getContents());
                existBook.setDateTime(bookInfoInput.getDateTime());
                existBook.setImage(bookInfoInput.getThumbnail());
                existBook.setStatus(bookInfoInput.getStatus());
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
            BookDB bookDB = bookRepository.findById(isbn).orElse(null);
            if (bookDB == null) {
                return new Response<>(NOT_FOUND_BOOK);
            }
            // 서버에서 클라이언트로 null값을 보내지 않도록 가공
            if(bookDB.getPublisher() == null) bookDB.setPublisher("");
            if(bookDB.getContents() == null) bookDB.setContents("");

            // 로그인된 유저의 관심 책 등록 여부 확인하기
            boolean isUserLikeBook = false;
            UserDB userDB = new UserDB(jwtService.getUserId());
            if(likeBookRepository.existsByUserAndBookAndStatus(userDB, bookDB, "ACTIVATE")) {
                isUserLikeBook = true;
            }
            // 최종 출력값 정리
            bookSearchOutput = BookSearchOutput.builder()
                    .book(bookDB)
                    .userLikeBook(isUserLikeBook)
                    .build();
        } catch (Exception e) {
            log.error("[books/get] database error", e);
            return new Response<>(DATABASE_ERROR);
        }
        // 3. 결과 return
        return new Response<>(bookSearchOutput, SUCCESS_SELECT_BOOK);
    }
}
