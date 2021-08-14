package com.linkedbook.serviceImpl;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import javax.annotation.Resource;
import com.linkedbook.response.Response;
import com.linkedbook.service.ChatRoomService;
import com.linkedbook.configuration.ValidationCheck;
import com.linkedbook.dao.ChatRoomRepository;
import com.linkedbook.dto.chat.createChatRoom.CreateChatRoomInput;
import com.linkedbook.dto.chat.selectChatRoom.SelectChatRoomInput;
import com.linkedbook.entity.ChatRoomDB;

import static com.linkedbook.response.ResponseStatus.*;

import java.util.List;
import java.util.UUID;

@Service("ChatRoomService")
@RequiredArgsConstructor
@Slf4j
public class ChatRoomServiceImpl implements ChatRoomService {
    // Redis CacheKeys
    private static final String CHAT_ROOMS = "CHAT_ROOM"; // 채팅룸 저장
    public static final String ENTER_INFO = "ENTER_INFO"; // 채팅룸에 입장한 클라이언트의 sessionId와 채팅룸 id를 맵핑한 정보 저장

    @Resource(name = "redisTemplate")
    private HashOperations<String, String, ChatRoomDB> hashOpsChatRoom;
    @Resource(name = "redisTemplate")
    private HashOperations<String, String, String> hashOpsEnterInfo;
    @Resource(name = "redisTemplate")
    private ValueOperations<String, String> valueOps;

    private final ChatRoomRepository chatRoomRepository;

    // 모든 채팅방 조회
    @Override
    public Response<List<ChatRoomDB>> findAllRoom(SelectChatRoomInput selectChatRoomInput) {
        List<ChatRoomDB> chatRoomDBs;
        try {
            chatRoomDBs = chatRoomRepository.findByUserId(selectChatRoomInput.getUserId());
        } catch (IllegalArgumentException e) {
            log.error("[GET]/chat-room undefined status exception", e);
            return new Response<>(BAD_STATUS_VALUE);
        } catch (Exception e) {
            log.error("[GET]/chat-room database error", e);
            return new Response<>(DATABASE_ERROR);
        }

        return new Response<>(chatRoomDBs, CREATED_DEAL);
    }

    // 특정 채팅방 조회
    @Override
    public Response<ChatRoomDB> findByRoomId(String id) {
        return new Response<>(hashOpsChatRoom.get(CHAT_ROOMS, id), CREATED_DEAL);
    }

    // 채팅방 생성 : 서버간 채팅방 공유를 위해 redis hash에 저장한다.
    @Override
    @Transactional
    public Response<ChatRoomDB> createChatRoom(CreateChatRoomInput createChatRoomInput) {
        if (!ValidationCheck.isValid(createChatRoomInput.getName()))
            return new Response<>(NO_VALUES);
        ChatRoomDB chatRoomDB;
        try {
            chatRoomDB = ChatRoomDB.builder().room_id(UUID.randomUUID().toString()).name(createChatRoomInput.getName())
                    .build();
            chatRoomRepository.save(chatRoomDB);
            hashOpsChatRoom.put(CHAT_ROOMS, chatRoomDB.getRoom_id(), chatRoomDB);

        } catch (IllegalArgumentException e) {
            log.error("[POST]/chat-room undefined status exception", e);
            return new Response<>(BAD_STATUS_VALUE);
        } catch (Exception e) {
            log.error("[POST]/chat-room database error", e);
            return new Response<>(DATABASE_ERROR);
        }
        // 3. 결과 return
        return new Response<>(chatRoomDB, CREATED_DEAL);
    }

    // 유저가 입장한 채팅방ID와 유저 세션ID 맵핑 정보 저장
    @Override
    public void setUserEnterInfo(String sessionId, String roomId) {
        hashOpsEnterInfo.put(ENTER_INFO, sessionId, roomId);
    }

    // 유저 세션으로 입장해 있는 채팅방 ID 조회
    @Override
    public String getUserEnterRoomId(String sessionId) {
        return hashOpsEnterInfo.get(ENTER_INFO, sessionId);
    }

    // 유저 세션정보와 맵핑된 채팅방ID 삭제
    @Override
    public void removeUserEnterInfo(String sessionId) {
        hashOpsEnterInfo.delete(ENTER_INFO, sessionId);
    }
}
