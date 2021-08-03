package com.linkedbook.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import javax.persistence.*;
import java.util.List;

import static javax.persistence.GenerationType.*;

@Data
@AllArgsConstructor
@DynamicInsert
@NoArgsConstructor
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
