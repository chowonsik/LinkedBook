package com.linkedbook.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder;
import org.hibernate.annotations.DynamicInsert;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import static javax.persistence.GenerationType.*;

@Data
@AllArgsConstructor
@DynamicInsert
@NoArgsConstructor
@Entity
@Builder
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
