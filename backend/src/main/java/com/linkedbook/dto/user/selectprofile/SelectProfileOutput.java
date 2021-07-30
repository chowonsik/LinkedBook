package com.linkedbook.dto.user.selectprofile;

public interface SelectProfileOutput {
    Integer getUserId();
    String getNickname();
    String getInfo();
    String getImage();
    String getDong();
    Integer getDealCnt();
    Integer getFollowerCnt();
    Integer getFollowingCnt();
    Double getMannerScore();
    Integer getIsMine();
    Integer getIsFollow();
}
