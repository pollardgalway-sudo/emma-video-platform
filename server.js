const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// 确保必要的文件夹存在
const uploadsDir = path.join(__dirname, 'uploads');
const publicDir = path.join(__dirname, 'public');

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}

// 视频列表文件
const videosFilePath = path.join(__dirname, 'videos.json');

// 初始化视频列表
if (!fs.existsSync(videosFilePath)) {
    fs.writeFileSync(videosFilePath, JSON.stringify([], null, 2));
}

// 配置 multer 存储
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5000 * 1024 * 1024 }, // 5GB 限制
    fileFilter: (req, file, cb) => {
        const allowedTypes = /mp4|avi|mov|wmv|flv|mkv/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('只支持视频文件格式！'));
        }
    }
});

// 获取所有视频
app.get('/api/videos', (req, res) => {
    try {
        const videos = JSON.parse(fs.readFileSync(videosFilePath, 'utf8'));
        res.json({ success: true, videos });
    } catch (error) {
        console.error('获取视频列表失败:', error);
        res.status(500).json({ success: false, message: '获取视频列表失败' });
    }
});

// 上传视频
app.post('/api/upload', upload.single('video'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: '没有上传文件' });
        }

        const { title } = req.body;
        
        // 读取现有视频列表
        const videos = JSON.parse(fs.readFileSync(videosFilePath, 'utf8'));
        
        // 添加新视频
        const newVideo = {
            id: Date.now(),
            title: title || req.file.originalname,
            filename: req.file.filename,
            originalname: req.file.originalname,
            filepath: `/uploads/${req.file.filename}`,
            size: req.file.size,
            uploadDate: new Date().toISOString()
        };
        
        videos.push(newVideo);
        
        // 保存视频列表
        fs.writeFileSync(videosFilePath, JSON.stringify(videos, null, 2));
        
        res.json({ success: true, message: '视频上传成功', video: newVideo });
    } catch (error) {
        console.error('上传失败:', error);
        res.status(500).json({ success: false, message: '上传失败: ' + error.message });
    }
});

// 删除视频
app.delete('/api/videos/:id', (req, res) => {
    try {
        const videoId = parseInt(req.params.id);
        const videos = JSON.parse(fs.readFileSync(videosFilePath, 'utf8'));
        
        const videoIndex = videos.findIndex(v => v.id === videoId);
        
        if (videoIndex === -1) {
            return res.status(404).json({ success: false, message: '视频不存在' });
        }
        
        const video = videos[videoIndex];
        const filePath = path.join(__dirname, 'uploads', video.filename);
        
        // 删除文件
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        
        // 从列表中移除
        videos.splice(videoIndex, 1);
        fs.writeFileSync(videosFilePath, JSON.stringify(videos, null, 2));
        
        res.json({ success: true, message: '视频删除成功' });
    } catch (error) {
        console.error('删除失败:', error);
        res.status(500).json({ success: false, message: '删除失败: ' + error.message });
    }
});

// 提供上传的视频文件
app.use('/uploads', express.static(uploadsDir));

// 启动服务器
app.listen(PORT, () => {
    console.log(`✅ 服务器运行在 http://localhost:${PORT}`);
    console.log(`📁 视频存储目录: ${uploadsDir}`);
    console.log(`📋 视频列表文件: ${videosFilePath}`);
});
