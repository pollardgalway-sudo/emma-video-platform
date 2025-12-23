# EMMA美容课程视频平台

一个简单易用的视频上传和播放平台，无需每次重新部署。

## 功能特点

✅ 在线上传视频 - 网页界面直接上传，无需命令行
✅ 自动显示视频 - 上传后立即在网站显示
✅ 视频播放 - 支持在线播放所有上传的视频
✅ 删除管理 - 可以删除不需要的视频
✅ 无需重新部署 - 一次部署，永久使用

## 本地使用

### 启动服务器

```bash
cd C:\Users\Administrator\Desktop\shipin-website
npm start
```

然后打开浏览器访问：http://localhost:3000

### 停止服务器

按 `Ctrl + C` 停止服务器

## 部署到云服务器（推荐）

可以部署到以下任一平台，这样就可以从任何地方访问：

### 方案1: Railway (推荐)
1. 访问 https://railway.app
2. 连接 GitHub 账号
3. 上传这个项目
4. Railway 会自动检测并部署

### 方案2: Render
1. 访问 https://render.com
2. 创建 Web Service
3. 上传这个项目
4. 配置启动命令: `npm start`

### 方案3: 自己的VPS
1. 上传项目到服务器
2. 安装 Node.js
3. 运行 `npm install`
4. 运行 `npm start`
5. 配置 Nginx 反向代理

## 文件说明

- `server.js` - 后端服务器，处理视频上传和存储
- `public/index.html` - 前端页面，提供上传和播放界面
- `uploads/` - 视频文件存储目录
- `videos.json` - 视频元数据（标题、文件名等）
- `package.json` - 项目依赖配置

## 注意事项

1. 视频文件存储在 `uploads/` 目录
2. 建议定期备份 `uploads/` 和 `videos.json`
3. 如果部署到云服务器，注意磁盘空间限制
4. 视频文件大小限制：5GB/个

## 技术栈

- **后端**: Node.js + Express
- **前端**: 原生 HTML/CSS/JavaScript
- **文件上传**: Multer
- **数据存储**: JSON 文件

## 常见问题

**Q: 如何访问我的视频网站？**
A: 本地运行时访问 http://localhost:3000，部署到云服务器后使用服务器提供的URL

**Q: 上传失败怎么办？**
A: 检查视频文件格式（支持 mp4, avi, mov 等），确保文件小于5GB

**Q: 如何备份我的视频？**
A: 复制整个 `uploads` 文件夹和 `videos.json` 文件

**Q: 可以同时上传多个视频吗？**
A: 目前是一次上传一个，但可以连续上传多个

## 支持

如有问题，请检查：
1. Node.js 是否正确安装
2. npm 依赖是否都已安装
3. 服务器是否正常运行
4. 端口 3000 是否被占用
