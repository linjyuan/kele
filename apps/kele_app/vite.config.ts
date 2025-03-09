import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv, type UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

// https://vite.dev/config/
export default defineConfig(({ mode }: UserConfig) => {
  let env: Record<string, string> = {}
  if (mode) {
    env = loadEnv(mode, process.cwd())
  }
  const { VITE_ENV, VITE_PORT, VITE_API_BASE_URL } = env
  return ({
    server: {
      host: true,
      port: Number(VITE_PORT) || 3000,
      proxy: {
        [VITE_API_BASE_URL]: {
          target: VITE_ENV === 'development' ? 'http://localhost:8080' : 'http://192.168.1.104:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^${VITE_API_BASE_URL}`), ''),
        },
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
      AutoImport({
        imports: ["vue", "vue-router"],
        // 本地目录自动引入
        dirs: ["src/components"],
        resolvers: [ElementPlusResolver(), IconsResolver({ prefix: 'Icon' })],
      }),
      Components({
        resolvers: [ElementPlusResolver(), IconsResolver({ enabledCollections: ['ep'] }),],
      }),

      Icons({
        // 自动安装图标库
        autoInstall: true,
        compiler: "vue3",
      })
    ],
    base: "./",
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
        },
      },
    },
    build: {
      outDir: '../../keleApp',
      assetsDir: 'assets',
      sourcemap: VITE_ENV === 'development' ? true : false,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    }
  })
})
