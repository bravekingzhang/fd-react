# 阶段1：构建阶段
FROM node:14 as build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 在构建阶段列出构建目录的内容，以确保文件已被生成
RUN ls -la /app/dist

# 阶段2：运行阶段
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html
# 如果你有自定义的nginx配置，你可以将它复制到/etc/nginx/conf.d/目录
# COPY nginx.conf /etc/nginx/conf.d/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
