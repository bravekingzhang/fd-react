#!/bin/bash

# 定义镜像名称
IMAGE_NAME="my-app"

# 构建Docker镜像
docker build -t $IMAGE_NAME .

# 运行Docker容器
docker run -d -p 4000:80 $IMAGE_NAME
