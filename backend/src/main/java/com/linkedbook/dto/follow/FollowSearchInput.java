package com.linkedbook.dto.follow;


import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Getter
public class FollowSearchInput {
    private int page;
    private int size;
}
