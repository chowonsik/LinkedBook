package com.linkedbook.dto.chat.createChatMessage;

import java.util.Date;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import com.linkedbook.dto.chat.MessageType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ChatMessage {
    private String roomId;
    private int toUserId;
    private int fromUserId;
    @Enumerated(EnumType.STRING)
    private MessageType type;
    private String message;
}