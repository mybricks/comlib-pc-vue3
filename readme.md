<h1 align="center">MyBricks Vue3组件开发、发布指南</h1>

# 一、如何开发组件
## 1、clone该组件库到本地
```
git clone https://github.com/mybricks/comlib-pc-vue3.git vue3
```
## 2、切换目录
```
cd vue3
```
## 3、安装依赖
```
npm install
```
## 4、在VSCode插件应用市场搜索：MyBricks，安装开发插件
![alt text](desc-image1.png)
## 5、安装之后，在VSCode界面左下角，找到调试按钮并点击；此时会自动打开一个网页，可以在上面实时预览你开发中的组件
![alt text](desc-image2.png)
## 6、新建一个组件，可以从已有的组件文件夹复制一份出来，然后修改com.json里面的描述内容（组价名称、namespace、图标等等）；最后往mybricks.json追加新组件的路径
> 每次修改完json相关的内容后，都要重启下服务才能生效（关闭调试后再打开调试）

![alt text](image.png)

# 如何发布组件库
## 1、正确填写mybricks.json中的domain
- 例如：https://test.mybricks.world
## 2、点击发布按钮
![alt text](image-1.png)
>发布过程中会让你填入发布的账号，填写后回车即可
![alt text](image-2.png)
## 3、发布成功
点击平台上的物料中心，组件库列表中，即可看到刚刚发布的组件库
![alt text](image-3.png)
# 如何使用
## 1、点击画布右侧组件库图标，打开组件库列表，在最下方找到添加组件库按钮
![alt text](image-4.png)

## 2、在选择组件库面板，选中刚刚发布的组件库，点击确定
![alt text](image-5.png)
