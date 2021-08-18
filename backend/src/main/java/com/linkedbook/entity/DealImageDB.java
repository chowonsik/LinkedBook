package com.linkedbook.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import javax.persistence.*;

import static javax.persistence.GenerationType.*;

@DynamicInsert
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter @Setter
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

    @Column(name = "orders", nullable = false)
    private int orders;
}
