export namespace ChatMsg {
  // 消息数据结构
  export interface Message {
    id: number;
    content: string;
    sender: string;
    timestamp: number;
    reference: Message | null;
    isWithdrawn: boolean;
  }
}
