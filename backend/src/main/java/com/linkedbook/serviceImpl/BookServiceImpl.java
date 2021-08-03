package com.linkedbook.serviceImpl;

import com.linkedbook.configuration.ValidationCheck;
import com.linkedbook.dao.BookRepository;
import com.linkedbook.dto.book.search.BookSearchInput;
import com.linkedbook.entity.BookDB;
import com.linkedbook.response.Response;
import com.linkedbook.service.BookService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import static com.linkedbook.response.ResponseStatus.*;

@Service("BookService")
@AllArgsConstructor
@Slf4j
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    @Override
    public Response<Object> createBookInfo(BookSearchInput bookSearchInput) {
        // 1. 값 형식 체크
        if (bookSearchInput == null) return new Response<>(NO_VALUES);
        if (!ValidationCheck.isValid(bookSearchInput.getIsbn())
                || !ValidationCheck.isValid(bookSearchInput.getTitle())
                || !ValidationCheck.isValidId(bookSearchInput.getPrice())
                || !ValidationCheck.isValid(bookSearchInput.getAuthor())
                || !ValidationCheck.isValid(bookSearchInput.getPublisher())
                || !ValidationCheck.isValid(bookSearchInput.getContents())
                || !ValidationCheck.isValidDate(bookSearchInput.getDateTime())
                || !ValidationCheck.isValid(bookSearchInput.getStatus())
        )
            return new Response<>(BAD_REQUEST);

        // 2. 책 정보 생성
        BookDB bookDB;
        try {
            String isbn = bookSearchInput.getIsbn();
            BookDB existBook = bookRepository.findById(isbn).orElse(null);
            if (existBook == null) {
                bookDB = BookDB.builder()
                        .id(isbn)
                        .title(bookSearchInput.getTitle())
                        .price(bookSearchInput.getPrice())
                        .author(bookSearchInput.getAuthor())
                        .publisher(bookSearchInput.getPublisher())
                        .contents(bookSearchInput.getContents())
                        .dateTime(bookSearchInput.getDateTime())
                        .image(bookSearchInput.getThumbnail())
                        .status(bookSearchInput.getStatus())
                        .build();
            } else {
                bookDB = existBook;
                existBook.setTitle(bookSearchInput.getTitle());
                existBook.setPrice(bookSearchInput.getPrice());
                existBook.setAuthor(bookSearchInput.getAuthor());
                existBook.setPublisher(bookSearchInput.getPublisher());
                existBook.setContents(bookSearchInput.getContents());
                existBook.setDateTime(bookSearchInput.getDateTime());
                existBook.setImage(bookSearchInput.getThumbnail());
                existBook.setStatus(bookSearchInput.getStatus());
            }

            bookRepository.save(bookDB);

        } catch (Exception e) {
            log.error("[books/post] database error", e);
            return new Response<>(DATABASE_ERROR);
        }

        // 3. 결과 return
        return new Response<>(null, CREATED_BOOK);
    }
}
