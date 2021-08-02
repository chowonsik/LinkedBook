package com.linkedbook.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import javax.persistence.*;

import static javax.persistence.GenerationType.*;

@Data
@AllArgsConstructor
@DynamicInsert
@NoArgsConstructor
@Entity
@Table(name = "deal_image")
public class DealImageDB {
    @Id
    @Column(name = "id", nullable = false, updatable = false)
    @GeneratedValue(strategy = IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "deal_id", nullable = false)
    private DealDB deal;

    @ManyToOne
    @JoinColumn(name = "image_id", nullable = false)
    private ImageDB image;

    @Column(name = "order", nullable = false)
    private int order;

    @Column(name = "status", nullable = false, length = 45)
    private String status;
}
