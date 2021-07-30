package com.linkedbook.dto.hello;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class HelloOutput {
    private String greeting;

    public HelloOutput(String name) {
        this.greeting = String.format("Hello, %s!", name);
    }
}
