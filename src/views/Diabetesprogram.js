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
  BigActivePlan
} from '../config/Constants';
// import { HolyBasilsvg} from '../config/Icons';

import ListImages from '../config/SVG/ListImages';
import Phone from '../config/SVG/Phone';
import Chat from '../config/SVG/Chat';
import BackDetails from '../config/SVG/BackDetails';
import Doctor from '../config/SVG/DibatesProfessional';
import DeliveryResult from '../components/DeliveryResult';


import Mask from '../config/SVG/Mask';




import * as colors from '../assets/css/Colors';
import axios from 'axios';
import { Container, Content, Row, Col, Card, Thumbnail } from 'native-base';
import { Rating } from 'react-native-ratings';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Support from '../config/SVG/Support';
import DietPlan from '../config/SVG/DietPlan';
import Video from '../config/SVG/Video';
import Curated from '../config/SVG/Curated';
import Insta from '../config/SVG/Insta';
import InstaMain from '../config/SVG/InstaMain';
import FBIcon from '../config/SVG/FBIcon';
import DiabetesStep from '../config/SVG/DiabetesStep';
import Background from '../config/SVG/background';
import Prevention from '../config/SVG/Prevention';
import ReversalBG from '../config/SVG/ReversalBG';
import Reversal from '../config/SVG/Reversal';
import Management from '../config/SVG/Management';

import KnowMoreOne from '../config/SVG/KnowMoreOne';
import KnowMoreTwo from '../config/SVG/KnowMoreTwo';
import KnowMorethree from '../config/SVG/KnowMorethree';


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
    categoryName: 'What is the difference between diabetes reversal and cure?', // label of item expandable item
    subCategory: [
      // required, array containing inner objects
      {
        id: '1', // required, of inner object
        name: '\u2B24  What is the difference between diabetes reversal and cure?', // required, label of inner object
      },

    ],
  },
  {
    id: '2',
    categoryName: 'What are the symptoms of type 2 diabetes?',
    subCategory: [{ id: '2', name: '\u2B24  What are the symptoms of type 2 diabetes?' }],
  },
  {
    id: '3',
    categoryName: 'How is diabetes diagnosed?',
    subCategory: [{ id: '2', name: '\u2B24  How is diabetes diagnosed?' }],
  },
  {
    id: '4',
    categoryName: 'What health condition causes weight gain?',
    subCategory: [{ id: '4', name: "\u2B24  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac, ut tempor aliquet tristique eget sed sed.   Id sagittis varius arcu, cursus aliquet." },
    { id: '5', name: "\n\u2B24  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac, ut tempor aliquet tristique eget sed sed.   Id sagittis varius arcu, cursus aliquet." }
  ],
  },
];

export default class Diabetesprogram extends Component<Props> {

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
      PreventionOne: false,
      PreventionTwo: false,
      ReversalOne: false,
      ReversalTwo: false,
      ManagementOne: false,
      ManagementTwo: false,
    

    };
    this.home_details();
  }




  openWhatsApp = () => {
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
              <Text style={styles.pro_style5}>{"Diabetes Professoinal Programs"}</Text></View>


          </View>
        </View>
        {/* <View style={{ alignItems: 'flex-start', backgroundColor: '#ffffff', height: getSizeWidth(32),flexDirection:'row' }}>

          <Text style={[ styles.pro_style5, {marginLeft:getSizeWidth(14), fontSize: getFontRatio(12), color: '#000000', marginTop: getSizeHeight(8), lineHeight: 15,opacity:0.40,textAlign:'left' }]}>Manage weight </Text>
          <Text style={[styles.pro_style5, { fontSize: getFontRatio(12), color: '#000000', marginRight: getSizeWidth(20), marginTop: getSizeHeight(8), lineHeight: 15, }]}>{'>  Seek Professional Help'}</Text>
        </View> */}
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={{ justifyContent: "center", alignItems: "center" }} >

            <View style={{ paddingLeft: getSizeWidth(10), height: getSizeHeight(196), backgroundColor: '#FFE8B9', marginTop: 10, flexDirection: 'row' }}>

              <View style={{ marginTop: getSizeHeight(31) }}>
                <Doctor></Doctor>
              </View>

              <View style={{ width: '60%', marginVertical: getSizeHeight(28), flexDirection: 'column', marginRight: 30 }}>
                <Text style={[styles.pro_style5, { fontSize: getFontRatio(22), color: '#8D6A23', }]}>{"Diabetes  Program"}</Text>
                <Text style={[styles.pro_style5, { fontSize: getFontRatio(12), color: '#8D6A23', marginRight: getSizeWidth(20), marginTop: getSizeHeight(8), lineHeight: 15 }]}>{"A physician supervised clinically proven program to tackle diabetes, reduce blood sugar and prevent health complications."}</Text>
                <Text style={[styles.pro_style5, { fontSize: getFontRatio(12), color: '#8D6A23', marginRight: getSizeWidth(20), marginTop: getSizeHeight(12), lineHeight: 15 }]}>{"Our Plans are combined of Diet and proper medication."}</Text>
              </View>
            </View>
            <View style={{ marginLeft: -10, marginRight: -10, backgroundColor: '#F0EFEF', height: getSizeHeight(121) }}>
              <Text style={[styles.pro_style5, { marginHorizontal: getSizeWidth(12), fontSize: getFontRatio(14), color: '#3D3D3D', marginTop: getSizeHeight(12), lineHeight: 15 }]}>{"Holistic care approach designed by medical experts"}</Text>


              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: getSizeHeight(19) }}>
                <View style={{ width: screenWidth / 4, alignItems: 'center' }}>
                  <Support></Support>
                  <Text style={[styles.pro_style5, { marginLeft: getSizeWidth(15), marginRight: getSizeWidth(15), textAlign: 'center', fontSize: getFontRatio(10), color: '#3D3D3D', marginTop: getSizeHeight(12), lineHeight: 15 }]}>24 Hour Support</Text>
                </View>
                <View style={{ width: screenWidth / 4, alignItems: 'center' }}>
                  <DietPlan></DietPlan>
                  <Text style={[styles.pro_style5, { marginLeft: getSizeWidth(10), marginRight: getSizeWidth(10), textAlign: 'center', fontSize: getFontRatio(10), color: '#3D3D3D', marginTop: getSizeHeight(12), lineHeight: 15 }]}>Customised Diet Plan</Text>

                </View>

                <View style={{ width: screenWidth / 4, justifyContent: 'center', alignItems: 'center' }}>

                  <Video></Video>
                  <Text style={[styles.pro_style5, { marginLeft: getSizeWidth(10), marginRight: getSizeWidth(10), textAlign: 'center', fontSize: getFontRatio(10), color: '#3D3D3D', marginTop: getSizeHeight(12), lineHeight: 15 }]}>Video Excersice Access</Text>

                </View>
                <View style={{ width: screenWidth / 4, alignItems: 'center' }}>

                  <Curated></Curated>
                  <Text style={[styles.pro_style5, { marginLeft: getSizeWidth(10), marginRight: getSizeWidth(10), textAlign: 'center', fontSize: getFontRatio(10), color: '#3D3D3D', marginTop: getSizeHeight(12), lineHeight: 15 }]}>Curated Resources</Text>

                </View>


              </View>


            </View>

            <View style={{ height: getSizeHeight(270), width: '100%', paddingLeft: getSizeWidth(14), paddingTop: getSizeHeight(20) }}>
              <DiabetesStep></DiabetesStep>
            </View>

            <View style={{ marginHorizontal: getSizeWidth(14), marginTop: getSizeHeight(29), width: '92%', flexDirection: 'row', justifyContent: "space-between" }}>
              <Text style={[styles.pro_style5, { marginRight: getSizeWidth(10), textAlign: 'center', fontSize: getFontRatio(14), color: '#000000', marginTop: getSizeHeight(12), lineHeight: 15 }]}>{"Be free from Diabetes"}</Text>

              <Text style={[styles.pro_style5, { borderRadius: getSizeWidth(5), backgroundColor: '#FFE8B9', padding: getSizeWidth(5), textAlign: 'center', fontSize: getFontRatio(10), color: '#000000', marginTop: getSizeHeight(5), lineHeight: 15 }]}>{"Starting at INR 1,450"}</Text>


            </View>

            <Text style={[styles.pro_style5, { marginHorizontal: getSizeWidth(14), marginRight: getSizeWidth(10), fontSize: getFontRatio(12), color: '#2D3E4D', marginTop: getSizeHeight(12), lineHeight: 15 }]}>{"Diabetes management need to be looked at holistically keeping in mind kidney, liver, heart and cholestrol functions. We provide medical grade support, looking into pre-existing medical conditions.  We have curated 3 packages cobsidering the stages of Diabetes which are Prevent Diabetes, Reverse Diabetes, and Manage Diabetes.  Find detail below."}</Text>

            {/* <Text style={[styles.pro_style5, {marginHorizontal:getSizeWidth(14),  marginRight: getSizeWidth(10),  fontSize: getFontRatio(12), color: '#2D3E4D', marginTop: getSizeHeight(12), lineHeight: 15 }]}>{"Diabetes management need to be looked at holisticaly keeping in miind kidney, liver, heart and cholestrol functions. We provide medical grade support, looking into "}</Text> */}
            {/* <TouchableOpacity onPress={()=>this.props.navigation.navigate("StartDiabetesprogram")}>

            <View style={{ marginTop:getSizeHeight(30), width:'92%', borderRadius: getSizeWidth(6), height: getSizeHeight(50), backgroundColor: '#F18261', paddingLeft: getSizeWidth(8), paddingRight: getSizeWidth(8), alignItems: 'center', justifyContent: 'center' }}>
              <Text style={[styles.home_style1TitlePreventButtonText, { color: '#ffffff', textAlign: 'center', }]}>{'Start my program'}</Text>

            </View>
            </TouchableOpacity> */}

            <View style={{ marginTop: getSizeHeight(30), width: '95%', minHeight: getSizeHeight(186), backgroundColor: '#F1F6FF', flexDirection: 'row' }}>

              <View >

                <Text style={[{ marginLeft: getSizeWidth(12), marginTop: getSizeHeight(20), fontSize: getFontRatio(20), color: '#2D3E4D', marginTop: getSizeHeight(12), lineHeight: 25 }]}>{"Prevention"}</Text>
                <Text style={[{ marginTop: getSizeHeight(5), fontFamily: Lato_Regular, fontSize: getFontRatio(12), lineHeight: 14.46, color: '#069FAB', marginHorizontal: getSizeWidth(16), marginTop: getSizeHeight(5), opacity: 0.30 }]}>{'\u20B9 590 per month | \u20B9 1,490 for 3 months'}</Text>

                <TouchableOpacity onPress={() => this.setState({ PreventionOne: !this.state.PreventionOne })}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={[{ fontFamily: Lato_Regular, fontSize: getFontRatio(14), lineHeight: 16.8, color: '#FB9085', marginHorizontal: getSizeWidth(12), marginTop: getSizeHeight(10), marginRight: getSizeWidth(8) }]}>{'Access Your Diabetes Risk '}</Text>
                    <Image style={{ marginTop: getSizeHeight(18), width: getSizeWidth(12), height: getSizeHeight(7) }} source={ViewMore}></Image>

                  </View>
                </TouchableOpacity>


                {this.state.PreventionOne && <View style={{ marginVertical: getSizeHeight(6) }}>
                  <Text style={[styles.pro_style5, { marginHorizontal: getSizeWidth(14), marginRight: getSizeWidth(10), fontSize: getFontRatio(12), color: '#2D3E4D', marginTop: getSizeHeight(6), lineHeight: 15 }]}>{"Simple lifestyle measures have been shown to be effective in preventing or delaying the onset of type 2 diabetes. Treatment of diabetes involves diet and physical activity along with lowering of blood glucose and the levels of other known risk factors that damage blood vessels. If any of the following is a case with you, your risk to Diabetes Increase. If HBA1C is less than 6.5 I.e pre diabetic range, then only he can opt for prevention"}</Text>
                  <Text style={[styles.pro_style5, { marginHorizontal: getSizeWidth(14), marginRight: getSizeWidth(10), fontSize: getFontRatio(12), color: '#2D3E4D', marginTop: getSizeHeight(12), lineHeight: 15 }]}>{"Do you have family history of diabetes?\n\nIs your Lifestyle consist of less physical activity?\n\nDo you have excess weight or obesity?\n\nDo you have high cholesterol?"}</Text>


                </View>}

                <TouchableOpacity onPress={() => this.setState({ PreventionTwo: !this.state.PreventionTwo })}>

                  <View style={{ flexDirection: 'row', marginBottom: getSizeHeight(10) }}>
                    <Text style={[{ fontFamily: Lato_Regular, fontSize: getFontRatio(14), lineHeight: 16.8, color: '#FB9085', marginHorizontal: getSizeWidth(12), marginTop: getSizeHeight(10), marginRight: getSizeWidth(8) }]}>{'Know More '}</Text>
                    <Image style={{ marginTop: getSizeHeight(18), width: getSizeWidth(12), height: getSizeHeight(7) }} source={ViewMore}></Image>
                  </View>
                </TouchableOpacity>

                {this.state.PreventionTwo && <View style={{ flexDirection: 'column', marginBottom: getSizeHeight(10) }}>

                  <View style={{ flexDirection: 'row',  marginHorizontal: getSizeWidth(16), }}>
                  <KnowMoreOne></KnowMoreOne>
                    <Text style={[{marginTop:-2, fontFamily: Lato_Regular, color:'#2D3E4D', fontSize: getFontRatio(10.95), lineHeight: 15.68, marginHorizontal: getSizeWidth(5), }]}>{'24 hour support'}</Text>
                  </View>
                  <View style={{ flexDirection: 'row',  marginHorizontal: getSizeWidth(16), marginTop: getSizeWidth(10) }}>
                  <KnowMoreTwo></KnowMoreTwo>
                    <Text style={[{marginTop:-1, fontFamily: Lato_Regular, color:'#2D3E4D', fontSize: getFontRatio(10.95), lineHeight: 15.68, marginHorizontal: getSizeWidth(5), }]}>{'Personalised diet plan '}</Text>
                  </View>
                  <View style={{ flexDirection: 'row',  marginHorizontal: getSizeWidth(16), marginTop: getSizeWidth(10) }}>
                  <KnowMorethree></KnowMorethree>
                    <Text style={[{marginTop:-1, fontFamily: Lato_Regular, color:'#2D3E4D', fontSize: getFontRatio(10.95), lineHeight: 15.68, marginHorizontal: getSizeWidth(5), }]}>{'Customisable workout plan'}</Text>
                  </View>
                </View>}

                <TouchableOpacity onPress={() => onPressMobileNumberClick('9958146091')}>
                <View style={{ margin: getSizeWidth(12), width: getSizeWidth(133), borderRadius: getSizeWidth(5), height: getSizeHeight(38), backgroundColor: '#F18261', paddingLeft: getSizeWidth(8), paddingRight: getSizeWidth(8), alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={[styles.home_style1TitlePreventButtonText, { color: '#ffffff', textAlign: 'center', }]}>{'Activate the plan'}</Text>
                </View>
                </TouchableOpacity>
              </View>

              {this.state.PreventionOne === false && this.state.PreventionTwo === false && <View style={{ position: 'absolute', right: 0 }}>
                <Background>
                </Background>

                <View style={{ marginLeft: getSizeWidth(35), marginTop: getSizeHeight(65), justifyContent: 'center', alignItems: 'center', position: 'absolute' }}>
                  <Prevention></Prevention>

                </View>


              </View>}


            </View>

<View style={{ marginTop: getSizeHeight(30), width: '95%', minHeight: getSizeHeight(186), backgroundColor: '#FFF5E1', flexDirection: 'row' }}>

<View >

  <Text style={[{ marginLeft: getSizeWidth(12), marginTop: getSizeHeight(20), fontSize: getFontRatio(20), color: '#2D3E4D', marginTop: getSizeHeight(12), lineHeight: 25 }]}>{"Reversal"}</Text>
  <Text style={[{ marginTop: getSizeHeight(5), fontFamily: Lato_Regular, fontSize: getFontRatio(12), lineHeight: 14.46, color: '#069FAB', marginHorizontal: getSizeWidth(16), marginTop: getSizeHeight(5), opacity: 0.30 }]}>{'\u20B9 590 per month | \u20B9 1,490 for 3 months'}</Text>

  <TouchableOpacity onPress={() => this.setState({ ReversalOne: !this.state.ReversalOne })}>
    <View style={{ flexDirection: 'row' }}>
      <Text style={[{ fontFamily: Lato_Regular, fontSize: getFontRatio(14), lineHeight: 16.8, color: '#FB9085', marginHorizontal: getSizeWidth(12), marginTop: getSizeHeight(10), marginRight: getSizeWidth(8) }]}>{'Check Your Eligibility '}</Text>
      <Image style={{ marginTop: getSizeHeight(18), width: getSizeWidth(12), height: getSizeHeight(7) }} source={ViewMore}></Image>

    </View>
  </TouchableOpacity>


  {this.state.ReversalOne && <View style={{ marginVertical: getSizeHeight(6) }}>
    <Text style={[styles.pro_style5, { marginHorizontal: getSizeWidth(14), marginRight: getSizeWidth(10), fontSize: getFontRatio(12), color: '#2D3E4D', marginTop: getSizeHeight(6), lineHeight: 15 }]}>{"Your diabeties can be reversed if answers to all the following question is a NO. \n\nIs your duration of Diabetes More than 5 years\n\nAre you on more than 2 anti diabetic Medicines\n\nIs your HBA1c more than 8\n\nIs your BMI less than 25\n\nDo you suffer from any complication of Diabetes like kidney ,heart or eye problems\n\nIs your age more than 70 years"}</Text>


  </View>}

  <TouchableOpacity onPress={() => this.setState({ ReversalTwo: !this.state.ReversalTwo })}>

    <View style={{ flexDirection: 'row', marginBottom: getSizeHeight(10) }}>
      <Text style={[{ fontFamily: Lato_Regular, fontSize: getFontRatio(14), lineHeight: 16.8, color: '#FB9085', marginHorizontal: getSizeWidth(12), marginTop: getSizeHeight(10), marginRight: getSizeWidth(8) }]}>{'Know More '}</Text>
      <Image style={{ marginTop: getSizeHeight(18), width: getSizeWidth(12), height: getSizeHeight(7) }} source={ViewMore}></Image>
    </View>
  </TouchableOpacity>

  {this.state.ReversalTwo && <View style={{ flexDirection: 'column', marginBottom: getSizeHeight(10) }}>

    <View style={{ flexDirection: 'row',  marginHorizontal: getSizeWidth(16), }}>
    <KnowMoreOne></KnowMoreOne>
      <Text style={[{marginTop:-2, fontFamily: Lato_Regular, fontSize: getFontRatio(10.95), lineHeight: 15.68, marginHorizontal: getSizeWidth(5), }]}>{'24 hour support'}</Text>
    </View>
    <View style={{ flexDirection: 'row', marginHorizontal: getSizeWidth(16), marginTop: getSizeWidth(10) }}>
    <KnowMoreTwo></KnowMoreTwo>
      <Text style={[{marginTop:-1, fontFamily: Lato_Regular, color:'#2D3E4D', fontSize: getFontRatio(10.95), lineHeight: 15.68, marginHorizontal: getSizeWidth(5), }]}>{'Personalised diet plan '}</Text>
    </View>
    <View style={{ flexDirection: 'row',  marginHorizontal: getSizeWidth(16), marginTop: getSizeWidth(10) }}>
    <KnowMorethree></KnowMorethree>
      <Text style={[{marginTop:-1, fontFamily: Lato_Regular, color:'#2D3E4D', fontSize: getFontRatio(10.95), lineHeight: 15.68, marginHorizontal: getSizeWidth(5), }]}>{'Customisable workout plan'}</Text>
    </View>
  </View>}
  <TouchableOpacity onPress={() => onPressMobileNumberClick('9958146091')}>
  <View style={{ margin: getSizeWidth(12), width: getSizeWidth(133), borderRadius: getSizeWidth(5), height: getSizeHeight(38), backgroundColor: '#F18261', paddingLeft: getSizeWidth(8), paddingRight: getSizeWidth(8), alignItems: 'center', justifyContent: 'center' }}>
    <Text style={[styles.home_style1TitlePreventButtonText, { color: '#ffffff', textAlign: 'center', }]}>{'Activate the plan'}</Text>
  </View> 
  </TouchableOpacity>
</View>

{this.state.ReversalOne === false && this.state.ReversalTwo === false && <View style={{ position: 'absolute', right: 0 }}>
  <ReversalBG>
  </ReversalBG>

  <View style={{ marginLeft: getSizeWidth(35), marginTop: getSizeHeight(65), justifyContent: 'center', alignItems: 'center', position: 'absolute' }}>
    <Reversal></Reversal>

  </View>


</View>}


</View>

<View style={{ marginTop: getSizeHeight(30), width: '95%', minHeight: getSizeHeight(186), backgroundColor: '#FFEDED', flexDirection: 'row' }}>

<View >

  <Text style={[{ marginLeft: getSizeWidth(12), marginTop: getSizeHeight(20), fontSize: getFontRatio(20), color: '#2D3E4D', marginTop: getSizeHeight(12), lineHeight: 25 }]}>{"Management"}</Text>
  <Text style={[{ marginTop: getSizeHeight(5), fontFamily: Lato_Regular, fontSize: getFontRatio(12), lineHeight: 14.46, color: '#069FAB', marginHorizontal: getSizeWidth(16), marginTop: getSizeHeight(5), opacity: 0.30 }]}>{'\u20B9 1,990 per month | \u20B9 5,550 for 3 months'}</Text>

  <TouchableOpacity onPress={() => this.setState({ ManagementOne: !this.state.ManagementOne })}>
    <View style={{ flexDirection: 'row' }}>
      <Text style={[{ fontFamily: Lato_Regular, fontSize: getFontRatio(14), lineHeight: 16.8, color: '#FB9085', marginHorizontal: getSizeWidth(12), marginTop: getSizeHeight(10), marginRight: getSizeWidth(8) }]}>{'Check Your Eligibility '}</Text>
      <Image style={{ marginTop: getSizeHeight(18), width: getSizeWidth(12), height: getSizeHeight(7) }} source={ViewMore}></Image>

    </View>
  </TouchableOpacity>


  {this.state.ManagementOne && <View style={{ marginVertical: getSizeHeight(6) }}>
    <Text style={[styles.pro_style5, { marginHorizontal: getSizeWidth(14), marginRight: getSizeWidth(10), fontSize: getFontRatio(12), color: '#2D3E4D', marginTop: getSizeHeight(6), lineHeight: 15 }]}>{"You can manage your diabetes and live a long and healthy life by taking care of yourself each day. Diabetes can affect almost every part of your body. Therefore, you will need to manage your blood glucose levels, blood pressure and cholesterol, to prevent the health problems that can occur when you have diabetes.\n\nIf you are not eligible for reversal and FBS less than 126,Post Prandial Blood Sugar less than 200 you can opt for Management Diabetes package"}</Text>


  </View>}

  <TouchableOpacity onPress={() => this.setState({ ManagementTwo: !this.state.ManagementTwo })}>

    <View style={{ flexDirection: 'row', marginBottom: getSizeHeight(10) }}>
      <Text style={[{ fontFamily: Lato_Regular, fontSize: getFontRatio(14), lineHeight: 16.8, color: '#FB9085', marginHorizontal: getSizeWidth(12), marginTop: getSizeHeight(10), marginRight: getSizeWidth(8) }]}>{'Know More '}</Text>
      <Image style={{ marginTop: getSizeHeight(18), width: getSizeWidth(12), height: getSizeHeight(7) }} source={ViewMore}></Image>
    </View>
  </TouchableOpacity>

  {this.state.ManagementTwo && <View style={{ flexDirection: 'column', marginBottom: getSizeHeight(10) }}>

    <View style={{ flexDirection: 'row', marginHorizontal: getSizeWidth(16), }}>
    <KnowMoreOne></KnowMoreOne>
      <Text style={[{marginTop:-2, fontFamily: Lato_Regular,color:'#2D3E4D', fontSize: getFontRatio(10.95), lineHeight: 15.68, marginHorizontal: getSizeWidth(5), }]}>{'24 hour support'}</Text>
    </View>
    <View style={{ flexDirection: 'row',  marginHorizontal: getSizeWidth(16), marginTop: getSizeWidth(10) }}>
    <KnowMoreTwo></KnowMoreTwo>
      <Text style={[{marginTop:-1, fontFamily: Lato_Regular, color:'#2D3E4D',fontSize: getFontRatio(10.95), lineHeight: 15.68, marginHorizontal: getSizeWidth(5), }]}>{'Personalised diet plan '}</Text>
    </View>
    <View style={{ flexDirection: 'row',  marginHorizontal: getSizeWidth(16), marginTop: getSizeWidth(10) }}>
<KnowMorethree></KnowMorethree>
      <Text style={[{marginTop:-1,  fontFamily: Lato_Regular, color:'#2D3E4D',fontSize: getFontRatio(10.95), lineHeight: 15.68, marginHorizontal: getSizeWidth(5), }]}>{'Customisable workout plan'}</Text>
    </View>
  </View>}
  <TouchableOpacity onPress={() => onPressMobileNumberClick('9958146091')}>
  <View style={{ margin: getSizeWidth(12), width: getSizeWidth(133), borderRadius: getSizeWidth(5), height: getSizeHeight(38), backgroundColor: '#F18261', paddingLeft: getSizeWidth(8), paddingRight: getSizeWidth(8), alignItems: 'center', justifyContent: 'center' }}>
    <Text style={[styles.home_style1TitlePreventButtonText, { color: '#ffffff', textAlign: 'center', }]}>{'Activate the plan'}</Text>  
  </View>
  </TouchableOpacity>
</View>

{this.state.ManagementOne === false && this.state.ManagementTwo === false && <View style={{ position: 'absolute', right: 0 }}>
  <ReversalBG>
  </ReversalBG>

  <View style={{ marginLeft: getSizeWidth(35), marginTop: getSizeHeight(65), justifyContent: 'center', alignItems: 'center', position: 'absolute' }}>
    <Management></Management>

  </View>


</View>}


</View>

            <DeliveryResult></DeliveryResult>




            <View style={{ width: '90%', marginTop: getSizeHeight(15), width: '100%', alignItems: 'center', height: getSizeHeight(330), backgroundColor: '#F6F6FB' }}>
              <Text style={[{ marginBottom: getSizeHeight(15), marginTop: getSizeHeight(20), textAlign: 'center', fontFamily: Lato_Regular, fontSize: getFontRatio(18), lineHeight: 21.6, color: '#222222', marginHorizontal: getSizeWidth(16), }]}>{'Frequently Asked Questions'}</Text>


              <ExpandableListView
                data={CONTENT} // required
              
                itemSeparatorStyle={{ marginHorizontal: 10 }}
                renderItemSeparator={true} // true or false, render separator between Items
                itemContainerStyle={{ height: 30, backgroundColor: "#F6F6FB" }} // add your styles to all item container of your list
                itemLabelStyle={{ marginRight: getSizeWidth(20), fontFamily: Lato_Regular, fontSize: getFontRatio(10), color: '#000000' }} // add your styles to all item text of your list
                innerItemLabelStyle={{ fontFamily: Lato_Regular, fontSize: getFontRatio(8), color: '#000000' }} // add your styles to all inner item text of your list
                itemImageIndicatorStyle={{ position: 'absolute', right: getSizeWidth(5) }}

              />

            </View>

            <View style={{ flexDirection: 'row', marginTop: getSizeHeight(50), marginHorizontal: getSizeWidth(16) }}>

              <TouchableOpacity onPress={() => onPressMobileNumberClick('9958146091')}>
                <View style={{ borderRadius: getSizeWidth(30), height: getSizeHeight(52), borderWidth: 1, borderColor: '#F18261', alignItems: 'center', justifyContent: 'center', paddingLeft: getSizeWidth(30), paddingRight: getSizeWidth(30), flexDirection: 'row' }}>
                  <Phone></Phone>
                  <Text style={[styles.home_style1TitlePreventButtonText, { color: '#2D3E4D', textAlign: 'center', marginLeft: getSizeWidth(6) }]}>{'Call Helpline'}</Text>

                </View>
              </TouchableOpacity>



              <TouchableOpacity onPress={() => this.openWhatsApp()}>
                <View style={{ borderRadius: getSizeWidth(30), marginLeft: getSizeWidth(15), height: getSizeHeight(52), borderWidth: 1, borderColor: '#F18261', alignItems: 'center', justifyContent: 'center', paddingLeft: getSizeWidth(30), paddingRight: getSizeWidth(30), flexDirection: 'row' }}>
                  <Chat></Chat>
                  <Text style={[styles.home_style1TitlePreventButtonText, { color: '#2D3E4D', textAlign: 'center', marginLeft: getSizeWidth(6) }]}>{'Chat with us'}</Text>

                </View></TouchableOpacity>
            </View>



            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: getSizeHeight(50), width: '100%', flexDirection: 'row', height: getSizeHeight(70), backgroundColor: '#FFB4AC' }}>
              <View style={{ width: '56%', alignItems: 'center' }}>
                <Text style={[styles.home_style1TitlePreventButtonText, { color: '#ffffff', textAlign: 'center', marginLeft: getSizeWidth(6) }]}>{'Terms & conditions'}</Text>

              </View>
              <View style={{ marginLeft: getSizeWidth(70), alignItems: 'center', flexDirection: 'row', width: '44%' }}>

                <Insta></Insta>
                <View style={{ width: getSizeWidth(10) }}></View>
                <InstaMain></InstaMain>
                <View style={{ width: getSizeWidth(10) }}></View>
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

  pro_style2: {  height: getSizeHeight(40), paddingLeft: getSizeWidth(10), width: getSizeWidth(40), justifyContent: 'center' },
  pro_style5: { paddingLeft: getSizeWidth(5), fontSize: getFontRatio(20), color: colors.theme_new_title, fontFamily: Lato_Regular },

});

