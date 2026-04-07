import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor(private readonly configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async getChatCompletion(messages: OpenAI.ChatCompletionMessageParam[]) {
    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4o',
      messages,
    });
    return completion.choices[0].message.content ?? '';
  }
}
