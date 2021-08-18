package com.linkedbook.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import javax.persistence.*;

import static javax.persistence.GenerationType.*;

@DynamicInsert
@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
@Entity
@Table(name = "area")
public class AreaDB {
    @Id
    @Column(name = "id", nullable = false, updatable = false)
    @GeneratedValue(strategy = IDENTITY)
    private int id;

    @Column(name = "sido", nullable = false, length = 45)
    private String sido;

    @Column(name = "sigungu", nullable = false, length = 45)
    private String sigungu;

    @Column(name = "dongmyeonri", nullable = false, length = 45)
    private String dongmyeonri;
}
