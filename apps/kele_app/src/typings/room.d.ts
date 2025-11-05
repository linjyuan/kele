import { User } from './user.d.ts'
/**
 * 聊天室
 */
export namespace Room {
  /** 聊天室类型 */
  export interface Data {
    /** 群头像 */
    avatar: string
    /** 群名称 */
    groupName: string
    /** 在线人数 */
    onlineNum: number
    /** 成员角色 1群主 2管理员 3普通成员 4踢出群聊 */
    role: number
    /** 房间id */
    roomId: number
    /** 群成员 */
    userList: Array<User.Data>
  }

  /** 聊天室类型 */
  export interface RoomType {
    /** 群聊 */
    group: number
    /** 单聊 */
    single: number
  }
}
