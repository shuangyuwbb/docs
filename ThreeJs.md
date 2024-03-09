# ThreeJs
## 拾取方式
射线拾取（Ray Tracing）和GPU拾取（GPU Picking）都是计算机图形学中用于交互式渲染的技术。它们各自有优点和缺点，并且适用于不同的应用场景。

### 射线拾取（Ray Tracing）
#### 优点

精确性较高：能够准确模拟光线的传播路径，产生逼真的光影效果。
光线追踪：可以实现反射、折射等真实感效果。
适用范围广：可用于渲染复杂场景和真实感图形。
#### 缺点

高计算成本：对硬件要求高，需要大量计算资源来追踪光线路径，因此通常需要较长的渲染时间。
实时性差：难以实现实时渲染，特别是对于复杂场景和高分辨率的图形。
### GPU拾取（GPU Picking）
#### 优点

实时性好：适合用于实时渲染，能够快速响应用户交互。
适用于简单场景：对于简单的拾取需求和交互式应用具有良好的性能。
#### 缺点

精确度相对较低：对于一些复杂的场景和真实感图形，可能无法提供足够的精确性。
局限性：在处理复杂的光线模拟、逼真的阴影效果等方面受到局限。
#### 哪个更好？
选择射线拾取还是GPU拾取取决于具体的应用场景和需求。如果需要高度逼真的图形效果，比如视频游戏或影视特效，射线拾取可能更适合。然而，对于需要实时交互和响应的应用，例如虚拟现实或增强现实应用，则GPU拾取可能更为合适。综合考虑实时性、精确性和计算成本等因素，可以根据具体情况选择最合适的技术。
## 透视相机（PerspectiveCamera）
根据视锥范围给渲染器提供需要渲染的场景范围

实例化new THREE.PerspectiveCamera() 接受4个参数确定视锥范围，只有视锥范围内的场景才会被渲染

1.fov 摄像机视锥体垂直视野角度

2.aspect 摄像机视锥体长宽比

3.near 摄像机视锥体近面端

4.far 摄像机视锥体远面端
<image src="public/images/perpectivecamera.png" />
### 属性
- 大多数属性发生改变后，都需要调用.updateProjectionMatrix()来使得这些改变生效
- 常见属性：
1. .fov、aspect、near、far后期可以修改这四个参数，来实现动画效果

2.zoom获取或者设置摄像机的缩放倍数，默认是1

### 方法
1. `setViewOffset` 设置偏移量，对于多窗口或者多显示器的设置很有用的

2.`clearViewOffset` 清除任何由`setViewOffset`设置的偏移量

3.`getEffectiveFOV`结合`zoom`，以角度返回当前垂直视野角度

4.`updateProjectionMatrix` 更新摄像机投影矩阵，任何参数被改变以后必须被调用

### 位置
PerspectiveCamera 对象的基类是Object3D，它具有：

1.position 设置相机在三维坐标中位置
```camera.position.set(0,0,0)```

2.up设置相机拍摄时相机头顶的方向
```camera.up.set(0,1,0)```

3.lookAt设置相机拍摄时指向的方向
```camera.lookAt(0,0,0)```

## 雾化
`THREE.Fog()`
```
scene.fog = new THREE.Fog(0xffffff, 0.015, 100);
```
### 参数

三个参数分别代表：雾的颜色； 0.015是near近处的属性值； 100 是far远处的属性值

## scene 场景中常用的属性和方法
|属性（方法）|描述|
|-------|----------|
|add(object)|用于场景中添加对象。使用该方法还可以创建对象组|
|children|用于返回一个场景中所有对象的列表，包括摄像机和光源|
|getObjectByName(name, recursive)|在创建对象可以制定唯一标识name，使用该方法可以查找特定名字的对象，当参数recursive设置为false时，在调用者子元素上查找，当recursive设置为true时，在调用者后代中查找|
|remove(object)|object为场景中对象的引用，使用该方法可以将对象从场景中移除|
|traverse(function)|children属性可以返回场景中多有物体，该方法也可以遍历调用者和调用者的所有后代，function参数是一个函数，被调用者和每一个后端对象调用function方法|
|fog(color, near, far)|在场景中添加雾化效果|
|overrideMaterial|强制场景中的所有物体使用相同的材质|

## 不同种类的光
|名字|描述|
|----|----|
|THREE.AmbientLight|环境光，基本光源，该光源的颜色会叠加在场景中物体的颜色上|
|THREE.PointLight|点光源，从空间一点向所有方向发射，点光源不能产生阴影|
|THREE.SpotLight|聚光光源，类似于手电筒，可以产生阴影|
|THREE.DirectionalLight|无限光，平行光，类似太阳光，可以产生阴影|
|THREE.HemisphereLight|特殊光源，可以模拟反光面和光线微弱的天空来创建更加自然的室外光线|
|THREE.AreaLight|制定发散光线的平面，而不是一个点|
|THREE.LensFlare|种光源，可以为场景中光源添加镜头光晕的效果|

## 射线拾取
射线拾取就是根据射线和物体碰撞，拾取对应的物体
 * 注意：从屏幕坐标换算到webgl坐标，如果换算不对，射线拾取会出现‘隔山打牛’的现象； 我最开始没有将body的padding去掉，导致排查了好久才发现问题。 
### 示例代码
```
// 鼠标选中某一个模型，将其颜色改为红色，再次点击恢复为原来的颜色
renderer.domElement.addEventListener('click', function (event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  const raycaster = new THREE.Raycaster()
  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(objects)
  if (intersects.length) {
    let selectedObject = intersects[0].object
    if (selectedObject.isSelected) {
      selectedObject.material.color.set(selectedObject.oldColor)
      selectedObject.isSelected = false
      return
    }
    selectedObject.oldColor = selectedObject.material.color.getHex()
    selectedObject.material.color.set(0xff0000)
    selectedObject.isSelected = true
  }
})
```

## GPU拾取
### 原理
GPU拾取原理基于渲染器的renderTarget，它允许将场景渲染到一个纹理（texture）上。我们可以将每个物体关联到一个唯一的颜色，在渲染时，将唯一的颜色赋予每个物体，然后渲染到renderTarget。当用户点击屏幕上的一个像素位置时，我们可以从renderTarget中读取该像素的颜色，并通过该颜色值来确定被点击的物体。




## 加载stl模型
STLLoader是threeJs扩展库提供的类，用来加载stl格式的模式, 实例上的load方法用来加载模型
### 参数
|参数/方法|类型|用法|
|---|------|------|
|url|string|模型的路径，可以是绝对路径，也可以是相对路径|
|onLoad|Function|模型加载成功的回调|
|onProgress|Function|加载模型过程的回调，可以输出加载进度|
|onError|Function|加载报错时的回调|
### 实例代码
```
// 加载切割头模型，并且添加到场景中
loader.load('CutHead.stl', function (geometry) {
  // 镜面高光的光泽表面材质
  const material = new THREE.MeshPhongMaterial({
    color: 0x156289,
    emissive: 0x072534,
    side: THREE.DoubleSide
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.name = 'cuthead'
  mesh.position.set(0, -20, 0)
  mesh.rotateX(-Math.PI / 2)
  mesh.rotateY(Math.PI / 4)
  scene.add(mesh)
},function(event){

}, function(err){
    console.log(err)
})
```



