package com.linkedbook.serviceImpl;

import com.linkedbook.dao.ChatMessageRepository;
import com.linkedbook.dao.ChatRoomRepository;
import com.linkedbook.dao.UserRepository;
import com.linkedbook.dto.chat.MessageType;
import com.linkedbook.dto.chat.createChatMessage.ChatMessage;
import com.linkedbook.dto.chat.selectChatMessage.SelectChatMessageOutput;
import com.linkedbook.entity.ChatMessageDB;
import com.linkedbook.entity.ChatRoomDB;
import com.linkedbook.entity.UserDB;
import com.linkedbook.response.Response;
import com.linkedbook.service.ChatRoomService;
import com.linkedbook.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.linkedbook.response.ResponseStatus.*;

import java.util.List;

@Service("ChatService")
@RequiredArgsConstructor
@Slf4j
public class ChatServiceImpl implements ChatService {

    private final ChannelTopic channelTopic;
    private final RedisTemplate redisTemplate;
    private final ChatRoomService chatRoomService;
    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;

    @Override
    public String getRoomId(String destination) {
        int lastIndex = destination.lastIndexOf('/');
        if (lastIndex != -1)
            return destination.substring(lastIndex + 1);
        else
            return "";
    }

    @Override
    @Transactional
    public void sendChatMessage(ChatMessage chatMessage) {
        UserDB toUser = userRepository.findByIdAndStatus(chatMessage.getToUserId(), "ACTIVATE");
        UserDB fromUser = userRepository.findByIdAndStatus(chatMessage.getFromUserId(), "ACTIVATE");
        ChatRoomDB room = chatRoomRepository.findByRoomId(chatMessage.getRoomId());
        ChatMessageDB message = ChatMessageDB.builder().room(room).toUser(toUser).fromUser(fromUser)
                .type(chatMessage.getType()).message(chatMessage.getMessage()).build();
        if (MessageType.ENTER.equals(chatMessage.getType())) {
            chatMessage.setMessage(toUser.getNickname() + "님이 방에 입장했습니다.");
        } else if (MessageType.QUIT.equals(chatMessage.getType())) {
            chatMessage.setMessage(toUser.getNickname() + "님이 방에서 나갔습니다.");
        }
        redisTemplate.convertAndSend(channelTopic.getTopic(), chatMessage);
        chatMessageRepository.save(message);
    }

    @Override
    public Response<List<SelectChatMessageOutput>> loadMessage(String roomId) {

        List<SelectChatMessageOutput> messages;
        try {
            messages = chatMessageRepository.findByRoomId(roomId);
        } catch (IllegalArgumentException e) {
            log.error("[GET]/chat-messages undefined status exception", e);
            return new Response<>(BAD_STATUS_VALUE);
        } catch (Exception e) {
            log.error("[GET]/chat-messages database error", e);
            return new Response<>(DATABASE_ERROR);
        }

        return new Response<>(messages, SUCCESS_SELECT_CHATLIST);
    }

}
