import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, ImageBackground,Linking } from 'react-native';
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
  screenWidth
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
import YoutubePlayer from "react-native-youtube-iframe";




import * as colors from '../assets/css/Colors';
import axios from 'axios';
import { Container, Content, Row, Col, Card, Thumbnail } from 'native-base';
import { Rating } from 'react-native-ratings';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { FlatList } from 'react-native';
import VideoList from '../components/VideoList';


const onPressMobileNumberClick = (number) => {

  let phoneNumber = '';
  if (Platform.OS === 'android') {
    phoneNumber = `tel:${number}`;
  } else {
    phoneNumber = `telprompt:${number}`;
  }

  Linking.openURL(phoneNumber);
}


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
      mobileNo:'9958146091',
      message:'',
      playing:false
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
        <Content padder>
          <View style={styles.home_style1}>
            {/* <Image style={styles.home_style1Top} source={HolyBasilPlus}/>  */}
            <HolyBasilsvg></HolyBasilsvg>
            <View style={{ marginTop: -8 }}>
              {/* <TouchableOpacity onPress={()=> this.props.navigation.navigate('Consultationbooking')}>
              <Notification></Notification></TouchableOpacity> */}
            </View>
          </View>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('BookAppoitMent')}>
          <View style={styles.home_style1Book}>
            <View style={{ marginHorizontal: getSizeWidth(14), flexDirection: 'row' }}>
              <BookIcon></BookIcon>
              <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', width: '75.5%', marginLeft: getSizeWidth(10) }}>
                <Text style={styles.home_style1Title}>{'Book an Online Consultation'}</Text>
                <Text style={styles.home_style1SubTitle}>{'We’re here for you.'}</Text>
              </View>
              <View style={{ justifyContent: 'center', }}>
                <Next></Next>
              </View>
            </View>
          </View>
          </TouchableOpacity> 
          {/* <View style={styles.home_style4}/> */}
          <View style={styles.home_stylePrvent6}>
            <View style={{ marginHorizontal: getSizeWidth(15), marginTop: getSizeHeight(25), flexDirection: 'row', }}>
              <View style={{ flexDirection: 'column', width: '63%', marginRight: 7 }}>
                <Text style={[styles.home_style1TitlePrevent]}>{'Prevent, Reverse or Manage Diabetes'}</Text>
                <Text style={[styles.home_style1TitlePrevent, { fontSize: getFontRatio(14), marginTop: 5,marginRight:getSizeWidth(10) }]}>{'Medical- grade program to reduce blood sugar and manage co-morbidities to prevent health complications.'}</Text>

                {/* <Text style={[styles.home_style1TitlePrevent, { marginTop: getSizeHeight(12), fontFamily: Lato_Bold }]}>{'500+ '}<Text style={[styles.home_style1TitlePrevent, { fontSize: getFontRatio(12), marginTop: 5, color: '#545454' }]}>{'daily users'}</Text>
                </Text> */}
                <View style={{ flexDirection: 'row' }}><Text style={[styles.home_style1TitlePrevent, { marginTop: getSizeHeight(10), fontFamily: Lato_Bold }]}>{'500+ '}</Text>
                  <Text style={[styles.home_style1TitlePrevent, { fontSize: getFontRatio(14), marginTop: getSizeHeight(17), color: '#545454' }]}>{'daily users'}</Text>
                </View>
              </View>

              <PreventReverse></PreventReverse>

            </View>
            <View style={{ flexDirection: 'row', marginTop: getSizeHeight(26), marginHorizontal: getSizeWidth(16) }}>
              <View style={{ borderRadius: getSizeWidth(5), height: getSizeHeight(38), backgroundColor: '#F18261', paddingLeft: getSizeWidth(8), paddingRight: getSizeWidth(8), alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate("HelpYourSelfDiabetes")}>
                <Text style={[styles.home_style1TitlePreventButtonText, { color: '#ffffff', textAlign: 'center', }]}>{'HELP YOURSELF'}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ borderRadius: getSizeWidth(5), marginLeft: getSizeWidth(6), height: getSizeHeight(38), borderWidth: 1, borderColor: '#F18261', alignItems: 'center', justifyContent: 'center', paddingLeft: getSizeWidth(6), paddingRight: getSizeWidth(6), }}>
              <TouchableOpacity onPress={()=>    this.props.navigation.navigate("Diabetesprogram")}>
                <Text style={[styles.home_style1TitlePreventButtonText, { color: '#F18261', textAlign: 'center' }]}>{'SEEK PROFESSIONAL HELP'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={[styles.home_stylePrvent6, { backgroundColor: '#FFF9ED', height: getSizeHeight(247) }]}>
            <View style={{ marginHorizontal: getSizeWidth(15), marginTop: getSizeHeight(25), flexDirection: 'row', }}>
              <View style={{ flexDirection: 'column', width: '65%', marginRight: 7 }}>
                <Text style={[styles.home_style1TitlePrevent]}>{'Weight Management'}</Text>

                <View style={{ flexDirection: 'row' }}></View>
                <Text style={[styles.home_style1TitlePrevent, { fontSize: getFontRatio(14), marginTop: 5,marginRight:getSizeWidth(10)  }]}>{'A clinically proven program to lose weight, reduce blood sugar and prevent health complications.'}</Text>

                <View style={{ flexDirection: 'row' }}><Text style={[styles.home_style1TitlePrevent, { marginTop: getSizeHeight(10), fontFamily: Lato_Bold }]}>{'500+ '}</Text>
                  <Text style={[styles.home_style1TitlePrevent, { fontSize: getFontRatio(14), marginTop: getSizeHeight(17), color: '#545454' }]}>{'members life impacted'}</Text>
                </View>
              </View>

              <WeightMangement></WeightMangement>
              <View style={{ backgroundColor: '#FFF9ED', width: 20, marginLeft: -5 }}></View>

            </View>
            <View style={{ flexDirection: 'row', marginTop: getSizeHeight(26), marginHorizontal: getSizeWidth(16) }}>
            

            
              <View style={{ borderRadius: getSizeWidth(5), height: getSizeHeight(38), backgroundColor: '#F18261', paddingLeft: getSizeWidth(8), paddingRight: getSizeWidth(8), alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity onPress={()=>this.HelpYourSelf()}>
                <Text style={[styles.home_style1TitlePreventButtonText, { color: '#ffffff', textAlign: 'center', }]}>{'HELP YOURSELF'}</Text>
             </TouchableOpacity>
              </View> 
              <View style={{ borderRadius: getSizeWidth(5), marginLeft: getSizeWidth(6), height: getSizeHeight(38), borderWidth: 1, borderColor: '#F18261', alignItems: 'center', justifyContent: 'center', paddingLeft: getSizeWidth(6), paddingRight: getSizeWidth(6), }}>
              <TouchableOpacity onPress={()=>this.SeekYourSelf()}>

                <Text style={[styles.home_style1TitlePreventButtonText, { color: '#F18261', textAlign: 'center' }]}>{'SEEK PROFESSIONAL HELP'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={[styles.home_stylePrvent6, { backgroundColor: '#F6FFEE', height: getSizeHeight(285) }]}>
            <View style={{ marginHorizontal: getSizeWidth(15), marginTop: getSizeHeight(25), flexDirection: 'row', }}>
              <View style={{ flexDirection: 'column', width: '65%', }}>
                <Text style={[styles.home_style1TitlePrevent]}>{'Consult doctors from the comfort of your home'}</Text>
                <Text style={[styles.home_style1TitlePrevent, { fontSize: getFontRatio(14), marginTop: 5,marginRight:getSizeWidth(5)  }]}>{'Doctors, Physician and Diaetician under one roof. Get in touch with us for best health care.'}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.home_style1TitlePrevent, { marginTop: getSizeHeight(10), fontFamily: Lato_Bold }]}>{'6500+ '}</Text>
                  <Text style={[styles.home_style1TitlePrevent, { fontSize: getFontRatio(14), marginTop: getSizeHeight(17), color: '#545454' }]}>{'consultations delivered'}</Text>
                </View>
              </View>

              <BookASlot></BookASlot>

            </View>

            <View style={{ flexDirection: 'row', marginTop: getSizeHeight(25), marginHorizontal: getSizeWidth(16) }}>
              <View style={{ borderRadius: getSizeWidth(5), height: getSizeHeight(38), backgroundColor: '#F18261', paddingLeft: getSizeWidth(8), paddingRight: getSizeWidth(8), alignItems: 'center', justifyContent: 'center' }}>
                <Text style={[styles.home_style1TitlePreventButtonText, { color: '#ffffff', textAlign: 'center', }]}>{'BOOK A SLOT'}</Text>

              </View>
              {/* <View style={{borderRadius:getSizeWidth(5),marginLeft:getSizeWidth(6), height:getSizeHeight(38),borderWidth:1, borderColor:'#F18261',alignItems:'center',justifyContent:'center',paddingLeft:getSizeWidth(6),paddingRight:getSizeWidth(6),}}>
              <Text style={[styles.home_style1TitlePreventButtonText,{color:'#F18261',textAlign:'center'}]}>{'SEEK PROFESSIONAL HELP'}</Text>

              </View> */}
            </View>
          </View>

          <Text style={[{ fontFamily: Roboto, fontSize: getFontRatio(15), lineHeight: 15.22, color: '#1D5471', marginHorizontal: getSizeWidth(16), marginTop: getSizeHeight(27) }]}>{'Benefit from our free resources'}</Text>

<VideoList></VideoList>

          {/* <FlatList
            style={{ marginTop: 10, }}
            horizontal
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            legacyImplementation={false}
            data={['c9vSR-hnPd0', 'Bsl-YqTk-ws', 'N7NhlxNuRd8']}
            renderItem={item => this.renderPhoto(item)}
          /> */}
          <View style={{ flexDirection: 'row', marginTop: getSizeHeight(30), marginHorizontal: getSizeWidth(16) }}>
           
           <TouchableOpacity onPress={()=>onPressMobileNumberClick('9958146091')}>
           <View style={{ borderRadius: getSizeWidth(30),  height: getSizeHeight(52), borderWidth: 1, borderColor: '#F18261', alignItems: 'center', justifyContent: 'center', paddingLeft: getSizeWidth(20), paddingRight: getSizeWidth(20),flexDirection:'row' }}>
           <Phone></Phone>      
           <Text style={[styles.home_style1TitlePreventButtonText, { color: '#2D3E4D', textAlign: 'center',marginLeft:getSizeWidth(6) }]}>{'Call Helpline'}</Text>

            </View>
           </TouchableOpacity>
            
            {/* <View style={{ borderRadius: getSizeWidth(30), marginLeft: getSizeWidth(6), height: getSizeHeight(52), borderWidth: 1, borderColor: '#F18261', alignItems: 'center', justifyContent: 'center', paddingLeft: getSizeWidth(10), paddingRight: getSizeWidth(10),flexDirection:'row' }}>
              <Text style={[styles.home_style1TitlePreventButtonText, { color: '#F18261', textAlign: 'center' }]}>{'Chat with us'}</Text>

            </View> */}

<TouchableOpacity onPress={()=>this.openWhatsApp()}>
             <View style={{ borderRadius: getSizeWidth(30), marginLeft: getSizeWidth(15), height: getSizeHeight(52), borderWidth: 1, borderColor: '#F18261', alignItems: 'center', justifyContent: 'center', paddingLeft: getSizeWidth(20), paddingRight: getSizeWidth(20),flexDirection:'row' }}>
           <Chat></Chat>      
           <Text style={[styles.home_style1TitlePreventButtonText, { color: '#2D3E4D', textAlign: 'center',marginLeft:getSizeWidth(6) }]}>{'Chat with us'}</Text>

            </View></TouchableOpacity>
          </View>
          <Text style={[{ fontFamily: Roboto, fontSize: getFontRatio(15), lineHeight: 15.22, color: '#1D5471', marginHorizontal: getSizeWidth(16), marginTop: getSizeHeight(27) }]}>{'HB Plus Delivers Results'}</Text>
          <Text style={[{marginBottom:getSizeHeight(24), fontFamily: Roboto, fontSize: getFontRatio(14), lineHeight: 15.22,  marginHorizontal: getSizeWidth(16), marginTop: getSizeHeight(5) }]}>{'From weight loss to reversing lifestyle diseases, we have transformed many lives!'}</Text>
<View style={{marginLeft:getSizeWidth(10)}}>

<UserImage></UserImage>
</View>
             
          {/* <Text style={[styles.home_style5,{marginTop:getSizeHeight(15)}]}>Categories</Text>
          <View style={styles.home_style6} />


          <View style={styles.home_style7}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
              {this.state.category.map((row, index) => (
                <TouchableOpacity onPress={() => this.category_doctor_list(row.id, row.category_name)} activeOpacity={1} style={styles.home_style8}>
                  <Image style={styles.home_style9} source={{ uri: img_url + row.category_image }} />
                  <Text style={styles.home_style10}>{row.category_name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View style={styles.home_style14} />
          <Row>
            <Col style={styles.home_style15}>
              <Text style={styles.home_style16}>Common Symptoms</Text>
            </Col>
          </Row>
          <View style={styles.home_style17} />
          <View style={styles.home_style18}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
              {this.state.symptoms_first.map((row, index) => (
                <View>
                  <Card style={styles.home_style19}>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.symptoms_doctor_list(row.id)} >
                      <View style={styles.home_style20}>
                        <Image style={styles.home_style21} source={{ uri: img_url + row.service_image }} />
                      </View>
                    </TouchableOpacity>
                  </Card>
                  <Text style={styles.home_style22}>{row.service_name}</Text>
                </View>

              ))}
            </ScrollView>
          </View>
          <View style={styles.home_style23} />
          <View style={styles.home_style24}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
              {this.state.symptoms_second.map((row, index) => (
                <View>
                  <Card style={styles.home_style25}>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.symptoms_doctor_list(row.id)} >
                      <View style={styles.home_style26}>
                        <Image style={styles.home_style27} source={{ uri: img_url + row.service_image }} />
                      </View>
                    </TouchableOpacity>
                  </Card>
                  <Text style={styles.home_style28}>{row.service_name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={styles.home_style29} />
          <Row>
            <Col style={styles.home_style30}>
              <Text style={styles.home_style31}>Top Doctors</Text>
            </Col>

            <Col style={styles.home_style32}>
              <Text onPress={() => this.top_doctor_list()} style={styles.home_style33}>
                View All
                </Text>
            </Col>
          </Row>
          <View style={styles.home_style34} />
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            <View style={styles.home_style35}>
              {this.state.doctors.map((row, index) => (
                <Card style={styles.home_style36}>
                  <TouchableOpacity activeOpacity={1} onPress={() => this.doctor_details(row)} style={styles.home_style37}>
                    <Thumbnail source={{ uri: img_url + row.profile_image }} />
                    <View style={styles.home_style38} />
                    <Text style={styles.home_style39}>{row.doctor_name}</Text>
                    <View style={styles.home_style40} />
                    <Text style={styles.home_style41}>Specialist : {row.specialist}</Text>
                    <View style={styles.home_style42} />
                    {row.overall_rating > 0 &&
                      <Rating
                        ratingCount={5}
                        startingValue={row.overall_rating}
                        imageSize={12}
                        readonly={true}
                      />
                    }
                    <View style={styles.home_style43} />
                    <Text style={styles.home_style44}>View Profile</Text>
                  </TouchableOpacity>
                </Card>
              ))}
            </View>
          </ScrollView> */}

          <View style={styles.home_style45} />
        </Content>

        <Loader visible={this.state.isLoding} />
      </Container>
    );
  }
  renderPhoto = ({ item, index }) => {
    return (
      <View style={{  padding:getSizeWidth(5), width: getSizeWidth(310), marginLeft: getSizeWidth(14), backgroundColor: '#FB9085', borderRadius: getSizeWidth(7), }}>
        <YoutubePlayer
        style={{marginBottom:getSizeHeight(-10)}}
        height={getSizeHeight(190)}
        play={this.state.playing}
        videoId={item}
        // onChangeState={onStateChange}
      />
        
        
      
{/*         
        <View style={{ position:'absolute', justifyContent: 'center', alignItems: 'center', marginTop: getSizeHeight(10) }}>
          <ListImages></ListImages>
        </View> */}
      </View>
    )
  }
  HelpYourSelf = () => {
    this.props.navigation.navigate("HelpYourSelf")
    // this.props.navigation.dispatch(
    //   CommonActions.reset({
    //     index: 0,
    //     routes: [{ name: "HelpYourSelf" }],
    //   })
    // );
  };
  SeekYourSelf = () => {
    this.props.navigation.navigate("SeekPersonalHelp")
    
  };
  

}


const styles = StyleSheet.create({
  home_style1: {  marginHorizontal: getSizeWidth(16.56), flexDirection: 'row', height: getSizeHeight(56), justifyContent: 'space-between', alignItems: 'center' },
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

