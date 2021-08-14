package com.linkedbook.dto.chat.selectChatRoom;

import java.util.Date;

public interface SelectChatRoomOutput {
    String getRoom_id();

    Integer getDeal_id();

    String getBookImage();

    String getToUserImage();

    Integer getToUserId();

    String getFromUserImage();

    Integer getFromUserId();

    String getMessage();

    Date getMessageCreatedAt();
}