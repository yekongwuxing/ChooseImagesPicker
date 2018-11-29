/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity
} from "react-native";
import ImagePicker, { cleanSingle } from "react-native-image-crop-picker";
import Toast from 'react-native-root-toast';
const {width} = Dimensions.get('window');


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImages: [],
    };
  }
  renderAddBtn() {
    return (
      <TouchableOpacity key={"addBtn"} activeOpacity={0.6} onPress={() => {
        this.pickImage()
      }}>
        <Image source={require('./images/ic_add_pics.png')} style={styles.addPicImgBtn}/>
      </TouchableOpacity>
    );
  }
  renderImageItem(item, index) {
    let imageURI = item;
    return (
      <TouchableOpacity key={"imageItem" + index} activeOpacity={0.6} onPress={() => {
          console.log(index);
      }}>
        <Image source={imageURI} style={styles.addPicImgBtn}/>
      </TouchableOpacity>
    );
  }
  renderImageRow(arr, start, end, isSecondRow) {
    let images = [];
    // 加一是为了有个添加button
    for (let i = start; i < end + 1; i++) {
      if (i == end) {
        images.push(this.renderAddBtn());
      } else {
        images.push(this.renderImageItem(arr[i], i));
      }
    }
    let style = {};
    if (!isSecondRow) {
      style = {flexDirection: 'row'};
    } else {
      style = {flexDirection: 'row', marginTop: 10};
    }
    return (
      <View key={"imageRow" + end} style={style}>
        {images}
      </View>
    );
  }
  renderSelectedImages() {
    let row1 = [];
    let row2 = [];
    let row3 = [];
    let images = this.state.selectedImages;
    let len = images.length;
    if (len >= 0 && len <= 2) {
      row1.push(this.renderImageRow(images, 0, len, false));
    }
     else if (len > 2 && len <=  5) {
      row1.push(this.renderImageRow(images, 0, 3, false));
      row2.push(this.renderImageRow(images, 3, len, true));
    }
    else{
      row1.push(this.renderImageRow(images, 0, 3, false));
      row2.push(this.renderImageRow(images, 3, 6, true));
      row2.push(this.renderImageRow(images, 6, len, true));
    }
    return (
      <View style={styles.selectedImageContainer}>
        {row1}
        {row2}
        {row3}
      </View>
    );
  }

  pickImage() {
    if (this.state.selectedImages.length >= 9) {
      Toast.show('最多只能添加9张图片');
      return;
    }
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      multiple:true,
      maxFiles:9//ios上默认的值为5：一次选取多个图片的最大值
    }).then(images => {
      let arr = this.state.selectedImages;
      //concat把多个数组合并成一个数组
      arr = arr.concat(images.map(i => {
          return {uri:i.path}
      }));
      this.setState({selectedImages: arr});
    });
  }

  render() {
    return (
      <View
        style={styles.container}
      >
        <View style={styles.content}>
          <TextInput multiline={true} style={styles.input} underlineColorAndroid="transparent" placeholder="这一刻的想法..."
                     onChangeText={(text) => {
                       this.setState({content: text})
                     }}/>
          {this.renderSelectedImages()}
          <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 18, paddingBottom: 10}}>
            <Image source={require('./images/ic_position.png')} style={{width: 25, height: 25}}/>
            <Text>所在位置</Text>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    content: {
      backgroundColor: '#FFFFFF',
      flexDirection: 'column',
      paddingLeft: 10,
      paddingRight: 10,
    },
    input: {
        width: width - 20,
        height: 120,
        textAlignVertical: 'top',
        fontSize: 15,
      },
      selectedImageContainer: {
        width: width,
        flexDirection: 'column',
      },
      addPicImgBtn: {
        width: (width-50)/3,
        height: (width-50)/3,
        marginLeft: 10,
      },
})