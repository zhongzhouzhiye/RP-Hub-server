# Roleplay Hub Server

[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)
[![Vue](https://img.shields.io/badge/Vue-3-4FC08D.svg?logo=vue.js)](https://vuejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)](https://docker.com/)

> **一款纯前端运行的本地角色扮演（Roleplay）对话和角色卡生成工具——服务端部署版，支持跨设备数据同步。**

本项目基于 [STA1N156/RP-Hub](https://github.com/STA1N156/RP-Hub) 的二次修改版本，将数据从浏览器本地存储迁移到后端服务器，实现了跨客户端数据同步。代码修改大部分来自 DeepSeek。

---

**【免责与授权声明】**
本项目基于 **[CC BY-NC 4.0（知识共享-署名-非商业性使用 4.0 国际许可协议）](./LICENSE)** 开源。**明确禁止任何形式的商业化使用**（包括但不限于：作为收费服务提供、打包在付费产品中售卖、在产品内植入广告盈利等）。任何使用者必须遵守该协议，尊重原作者的署名权。对于违反协议的商业行为，保留追究法律责任的权利。

---

## 核心特性

- 💬 **AI 角色扮演对话** — 支持沉浸模式、思维链显示、流式输出
- 🧠 **记忆系统** — 自动提取关键信息，分类存储（事件/状态/关系）
- 📇 **角色卡管理** — 创建/编辑/导入/导出角色卡
- 🔧 **角色卡生成** — AI 辅助角色卡生成
- ⚙️ **多模型预设** — quality / balanced / fast 三级模型切换
- 📖 **世界书** — 世界观信息管理
- 🔣 **正则脚本** — 自定义正则替换规则
- 🖼️ **自动生图** — NAI 画图集成
- ☁️ **服务端存储** — 数据保存在后端服务器，所有设备实时同步

---

## 快速开始 (Docker 部署)

### 1. 下载项目

```bash
git clone https://github.com/你的用户名/RP-Hub.git
cd RP-Hub
```

或直接下载 Release 压缩包并解压。

### 2. 构建镜像

```bash
docker build -t rp-hub .
```

> 注意：镜像名称必须为小写字母。

### 3. 运行容器

```bash
docker run -d \
  --name rp-hub \
  -p 3001:3001 \
  -v /opt/rp-hub-data:/app/data \
  --restart unless-stopped \
  rp-hub
```

### 4. 访问

浏览器打开 `http://你的服务器IP:3001` 即可。

> 电脑、手机、平板任何设备访问同一个地址，数据自动同步。

---

## 1Panel 面板部署

| 步骤 | 操作 |
|------|------|
| **1. 上传文件** | 在 1Panel 文件管理中将项目上传到服务器 |
| **2. 构建镜像** | 容器 → 镜像 → 构建镜像，选择项目目录，镜像名称填写 `rp-hub:latest` |
| **3. 创建容器** | 容器 → 容器 → 创建容器，镜像选择 `rp-hub:latest` |
| **4. 端口映射** | 主机端口填 `3001`（或自定义），容器端口填 `3001` |
| **5. 挂载卷** | 主机目录如 `/opt/rp-hub-data` 挂载到 `/app/data` |
| **6. 重启策略** | 选择「如果退出则重启」 |
| **7. 访问** | `http://服务器IP:填写的端口号` |

---

## 目录结构

```
RP-Hub/
├── index.html              # 主应用 (Vue 3)
├── server.js               # 后端存储服务
├── package.json            # 后端依赖配置
├── Dockerfile              # Docker 构建文件
├── data/                   # 数据存储目录（自动创建）
├── character/
│   └── index.html          # 角色卡工坊
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── app.js          # 核心业务逻辑
│       └── utils.js        # 工具函数库
└── README.md
```

---

## API 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/health` | 健康检查 |
| GET | `/api/keys` | 列出所有存储键 |
| GET | `/api/data/:key` | 获取数据 |
| PUT | `/api/data/:key` | 保存数据 |
| DELETE | `/api/data/:key` | 删除数据 |

所有数据以 JSON 文件形式存储在 `data/` 目录，可直接备份或迁移。

---

## 协议与许可

本项目遵守 **CC BY-NC 4.0** 协议。

- **您可以**：自由共享与演绎本作品
- **您必须**：署名，且**不得用于商业目的**

详细条款请参见根目录下的 [`LICENSE`](./LICENSE) 文件。
