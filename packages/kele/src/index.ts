import kelePackage from "../package.json"

interface commandType {
    opiton: string,
    param: string
}

export default {
    init: () => {
        // 初始化，准备依赖包下载 && 启动kele_app

    },
    version: () => {
        console.log(`${kelePackage.version}`)
    },
    dev: ({ opiton, param }: commandType) => {

    },
    build: ({ opiton, param }: commandType) => {

    }
}