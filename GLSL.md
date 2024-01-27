# 着色器GLSL（OpenGL Shading language）语言

JavaScript、C、java等语言是在CPU上执行的，对于着色器语言GLSL ES是在显卡GPU上执行的。

## GLSL ES 基础数据类型
着色器语言GLSL的基本数据类型和C语言一样具有常见的整型数`int`、浮点数`float`和布尔值`bool`类型数据

|关键字|数据类型|值|
|------|--------|--|
|int   |整型数  |值为整型，比如1、2、3。。。|
|float|单精度浮点数|浮点数用小数点表示， 比如0.5、0.8|
|bool|布尔值|布尔变量的值为true或者false|

### 用法
```
// 声明一个整型变量
int count = 10;
//浮点数变量
float num = 10.0;
// 布尔值变量
bool lightBool = true;
```
先声明变量，后赋值改变
```
float c;
c = 10.1;
```
改变变量的值
```
float count = 100.2;
count = 110.1;
```
::: warning
- 注：变量赋值要和变量类型对应
:::
错误赋值
```
float num = 1;
```
正确赋值
```
float num = 1.0;
```
变量运算
```
float a = 1.0;
float b = 2.0;
float c = a + b;
```
::: warning
- 注：两个变量运算需要保持一样的数据类型，否则会报错。
:::

## 声明一个常量
着色器语言和C语言、JavaScript语言一样可以通过关键字`const`声明一个常量
```
// 定义一个整型常量
const int count = 10;
// 定义一个浮点型常量
const float count = 10.0;
```
## 常量不可更改
着色器语言和其他语言一样，声明常量是不允许再次修改的

## 声明函数
函数计算后需要返回值，通过关键字`return`返回，不过注意声明函数的时候，函数需要声明返回值类型
```
// 两个参数是浮点型，相加后返回的值也是浮点型
float add(float x, float y){
    return x + y;
}
```
声明一个无返回值的函数用`void`关键字
```
void main(){
    float x = 10.0;
}
```
## if语句
着色器语言中的`if`、`for`语句的使用和`JavaScript`语言、`C`语言中的执行逻辑规则基本一致
单独使用if语句
```
float x = 10.0;
if(x > 100.0){
    x = 100.0;
}
```

`if-else`语句
```
float x = 1.0;
fi(x > 100.0){
    x = 100.0;
}else{
    x = x + 10.0;
}
```
## continue和break关键字
着色器语言`continue`和`break`关键字和`JavaScript`语言习惯也是相似的。
`break`表示终止`for`循环执行
`continue`宝石直接跳到`for`循环的下一个循环

## 向量表示颜色
在GLSL 中向量可以表示多种数据，也能进行多种数学运算。
`vec3`、`vec4`关键字和`int`、`float`一样也是用来表示数据的类型，`vec3`表示三维向量、`vec4`表示四维向量。
`vec3`和`vec4`的每个分量都是浮点数`float`。
```
// 四维向量有四个分量，可以用来表示颜色的 R、G、B、A
vec4 color = vec4(1.0, 0.0, 0.0, 1.0);
```
|关键字|数据类型|
|------|--------|
|vec2|二维向量，具有xy两个分量，分量是浮点数|
|vec3|三维向量，具有xyz三个分量，分量是浮点数|
|vec4|思维向量，具有xyzw四个分量，分量是浮点数|
|ivec2|二位向量，分享是整型数|
|ivec3|三维向量，分量是整型数|
|ivec4|四维向量，分量是整型数|
|bvec2|二维向量，分量是布尔值`bool`|
|bvec3|三维向量，分量是布尔值`bool`|
|bvec4|四维向量，分量是布尔值`bool`|

## 向量表示顶点坐标
三维向量vec3表示变量pos具有三个分量，可以用来表示顶点的xyz坐标
```
vec3 pos = vec3(1.0, 2.0, 3.0);
```
用四维向量vec4表示齐次坐标，所谓齐次坐标就是在GLSL ES 中表示一个顶点坐标的时候，增加一个分量，1.0表示。
```
vec4 pos = vec4(1.0, 2.0, 3.0, 1.0);
```

一个三维向量转化为四维向量
```
vec3 pos = vec3(1.0, 2.0, 3.0);
vec4 new Pos = vec4(pos, 1.0);
```
一个二维向量转为四维向量
```
vec2 = pos = vec2(1.0, 2.0);
vec4 newPos = vec4(pos, 3.0, 1.0);
```
## 内置变量
使用GLSL 变量，需要先声明
```
float a = 2.0;
float b = 4.0;
float c = a + b;
```
内置变量就是着色器语言默认提供的变量，不需要声明，就可以直接使用。
- gl_PointSize： 点渲染像素大小，数据类型`float`
- gl_Position： 顶点坐标，数据类型为四维向量 `vec4`
- gl_FragColor: 像素颜色，数据类型四维向量 `vec4`
```
赋值浮点数
gl_PointSize = 20.0;
```
vec4前面三个参数表示xyz坐标，第四个参数按照GLSL ES语法需要设置为1.0
```
// 赋值四维向量，表示xyz坐标原点
gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
```
vec4前面三个参数是颜色RGB值，第四个参数是透明度值
```
// 赋值四维向量，表示红色不透明
gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
```
## GLSL ES代码注释
GLSL ES 代码注释和JavaScript语言的习惯一样
- 单行注释符号 //
- 块级注释符号 /* */

## GLSL ES 语句结尾分号
在JavaScript中，代码语句结尾分号是可以省略的，但是在GLSL ES 中分号不能省略。不加分号会报错。
```
float a = 2.0;
```













