export namespace User {
  export enum UserStatusEnum {
    /** 正常 */
    normal = 'normal',
    /** 禁用 */
    disabled = 'disabled',
    /** 删除 */
    deleted = 'deleted',
  }
  export enum RoleEnum {
    /** 管理员 */
    admin = 0,
    /** 用户 */
    user = 1,
  }
  export interface Data {
    email: string
    password: string
    token?: string
    userId?: string
    userName: string
    tel?: string
    //
    sex?: boolean
    /** 权限 0-管理员 1-用户 */
    role: RoleEnum
    userStatus: UserStatusEnum
  }
}
