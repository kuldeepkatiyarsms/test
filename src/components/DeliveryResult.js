import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, ImageBackground,Linking ,FlatList} from 'react-native';
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
import Bracket from '../config/SVG/Bracket';
import * as colors from '../assets/css/Colors';
import { Container, Content, } from 'native-base';
import { Bitmapuser } from '../config/Constants';

export default class DeliveryResult extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      banners: [],
      category: [],
      symptoms_first: [],
      symptoms_second: [],
      doctors: [],
      home_result: [],
      isLoding: false,
      mobileNo:'9958146091',
      message:'',
      HbplusData:[{'image':Bitmapuser,'username':'Rashi Kathuria','Description':'An online entrepreneur and homemaker who lost 17 kg while struggling with PCOD\n "If I could do it, I believe anybody can. All you need is dedication and the right kind of guidance like Holy basil.'},
      {'image':Bitmapuser,'username':'Rashi Kathuria','Description':'An online entrepreneur and homemaker who lost 17 kg while struggling with PCOD\n "If I could do it, I believe anybody can. All you need is dedication and the right kind of guidance like Holy basil.'},
      {'image':Bitmapuser,'username':'Rashi Kathuria','Description':'An online entrepreneur and homemaker who lost 17 kg while struggling with PCOD\n "If I could do it, I believe anybody can. All you need is dedication and the right kind of guidance like Holy basil.'},
      {'image':Bitmapuser,'username':'Rashi Kathuria','Description':'An online entrepreneur and homemaker who lost 17 kg while struggling with PCOD\n "If I could do it, I believe anybody can. All you need is dedication and the right kind of guidance like Holy basil.'}
    ]
    };
  }




  

  async componentDidMount() {
    
  }

  componentWillUnmount() {
   
  }

  

  render() {
    return (
      <View style={{flexDirection:'column'}}>
          <Text style={[{ fontFamily: Roboto, fontSize: getFontRatio(15), lineHeight: 15.22, color: '#1D5471', marginHorizontal: getSizeWidth(16), marginTop: getSizeHeight(35) }]}>{'HB Plus Delivers Results'}</Text>
          <Text style={[{marginBottom:getSizeHeight(24), fontFamily: Roboto, fontSize: getFontRatio(14), lineHeight: 15.22,  marginHorizontal: getSizeWidth(16), marginTop: getSizeHeight(5),opacity:0.8,color:'#2D3E4D' }]}>{'From weight loss to reversing lifestyle diseases, we have transformed many lives!'}</Text>

    <View style={{height:getSizeHeight(125),marginBottom:20 }}>

       <FlatList
            horizontal
            pagingEnabled={true}
            snapToInterval={screenWidth-getSizeWidth(80)}
            showsHorizontalScrollIndicator={false}
            legacyImplementation={false}
            data={this.state.HbplusData}
            renderItem={item => this.renderPhoto(item)}

          />
          
          </View>
         
      </View>
    );
  }
  renderPhoto = ({ item, index }) => {
    return (
      <View style={{ width: screenWidth-getSizeWidth(80), marginLeft: getSizeWidth(15), backgroundColor: '#FFF9ED', borderRadius: getSizeWidth(7), }}>
        <View style={{  justifyContent: 'center', alignItems: 'center', flexDirection:'row'}}>
        <Image
                style={{height:getSizeHeight(125),width:getSizeWidth(70)}}
                source={item.image}
              />
              <View style={{flexDirection:'column',width:'80%'}}>
              <View style={{flexDirection:'row',justifyContent:'space-between',marginRight:getSizeWidth(10)}}>
              <Text style={[{ fontFamily: Roboto, fontSize: getFontRatio(11),   marginHorizontal: getSizeWidth(16),color:'#000000'}]}>{item.username}</Text>
              <Bracket></Bracket>
                </View>
              <Text style={[{fontFamily: Roboto, fontSize: getFontRatio(10), lineHeight: 14.22,  marginHorizontal: getSizeWidth(16), marginTop: getSizeHeight(5),color:'#2D3E4D' }]}>{item.Description}</Text>

              </View>

        </View>
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
  home_style1: { marginHorizontal: getSizeWidth(16.56), flexDirection: 'row', height: getSizeHeight(56), justifyContent: 'space-between', alignItems: 'center' },
  home_style1Book: { backgroundColor: '#FFF8F8', flexDirection: 'row', marginHorizontal: getSizeWidth(16), borderRadius: getSizeWidth(10), borderWidth: 1, borderColor: '#F18261', height: getSizeHeight(80), alignItems: 'center', marginTop: getSizeHeight(10), },

  home_style2: { borderRadius: 10 },
  home_style3: { height: 140, width: 260, borderRadius: 10, marginRight: 10 },
  home_style4: { marginTop: 30 },
  home_style5: { fontFamily: font_title, fontSize: 18, color: colors.theme_fg_two, marginLeft: 15 },
  home_style6: { margin: 5 },
  home_stylePrvent6: { borderRadius: getSizeWidth(5), flexDirection: 'column', height: getSizeHeight(272), backgroundColor: '#F5FAFF', marginHorizontal: getSizeWidth(16), marginTop: getSizeHeight(10) },
  home_style1TitlePrevent: { fontSize: getFontRatio(20), color: '#2D3E4D', fontFamily: Lato_Regular },
  home_style1TitlePreventButtonText: { fontSize: getFontRatio(14), color: '#2D3E4D', fontFamily: Roboto },

  home_style7: { flexDirection: 'row' },
  home_style8: {
    borderColor: colors.theme_fg_three,
    borderWidth: 1,
    height: 105,
    width: 105,
    marginRight: 10,
    alignSelf: 'center',
    borderRadius: 30,
    backgroundColor: colors.theme_bg,
    justifyContent: 'center'
  },
  home_style1Top: { height: 20, width: 155 },
  home_style1Title: { marginTop: getSizeHeight(6), alignSelf: 'flex-start', fontSize: getFontRatio(17), lineHeight: 21.6, color: colors.theme_bg_dark, fontFamily: Lato_Bold },
  home_style1SubTitle: { lineHeight: 18, alignSelf: 'flex-start', fontSize: getFontRatio(15), color: colors.theme_bg_dark, fontFamily: Lato_Regular, marginTop: getSizeHeight(2) },


  home_style9: { alignSelf: 'center', height: 50, width: 50 },
  home_style10: { alignSelf: 'center', fontSize: 14, color: colors.theme_fg_three, marginTop: 10, fontFamily: font_description },
  home_style11: { margin: 15 },
  home_style12: { backgroundColor: colors.theme_bg, width: '100%', borderRadius: 20, padding: 10, alignSelf: 'center', fontFamily: font_title },
  home_style13: { fontSize: 16, color: '#FFFFFF', alignSelf: 'center', fontFamily: font_title },
  home_style14: { margin: 15 },
  home_style15: { height: "100%", width: "60%", alignSelf: 'center' },
  home_style16: { fontFamily: font_title, fontSize: 18, color: colors.theme_fg_two, marginLeft: 15 },
  home_style17: { margin: 3 },
  home_style18: { flexDirection: 'row' },
  home_style19: { borderRadius: 20, marginLeft: 5 },
  home_style20: {
    borderColor: colors.theme_fg_three,
    borderWidth: 1,
    height: 80,
    width: 80,
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: colors.theme_bg_three,
    padding: 12
  },
  home_style21: { alignSelf: 'center', height: 50, width: 50 },
  home_style22: { alignSelf: 'center', fontSize: 14, color: colors.theme_fg_two, padding: 5, fontFamily: font_description },
  home_style23: { margin: 5 },
  home_style24: { flexDirection: 'row' },
  home_style25: { borderRadius: 20, marginLeft: 5 },
  home_style26: {
    borderColor: colors.theme_fg_three,
    borderWidth: 1,
    height: 80,
    width: 80,
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: colors.theme_bg_three,
    padding: 12
  },
  home_style27: { alignSelf: 'center', height: 50, width: 50 },
  home_style28: { alignSelf: 'center', fontSize: 14, color: colors.theme_fg_two, padding: 5, fontFamily: font_description },
  home_style29: { margin: 13 },
  home_style30: { height: "100%", width: "80%", alignSelf: 'center', marginTop: 10 },
  home_style31: { fontFamily: font_title, fontSize: 18, color: colors.theme_fg_two, marginLeft: 15 },
  home_style32: { height: "100%", width: "20%", alignSelf: 'center', marginTop: 15 },
  home_style33: { alignSelf: 'center', fontSize: 12, color: colors.theme_fg_two, marginLeft: 20, fontFamily: font_description },
  home_style34: { margin: 3 },
  home_style35: { flexDirection: 'row' },
  home_style36: { width: 200, borderRadius: 10 },
  home_style37: { alignItems: 'center', justifyContent: 'center', padding: 10, fontFamily: font_description },
  home_style38: { margin: 5 },
  home_style39: { fontSize: 16, color: colors.theme_fg_two, fontFamily: font_description },
  home_style40: { margin: 2 },
  home_style41: { fontSize: 14, color: colors.grey, fontFamily: font_description },
  home_style42: { margin: 2 },
  home_style43: { borderBottomWidth: 1, borderColor: colors.grey, width: '100%', margin: 10 },
  home_style44: { fontSize: 14, color: colors.theme_fg_two, fontFamily: font_title },
  home_style45: { margin: 10 },

});

