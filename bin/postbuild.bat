@echo off

if exist .amplify-hosting rmdir /s /q .amplify-hosting

mkdir .amplify-hosting\compute

xcopy /e /i dist\glow-skin-angular\server .amplify-hosting\compute\default

mkdir .amplify-hosting\static

xcopy /e /i dist\glow-skin-angular\browser .amplify-hosting\static

copy deploy-manifest.json .amplify-hosting\deploy-manifest.json
