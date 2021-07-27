package com.linkedbook.controller;

import com.linkedbook.dto.hello.HelloOutput;
import com.linkedbook.response.Response;
import com.linkedbook.response.ResponseStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/hello")
public class HelloController {
    @ResponseBody
    @GetMapping
    public Response<HelloOutput> hello(@RequestParam(value = "name", defaultValue = "World!!!!") String name) {
        if (name.equals("박근혜")) {
            return new Response<>(ResponseStatus.BAD_REQUEST_IMPEACHED_PRESIDENT);
        } else {
            return new Response<>(new HelloOutput(name), ResponseStatus.SUCCESS_HELLO);
        }
    }
}
