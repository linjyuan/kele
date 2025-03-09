import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { User } from "@/typings"
import { getUserDetail } from "@/api"
const useUserStore = defineStore("user", () => {
  let userInfo = reactive<User.Data>({
    email: "",
    password: "",
    token: "",
    userId: "",
    userName: "",
    tel: "",
    sex: false,
    userStatus: User.UserStatusEnum.normal,
    role: User.RoleEnum.user,
  });

  const setUserInfo = (param: Record<string, any>) => {
    userInfo = {
      ...userInfo,
      ...param
    }
  }
  const clearUser = () => {
    userInfo = {
      email: "",
      password: "",
      token: "",
      userId: "",
      userName: "",
      tel: "",
      sex: false,
      userStatus: User.UserStatusEnum.normal,
      role: User.RoleEnum.user,
    }
  }

  const login = async ({ email, password }: { email: string, password: string, }) => {
    const userDetail = await getUserDetail({ email, password })
    console.log({ userDetail });
  }

  return { userInfo, setUserInfo, clearUser, login }

})


export default useUserStore
