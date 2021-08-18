package com.linkedbook.controller;

import java.util.List;

import com.linkedbook.dto.chat.createChatRoom.CreateChatRoomInput;
import com.linkedbook.dto.chat.selectChatRoom.SelectChatRoomInput;
import com.linkedbook.dto.chat.selectChatRoom.SelectChatRoomOutput;
import com.linkedbook.entity.ChatRoomDB;
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
@Slf4j
public class ChatRoomController {

    private final ChatRoomService chatRoomService;

    /**
     * 채팅방 리스트 조회 API
     * 
     * @return Response<List<SelectChatRoomOutput>>
     */
    // params
    @GetMapping("/rooms")
    @ResponseBody
    public Response<List<SelectChatRoomOutput>> findAllRoom(SelectChatRoomInput selectChatRoomInput) {
        log.info("[GET] /chat/rooms");
        return chatRoomService.findAllRoom(selectChatRoomInput);
    }

    /**
     * 채팅방 생성 API
     * 
     * @return Response<ChatRoomDB>
     */
    // Body
    @PostMapping("/room")
    @ResponseBody
    public Response<ChatRoomDB> createRoom(@RequestBody CreateChatRoomInput createChatRoomInput) {
        log.info("[POST] /chat/room");
        return chatRoomService.createChatRoom(createChatRoomInput);
    }

    @GetMapping("/room/{roomId}")
    @ResponseBody
    public Response<ChatRoomDB> findByRoomId(@PathVariable String roomId) {
        log.info("[GET] /chat/room" + roomId);
        return chatRoomService.findByRoomId(roomId);
    }

}
