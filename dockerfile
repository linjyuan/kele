# 使用nginx作为基础镜像
FROM nginx:latest

# 将前端项目打包后的静态文件拷贝到nginx的html目录下
COPY dist/ /usr/share/nginx/html/

# 将自定义的nginx配置文件拷贝到nginx的配置目录下
COPY nginx.conf /etc/nginx/nginx.conf

# 暴露80端口
EXPOSE 80