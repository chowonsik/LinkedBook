package com.linkedbook.dao;

import java.util.List;

import com.linkedbook.dto.chat.selectChatMessage.SelectChatMessageOutput;
import com.linkedbook.entity.ChatMessageDB;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessageDB, Integer> {

    @Query("select new com.linkedbook.dto.chat.selectChatMessage.SelectChatMessageOutput(u.id, u.image, u.nickname, cm.created_at, cm.type, cm.message)"
            + " from ChatMessageDB cm" + " join UserDB u on cm.toUser.id = u.id"
            + " join ChatRoomDB cr on cm.room.id = cr.id" + " where cr.room_id = ?1")
    List<SelectChatMessageOutput> findByRoomId(String roomId);

    // List<ChatRoomDB> findBy
}
