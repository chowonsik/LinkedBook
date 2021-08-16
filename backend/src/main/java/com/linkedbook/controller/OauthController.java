package com.linkedbook.controller;

import com.linkedbook.dto.user.signin.SignInOutput;
import com.linkedbook.response.Response;
import com.linkedbook.service.social.OauthService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/auth")
@AllArgsConstructor
@Slf4j
public class OauthController {
    private final OauthService oauthService;

    @GetMapping("/{type}")
    public void socialLogin(@PathVariable("type") String type) {
        log.info("[GET] /auth/" + type);
        oauthService.request(type);
    }

    @GetMapping("/{type}/callback")
    public Response<SignInOutput> socialLoginCallback(@PathVariable("type") String type, @RequestParam("code") String code) {
        log.info("[GET] /auth/" + type + "/callback");
        return oauthService.requestLogin(type, code);
    }
}
