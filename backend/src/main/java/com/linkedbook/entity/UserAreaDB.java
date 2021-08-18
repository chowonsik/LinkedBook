package com.linkedbook.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import static javax.persistence.GenerationType.*;

@DynamicInsert
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter @Setter
@Entity
@Table(name = "user_area")
public class UserAreaDB {
    @Id
    @Column(name = "id", nullable = false, updatable = false)
    @GeneratedValue(strategy = IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private UserDB user;

    @ManyToOne
    @JoinColumn(name = "area_id", nullable = false)
    private AreaDB area;

    @Column(name = "orders", nullable = false)
    private int orders;
}
