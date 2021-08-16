package com.linkedbook.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.DynamicInsert;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static javax.persistence.GenerationType.*;

@Data
@DynamicInsert
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "comment")
public class CommentDB {
    @Id
    @Column(name = "id", nullable = false, updatable = false)
    @GeneratedValue(strategy = IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserDB user;

    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    private BookDB book;

    @Column(name = "score", nullable = false)
    private double score;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Date created_at;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Date updated_at;

    // 한줄평 관심등록 정보
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "comment", orphanRemoval = true)
    private List<LikeCommentDB> likeComments = new ArrayList<>();

    // 카테고리 정보
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "comment", orphanRemoval = true)
    private List<CommentCategoryDB> categories = new ArrayList<>();
}
