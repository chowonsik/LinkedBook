package com.linkedbook.dao;

import java.util.List;

import com.linkedbook.dto.chat.selectChatRoom.SelectChatRoomOutput;
import com.linkedbook.entity.ChatRoomDB;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoomDB, Integer> {

    @Query(value = "select c.room_id as room_id, c.deal_id as deal_id, b.image as bookImage, u1.image as toUserImage, c.to_user_id as toUserId, u1.nickname as toUserNickname, u2.image as fromUserImage, c.from_user_id as fromUserId, u2.nickname as fromUserNickname, cm.message as message, c.created_at as messageCreatedAt"
            + " from (select cr.*, max(cm.id) as m_id, cm.to_user_id, cm.from_user_id, cm.created_at as created_at"
            + " from chat_room cr" + " left outer join chat_message cm on cr.id = cm.room_id group by cr.id) c"
            + " join deal d on c.deal_id = d.id" + " join book b on d.book_id = b.id"
            + " join chat_message cm on c.m_id = cm.id" + " join user u1 on c.to_user_id = u1.id"
            + " join user u2 on c.from_user_id = u2.id"
            + " where c.to_user_id = ?1 or c.from_user_id = ?1", nativeQuery = true)
    List<SelectChatRoomOutput> findByUserId(int userId);

    @Query("select cr from ChatRoomDB cr where cr.room_id =?1")
    ChatRoomDB findByRoomId(String roomId);
}
