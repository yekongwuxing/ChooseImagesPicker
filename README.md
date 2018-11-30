# ChooseImagesPicker
九宫格多选图片\
使用react-native-image-crop-picker多图片选择\
npm install --save react-native-image-crop-picker 导入第三方库\
react-native link 链接 \
配置了iOS端 \
1、添加相机、相册权限\
![image](./1.png)\
2添加RSXImageCropper.framework和QBImagePicker.framework\
配置Android端\
1、打开app下的build.gradle，在android / defaultConfig / 节点下添加useSupportLibrary\

android {
    ...

    defaultConfig {
        ...
        vectorDrawables.useSupportLibrary = true
        ...
    }
    ...
}\
2、打开AndroidManifest.xml配置文件，添加相机权限\

<uses-permission android:name="android.permission.CAMERA"/>

