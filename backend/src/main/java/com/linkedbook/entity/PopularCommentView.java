package com.linkedbook.entity;

import lombok.Data;
import org.hibernate.annotations.Immutable;
import javax.persistence.*;

@Data
@Entity
@Immutable
@Table(name = "popular_comment")
public class PopularCommentView {
    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "book_id")
    private String bookId;

    @Column(name = "score")
    private int score;

    @Column(name = "content")
    private String content;

    @Column(name = "like_cnt")
    private int likeCnt;
}
