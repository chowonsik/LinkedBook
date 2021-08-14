package com.linkedbook.dto.chat.selectChatMessage;

import java.util.Date;

import com.linkedbook.dto.chat.MessageType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class SelectChatMessageOutput {
    private String image;
    private String nickname;
    private Date created_at;
    private MessageType type;
}