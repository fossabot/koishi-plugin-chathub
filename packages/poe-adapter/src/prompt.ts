import { Logger } from 'koishi'
import { Conversation, ConversationConfig, InjectData, Message, SimpleMessage, createLogger } from '@dingyi222666/koishi-plugin-chathub'
import { PoeMessage } from './types'
import PoeAdapter from '.'

const logger = createLogger('@dingyi222666/chathub-poe-adapter/prompt')

export class Prompt {

    constructor(private readonly config: PoeAdapter.Config
    ) { }

    private formatInjectData(inject: InjectData[]): string {
        const result = []

        inject.forEach((data) => {
            const builder = []

            if (data.title) {
                builder.push(data.title)
            }

            builder.push(data.data.trim())

            if (data.source) {
                builder.push(data.source)
            }

            result.push(builder.join())
        })

        return result.join(' ')
    }

    private formatInitialPrompt(config: ConversationConfig): string {
        const builder: PoeMessage[] = []

        if (!config.initialPrompts) {
            return ""
        }

        const initialPrompts = config.initialPrompts

        if (initialPrompts instanceof Array) {
            initialPrompts.forEach((prompt) => {
                builder.push({
                    role: prompt.role,
                    content: prompt.content,
                    name: prompt.sender ?? prompt.role
                })
            })
        } else {
            builder.push({
                role: initialPrompts.role,
                content: initialPrompts.content,
                name: initialPrompts.sender ?? initialPrompts.role
            })
        }

        return JSON.stringify(builder)
    }

    generateSystemPrompt(conversation: Conversation): string {
        return this.formatInitialPrompt(conversation.config)
    }

    generateUserPrompt(conversation: Conversation, message: SimpleMessage): string {
        let content = message.content

        const conversationConfig = conversation.config

        if (conversationConfig.inject != 'none' && message.inject) {
            content = message.content
                + `. 这些信息来自于我们之前的谈话或互联网，请参考这些信息，根据我与你的上述谈话内容要求代入你的人设来答复我上面的内容，如果这些信息与上述谈话内容无关，请直接无视并且忽略这些信息，也不要说“根据我提供的信息”这类的，请把它当成不存在的数据。：\n${this.formatInjectData(message.inject)}`
        }

        return JSON.stringify({
            role: message.role,
            content: content,
            name: message.sender ?? message.role
        })
    }
}
