@echo off
echo ============================================
echo   准备上传到 GitHub
echo ============================================
echo.
echo 请先在 GitHub 创建一个新仓库：
echo 1. 访问 https://github.com/new
echo 2. 仓库名称：emma-video-platform
echo 3. 选择 Private（私有）
echo 4. 不要勾选任何选项
echo 5. 点击 Create repository
echo.
echo 创建完成后，GitHub 会显示你的仓库地址，比如：
echo https://github.com/你的用户名/emma-video-platform.git
echo.
set /p REPO_URL="请输入你的 GitHub 仓库地址: "
echo.
echo 正在提交代码...
git add .
git commit -m "Initial commit - EMMA video platform"
git branch -M main
git remote add origin %REPO_URL%
git push -u origin main
echo.
echo ============================================
echo   上传完成！
echo ============================================
echo.
echo 现在访问 https://railway.app 进行部署
pause
