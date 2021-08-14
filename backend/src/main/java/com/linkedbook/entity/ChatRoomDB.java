package com.linkedbook.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder;
import org.hibernate.annotations.DynamicInsert;
import javax.persistence.*;

import static javax.persistence.GenerationType.*;

import java.io.Serializable;

@Data
@AllArgsConstructor
@DynamicInsert
@NoArgsConstructor
@Entity
@Builder
@Table(name = "chat_room")
public class ChatRoomDB implements Serializable { // redis에 저장되는 객체들은 Serialize가 가능해야 함, -> Serializable 참조
    private static final long serialVersionUID = 6494678977089006639L;

    @Id
    @Column(name = "id", nullable = false, updatable = false)
    @GeneratedValue(strategy = IDENTITY)
    private int id;

    @Column(name = "deal_id", nullable = false)
    private int deal_id;

    @Column(name = "room_id", nullable = false, length = 45)
    private String room_id;

    @Column(name = "name", nullable = false, length = 45)
    private String name;
}
