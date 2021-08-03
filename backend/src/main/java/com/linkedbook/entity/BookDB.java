package com.linkedbook.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import javax.persistence.*;
import java.util.Date;

@Data
@DynamicInsert
@AllArgsConstructor
@NoArgsConstructor
@Builder
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

    @Column(name = "publisher", nullable = false, length = 45)
    private String publisher;

    @Column(name = "contents", nullable = false, columnDefinition = "TEXT")
    private String contents;

    @Column(name = "datetime", nullable = false, updatable = false)
    private Date dateTime;

    @Column(name = "image", nullable = false, columnDefinition = "TEXT")
    private String image;

    @Column(name = "status", nullable = false, length = 45)
    private String status;
}
