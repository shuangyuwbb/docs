# 模型、视图、投影矩阵
WebGL空间中的点和多边形的个体转换由基本的转换矩阵（平移、缩放和旋转）处理。将这些矩阵组合在一起并以特殊方式分组，以使其用于渲染复杂的3D场景。这些组合的矩阵最终将原始数据类型移动到一个称为裁剪空间的特殊坐标空间中。这是一个中心点位于（0，0，0），角落范围在（-1，-1，-1）到（1，1，1）之间，2个单位宽的立方体。该裁剪空间被压缩到一个二维空间并栅格化为图像。

## 矩阵
### 模型矩阵
定义了如何获取原始模型数据并将其在3D世界中移动。
### 投影矩阵
用于将世界坐标转换为裁剪空间坐标
### 视图矩阵
负责移动场景中的对象以模拟相机位置的变化，改变观察者当前能够看到的内容。
### 缩放矩阵

### 旋转矩阵

### 平移矩阵

## 为什么矩阵如此重要
矩阵之所以重要，是因为它可以用少量的数字描述大量的空间的变换，并且可以轻易的在程序间共享。矩阵可以不同的坐标空间，甚至一些矩阵乘法可以将一组数据从一个坐标空间映射到另一个坐标空间。矩阵可以高效的保存生成它的每一步变换。



## 裁剪空间
在WebGL程序中，数据通常上传到具有自己的坐标系统的GPU上，然后顶点着色器将这些点转换到一个称为**裁剪空间**的特殊坐标系中。延展到裁剪空间之外的任何数据都会被裁剪并且不会被渲染。如果一个三角形超出该空间的边界，则将其裁剪成新的三角形，并且保留新三角形在裁剪空间的部分。

<image src="/public/images/clip_space_graph.svg" />
**裁剪空间**使用的这两个立方米坐标系称为**归一化设备坐标**