package com.linkedbook.entity;

import com.linkedbook.dto.alert.AlertStatus;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import javax.persistence.*;
import java.util.Date;

import static javax.persistence.GenerationType.*;

@DynamicInsert
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter @Setter
@Entity
@Table(name = "alert")
public class AlertDB {
    @Id
    @Column(name = "id", nullable = false, updatable = false)
    @GeneratedValue(strategy = IDENTITY)
    private int id;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false, length = 45)
    private AlertStatus type;

    @ManyToOne
    @JoinColumn(name = "comment_id")
    private CommentDB comment;

    @ManyToOne
    @JoinColumn(name = "deal_id")
    private DealDB deal;

    @ManyToOne
    @JoinColumn(name = "eval_id")
    private UserDealDB eval;

    @ManyToOne
    @JoinColumn(name = "to_user_id", nullable = false)
    private UserDB toUser;

    @ManyToOne
    @JoinColumn(name = "from_user_id", nullable = false)
    private UserDB fromUser;

    @Column(name = "status", nullable = false, length = 45)
    private String status;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Date createdAt;
}
