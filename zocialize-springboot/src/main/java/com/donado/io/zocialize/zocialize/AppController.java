package com.donado.io.zocialize.zocialize;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AppController {

    @RequestMapping("/")
    public String getGreeting() {
        return "hello World";
    }
}
