# WebGPU

## GPU概念解释
所谓GPU就是图形处理器，具体一点就是你电脑的显卡，如果为了追求更好的性能，一般会在电脑上安装独立显卡。
## GPU设备对象
创建GPU设备对象device非常简单，执行navigator.gpu.requestAdapter()和adapter.requestDevice()两步即可完成。
这两个都是异步函数。
```
const adapter = await navigator.gpu.requestAdapter();

const device = await adapter.requestDevice();
```
