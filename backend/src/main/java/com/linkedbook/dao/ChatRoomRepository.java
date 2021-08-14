package com.linkedbook.dao;

import java.util.List;

import com.linkedbook.entity.ChatRoomDB;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoomDB, Integer> {

    @Query("select cr from ChatRoomDB cr left outer join ChatMessageDB cm on cr.id = cm.room.id")
    List<ChatRoomDB> findByUserId(int userId);

    @Query("select cr from ChatRoomDB cr where cr.room_id =?1")
    ChatRoomDB findByRoomId(String roomId);
}
