import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, ImageBackground, Linking } from 'react-native';
import { Loader } from '../components/GeneralComponents';
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
  screenWidth,
  BasicPlan,
  AdvancePlan
} from '../config/Constants';
// import { HolyBasilsvg} from '../config/Icons';
import HolyBasilsvg from '../config/holyBasilsvg';
import Notification from '../config/Notification';
import BookIcon from '../config/BookIcon';
import Next from '../config/Next';
import PreventReverse from '../config/SVG/PreventReverse';
import WeightMangement from '../config/SVG/WeightMangement';
import BookASlot from '../config/SVG/BookASlot';
import ListImages from '../config/SVG/ListImages';
import Phone from '../config/SVG/Phone';
import Chat from '../config/SVG/Chat';
import UserImage from '../config/SVG/UserImage';
import BackDetails from '../config/SVG/BackDetails';
import Doctor from '../config/SVG/Doctor';
import VideoList from '../components/VideoList';
import DeliveryResult from '../components/DeliveryResult';
import TrendingList from '../components/TrendingList';
// import BasicPlan from '../config/SVG/BasicPlan';
// import AdvancePlan from '../config/SVG/AdvancePlan';

import Mask from '../config/SVG/Mask';




import * as colors from '../assets/css/Colors';
import axios from 'axios';
import { Container, Content, Row, Col, Card, Thumbnail } from 'native-base';
import { Rating } from 'react-native-ratings';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { FlatList } from 'react-native';
import Support from '../config/SVG/Support';
import DietPlan from '../config/SVG/DietPlan';
import Video from '../config/SVG/Video';
import Curated from '../config/SVG/Curated';
import Insta from '../config/SVG/Insta';
import InstaMain from '../config/SVG/InstaMain';
import FBIcon from '../config/SVG/FBIcon';


import { ExpandableListView } from 'react-native-expandable-listview';


const onPressMobileNumberClick = (number) => {

  let phoneNumber = '';
  if (Platform.OS === 'android') {
    phoneNumber = `tel:${number}`;
  } else {
    phoneNumber = `telprompt:${number}`;
  }

  Linking.openURL(phoneNumber);
}

const CONTENT = [
  {
    id: '1', // required, id of item
    categoryName: 'What is the difference between weight management and weight loss ?', // label of item expandable item
    subCategory: [
      // required, array containing inner objects
      {
        id: '1', // required, of inner object
        name: '\u2B24  What is the difference between weight management and weight loss ?', // required, label of inner object
      },

    ],
  },
  {
    id: '2',
    categoryName: 'What are the symptoms of type tyroid?',
    subCategory: [{ id: '2', name: '\u2B24  What are the symptoms of type tyroid?' }],
  },
  {
    id: '3',
    categoryName: 'How does weight gain impact our health?',
    subCategory: [{ id: '2', name: '\u2B24  What are the symptoms of type tyroid?' }],
  },
  {
    id: '4',
    categoryName: 'What health condition causes weight gain?',
    subCategory: [{ id: '4', name: "\u2B24  Some of the resaons are as follows\n.Underactive thyroid\n.Diabetes treatment\n.Steroid treatment\n.Cushing's syndrome\n.Stress and low mood" }],
  },
];

export default class Home extends Component<Props> {

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
      mobileNo: '9958146091',
      message: '',
      //   HbplusData:[{'image':BasicPlan,'username':'Rashi Kathuria','Description':'An online entrepreneur and homemaker who lost 17 kg while struggling with PCOD\n "If I could do it, I believe anybody can. All you need is dedication and the right kind of guidance like Holy basil.'},
      //   {'image':AdvancePlan,'username':'Rashi Kathuria','Description':'An online entrepreneur and homemaker who lost 17 kg while struggling with PCOD\n "If I could do it, I believe anybody can. All you need is dedication and the right kind of guidance like Holy basil.'},
      // ]
    };
    this.home_details();
  }




  openWhatsApp = () => {
    // let msg = this.state.message;
    let mobile = this.state.mobileNo;
    if (mobile) {
      let url =
        "whatsapp://send?text=" +
        this.state.message +
        "&phone=91" +
        this.state.mobileNo;
      Linking.openURL(url)
        .then(data => {
          console.log("WhatsApp Opened successfully " + data);
        })
        .catch(() => {
          alert("Make sure WhatsApp installed on your device");
        });

    } else {
      alert("Please enter mobile no");
    }
  };

  home_details = async () => {
    this.setState({ isLoding: true });
    await axios({
      method: "post",
      url: api_url + home_details,
    })
      .then(async (response) => {
        this.setState({ isLoding: false });
        this.setState({ home_result: response.data.result, banners: response.data.result.banners, category: response.data.result.categories, symptoms_first: response.data.result.symptoms_first, symptoms_second: response.data.result.symptoms_second, doctors: response.data.result.doctors })
      })
      .catch((error) => {
        this.setState({ isLoding: false });
        alert('Something went wrong');
      });
  };

  async componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.home_details();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  category_doctor_list = (id, category_name) => {
    this.props.navigation.navigate('DoctorSubCategories', { id: id, type: 1, category_name: category_name });
  }

  symptoms_doctor_list = (id) => {
    this.props.navigation.navigate('DoctorList', { id: id, type: 2 });
  }

  top_doctor_list = () => {
    this.props.navigation.navigate('DoctorList', { id: 0, type: 3 });
  }

  doctor_details = (data) => {

    console.log("data==", data.id)
    this.props.navigation.navigate('DoctorDetail', { data: data });
  }

  direct_appointment = (data) => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    })
      .then((data) => {
        this.props.navigation.navigate('DoctorMap', { categories: this.state.category });
      })
      .catch((err) => {

      });
  }

  render() {
    return (
      <Container>

        <View>
          <View style={styles.pro_style1}>
            <TouchableOpacity style={styles.pro_style2} onPress={this.handleBackButtonClick} activeOpacity={1} >
              <BackDetails></BackDetails>
            </TouchableOpacity>
            <View style={styles.pro_style4} />
            <View >
              <Text style={styles.pro_style5}>Weight Management by Self</Text></View>


          </View>
        </View>

        <ScrollView keyboardShouldPersistTaps="always">
          <View style={{ justifyContent: "center", alignItems: "center" }} >

            <View style={{ paddingLeft: getSizeWidth(10), height: getSizeHeight(196), backgroundColor: '#FFE8B9', marginTop: 10, flexDirection: 'row' }}>

              <View style={{ marginTop: getSizeHeight(31) }}>
                <Doctor></Doctor>
              </View>

              <View style={{ width: '60%', marginVertical: getSizeHeight(28), flexDirection: 'column', marginRight: 30 }}>
                <Text style={[styles.pro_style5, { fontSize: getFontRatio(22), color: '#8D6A23', }]}>Weight Loss Program</Text>
                <Text style={[styles.pro_style5, { fontSize: getFontRatio(12), color: '#8D6A23', marginRight: getSizeWidth(20), marginTop: getSizeHeight(8), lineHeight: 15 }]}>A physician supervised clinically proven program to lose weight, reduce blood sugar and prevent health complications</Text>
                <Text style={[styles.pro_style5, { fontSize: getFontRatio(12), color: '#8D6A23', marginRight: getSizeWidth(20), marginTop: getSizeHeight(12), lineHeight: 15 }]}>Our Plans are combined of Diet and workout routines.</Text>
              </View>
            </View>
            <View style={{ marginLeft: -10, marginRight: -10, backgroundColor: '#FDFAF1', height: getSizeHeight(121) }}>
              <Text style={[styles.pro_style5, { marginHorizontal: getSizeWidth(12), fontSize: getFontRatio(14), color: '##3D3D3D', marginTop: getSizeHeight(12), lineHeight: 15 }]}>Holistic care approach designed by medical experts</Text>


              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: getSizeHeight(19) }}>
                <View style={{ width: screenWidth / 4, alignItems: 'center' }}>
                  <Support></Support>
                  <Text style={[styles.pro_style5, { marginLeft: getSizeWidth(15), marginRight: getSizeWidth(15), textAlign: 'center', fontSize: getFontRatio(10), color: '##3D3D3D', marginTop: getSizeHeight(12), lineHeight: 15 }]}>24 Hour Support</Text>
                </View>
                <View style={{ width: screenWidth / 4, alignItems: 'center' }}>
                  <DietPlan></DietPlan>
                  <Text style={[styles.pro_style5, { marginLeft: getSizeWidth(10), marginRight: getSizeWidth(10), textAlign: 'center', fontSize: getFontRatio(10), color: '##3D3D3D', marginTop: getSizeHeight(12), lineHeight: 15 }]}>Customised Diet Plan</Text>

                </View>

                <View style={{ width: screenWidth / 4, justifyContent: 'center', alignItems: 'center' }}>

                  <Video></Video>
                  <Text style={[styles.pro_style5, { marginLeft: getSizeWidth(10), marginRight: getSizeWidth(10), textAlign: 'center', fontSize: getFontRatio(10), color: '##3D3D3D', marginTop: getSizeHeight(12), lineHeight: 15 }]}>Video Excersice Access</Text>

                </View>
                <View style={{ width: screenWidth / 4, alignItems: 'center' }}>

                  <Curated></Curated>
                  <Text style={[styles.pro_style5, { marginLeft: getSizeWidth(10), marginRight: getSizeWidth(10), textAlign: 'center', fontSize: getFontRatio(10), color: '##3D3D3D', marginTop: getSizeHeight(12), lineHeight: 15 }]}>Curated Resources</Text>

                </View>


              </View>


            </View>
            <VideoList></VideoList>

            <DeliveryResult></DeliveryResult>

            <TrendingList></TrendingList>


            <View style={{ marginHorizontal: getSizeWidth(14), flexDirection: 'row', backgroundColor: '#DFCDB0', height: getSizeHeight(280), marginTop: getSizeHeight(45) }}>
              <View style={{ width: '50%', height: getSizeHeight(280), }}>
                <Mask></Mask>
              </View>
              <View style={{ height: getSizeHeight(280), width: '50%', backgroundColor: '#DFCDB0', borderTopRightRadius: getSizeWidth(5) }}>
                <Text style={[{ marginTop: getSizeHeight(60), marginLeft: getSizeWidth(14), marginRight: getSizeWidth(20), fontFamily: Lato_Regular, fontSize: getFontRatio(16), color: '#AE1B0F', marginRight: getSizeWidth(20), lineHeight: 19 }]}>Our Plans are combined of Diet and workout routines.</Text>
                <Text style={[{ marginLeft: getSizeWidth(14), marginRight: getSizeWidth(20), fontFamily: Lato_Regular, fontSize: getFontRatio(14), color: '#0A0A05', marginRight: getSizeWidth(20), marginTop: getSizeHeight(11), lineHeight: 15 }]}>Know which diet helps you lose weight fast</Text>
                <View style={{ flexDirection: 'row', marginTop: getSizeHeight(30), marginHorizontal: getSizeWidth(16) }}>
                  <View style={{ borderRadius: getSizeWidth(5), height: getSizeHeight(38), backgroundColor: '#F18261', paddingLeft: getSizeWidth(8), paddingRight: getSizeWidth(8), alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={[styles.home_style1TitlePreventButtonText, { color: '#ffffff', textAlign: 'center', }]}>{'Discover'}</Text>
                  </View>

                </View>

              </View>

            </View>

            <View style={{ flexDirection: 'column' }}>
              <Text style={[{ fontFamily: Lato_Regular, fontSize: getFontRatio(15), lineHeight: 15.22, color: '#1D5471', marginHorizontal: getSizeWidth(16), marginTop: getSizeHeight(35) }]}>{'Explore our paid plans for better results'}</Text>

              <View style={{ marginTop: getSizeHeight(10), justifyContent: 'center', alignItems: 'center', width: '100%', height: getSizeHeight(118), flexDirection: 'row' }}>
                <View style={{ width: '45%', height: getSizeHeight(118), backgroundColor: '#FFF9ED' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={[{ fontFamily: Roboto, fontSize: getFontRatio(14), lineHeight: 15.22, color: '#1D5471', marginHorizontal: getSizeWidth(16), marginTop: getSizeHeight(35) }]}>{'Basic Plan'}</Text>

                    <Image style={{ marginLeft: getSizeWidth(8), width: getSizeWidth(71), height: getSizeHeight(84) }} source={BasicPlan}></Image>
                  </View>

                  <View style={{ alignItems: 'center', justifyContent: 'center', borderBottomLeftRadius: getSizeWidth(5), borderBottomRightRadius: getSizeWidth(5), backgroundColor: colors.theme_bg_dark, height: 30, marginRight: getSizeWidth(5) }}>
                    <Text style={[{ fontFamily: Roboto, fontSize: getFontRatio(15), lineHeight: 15.22, color: '#ffffff', marginHorizontal: getSizeWidth(16), textAlign: 'center' }]}>{'Explore'}</Text>


                  </View>
                </View>




                <View style={{ marginLeft: getSizeWidth(5), width: '46%', height: getSizeHeight(118), backgroundColor: '#FFEDED' }}>


                  <View style={{ flexDirection: 'row' }}>
                    <Text style={[{ fontFamily: Lato_Regular, fontSize: getFontRatio(14), lineHeight: 15.22, color: '#1D5471', marginHorizontal: getSizeWidth(16), marginTop: getSizeHeight(35) }]}>{'Advance Plan'}</Text>

                    <Image style={{ width: getSizeWidth(71), height: getSizeHeight(84) }} source={AdvancePlan}></Image>
                  </View>

                  <View style={{ alignItems: 'center', justifyContent: 'center', borderBottomLeftRadius: getSizeWidth(5), borderBottomRightRadius: getSizeWidth(5), backgroundColor: colors.theme_bg_dark, height: 30, }}>
                    <Text style={[{ fontFamily: Lato_Regular, fontSize: getFontRatio(15), lineHeight: 15.22, color: '#ffffff', marginHorizontal: getSizeWidth(16), textAlign: 'center' }]}>{'Explore'}</Text>


                  </View>
                </View>

              </View>

            </View>


            <View style={{ marginTop: getSizeHeight(30), width: '100%', alignItems: 'center', height: getSizeHeight(330), backgroundColor: '#F6F6FB' }}>
              <Text style={[{ marginBottom: getSizeHeight(15), marginTop: getSizeHeight(20), textAlign: 'center', fontFamily: Lato_Regular, fontSize: getFontRatio(18), lineHeight: 21.6, color: '#222222', marginHorizontal: getSizeWidth(16), }]}>{'Frequently Asked Questions'}</Text>


              <ExpandableListView
                data={CONTENT} // required
                renderInnerItemSeparator={true}
                renderItemSeparator={true} // true or false, render separator between Items
                itemContainerStyle={{ height: 30, backgroundColor: "#F6F6FB" }} // add your styles to all item container of your list
                itemLabelStyle={{ marginLeft: getSizeWidth(-15), marginRight: getSizeWidth(20), fontFamily: Lato_Regular, fontSize: getFontRatio(10), color: '#000000' }} // add your styles to all item text of your list
                innerItemLabelStyle={{ fontFamily: Lato_Regular, fontSize: getFontRatio(8), color: '#000000' }} // add your styles to all inner item text of your list
                itemImageIndicatorStyle={{ position: 'absolute', right: getSizeWidth(-8) }}

              />

            </View>

            <View style={{ flexDirection: 'row', marginTop: getSizeHeight(50), marginHorizontal: getSizeWidth(16) }}>

              <TouchableOpacity onPress={() => onPressMobileNumberClick('9958146091')}>
                <View style={{ borderRadius: getSizeWidth(30), height: getSizeHeight(52), borderWidth: 1, borderColor: '#F18261', alignItems: 'center', justifyContent: 'center', paddingLeft: getSizeWidth(30), paddingRight: getSizeWidth(30), flexDirection: 'row' }}>
                  <Phone></Phone>
                  <Text style={[styles.home_style1TitlePreventButtonText, { color: '#2D3E4D', textAlign: 'center', marginLeft: getSizeWidth(6) }]}>{'Call Helpline'}</Text>

                </View>
              </TouchableOpacity>

              {/* <View style={{ borderRadius: getSizeWidth(30), marginLeft: getSizeWidth(6), height: getSizeHeight(52), borderWidth: 1, borderColor: '#F18261', alignItems: 'center', justifyContent: 'center', paddingLeft: getSizeWidth(10), paddingRight: getSizeWidth(10),flexDirection:'row' }}>
              <Text style={[styles.home_style1TitlePreventButtonText, { color: '#F18261', textAlign: 'center' }]}>{'Chat with us'}</Text>

            </View> */}

              <TouchableOpacity onPress={() => this.openWhatsApp()}>
                <View style={{ borderRadius: getSizeWidth(30), marginLeft: getSizeWidth(15), height: getSizeHeight(52), borderWidth: 1, borderColor: '#F18261', alignItems: 'center', justifyContent: 'center', paddingLeft: getSizeWidth(30), paddingRight: getSizeWidth(30), flexDirection: 'row' }}>
                  <Chat></Chat>
                  <Text style={[styles.home_style1TitlePreventButtonText, { color: '#2D3E4D', textAlign: 'center', marginLeft: getSizeWidth(6) }]}>{'Chat with us'}</Text>

                </View></TouchableOpacity>
            </View>



            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: getSizeHeight(50), width: '100%', flexDirection: 'row', height: getSizeHeight(70), backgroundColor: '#FFB4AC' }}>
              <View style={{ width: '56%',alignItems:'center' }}>
                <Text style={[styles.home_style1TitlePreventButtonText, { color: '#ffffff', textAlign: 'center', marginLeft: getSizeWidth(6) }]}>{'Terms & conditions'}</Text>

              </View>
              <View style={{marginLeft:getSizeWidth(70), alignItems:'center', flexDirection: 'row', width: '44%' }}>

                <Insta></Insta>
                <View style={{width:getSizeWidth(10)}}></View>
                <InstaMain></InstaMain>
                <View style={{width:getSizeWidth(10)}}></View>
                <FBIcon></FBIcon>
              </View>
            </View>

          </View>

        </ScrollView>









        <Loader visible={this.state.isLoding} />
      </Container>
    );
  }


  renderPlanList = ({ item, index }) => {
    return (
      <View style={{ width: getSizeWidth(180), backgroundColor: '#FFF9ED', borderRadius: getSizeWidth(7), }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>



        </View>
      </View>
    )
  }
  renderPhoto = ({ item, index }) => {
    return (
      <View style={{ width: getSizeWidth(310), marginLeft: getSizeWidth(14), height: getSizeHeight(199), backgroundColor: '#FB9085', borderRadius: getSizeWidth(7), }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: getSizeHeight(10) }}>
          <ListImages></ListImages>
        </View>
      </View>
    )
  }
  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
  };
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
  pro_style1: { marginTop: getSizeHeight(8), height: getSizeHeight(50), flexDirection: 'row', alignItems: 'center', marginHorizontal: getSizeWidth(2) },

  pro_style2: { height: getSizeHeight(40), paddingLeft: getSizeWidth(10), width: getSizeWidth(40), justifyContent: 'center' },
  pro_style5: { paddingLeft: getSizeWidth(5), fontSize: getFontRatio(20), color: colors.theme_new_title, fontFamily: Lato_Regular },

});

