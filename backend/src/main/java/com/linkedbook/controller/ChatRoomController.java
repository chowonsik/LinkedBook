package com.linkedbook.controller;

import java.util.List;

import com.linkedbook.dto.chat.createChatRoom.CreateChatRoomInput;
import com.linkedbook.dto.chat.selectChatRoom.SelectChatRoomInput;
import com.linkedbook.entity.ChatRoomDB;
import com.linkedbook.entity.UserDB;
import com.linkedbook.response.PageResponse;
import com.linkedbook.response.Response;
import com.linkedbook.service.ChatRoomService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@Controller
@RequestMapping("/chat")
public class ChatRoomController {

    private final ChatRoomService chatRoomService;

    /**
     * 채팅방 리스트 조회 API
     * 
     * @return List<ChatRoom>
     */
    // Body
    @GetMapping("/rooms")
    @ResponseBody
    public Response<List<ChatRoomDB>> findAllRoom(SelectChatRoomInput selectChatRoomInput) {
        return chatRoomService.findAllRoom(selectChatRoomInput);
    }

    @PostMapping("/room")
    @ResponseBody
    public Response<ChatRoomDB> createRoom(@RequestBody CreateChatRoomInput createChatRoomInput) {
        return chatRoomService.createChatRoom(createChatRoomInput);
    }

    @GetMapping("/room/{roomId}")
    @ResponseBody
    public Response<ChatRoomDB> findByRoomId(@PathVariable String roomId) {
        return chatRoomService.findByRoomId(roomId);
    }

}
