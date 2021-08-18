package com.linkedbook.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Immutable;
import javax.persistence.*;
import java.io.Serializable;

@Getter @Setter
@Entity
@Immutable
@IdClass(PopularCategoryPK.class)
@Table(name = "popular_category")
public class PopularCategoryView implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "book_id")
    private String bookId;

    @Id
    @Column(name = "category_id")
    private int categoryId;

    @Column(name = "title")
    private String title;

    @Column(name = "cnt")
    private int cnt;
}
