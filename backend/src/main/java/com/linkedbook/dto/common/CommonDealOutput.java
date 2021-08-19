package com.linkedbook.dto.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class CommonDealOutput {
    private int id;
    private String title;
    private int price;
    private String book;
    private Date created_at;
    private Date updated_at;
}
