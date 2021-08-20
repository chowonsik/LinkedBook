package com.linkedbook.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@DynamicInsert
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter @Setter
@Entity
@Table(name = "book")
public class BookDB {
    @Id
    @Column(name = "id", nullable = false, updatable = false)
    private String id;

    @Column(name = "title", nullable = false, length = 60)
    private String title;

    @Column(name = "price", nullable = false)
    private int price;

    @Column(name = "author", nullable = false, length = 45)
    private String author;

    @Column(name = "publisher", length = 45)
    private String publisher;

    @Column(name = "contents", columnDefinition = "TEXT")
    private String contents;

    @Column(name = "datetime", nullable = false, updatable = false)
    private Date dateTime;

    @Column(name = "image", nullable = false, columnDefinition = "TEXT")
    private String image;

    @Column(name = "status", length = 45)
    private String status;

    // 책 관심등록 정보
    @OneToMany(mappedBy = "book")
    private List<LikeBookDB> likeBooks = new ArrayList<>();

    // 책에 등록된 한줄평 정보
    @OneToMany(mappedBy = "book")
    private List<CommentDB> comments = new ArrayList<>();
}
