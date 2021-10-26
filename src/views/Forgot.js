import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, Keyboard  ,Alert, TouchableOpacity } from 'react-native';
import { Icon, Button } from 'native-base';
import Snackbar from 'react-native-snackbar';
import { api_url, forgot, forgot_password,font_title, font_description } from '../config/Constants';
import { StatusBar, Loader } from '../components/GeneralComponents';
import axios from 'axios';
import { connect } from 'react-redux';
import { serviceActionPending, serviceActionError, serviceActionSuccess } from '../actions/ForgotActions';
import * as colors from '../assets/css/Colors';
import { Input } from 'react-native-elements'; 

class Forgot extends Component<Props> {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      email: "",
      validation: true,
      isModalVisible: false,
      isLoding:false
    };
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

  forgot_password = async () => {
    this.setState({ isLoding : true });
    Keyboard.dismiss();
    await this.checkValidate();
    if (this.state.validation) {
      this.props.serviceActionPending();
      await axios({
        method: "post",
        url: api_url + forgot,
        data: { email: this.state.email },
      })
        .then(async (response) => {
          console.log('response.data.status',response.data)
        if(response.data.status==="0")
        {
          Alert.alert(
            "",
            response.data.message,
            [
              
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
         
        }
          this.setState({ isLoding : false });
          await this.props.serviceActionSuccess(response.data);
          await this.otp(response.data.result.id);
        
        })
        .catch((error) => {
          
            
          this.setState({ isLoding : false });
          this.props.serviceActionError(error);
        });
    }
  };

  otp(id) {
    if (this.props.status == 1) {
      this.props.navigation.navigate("Otp", {id:id});
    } else {
      alert(this.props.message);
    }
  }

  checkValidate() {
    if (this.state.email == "") {
      this.state.validation = false;
      this.showSnackbar("Please enter email address");
      return true;
    }
  }

  showSnackbar(msg) {
    Snackbar.show({
      title: msg,
      duration: Snackbar.LENGTH_SHORT,
    });
  }

  showSnackbarmess(msg) {
    Snackbar.show({
      text: msg,
      duration: Snackbar.LENGTH_SHORT,
    });
  }

  checkValidateEmail(message) {
   
      this.showSnackbar(message);
      return true;
    
  }
  render() {
    const { isLoding } = this.props;

    return (
      <View style={styles.for_style1}>
        <View>
          <StatusBar />
        </View>
        <Loader visible={isLoding} />
         <Loader visible={this.state.isLoding} />
         <View>
          <View style={styles.for_style2}>
            <TouchableOpacity style={styles.for_style3} onPress={this.handleBackButtonClick} activeOpacity={1} >
              <Icon onPress={this.handleBackButtonClick} style={styles.for_style4} name='arrow-back' />
            </TouchableOpacity>
            <View style={styles.for_style5} />
            <Text style={styles.for_style6}>Forgot password</Text>
          </View>
         </View>
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={styles.for_style7}>
            <View style={styles.for_style8} />
            <View style={styles.for_style9}>
              <Image
                style={styles.for_style10}
                source={forgot_password}
              />
            </View>
            <View style={styles.for_style11} />
            <View style={styles.for_style12}>
              <Text style={styles.for_style13}>
                We just need your registered E-Mail Address to send you a reset
                code
              </Text>
            </View>
            <View style={styles.for_style14} />

            <View style={styles.for_style15}>
              <Input
                inputStyle={styles.for_style16}
                label="Email"
                labelStyle={styles.for_style17}
                placeholder="adcb@gmail.com"
                leftIcon={
                  <Icon
                    name='mail'
                    size={20}
                    color='black'
                    style={styles.for_style18}
                  />
                }
                keyboardType="email-address"
                onChangeText={(TextInputValue) =>
                  this.setState({ email: TextInputValue })
                }
              />
            </View>
            <View style={styles.for_style19} />

            <View style={styles.for_style20}>
              <Button
                block
                style={styles.for_style21}
                onPress={this.forgot_password}
              >
                <Text style={styles.for_style22}>SEND OTP</Text>
              </Button>
            </View>
            <View style={styles.for_style23} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoding: state.forgot.isLoding,
    error: state.forgot.error,
    data: state.forgot.data,
    message: state.forgot.message,
    status: state.forgot.status,
  };
}

const mapDispatchToProps = (dispatch) => ({
  serviceActionPending: () => dispatch(serviceActionPending()),
  serviceActionError: (error) => dispatch(serviceActionError(error)),
  serviceActionSuccess: (data) => dispatch(serviceActionSuccess(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Forgot);
const styles = StyleSheet.create({
  for_style1:{flex: 1, flexDirection: "column" },
  for_style2:{alignItems:'flex-start', margin:10},
  for_style3:{width:100, justifyContent:'center'},
  for_style4:{color:colors.theme_fg_two, fontSize:30},
  for_style5:{margin:5},
  for_style6:{fontSize:25, color:colors.theme_fg_two, fontFamily: font_title},
  for_style7:{height: "80%",justifyContent: "center",alignItems: "center"},
  for_style8:{marginTop: "20%"},
  for_style9:{height: 120,width: 120},
  for_style10:{flex: 1, width: undefined, height: undefined},
  for_style11:{marginTop: "10%"},
  for_style12:{width: "80%"},
  for_style13:{color: colors.theme_fg_dark,justifyContent: "center",alignSelf: "center",textAlign: "center",fontFamily:font_description},
  for_style14:{marginTop: "5%"},
  for_style15:{width: "80%", alignSelf: "center"},
  for_style16:{fontSize:14,fontFamily:font_description},
  for_style17:{fontFamily: font_title},
  for_style18:{color:colors.theme_bg},
  for_style19:{marginTop: "5%"},
  for_style20:{width: "80%", alignSelf: "center"},
  for_style21:{backgroundColor: colors.theme_bg,borderRadius: 5,height: 40},
  for_style22:{color: colors.theme_fg_three,fontFamily:font_title,letterSpacing: 0.5},
  for_style23:{marginTop: "2%"},
});
