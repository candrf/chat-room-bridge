package org.france.chatroombridge.DTOs;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessageDTO {
    private String content;
    private String sender;
    private String roomId;
}

