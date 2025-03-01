import { Conversation, Message } from '@dingyi222666/koishi-plugin-chathub'


export interface PoeSettingsResponse {
    tchannelData: {
        minSeq: string
        channel: string
        channelHash: string
        boxName: string
        baseHost: string
        targetUrl: string
        enableWebsocket: boolean
    }
}

export interface PoeQueryChatIdResponse {
    data: {
        chatOfBot: {
            chatId: string
        }
    }
}

export interface PoeBot {
    chatId: string
    botNickName: string
    botId: string
}

export interface PoeMessage {
    role: 'user' | 'system' | 'model',
    content: string,
    name: string
}

export interface PoeRequestInit {
    modelName: string
}

export interface PoeRequestHeaders {
    ["poe-formkey"]?: string,
    ["poe-tchannel"]?: string,
    ["poe-tag-id"]?: string,
    ["User-Agent"]?: string,
    Cookie?: string
    ["Content-Type"]: 'application/json',
    Accept: 'application/json',
    Connection: 'keep-alive',
    Origin: 'https://poe.com',
    Host: 'poe.com',
    Referrer: 'https://poe.com',

}