import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, BackHandler, Keyboard, TouchableOpacity, Picker,Modal  } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { Icon , Button } from 'native-base';
import Snackbar from 'react-native-snackbar';
import { api_url, register, logo_with_name, font_title,font_description,get_blood_list,getSizeHeight, Lato_Regular,getFontRatio, getSizeWidth } from '../config/Constants';
import { StatusBar, Loader } from '../components/GeneralComponents';
import * as colors from '../assets/css/Colors';
import axios from 'axios';
import { connect } from 'react-redux';
import { serviceActionPending, serviceActionError, serviceActionSuccess } from '../actions/RegisterActions';
import AsyncStorage from '@react-native-community/async-storage';
import { Input } from 'react-native-elements';
import Logo from '../config/SVG/Logo';
import DateTimePickerComp from '../components/DateTimePickerComp';
import Dob from '../config/SVG/Dob';
import Moment from 'moment';
import LoadCircle from '../config/SVG/LoadCircle';


class Register extends Component<Props> {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      customer_name: "",
      phone_number: "",
      email: "",
      password: "",
      blood_group:"",
      validation: true,
      blood_group_list:[],
      fcm_token: global.fcm_token,
      isDateTimePickerVisible:false,
      modalVisible: false
    };
    this.get_blood_list();
  }

  componentWillMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick() {
    this.props.navigation.navigate("Login");
    return true;
  }

  login = () => {
    this.props.navigation.navigate("Login");
  };

  home = () => {
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Home" }],
      })
    );
  };

  OptionalPage = () => {
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "OptionalPage" }],
      })
    );
  };

  register = async () => {
    
    Keyboard.dismiss();
    await this.checkValidate();
    if (this.state.validation) {
      this.props.serviceActionPending();
      await axios({
        method: "post",
        url: api_url + register,
        data: {
          customer_name: this.state.customer_name,
          fcm_token: this.state.fcm_token,
          phone_number: this.state.phone_number,
          email: this.state.email,
          password: this.state.password,
          blood_group:"",
          gender:'',
          dob:this.state.dob,
          relationship:'',
          location:'',
          weight:'',
          height:'',
          medical_condition:''

        },
      })
        .then(async (response) => {
          console.log("response.data.message",response.data.message)
          if(response.data.message==="Registered Successfully")
          {
            this.setState({modalVisible:true})
            setTimeout(async () => {
              this.setState({modalVisible:false})
              
            }, 3000);

            setTimeout(async () => {
              this.setState({modalVisible:false})
              await this.props.serviceActionSuccess(response.data);
              await this.saveData();
            }, 2500);

           
           
          }else
          {
            await this.props.serviceActionSuccess(response.data);
            await this.saveData();
          }
        
          
         
        
        })
        .catch((error) => {
          console.log("response",error)

          this.props.serviceActionError(error);
        });
    }
  };

  get_blood_list = async () => {
    await axios({
      method: "get",
      url: api_url + get_blood_list
    })
    .then(async (response) => {
      this.setState({ blood_group_list : response.data.result });
    })
    .catch((error) => {
      alert('Sorry, something went wrong!')
    });
  }

  saveData = async () => {
    if (this.props.status == 1) {
      try {
        await AsyncStorage.setItem("user_id", this.props.data.id.toString());
        await AsyncStorage.setItem(
          "customer_name",
          this.props.data.customer_name.toString()
        );
        await AsyncStorage.setItem(
          "phone_number",
          this.props.data.phone_number.toString()
        );
        await AsyncStorage.setItem("email", this.props.data.email.toString());
        global.id = await this.props.data.id;
        global.customer_name = await this.props.data.customer_name;
        global.phone_number = await this.props.data.phone_number;
        global.email = await this.props.data.email;
        await this.OptionalPage();
      } catch (e) {}
    } else {
      alert(this.props.message);
    }
  };

  checkValidate() {
    if (
      this.state.email == "" ||
      this.state.phone_number == "" ||
      this.state.password == "" ||
      // this.state.blood_group == "" ||
      this.state.customer_name == ""
    ) {
      this.state.validation = false;
      this.showSnackbar("Please fill all the fields.");
      return true;
    } else {
      this.state.validation = true;
      return true;
    }
  }

  select_blood_group = (value) =>{
    this.setState({ blood_group : value });
  }

  showSnackbar(msg) {
    Snackbar.show({
      title: msg,
      duration: Snackbar.LENGTH_SHORT,
    });
  }

  render() {
    const { isLoding, error, data, message, status } = this.props;

    let bl_list = this.state.blood_group_list.map( (s, i) => {
        return <Picker.Item style={{fontSize:1}} key={i} value={s.blood_group} label={s.blood_group} />
    });

    return (
      <View style={styles.container}>
        <View>
          <StatusBar />
        </View>
        <Loader visible={isLoding} />
        <DateTimePickerComp
            mode="date"
            isDateTimePickerVisible={this.state.isDateTimePickerVisible}
            handleDatePicked={this.handleDatePicked}
            hideDateTimePicker={this.hideDateTimePicker}
          />
           <Modal
          animationType="slide"
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!this.state.modalVisible);
          }}
        >

        <View style={styles.modalstyle}>
          <View style={{marginTop:getSizeHeight(138),justifyContent:'center',alignItems:'center'}}>
          <LoadCircle></LoadCircle>
          </View>
          <View style={{marginTop:getSizeHeight(90),alignItems:'center'}}>
          <Text style={styles.pro_style5Edit}>{'Thank you, '+this.state.customer_name}</Text>
          <Text style={[styles.pro_style5Edit,{marginTop:getSizeHeight(30),marginHorizontal:getSizeWidth(80)}]}>{'Allow us a minute to setup your profile.'}</Text>

          </View>
        </View>

        </Modal>
        <View>
          <View style={styles.reg_style1}>
            <TouchableOpacity style={styles.reg_style2} onPress={this.handleBackButtonClick} activeOpacity={1} >
            <Icon onPress={this.handleBackButtonClick} style={styles.reg_style3} name='arrow-back' />
            </TouchableOpacity>
            <View style={styles.reg_style4} />
            <Text style={styles.reg_style5}>Register</Text>
          </View>
        </View>
        <ScrollView keyboardShouldPersistTaps="always" style={{marginBottom:50}} >
          <View style={styles.reg_style6}>
            
            <View style={styles.reg_style8}>
              {/* <Image
                style={styles.reg_style9}
                source={logo_with_name}
              /> */}
              <Logo></Logo>
            </View>
            <View style={styles.reg_style10} />
            <View style={styles.reg_style11}>
              <Input
                inputStyle={styles.reg_style12}
                label="User Name"
                labelStyle={styles.reg_style13}
                placeholder='john'
                leftIcon={
                  <Icon
                    name='person'
                    size={20}
                    color='black'
                    style={styles.reg_style14}
                  />
                }
                onChangeText={(TextInputValue) =>
                  this.setState({ customer_name: TextInputValue })
                }
              />
            </View>
            <View style={styles.reg_style15}>
              <Input
                inputStyle={styles.reg_style16}
                label="Phone Number"
                labelStyle={styles.reg_style17}
                placeholder='+91xxxxxxxxxx'
                leftIcon={
                  <Icon
                    name='call'
                    size={20}
                    color='black'
                    style={styles.reg_style18}
                  />
                }
                keyboardType="number-pad"
                onChangeText={(TextInputValue) =>
                  this.setState({ phone_number: TextInputValue })
                }
              />
            </View>
            <View style={styles.reg_style19}>
              <Input
                inputStyle={styles.reg_style20}
                label="Email Address"
                labelStyle={styles.reg_style21}
                placeholder="john@gmail.com"
                leftIcon={
                  <Icon
                    name='mail'
                    size={20}
                    color='black'
                    style={styles.reg_style22}
                  />
                }
                keyboardType="email-address"
                onChangeText={(TextInputValue) =>
                  this.setState({ email: TextInputValue })
                }
              />
            </View>
            <View style={styles.reg_style23}>
              <Input
                inputStyle={styles.reg_style24}
                placeholder="**********"
                label="Password"
                labelStyle={styles.reg_style25}
                leftIcon={
                  <Icon
                    name='key'
                    size={20}
                    color='black'
                    style={styles.reg_style26}
                  />
                }
                secureTextEntry={true}
                onChangeText={(TextInputValue) =>
                  this.setState({ password: TextInputValue })
                }
              />
            </View>
            <View style={styles.reg_style27}>
            <TouchableOpacity   onPress={() => this.setState({ isDateTimePickerVisible: true })} style={styles.pro_style14}>             
                <Input
                   editable={false}
                  inputStyle={styles.reg_style24}                  
                  label="Date of Birth"
                  labelStyle={styles.reg_style25}
                  placeholder="1988"
                  value={this.state.YearofBirth}
                  onChangeText={TextInputValue =>
                    this.setState({ YearofBirth: TextInputValue })}
                    rightIcon={
                      <Dob></Dob>
                    
                    }
                />
              </TouchableOpacity>


              {/* <Text style={styles.reg_style28}>Blood Group</Text>
              <Picker
                selectedValue={this.state.blood_group}
                style={styles.reg_style29}
                onValueChange={(itemValue, itemIndex) => this.select_blood_group(itemValue)}
              >
              {bl_list}
              </Picker> */}
            </View>
            <View style={styles.reg_style30} />
            <View style={styles.reg_style31}>
              <Button
                block
                style={styles.reg_style32}
                onPress={this.register}
              >
                <Text style={styles.reg_style33}>SUBMIT</Text>
              </Button>
            </View>

            <View style={styles.reg_style34}>
              <Text style={styles.reg_style35} onPress={this.login}>
                Already have an account? <Text style={styles.reg_style36}>LOGIN HERE</Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
  
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };
  handleDatePicked = date => {

    this.hideDateTimePicker();
    this.setState({
      YearofBirth: Moment(date).format('yyyy-MM-DD')

    })

  };
}

function mapStateToProps(state) {
  return {
    isLoding: state.register.isLoding,
    error: state.register.error,
    data: state.register.data,
    message: state.register.message,
    status: state.register.status,
  };
}

const mapDispatchToProps = (dispatch) => ({
  serviceActionPending: () => dispatch(serviceActionPending()),
  serviceActionError: (error) => dispatch(serviceActionError(error)),
  serviceActionSuccess: (data) => dispatch(serviceActionSuccess(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);

const styles = StyleSheet.create({
  reg_style1:{alignItems:'flex-start',margin:10},
  reg_style2:{width:100,justifyContent:'center'},
  reg_style3:{color:colors.theme_fg_two,fontSize:30},
  reg_style4:{margin:5},
  reg_style5:{fontSize:25,color:colors.theme_fg_two,fontFamily:font_title},
  reg_style6:{justifyContent:"center",alignItems:"center"},
  reg_style7:{marginTop:"10%"},
  reg_style8:{height:120,width:120},
  reg_style9:{flex:1,width:undefined,height:undefined},
  reg_style10:{marginTop:"10%"},
  reg_style11:{width:"80%",alignSelf:"center"},
  reg_style12:{fontSize:14,fontFamily:font_description},
  reg_style13:{fontFamily:font_title},
  reg_style14:{color:colors.theme_bg},
  reg_style15:{width:"80%",alignSelf:"center"},
  reg_style16:{fontSize:14,fontFamily:font_description},
  reg_style17:{fontFamily:font_title},
  reg_style18:{color:colors.theme_bg},
  reg_style19:{width:"80%",alignSelf:"center"},
  reg_style20:{fontSize:14,fontFamily:font_description},
  reg_style21:{fontFamily:font_title},
  reg_style22:{color:colors.theme_bg},
  reg_style23:{width:"80%",alignSelf:"center"},
  reg_style24:{fontSize:14,fontFamily:font_description},
  reg_style25:{fontFamily:font_title},
  reg_style26:{color:colors.theme_bg},
  reg_style27:{width:"80%",alignSelf:"center"},
  reg_style28:{color:'grey',fontWeight:'bold',fontSize:15,marginLeft:'3%',fontFamily:font_description},
  reg_style29:{height:50,width:'100%'},
  reg_style30:{marginTop:"5%"},
  reg_style31:{width:"80%",alignSelf:"center",marginBottom:10},
  reg_style32:{backgroundColor:colors.theme_bg,borderRadius:5,height:40},
  reg_style33:{color:colors.theme_fg_three,fontFamily:font_title,letterSpacing:0.5},
  reg_style34:{marginTop:"5%",justifyContent:"flex-end",alignItems:"center",position:"relative",bottom:40},
  reg_style35:{fontSize:15,color:colors.theme_bg_two,marginTop:"8%",fontFamily:font_description,marginBottom:20},
  reg_style36:{color:colors.theme_fg},
  modalstyle:{width:'100%',height:'100%', backgroundColor:colors.theme_bg_dark},
  pro_style5Edit: {textAlign:'center',  fontSize: getFontRatio(26),  fontFamily: Lato_Regular,color:colors.theme_bg_three  },

});
