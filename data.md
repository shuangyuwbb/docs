# Data in WebGL
OpenGL Shading Language提供了三种不同作用的数据存储。
## GLSL 变量
GLSL 中三种类型的”变量“，或者说数据存储类型。每一种类型都有特定的目标和使用方法

### attributes
Attrbutes可以被Javascript操作，也可以再vertex shader中被作为变量访问。Attrbutes通常被用于存储颜色、纹理坐标以及其他需要在JavaScript代码和vertex shader之间互相传递的数据。
### varyings
Varyings 在vertex shader中定义，用于从vertex shader向fragment shader传递数据。
### uniforms
Uniform 通常是由JavaScript代码设置并且在vertex shader和fragment shader 中都能访问。使用uniform设定在一帧的所有绘制中相同的数据，例如光源颜色、亮度、全局变化以及透视数据等等。
|  |Uniform|Attrbutes|
|----|-------|---------|
|定义|**全局变量**，是在渲染管线中保持不变的全局变量，可以在着色器程序执行期间保持常量值|**属性**，在OpenGL中，属性是指顶点数据的一部分，如顶点位置、颜色、法线等。
|作用范围|通常用于传递变换矩阵、光照信息以及纹理。Uniform在渲染管线任何地方都可用|通常用于给着色器来描述顶点本身特征，在顶点着色器中使用|
|更新频率|一旦设置，通常在多次绘制调用保持不变，除非显式修改|每个顶点都有自己的属性数据，在绘制不同顶点式会被更新|
|着色器中使用|可以在顶点着色器、片元着色器中使用，通常储存对整个绘图调用有效的常量|在顶点着色器中使用，可以影响顶点位置、颜色等|
|参数传递方式|通过OpenGL API函数将数据传递给着色器|通过将属性数据与顶点数组对象相关联，然后传递给顶点着色器|

## uniform4fv和uniform4f区别
||uniform4fv|uniform4f|
|--|---------|----------|
|参数形式|接受一个包含4个浮点数的数组的指针为参数|接受4个浮点数|
|使用场景|通常用于批量设置多个4维向量|适用于单个4维向量的设置|
|效率|批量处理多个uniform更加搞笑|处理单个变量时比较快捷|

## gl_PointCoord
在WebGL中，gl_PointCoord 是一个内置变量，用于确定当前像素位于绘制的点的位置。它提供了一个二维坐标，范围从(0, 0)到(1, 1)，表示当前片元相对于绘制的点的位置。这个坐标可以用来实现一些特殊效果，例如在顶点着色器中根据 gl_PointCoord 的值对点进行着色，或者在片元着色器中使用它来创建复杂的点渲染效果。

通过使用 gl_PointCoord，开发人员可以在每个绘制的点上执行更加精细的操作，从而创造出更加生动和独特的视觉效果。

## discard
discard 是在片元着色器中使用的一个关键字，它指示 GPU 废弃当前的片元，即不对当前片元进行任何处理，直接丢弃。

通常情况下，discard 用于基于一些条件来决定是否渲染当前片元。例如，可以根据特定的条件来丢弃片元，这样就可以在绘制过程中实现一些高效的优化或者创建特定的视觉效果。

## 精度
在 WebGL 的片元着色器或顶点着色器中，```precision mediump float;``` 是一个声明，用于指定浮点数的精度。这里的 mediump 表示“中等精度”，它指定了浮点数的计算精度。

在 WebGL 中，可以使用以下三种精度修饰符：

highp：高精度，通常用于最高精度要求的计算

mediump：中等精度，适合大多数一般计算

lowp：低精度，适合对精度要求不高的计算，

例如:

颜色计算
通过在片元着色器或顶点着色器开始位置声明 precision mediump float;，开发人员可以确保浮点数计算在中等精度下进行，这既可以提供足够的精度，又不会消耗过多的计算资源，从而在保证效果的同时提高性能。

## bufferData

bufferData 是 WebGL API 中用于向缓冲区对象（Buffer Object）中填充数据的方法。它通常与顶点数组一起使用，在进行绘制之前需要将顶点数据加载到 GPU 的缓冲区中。以下是 bufferData 方法的详细介绍：

```bufferData(target, data, usage)```

target: 表示目标缓冲区类型的枚举值，例如 gl.ARRAY_BUFFER 用于顶点数据，gl.ELEMENT_ARRAY_BUFFER 用于索引数据等。

data: 要存储在缓冲区中的数据，可以是一个 JavaScript 数组、TypedArray 或者 ArrayBuffer 对象。

usage: 表示数据使用方式的枚举值，例如 gl.STATIC_DRAW（数据几乎不会变化）、gl.DYNAMIC_DRAW（数据会被频繁修改）、gl.STREAM_DRAW（每帧都会修改）等。

## vertexAttribPointer

vertexAttribPointer 是 WebGL API 中用于配置顶点属性指针的方法。它告诉 GPU 如何解释存储在缓冲区中的顶点数据，以便正确地渲染图形。以下是 vertexAttribPointer 方法的详细介绍：

vertexAttribPointer(index, size, type, normalized, stride, offset)

index: 指定要配置的顶点属性的索引。

size: 指定每个顶点属性由几个分量组成，例如 2 表示二维坐标 (x, y)，3 表示三维坐标 (x, y, z) 等。

type: 指定数据类型，例如 gl.FLOAT 表示浮点数。

normalized: 表示是否需要将非浮点类型的数据标准化到固定范围内。

stride: 指定相邻两个顶点属性数据之间的字节距离，0 表示数据紧密排列。

offset: 指定起始位置的偏移量，即在缓冲区对象中从哪里开始读取数据。

### 示例用法
javascript
// 启用顶点属性数组
```gl.enableVertexAttribArray(attributeLocation);```


```
// 绑定缓冲区并配置顶点属性指针
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.vertexAttribPointer(attributeLocation, 2, gl.FLOAT, false, 0, 0);
```
以上代码演示了如何使用 `vertexAttribPointer` 方法配置顶点属性指针。首先需要启用对应的顶点属性数组，然后绑定缓冲区并使用 `vertexAttribPointer` 来告诉 GPU 如何解释该顶点属性。这通常用于将顶点位置、颜色等数据发送给 GPU 以进行渲染。