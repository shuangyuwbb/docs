# WebGL 案例
## WebGL初始化流程
### 创建WebGL对象
```
const canvas = document.getElementById('webgl')
const gl = canvas.getContext(webgl)
```
### 定义着色器源码
```
const vsSource = `
void main(){

}`
const fsSource = `
void main(){
    gl_FragColor = vrc4(1.0, 0.0, 0.0, 1.0);
}`
```
### 创建着色器
```
const vsShader = gl.createShader(gl.VERTEX_SHADER)
const fsShader = gl.createShader(gl.FRAGMENT_SHADER)
```
### 设置着色器GLSL代码程序
```
gl.shaderSource(vsShader. vsSource)
gl.shaderSource(fsShader. fsSource)
```
### 编译着色器
```
gl.compileShader(vsShader)
gl.compileShader(fsShader)
```
### 创建着色器程序
```
const shaderProgram = gl.createProgram()
```
### 将着色器添加到着色器程序中
```
gl.attachShader(shaderProgram, vsShader)
gl.attachShader(shaderProgram, fsShader)
```
### 链接给定的着色器程序
```
gl.linkProgram(shaderProgram)
```


## 创建一个Canvas画布
创建一个Canvas画布，用于显示WebGL的渲染结果，canvas元素和div元素一样，区别在于这个元素有2D和3D的绘图功能
```
<canvas id="webgl" width="500" height="500"></canvas>
```

## 获取webgl上下文
通过getElementById()方法获取canvas画布对象
```
<script>
    const canvas = document.getElementById('webgl')
</script>
```
通过。getContext()获取WebGL上下文，然后可以通过返回的对象gl调用WebGL API，实现3D绘图。
```
const gl = canvas.getContext(webgl)
```
通过gl对象，可以调用各种WebGL API，通过这些API控制显卡GPU绘制3D图案。
```
const gl = canvas.getContext('webgl')
gl.drawArrays()
gl.createShader()
gl.shaderSource()
gl.createProgram()
gl.attachShader()
gl.linkProgram()
gl.useProgram()
```
## 渲染管线概念
入门WebGL，比较重要的一点就是简历然然管线的概念。
渲染管线可以想象为显卡GPU的一条流水线，渲染管线上有不同的功能单元。WebGL渲染管线上的各个功能单元，可以通过WebGL API进行控制。

<image src="/public/images/渲染管线.png" />

### 渲染管线解释
WebGL的渲染管线是用于生成3D图形的过程。
#### 顶点着色器（Vertex Shader）
- 1.输入：该阶段接收顶点数据作为输入，通常包括顶点位置、颜色和法线等。
- 2.处理：通过应用xian变换矩阵来转换顶点位置，并行行其他数学计算。
- 3.输出：将处理后的顶点数据传递给下一阶段。

#### 图元装配（primitive Assembly）
- 1.输入：接收顶点着色器输出的顶点数据
- 2.处理：将顶点组装成几何图元，如点、线或者三角形等。

#### 几何着色器（Geometry Shader）【可选】
- 1.输入：接收图元装配模块输出的几何图元
- 2.处理：可以在此阶段对几何图元进行额外的处理，如创建新的顶点或图元。
- 3.输出：将处理后的图元传递给下一个阶段。

#### 光栅化（Rasterization）
- 1.输入：将几何着色器（有）或者图元装配图元信息。
- 2.处理：将图元信息转换到屏幕上的像素。
- 3.输出：将片段传给片元着色器。

#### 片元着色器（Fragment Shader）
- 1.接受光栅化模块输出的片段数据
- 2.根据片段的属性（颜色、纹理坐标等），进行光照计算和纹理采样等操作。
- 3.输出：生成最终的颜色值，传递给下一阶段。

#### 像素操作（Pixel Operations）
- 1.输入：接收片元着色器输出的颜色值。
- 2.处理：进行深度测试、模板测试等操作。
- 3.输出：将最终的颜色值写入帧缓存中，最终呈现再屏幕上。


## 顶点着色器
顶点着色器是用于处理3D模型中每个顶点的程序。当3D模型数据被渲染时，它会对每个顶点进行计算，包括位置、颜色和纹理坐标等属性。顶点着色器可以进行诸如位置顶点坐标系、光照计算等操作。其主要功能时将输入 的顶点信息转换为屏幕空间的坐标，在哪里渲染像素。
编写顶点着色器需要用到GLSL ES
在js代码中，着色器GLSL代码要使用字符串的形式表示。
```
const vertexShaderSource = `编写GLSL ES 代码`
```
按照着色器的语言习惯，创建一个名为main的主函数，使用关键字void，表示没有返回值
```
const vertexShaderSource = `
void main(){

}
`
```
`gl_PointSize`和`gl_Position`是内置变量，就是不需要声明可以直接使用
`gl_POintSize`表示渲染点的像素大小，注意用的是浮点类型
`gl_Position`表示顶点的位置，值是四维向量`vec4`，比如表示(x, y, z)坐标，书写形式是vec4(x, y, z, 1.0)，按照语法规范定，前面三个参数表示xyz的坐标，最后一个参数是固定的1.0
```
// 顶点着色器源码
const vertexShaderSource = `
void main(){
    gl_PointSize = 20.0;
    gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
}
`
顶点着色器代码就是在GPU上的顶点着色器功能单元执行。
```

## 片元着色器

片元着色器代码在GPU上的片元着色器功能单元执行。
内置变量`gl_FragColor`用来设置片元（像素）颜色
`gl_FragColor`的值是四维向量`vec4`，前面三个参数是颜色RGB值，第四个参数是透明度值。
```
const fragShaderSource = `
void main(){
    gl_FragColor = vrc4(1.0, 0.0, 0.0, 1.0);
}
`
```

## 片元着色器
片元着色器（也称像素着色器）是用于处理3D模型表面上每个像素的程序，它负责计算输出到屏幕上的最终像素颜色。片元着色器通常根据顶点着色器传递过来的数据以及光照、纹理等信息来确定某个像素的最终颜色值。


## 顶点着色器和片元着色器区别
- 作用对象：顶点着色器作用于每个顶点，而片元着色器则作用域每个像素。
- 功能：顶点着色器负责位置变换、法线变化等工作，而片元着色器负责计算像素最终的颜色。

## 编译着色器，并创建程序对象
顶点着色器、片元着色器代码如果想要在GPU上执行，需要先通过WebGL API进行编译处理，并创建一个程序对象program。
```
// 创建着色器
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
// 引入着色器源码
gl.shaderSource(vertexShader, vertexShaderSource);
gl.shaderSource(fragmentShader, fragmentShaderSource);
// 编译着色器
gl.compileShader(vertexShader);
gl.compileShader(fragmentShader);

// 创建程序对象
const program = gl.createProgram();

// 附着着色器到程序上
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);

// 链接程序program
gl.linkProgram(program);

//使用program
gl.useProgram(program);
```
## 实例方法
### attachShader
该方法负责往WebGLProgram添加一个片段或者顶点着色器
#### 语法
```void gl.attachShader(program, shader);```

#### 参数
program：一个WebGLProgram对象
shader：类型为片段或者顶点的WebGLShader
#### 示例
```
var program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

```
### clear
该方法使用预设值来清空缓存。
预设值可以使用clearColor、clearDept、clearStencil设置
裁剪、抖动处理和缓存写入遮罩会影响clear方法
#### 语法
```void gl.clear(mask);```
#### 参数
mask：一个用于指定需要清除的缓冲区。可能的值有：
- gl.COLOR_BUFFER_BIT // 颜色缓冲区
- gl.DEPTH_BUFFER_BIT // 深度缓冲区
- gl.STENCIL_BUFFER_BIT // 模板缓冲区

#### 示例
```
gl.clear(gl.DEPTH_BUFFER_BIT);
gl.clear(gl.DEPTH_BUFFER_BIT | GL.COLOR_BUFFER_BIT);
```
要获得当前的清除值，传入对应的常量
```
gl.getParameter(gl.COLOR_BUFFER_BIT);
gl.getParameter(gl.DEPTH_CLEAR_VALUE);
gl.getParameter(gl.STENCIL_CLEAR_VALUE);
```
### clearColor
该方法用于设置清空颜色缓冲区的颜色值
#### 语法
```void gl.clearColor(red, green, blue, alpha);```
#### 参数
red, green, blue 红绿蓝的色值，默认值为0
alpha 指定缓冲区不透明度，默认为0
#### 示例
```gl.clearColor(1, 0.5, 0.5, 3);```
想要获取当前清除颜色，传入COLOR_CLEAR_VALUE常量，返回 Float32Array
```
gl.getParameter(gl.COLOR_CLEAR_VALUE)
```
### clearDepth
用于色湖之深度缓冲区的深度清除值
这个深度清除值得设定，是为了调用clear得时候是哟个，范围是0~1.
#### 语法
```void gl.clearDepth(depth);```
#### 参数
深度值设定，默认值为1
#### 示例
```gl.clearDepth(0.5);```
获取当前深度值，查询DEPTH_CLEAR_VALUE常量
```gl.getParameter(gl.DEPTH_CLEAR_VALUE);```
### compileShader
用于编译个GLSL着色器，使其成为二进制数据，然后就可以被WebGLProgram对象使用。
#### 语法
```void gl.compileShader(shader);```
#### 参数
shader： 一个片元或者顶点着色器
#### 示例
```
var shader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(shader, shaderSource);
gl.compileShader(shader);
```
### WebGLProgram
用于 创建和初始化一个WebGLProgram对象
#### 语法
```WebGLProgram gl.createProgram();```
#### 返回值
一个WebGLProgram对象由两个编译后得WebGLShader（顶点着色器和片段着色器）组成。这些组成一个可用得WebGL着色器程序。
#### 示例
创建一个WebGL着色器程序
```
var program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
```
### WebGLShader
可以是一个顶点着色器（vertex shader）或片元着色器（fragmentShader）。每个WebGLProgram都需要这两种类型得着色器。
#### 描述
要创建一个WebGLShader需要使用createShader，通过shaderSource然后挂接GLSL源代码，最后调用compileShader完成着色器的编译。此时WebGLShader仍是不可用的形式，它需要被添加到一个WebGLProgram里面。
#### 示例
```
function createShader(gl, sourceCode, type){
    var shader = gl.createShader(type);
    gl.shaderSource(shader, sourceCode);
    gl.compileShader(shader);
    return shader;
}
```
### createShader
用于创建一个着色器对象，该对象可以使用shaderSource和compileShader方法配置着色器代码。
#### 语法
```WebGLShader gl.createShader(type);```
#### 参数
参数为gl.VERTEX_SHADER或者gl.FRAGMENT_SHADER两者中一个。
### deleteShader
用于删除一个参数提供的WebGLShader对象。如果该对象已经删除，该方法不会有任何作用。
#### 语法
```void gl.deleteShader(shader);```
#### 参数
shader： 需要被删除的WebGLShader对象。
#### 示例
删除一个着色器

```gl.deleteShader(shader);```
### drawArrays
用于从向量数组中绘制图元。
#### 语法
void gl.drawArrays(mode, first, count);
#### 参数
mode：
- gl.POINTS: 绘制一系列点。
- gl.LINE_STRIP: 绘制一个线条，上一个点连接下一个点。
- gl.LINE_LOOP: 绘制一个线圈。
- gl.LINES:绘制一系列单独线段。每两个作为端点，线段之间不连接。
- gl.TRIANGLE_STRIP:绘制一个三角带。
- gl.TRIANGLE_FAN:绘制一个三角扇。
- gl.TRIANGLES: 绘制一系列三角形，每三个点作为顶点。
first：
- 指定从哪个点开始绘制。

count：
- 指定绘制多少个点
#### 示例
```gl.drawArrays(gl.POINTS, 0, 8);```

## 疑难API
### vertexAttrib
vertexAttrib3f 和 vertexAttrib2f 都是 WebGL 中用于设置顶点属性的函数，它们之间的主要区别在于如何设置顶点的维度。

vertexAttrib3f 用于设置三维顶点属性，即 x、y 和 z 坐标。

vertexAttrib2f 用于设置二维顶点属性，即 x 和 y 坐标。

vertexAttrib1f 用于设置顶点的单一数值属性，通常被用于设置例如顶点的透明度或者其他只需要一个数值的属性。