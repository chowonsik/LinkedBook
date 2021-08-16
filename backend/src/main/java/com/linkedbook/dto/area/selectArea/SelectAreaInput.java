package com.linkedbook.dto.area.selectArea;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SelectAreaInput {
    private String search;
    private int page;
    private int size;

}
