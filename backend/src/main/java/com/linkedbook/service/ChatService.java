package com.linkedbook.service;

import java.util.List;

import com.linkedbook.dto.chat.createChatMessage.ChatMessage;
import com.linkedbook.dto.chat.selectChatMessage.SelectChatMessageOutput;
import com.linkedbook.response.Response;

public interface ChatService {
    String getRoomId(String destination);
    void sendChatMessage(ChatMessage chatMessage);
    Response<List<SelectChatMessageOutput>> loadMessage(String roomId);
}
