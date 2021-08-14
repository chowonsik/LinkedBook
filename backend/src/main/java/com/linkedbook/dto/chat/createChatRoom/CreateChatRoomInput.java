package com.linkedbook.dto.chat.createChatRoom;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class CreateChatRoomInput {
    private String name;
    private int dealId;
}