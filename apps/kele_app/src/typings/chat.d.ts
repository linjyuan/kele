export namespace Chat {

  /**
   * 消息类型
   */
  export namespace MsgBody {
    /** 图片消息体 */
    export type ImageBody = {
      size: number
      url: string
      width: number
      height: number
    }
    /** 语音消息体 */
    export type VoiceBody = {
      size: number
      second: number
      url: string
    }
    /** 视频 */
    export type VideoBody = {
      size: number
      url: string
      thumbSize?: number
      thumbWidth?: number
      thumbHeight?: number
      thumbUrl?: string
    }
    /** 文件消息体 */
    export type FileBody = {
      size: number
      fileName: string
      url: string
    }
    /** 文本消息体 */
    export type TextBody = {
      /** 消息内容 */
      content: string
      /** 回复 */
      reply: ReplyType
      /**
       * 消息链接映射
       */
      urlContentMap: Record<
        string,
        {
          title: string
          description: string
          image: string
        }
      >
    }
    /** 表情消息 */
    export type EmojiBody = {
      url: string
    }
  }

  // 消息的枚举值
  export enum MsgEnum {
    /** 未知 */
    UNKNOWN,
    /** 文本 */
    TEXT,
    /** 撤回 */
    RECALL,
    /** 图片 */
    IMAGE,
    /** 文件 */
    FILE,
    /** 语音 */
    VOICE,
    /** 视频 */
    VIDEO,
    /** 表情包 */
    EMOJI,
    /** 系统消息 */
    SYSTEM,
  };


  /**
   * 消息互动信息
   */
  export interface MessageMarkType {
    /** 点赞 */
    userLike: number
    /** 举报 */
    userDislike: number
    /** 点赞数 */
    likeCount: number
    /** 举报数 */
    dislikeCount: number
  }


  /**
   * 消息体
   */
  export interface ChatMsg {
    /** 消息ID */
    id: number
    /**  房间 ID */
    roomId: number
    /** 消息类型 */
    type: MsgEnum
    /** 动态消息体-`根据消息类型变化` */
    body: MsgBody.TextBody | MsgBody.ImageBody | MsgBody.VoiceBody | MsgBody.VideoBody | MsgBody.FileBody | MsgBody.EmojiBody | any
    /** 发送时间戳 */
    sendTime: number
    /** 消息互动信息 */
    messageMark: MessageMarkType
  }

  /**
   * 发送消息载体
   */
  export type MessageReq = {
    /** 会话id */
    roomId: number
    /** 消息类型 */
    msgType: MsgEnum
    /** 消息体 */
    body: {
      /** 文本消息内容 */
      content?: string
      /** 回复的消息id */
      replyMsgId?: number
      /** 任意 */
      [key: string]: any
    }
  }

}
