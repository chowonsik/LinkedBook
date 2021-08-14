package com.linkedbook.service;

import java.util.List;

import com.linkedbook.dto.chat.createChatRoom.CreateChatRoomInput;
import com.linkedbook.dto.chat.selectChatRoom.SelectChatRoomInput;
import com.linkedbook.entity.ChatRoomDB;
import com.linkedbook.response.Response;

public interface ChatRoomService {
    Response<List<ChatRoomDB>> findAllRoom(SelectChatRoomInput selectChatRoomInput);

    Response<ChatRoomDB> findByRoomId(String id);

    Response<ChatRoomDB> createChatRoom(CreateChatRoomInput createChatRoomInput);

    void setUserEnterInfo(String sessionId, String roomId);

    String getUserEnterRoomId(String sessionId);

    void removeUserEnterInfo(String sessionId);
}
