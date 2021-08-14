package com.linkedbook.dto.chat.selectChatRoom;

import java.util.Date;

public interface SelectChatRoomOutput {
    String getRoom_id();

    Integer getDeal_id();

    String getBookImage();

    String getToUserImage();

    Integer getToUserId();

    String getToUserNickname();

    String getFromUserImage();

    Integer getFromUserId();

    String getFromUserNickname();

    String getMessage();

    Date getMessageCreatedAt();
}