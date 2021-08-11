package com.linkedbook.dto.userArea.selectUserArea;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class SelectUserAreaOutput {
    private int areaId;
    private int orders;
    private String areaDongmyeonri;
}