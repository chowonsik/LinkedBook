package com.linkedbook.configuration.redis.handler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.io.Console;
import java.security.Principal;
import java.util.Optional;

import com.linkedbook.dao.ChatRoomRepository;
import com.linkedbook.entity.UserDB;
import com.linkedbook.service.ChatRoomService;
import com.linkedbook.service.ChatService;
import com.linkedbook.service.JwtService;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class StompHandler implements ChannelInterceptor {

    private final JwtService jwtService;
    private final ChatRoomService chatRoomService;
    private final ChatService chatService;

    // websocket을 통해 들어온 요청이 처리 되기전 실행된다.
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        System.out.println("웹소켓에 신호 들어옴a");
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        System.out.println(message);
        if (StompCommand.CONNECT == accessor.getCommand()) { // websocket 연결요청
            System.out.println("웹소켓 연결 요청b");
            String jwtToken = accessor.getFirstNativeHeader("token");
            System.out.println("토큰 확인 토큰 값c:" + jwtToken);
            System.out.println("연결 요청d");
            log.info("CONNECT {}", jwtToken);
            // Header의 jwt token 검증 -> 유효하지 않다면 websocket 연결을 하지 않음
            jwtService.validateToken(jwtToken);
        } else if (StompCommand.SUBSCRIBE == accessor.getCommand()) { // 채팅룸 구독요청
            // header정보에서 구독 destination정보를 얻고, roomId를 추출한다.
            System.out.println("구독 요청e");
            String roomId = chatService.getRoomId(
                    Optional.ofNullable((String) message.getHeaders().get("simpDestination")).orElse("InvalidRoomId"));
            // 채팅방에 들어온 클라이언트 sessionId를 roomId와 맵핑해 놓는다.(나중에 특정 세션이 어떤 채팅방에 들어가 있는지 알기 위함)
            System.out.println("f해당 룸 ID:" + roomId);
            String sessionId = (String) message.getHeaders().get("simpSessionId");
            chatRoomService.setUserEnterInfo(sessionId, roomId);
            // 클라이언트 입장 메시지를 채팅방에 발송한다.(redis publish)
            String name = Optional.ofNullable((Principal) message.getHeaders().get("simpUser")).map(Principal::getName)
                    .orElse("UnknownUser");
            log.info("SUBSCRIBED {}, {}", name, roomId);
        }
        // else if (StompCommand.DISCONNECT == accessor.getCommand()) { // Websocket 연결
        // 종료
        // System.out.println("연결 종료 단계");
        // // 연결이 종료된 클라이언트 sesssionId로 채팅방 id를 얻는다.
        // String sessionId = (String) message.getHeaders().get("simpSessionId");
        // String roomId = chatRoomRepository.getUserEnterRoomId(sessionId);
        // // 클라이언트 퇴장 메시지를 채팅방에 발송한다.(redis publish)
        // String name = Optional.ofNullable((Principal)
        // message.getHeaders().get("simpUser")).map(Principal::getName)
        // .orElse("UnknownUser");
        // chatService.sendChatMessage(
        // ChatMessage.builder().type(ChatMessage.MessageType.QUIT).roomId(roomId).sender(name).build());
        // // 퇴장한 클라이언트의 roomId 맵핑 정보를 삭제한다.
        // chatRoomRepository.removeUserEnterInfo(sessionId);
        // log.info("DISCONNECTED {}, {}", sessionId, roomId);
        // }
        return message;
    }
}