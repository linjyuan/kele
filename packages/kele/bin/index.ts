#!/uer/bin/env node
// const process = require("process")
// import process from "process"
const main = require("../src/index.js")
// import main from "../src/index.js"

const argv = process.argv
const command = argv[2]
const options = argv.slice(3)

function checkNodeVersion(wanted: string, name: string) {
    if (parseFloat(process.version) < parseFloat(wanted)) {
        console.log(
            'You are using Node ' + process.version + ', but this version of ' + name +
            ' requires Node ' + wanted + '.\nPlease upgrade your Node version.'
        )
        process.exit(1)
    }
}

if (argv[2] === "init") {
    main.init()
}

// 解析--version| -V
if (command.startsWith("--") || command.startsWith("-")) {
    const globalOption = command.replace(/^--|-$/g, "")
    if (main[globalOption]) {
        main[globalOption]()
    } else {
        console.log("请输入正确的命令！")
    }
}