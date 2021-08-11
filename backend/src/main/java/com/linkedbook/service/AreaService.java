package com.linkedbook.service;

import com.linkedbook.dto.area.selectArea.SelectAreaInput;
import com.linkedbook.dto.area.selectArea.SelectAreaOutput;
import com.linkedbook.response.PageResponse;

public interface AreaService {
    PageResponse<SelectAreaOutput> selectAreaList(SelectAreaInput selectAreaInput);
}
