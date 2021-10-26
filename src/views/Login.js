import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, Keyboard ,TouchableOpacity } from 'react-native';
import Snackbar from 'react-native-snackbar';
import { Button, Icon} from 'native-base';
import { api_url, login,sociallogin, logo_with_name, font_description,font_title,buttonfacebook,buttongoogle,loginToGoogle,fbLogin } from '../config/Constants';
import { StatusBar, Loader } from '../components/GeneralComponents';
import axios from 'axios';
import { connect } from 'react-redux';
import { serviceActionPending, serviceActionError, serviceActionSuccess } from '../actions/LoginActions';
import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions } from '@react-navigation/native';
import * as colors from '../assets/css/Colors';
import { Input } from 'react-native-elements';
import Logo from '../config/SVG/Logo';

class Login extends Component<Props> {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      email: "",
      validation: true,
      fcm_token: global.fcm_token,
      isLoding:false,
      userInfo:''
    };
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

  login = async () => {
    this.setState({ isLoding : true });
    Keyboard.dismiss();
    await this.checkValidate();
    if (this.state.validation) {
      this.props.serviceActionPending();
      await axios({
        method: "post",
        url: api_url + login,
        data: {
          email: this.state.email,
          password: this.state.password,
          fcm_token: this.state.fcm_token,
        },
      })
        .then(async (response) => {
          this.setState({ isLoding : false });
          await this.props.serviceActionSuccess(response.data);
          await this.saveData();
        })
        .catch((error) => {
          this.setState({ isLoding : false });
          alert(error);
          this.props.serviceActionError(error);
        });
    }
  };

  checkValidate() {
    if (this.state.email == "" || this.state.password == "") {
      this.state.validation = false;
      this.showSnackbar("Please fill all the fields.");
      return true;
    } else {
      this.state.validation = true;
      return true;
    }
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
          this.props.data.phone_number?this.props.data.phone_number.toString():''
        );
        await AsyncStorage.setItem("email", this.props.data.email.toString());
        global.id = await this.props.data.id;
        global.customer_name = await this.props.data.customer_name;
        global.phone_number = await this.props.data.phone_number;
        global.email = await this.props.data.email;
        await this.home();
      } catch (e) {}
    } else {
      alert(this.props.message);
    }
  };

  register = () => {
    this.props.navigation.navigate("Register");
  };

  forgot = () => {
    this.props.navigation.navigate("Forgot");
  };

  home = () => {
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Home" }],
      })
    );
  };

  showSnackbar(msg) {
    Snackbar.show({
      title: msg,
      duration: Snackbar.LENGTH_SHORT,
    });
  }

  render() {

    const { isLoding } = this.props;

    return (
      <View style={styles.log_style1}>
        <View>
          <StatusBar />
        </View>
        <Loader visible={isLoding} />
        <Loader visible={this.state.isLoding} />
        <View>
          <View style={styles.log_style2}>
            <View style={styles.log_style3} />
            <Text style={styles.log_style4}>Login</Text>
          </View>
        </View>
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={styles.log_style5}>
            <View style={styles.log_style6} />
            <View style={styles.log_style7}>
              <Logo></Logo>
              {/* <Image
                style={styles.log_style8}
                source={logo_with_name}
              /> */}
            </View>
            <View style={styles.log_style9} />

            <View style={styles.log_style10}>
              <Input
                inputStyle={styles.log_style11}
                label="Email Address"
                labelStyle={styles.log_style12}
                placeholder="john@gmail.com"
                leftIcon={
                  <Icon
                    name='person'
                    size={20}
                    color='black'
                    style={styles.log_style13}
                  />
                }
                keyboardType="email-address"
                onChangeText={(TextInputValue) =>
                  this.setState({ email: TextInputValue })
                }
              />
            </View>
            <View style={styles.log_style14}>
              <Input
                inputStyle={styles.log_style15}
                placeholder="**********"
                label="Password"
                labelStyle={styles.log_style16}
                leftIcon={
                  <Icon
                    name='key'
                    size={20}
                    color='black'
                    style={styles.log_style17}
                  />
                }
                secureTextEntry={true}
                onChangeText={(TextInputValue) =>
                  this.setState({ password: TextInputValue })
                }
              />
            </View>
            <View style={styles.log_style18} />

            <View style={styles.log_style19}>
              <Button block style={styles.log_style20} onPress={this.login}>
                <Text style={styles.log_style21}>LOGIN NOW</Text>
              </Button>
            </View>
            <View style={styles.log_style22} />
            <View style={styles.log_style23}>
              <Text style={styles.log_style24} onPress={this.forgot}>
                Forgot Password?
              </Text>
            </View>
            <TouchableOpacity activeOpacity={0.5} style={{...styles.buttonContainerlogin, ...styles.signupButton, backgroundColor: colors.googleRed,marginTop:15}}
              onPress={() => this.googleSignIn()}>
              <Image source={buttongoogle} style={{height:40 ,width:280 }} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} style={{...styles.buttonContainerlogin, ...styles.signupButton, backgroundColor: colors.fbBlue,marginTop:15}}
              onPress={this.fbLogin}>
              <Image source={buttonfacebook} style={{  height:40 ,width:280 }} />
            </TouchableOpacity>
           
            <View style={styles.log_style25}>
              <Text style={styles.log_style26} onPress={this.register}>
                Sign up for a new account ?
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
  googleSignIn = async () => {

    try {

      const userInfo = await loginToGoogle()
      const { name, email, id, photo } = userInfo.user

      console.log("userInfo.user" , name, email, id, photo )

      // const data = this.state.loginData
      // data.password = ''
      // data['google_id'] = id
      // data.email = email
      // data.login_type = 2
      // this.setState({ userInfo: userInfo.user, loginData: data })
      // this.doLogin()

      this.props.serviceActionPending();
      await axios({
        method: "post",
        url: api_url + sociallogin,
        data: {
          customer_name:name,
          socialid:id,
          signup_type:1,
          email: email,
          fcm_token: this.state.fcm_token,
          profile_picture:photo
        },
        
      })
        .then(async (response) => {

          console.log('response.data google',response.data);

          this.setState({ isLoding : false });
          await this.props.serviceActionSuccess(response.data);
          await this.saveData();
        })
        .catch((error) => {
          this.setState({ isLoding : false });
          alert(error);
          this.props.serviceActionError(error);
        });

    } catch (error) {

      console.warn("error err" , error)
    }
  }

  

  fbLogin = async () => {

    const callback = (error, result) => {
      console.log('error in facebook login =', result)

      if (error) {

        // showAlert('error', "Error in facebook login")
        console.log('error in facebook login =', error)

      } else {

        console.warn("result",JSON.stringify(result))
        //showAlert('success',JSON.stringify(result))
        const { first_name, last_name, id, name, email } = result;
        const pic = result.picture.data.url
        this.setState({ userInfo: result}, () => {

          this.doLogin(first_name, last_name, id, name, email,pic)

        })

        // console.log("Facebook Login Response",first_name, last_name, id, name, email,pic)

      //  this.props.serviceActionPending();
      // await axios({
      //   method: "post",
      //   url: api_url + sociallogin,
      //   data: {
      //     customer_name:name,
      //     socialid:id,
      //     signup_type:'facebook',
      //     email: email,
      //     fcm_token: this.state.fcm_token,
      //   },
      // })
      //   .then(async (response) => {
      //     console.log('response.data facebook',response.data);

      //     this.setState({ isLoding : false });
      //     await this.props.serviceActionSuccess(response.data);
      //     await this.saveData();
      //   })
      //   .catch((error) => {
      //     this.setState({ isLoding : false });
      //     alert(error);
      //     this.props.serviceActionError(error);
      //   });

      }
    }

    await fbLogin(callback)

  }

  doLogin = async (first_name, last_name, id, name, email,pic) => {
     this.props.serviceActionPending();
      await axios({
        method: "post",
        url: api_url + sociallogin,
        data: {
          customer_name:name,
          socialid:id,
          signup_type:2,
          email: email,
          fcm_token: this.state.fcm_token,
          profile_picture:pic

        },
      })
        .then(async (response) => {
          console.log('response.data facebook',response.data);

          this.setState({ isLoding : false });
          await this.props.serviceActionSuccess(response.data);
          await this.saveData();
        })
        .catch((error) => {
          this.setState({ isLoding : false });
          alert(error);
          this.props.serviceActionError(error);
        });
  }
}

function mapStateToProps(state) {
  return {
    isLoding: state.login.isLoding,
    error: state.login.error,
    data: state.login.data,
    message: state.login.message,
    status: state.login.status,
  };
}

const mapDispatchToProps = (dispatch) => ({
  serviceActionPending: () => dispatch(serviceActionPending()),
  serviceActionError: (error) => dispatch(serviceActionError(error)),
  serviceActionSuccess: (data) => dispatch(serviceActionSuccess(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
const styles = StyleSheet.create({
  log_style1:{flex: 1, flexDirection: "column" },
  log_style2:{alignItems:'flex-start', margin:10},
  log_style3:{margin:5},
  log_style4:{fontSize:25, color:colors.theme_fg_two, fontFamily: font_title},
  log_style5:{height: "90%",justifyContent: "center",alignItems: "center"},
  log_style6:{marginTop: "20%"},
  log_style7:{height: 105,width: 105},
  log_style8:{flex: 1, width: undefined, height: undefined},
  log_style9:{marginTop: "10%"},
  log_style10:{width: "80%", alignSelf: "center"},
  log_style11:{fontSize:14,fontFamily:font_description},
  log_style12:{fontFamily: font_title},
  log_style13:{color:colors.theme_bg},
  log_style14:{width: "80%", alignSelf: "center"},
  log_style15:{fontSize:14,fontFamily:font_description},
  log_style16:{fontFamily: font_title},
  log_style17:{color:colors.theme_bg},
  log_style18:{marginTop: "5%"},
  log_style19:{width: "80%", alignSelf: "center"},
  log_style20:{backgroundColor: colors.theme_bg,borderRadius: 5,height: 40},
  log_style21:{color: colors.theme_fg_three,fontFamily:font_title,letterSpacing: 0.5},
  log_style22:{marginTop: "3%"},
  log_style23:{width: "95%",alignItems: "flex-end"},
  log_style24:{fontSize: 15,color: colors.theme_fg_four,fontFamily:font_description},
  log_style25:{marginTop: "25%",height: "10%",justifyContent: "flex-end",alignItems: "center"},
  log_style26:{fontSize: 15,color: colors.theme_bg,marginBottom: "4%",fontFamily:font_description},
});
