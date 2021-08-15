package com.linkedbook.dto.alert;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Getter
public class AlertSearchInput {
    private String type;
    private int page;
    private int size;
}
