# ATRILive

简单易用的直播界面设计工具

![ATRILive](https://socialify.git.ci/SummonSteve/ATRILive/image?description=1&font=KoHo&forks=1&issues=1&language=1&name=1&owner=1&pattern=Plus&pulls=1&stargazers=1&theme=Light)

## Demo

![demo](/docs/src/demo.gif)

### 与 obs 有什么不同

设计方式与 obs 无异。但该框架目的在于为各个组件之间提供统一的控制，用户可以自定义触发组件事件的条件，比如键盘按下、弹幕、送礼、甚至物件之间的交互（碰撞检测）。基于 webpage 使得她能够很方便地集成进入 obs （浏览器源），而无需使用笨重的外部软件，尽可能以最低资源占用提供丰富的功能。

## 初衷

降低直播界面制作门槛，个人用户也能更轻松的制作高度可扩展，基于[信号触发](atri-core/ext-trigger/README.md)自动事件（播放动画、声音、live2d动作）的复杂直播界面。

## Todo List

### 界面

- [x] 可视化化设计框架
- [ ] 简单易用的 “拖动-摆放” 界面设计
- [ ] 事件响应动画组件
- [ ] 更好的弹幕UI

### 信号系统

- [ ] 自动化自定义动画触发
- [ ] 自定义trigger

### Live2D

- [ ] 更低资源占用的面部捕捉
- [ ] 眼球追踪（需要硬件支持）
- [ ] 预设动作

## 云服务设计

![demo](/docs/src/struct.png)

如上图，这是一个经典的双人联动直播场景

以往的解决方案都很少能解决针对双方实时互动的需求。通过中心化，或者部分中心化，既解决了面部捕捉造成的高占用问题，也可以直接坐到双方直播界面信息的互通。

## 贡献（Contribute）

Dev docs waiting for implementation.
