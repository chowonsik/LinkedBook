package com.linkedbook.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import javax.persistence.*;

import com.linkedbook.dto.chat.MessageType;

import java.util.Date;

import static javax.persistence.GenerationType.*;

@DynamicInsert
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter @Setter
@Entity
@Table(name = "chat_message")
public class ChatMessageDB {
    @Id
    @Column(name = "id", nullable = false, updatable = false)
    @GeneratedValue(strategy = IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    private ChatRoomDB room;

    @ManyToOne
    @JoinColumn(name = "to_user_id", nullable = false)
    private UserDB toUser;

    @ManyToOne
    @JoinColumn(name = "from_user_id", nullable = false)
    private UserDB fromUser;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false, length = 45)
    private MessageType type;

    @Column(name = "message", nullable = false, columnDefinition = "TEXT")
    private String message;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Date created_at;
}
