package com.linkedbook.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.DynamicInsert;
import javax.persistence.*;
import java.util.Date;
import java.util.List;

import static javax.persistence.GenerationType.*;

@DynamicInsert
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter @Setter
@Entity
@Table(name = "deal")
public class DealDB {
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

    @OneToMany(mappedBy = "deal")
    private List<DealImageDB> images;

    @Column(name = "title", nullable = false, length = 45)
    private String title;

    @Column(name = "price", nullable = false)
    private int price;

    @Column(name = "quality", nullable = false, length = 45)
    private String quality;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "status", nullable = false, length = 45)
    private String status;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Date created_at;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Date updated_at;
}
