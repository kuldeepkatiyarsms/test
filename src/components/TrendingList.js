import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, ImageBackground, Linking, FlatList } from 'react-native';
import { Loader } from './GeneralComponents';
import {
  img_url, api_url,
  font_title,
  font_description,
  home_details,
  Lato_Regular,
  Lato_Bold,
  Roboto,
  getSizeHeight,
  getSizeWidth,
  getFontRatio,
  screenWidth
} from '../config/Constants';
import ListImages from '../config/SVG/ListImages';
import * as colors from '../assets/css/Colors';
import { Container, Content, } from 'native-base';
import { videoimg_one, videoimg_two } from '../config/Constants';

export default class TrendingList extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {

      HbplusData: [{ 'image': videoimg_one, 'username': 'Rashi Kathuria', 'Description': 'An online entrepreneur and homemaker who lost 17 kg while struggling with PCOD\n "If I could do it, I believe anybody can. All you need is dedication and the right kind of guidance like Holy basil.' },
      { 'image': videoimg_two, 'username': 'Rashi Kathuria', 'Description': 'An online entrepreneur and homemaker who lost 17 kg while struggling with PCOD\n "If I could do it, I believe anybody can. All you need is dedication and the right kind of guidance like Holy basil.' },
      { 'image': videoimg_one, 'username': 'Rashi Kathuria', 'Description': 'An online entrepreneur and homemaker who lost 17 kg while struggling with PCOD\n "If I could do it, I believe anybody can. All you need is dedication and the right kind of guidance like Holy basil.' },
      { 'image': videoimg_two, 'username': 'Rashi Kathuria', 'Description': 'An online entrepreneur and homemaker who lost 17 kg while struggling with PCOD\n "If I could do it, I believe anybody can. All you need is dedication and the right kind of guidance like Holy basil.' }
      ]
    };
  }






  async componentDidMount() {

  }

  componentWillUnmount() {

  }



  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: getSizeHeight(25), marginBottom: getSizeHeight(18) }}>
          <Text style={[{ fontFamily: Lato_Bold, fontSize: getFontRatio(16), lineHeight: 15.22, color: '#1D5471', marginHorizontal: getSizeWidth(6), }]}>{'#trending content'}</Text>
          <Text style={[{ fontFamily: Lato_Bold, fontSize: getFontRatio(16), lineHeight: 15.22, color: '#2DC9D6', marginHorizontal: getSizeWidth(10), }]}>{'View all'}</Text>


        </View>

        <FlatList
          numColumns={2}
          data={this.state.HbplusData}
          renderItem={item => this.renderPhoto(item)}

        />

      </View>
    );
  }
  renderPhoto = ({ item, index }) => {
    return (
      <View
      >
        <Image
          style={styles.imageThumbnail}
          source={item.image}
        />
      </View>

      // <View >
      //   <Image style={{}}  source={item.image}></Image>

      // </View>
    )
  }

}

const styles = StyleSheet.create({

  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: getSizeHeight(176),
    marginLeft: getSizeWidth(5),
    marginRight: getSizeWidth(5),
    marginBottom: getSizeWidth(5),
    marginTop: getSizeWidth(5),
    borderRadius: getSizeWidth(10),
    width: screenWidth / 2 - getSizeHeight(20)
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

