@echo off
echo ============================================
echo   EMMA视频平台 - Railway部署脚本
echo ============================================
echo.

echo [1/4] 检查 Railway CLI...
where railway >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Railway CLI 未安装，正在安装...
    npm install -g @railway/cli
) else (
    echo ✓ Railway CLI 已安装
)

echo.
echo [2/4] 提交代码到 Git...
git add .
git commit -m "部署到Railway"

echo.
echo [3/4] 登录 Railway...
echo 浏览器将打开，请登录你的 Railway 账号
railway login

echo.
echo [4/4] 部署到 Railway...
railway up

echo.
echo ============================================
echo   部署完成！
echo ============================================
echo.
echo 获取你的网站域名，请运行:
echo   railway domain
echo.
pause
