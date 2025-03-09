import typescript from 'rollup-plugin-typescript2';
import babel from '@rollup/plugin-babel';
import alias from '@rollup/plugin-alias';
import json from '@rollup/plugin-json';
import vue from 'rollup-plugin-vue';
import terser from '@rollup/plugin-terser';
import commonjs from "@rollup/plugin-commonjs"
import images from "@rollup/plugin-image"
import resolve from "@rollup/plugin-node-resolve"
import postcss from "rollup-plugin-postcss";
import copy from "rollup-plugin-copy"
import cssnano from "cssnano"
import packageJson from "./package.json"
import path from 'path';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: packageJson.module,
            format: 'cjs',
            sourceMap: true,
        }, {
            file: packageJson.main,
            format: 'esm',
            sourceMap: true,
        }
    ],
    plugins: [
        // 解析外部依赖
        resolve({
            extensions: ['.js', '.ts', '.tsx', ".vue"], // 添加支持的扩展名
        }),
        // 可以兼容commonjs语法
        commonjs(),
        // 解析vue模板
        vue({
            include: /\.vue$/, // 处理 .vue 文件
            compileTemplate: true,
            css: true
        }),
        // 解析ts代码和配置
        typescript({
            tsconfig: './tsconfig.json',
        }),
        // 解析js降js版本
        babel({
            exclude: 'node_modules/**',
            babelHelpers: "runtime"
        }),
        // 解析@路径
        alias({
            entries: [
                {
                    find: '@',
                    replacement: path.resolve(__dirname, 'src'),
                },
            ],
        }),
        // 代码压缩
        terser(),
        // 集成了对 scss、less、stylus 的支持
        postcss({
            // cssnano-css压缩
            plugin: [cssnano(),],
            extract: "css/index.css",
        }),
        // 可以使用json文件
        json(),
        // 打包图片
        images({
            include: ['**/*.png', '**/*.jpg', '**/*.svg']
        }),
        copy({
            targets: [
                {
                    src: 'scr/assets/*',
                    dest: 'dist/assets'
                }
            ]
        })

    ],
    // 告诉vue是外部类的库
    external: ['vue'],
};