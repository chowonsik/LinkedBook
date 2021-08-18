package com.linkedbook.controller;

import java.util.List;

import com.linkedbook.dao.ChatMessageRepository;
import com.linkedbook.dto.chat.createChatMessage.ChatMessage;
import com.linkedbook.dto.chat.selectChatMessage.SelectChatMessageOutput;
import com.linkedbook.response.Response;
import com.linkedbook.service.ChatService;
import com.linkedbook.service.JwtService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Slf4j
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@Controller
public class ChatController {

    private final ChannelTopic channelTopic;
    private final JwtService jwtService;
    private final ChatService chatService;
    private final ChatMessageRepository chatMessageRepository;

    @GetMapping("/chat-messages")
    @ResponseBody
    public Response<List<SelectChatMessageOutput>> loadMessage(@RequestParam String roomId) {
        log.info("[GET] /chat-messages");
        return chatService.loadMessage(roomId);
    }

    /**
     * websocket "/pub/chat/message"로 들어오는 메시징을 처리한다.
     */
    @MessageMapping("/chat/message")
    public void message(@RequestBody ChatMessage chatMessage) {
        log.info("[GET] /chat/message");
        chatService.sendChatMessage(chatMessage); // 메서드 일원화
    }
}
