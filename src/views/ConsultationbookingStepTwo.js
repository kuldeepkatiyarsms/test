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
  AdvancePlan,
  bigBasicPlan,
  ViewMore,
  viewLess,
  BigActivePlan
} from '../config/Constants';
// import { HolyBasilsvg} from '../config/Icons';

import BackDetails from '../config/SVG/BackDetails';


import * as colors from '../assets/css/Colors';
import axios from 'axios';
import { Container, Content, Row, Col, Card, Thumbnail } from 'native-base';
import { Rating } from 'react-native-ratings';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { FlatList } from 'react-native';

import Diabetes from '../config/SVG/Diabetes';
import GeneralPhysician from '../config/SVG/GeneralPhysician';
import WeightLoss from '../config/SVG/WeightLoss';
import VideoConsultant from '../config/SVG/VideoConsultant';
import { Bitmapuser } from '../config/Constants';
import GeneralPhysicians from '../config/SVG/GeneralPhysicians';
import Diabetesbook from '../config/SVG/Diabetesbook';
import WeightLossBook from '../config/SVG/WeightLossBook';






import { ExpandableListView } from 'react-native-expandable-listview';
import TesData from '../config/SVG/tesData';


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
    categoryName: 'What is the difference between diabetes reversal and cure?', // label of item expandable item
    subCategory: [
      // required, array containing inner objects
      {
        id: '1', // required, of inner object
        name: 'What is the difference between diabetes reversal and cure?', // required, label of inner object
      },

    ],
   },
  {
    id: '2',
    categoryName: 'What are the symptoms of type 2 diabetes?',
    subCategory: [{ id: '2', name: 'What are the symptoms of type 2 diabetes?' }],
  },
  {
    id: '3',
    categoryName: 'How is diabetes diagnosed?',
    subCategory: [{ id: '2', name: 'How is diabetes diagnosed?' }],
  },
  {
    id: '4',
    categoryName: 'What health condition causes weight gain?',
    subCategory: [{ id: '4', name: ".Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac, ut tempor aliquet tristique eget sed sed. Id sagittis varius arcu, cursus aliquet.\n\n.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac, ut tempor aliquet tristique eget sed sed. Id sagittis varius arcu, cursus aliquet." }],
  },
];

export default class ConsultationbookingStepTwo extends Component<Props> {
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
      BasicPlan: false,
      AdvancePlan: false,
      HbplusData:[{'image':Bitmapuser,'username':'Dr.Pooja Katiyar','Professin':'Dentist MBBS, DMCH','Experience':'15 years experience\n200+ sessions'},
      {'image':Bitmapuser,'username':'Dr.Rajat Gupta','Professin':'Dentist MBBS','Experience':'15 years experience\n200+ sessions'},
      {'image':Bitmapuser,'username':'Dr.Jyoti Shah','Professin':'Dentist MBBS','Experience':'15 years experience\n200+ sessions'},
    ]

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

        <View >
          <View style={styles.pro_style1}>
            <TouchableOpacity style={styles.pro_style2} onPress={this.handleBackButtonClick} activeOpacity={1} >
              <BackDetails></BackDetails>
            </TouchableOpacity>
            <View style={styles.pro_style4} />
            <View >
              <Text style={styles.pro_style5}>Online Consultation Booking</Text></View>
          </View>
          <View style={{borderWidth:1,borderColor:'#E5E5E5',opacity:0.60}}></View>

        </View>
        
      
        {/* <ScrollView keyboardShouldPersistTaps="always"> */}
          <View style={{ height:'100%',backgroundColor:'#FEFAFA'}}  >

            <View style={{marginTop:getSizeHeight(20), paddingTop:getSizeHeight(22), alignItems:'center', height:getSizeHeight(213),backgroundColor:this.props.route.params.type==="Diabetes"?'#00C9E4':this.props.route.params.type==="Weight loss"?'#FF7854':'#4485FD'}}>

           {this.props.route.params.type==="General Physician"&&<GeneralPhysicians></GeneralPhysicians>}
           {this.props.route.params.type==="Diabetes"&&<Diabetesbook></Diabetesbook>}
           {this.props.route.params.type==="Weight loss"&&<WeightLossBook></WeightLossBook>}




            </View>
            <View style={{borderRadius:getSizeWidth(10), flexDirection:'column', backgroundColor:'#FFFFFF', height:getSizeHeight(198),marginTop:getSizeHeight(-60),marginHorizontal:getSizeWidth(16),borderWidth:0.5,borderColor:'#e6e6e6'}}>
          <View style={{borderTopLeftRadius:getSizeWidth(10),borderTopRightRadius:getSizeWidth(10), justifyContent:'center', height:getSizeHeight(45),backgroundColor:'#F5FBFF',borderBottomColor:'#e6e6e6',borderBottomWidth:0.5}}>
          <Text style={[{ marginLeft:getSizeWidth(20), color:'#2D3E4D', marginRight:getSizeWidth(3), fontSize:getFontRatio(18),fontFamily:Lato_Bold}]}>Online consultation: ₹ 300</Text>
          </View>
          <Text style={[{marginTop:getSizeHeight(16), marginHorizontal:getSizeWidth(20), color:'#565656', fontSize:getFontRatio(14),fontFamily:Lato_Regular}]}>Doctor available for online consultation with chat and video call options for the customer convenience. You may pick a convenient slot for the consultation.</Text>

          <Text style={[{marginTop:getSizeHeight(39), marginHorizontal:getSizeWidth(20), color:'#565656', fontSize:getFontRatio(14),fontFamily:Lato_Regular}]}>{'Consultation Duration:'}  <Text style={[{marginTop:getSizeHeight(39), marginHorizontal:getSizeWidth(20), color:'#000000', fontSize:getFontRatio(14),fontFamily:Lato_Regular}]}>15 min</Text></Text>

            </View>

            <Text style={[{marginVertical:getSizeHeight(20), marginHorizontal:getSizeWidth(20), color:'#565656', fontSize:getFontRatio(14),fontFamily:Lato_Regular}]}>{'One of the following experts will be assigned to you'}</Text>
 
         
         <View style={{width:'100%',alignItems:'center'}}>

        
        <View style={{height:getSizeHeight(200) }}>
        
        <FlatList
            horizontal
            pagingEnabled={true}
            snapToInterval={getSizeWidth(200)}
            showsHorizontalScrollIndicator={false}
            legacyImplementation={false}
            data={this.state.HbplusData}
            renderItem={item => this.renderPhoto(item)}

          />
        {/* <TesData></TesData> */}
        
        
        </View>

        <View style={{marginTop:getSizeHeight(30), width:'90%', borderRadius: getSizeWidth(5), height: getSizeHeight(50), backgroundColor: '#F18261', paddingLeft: getSizeWidth(8), paddingRight: getSizeWidth(8), alignItems: 'center', justifyContent: 'center' }}>
                <Text style={[styles.home_style1TitlePreventButtonText, { color: '#ffffff', textAlign: 'center', }]}>{'Book a slot'}</Text>

              </View>
              <View style={{height:getSizeHeight(200)}}>

              </View>

         </View>

          


          

          </View>

        {/* </ScrollView> */}


        <Loader visible={this.state.isLoding} />
      </Container>
    );
  }
  renderPhoto = ({ item, index }) => {
    return (
      <View style={{ alignItems:'center', height:getSizeHeight(180), padding:getSizeWidth(10), width: getSizeWidth(169), marginLeft: getSizeWidth(12), height: getSizeHeight(199), backgroundColor: '#ffffff', borderRadius: getSizeWidth(7), }}>
        <Image
                style={{marginTop:getSizeHeight(8), height:getSizeHeight(50),width:getSizeWidth(50),borderRadius:getSizeWidth(25)}}
                source={item.image}
              />
               <Text style={[{color:'#2D3E4D', fontFamily:Lato_Bold, fontSize:getFontRatio(14),lineHeight:16.08,marginTop:getSizeHeight(6)}]}>{item.username}</Text>
               <Text style={[{textAlign:'center', color:'#2D3E4D',marginHorizontal:getSizeWidth(20), fontSize:getFontRatio(13),lineHeight:16.08,marginTop:getSizeHeight(4)}]}>{item.Professin}</Text>
               <Text style={[{textAlign:'center', color:'##6B779A',marginHorizontal:getSizeWidth(15), fontSize:getFontRatio(12),lineHeight:16.08,position:'absolute',bottom:getSizeWidth(15),opacity:0.30 }]}>{item.Experience}</Text>

     </View>
    )
  }

  renderPlanList = ({ item, index }) => {
    return (
      <View style={{ width: getSizeWidth(180), backgroundColor: '#FFF9ED', borderRadius: getSizeWidth(7), }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>



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
  home_style1TitlePreventButtonText: { fontSize: getFontRatio(18), color: '#2D3E4D', fontFamily: Lato_Regular },

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
  pro_style2: {  height: getSizeHeight(40), paddingLeft: getSizeWidth(10), width: getSizeWidth(40), justifyContent: 'center' },
 
  pro_style5: { paddingLeft: getSizeWidth(5), fontSize: getFontRatio(20), color: colors.theme_new_title, fontFamily: Lato_Regular },
  pro_style46: { marginHorizontal: getSizeWidth(20), fontSize: getFontRatio(18), color: '#2D3E4D', fontFamily: Lato_Regular },

});

