import React, { Component } from 'react';
import { View, StyleSheet, Text,Image } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { api_url, settings,font_description,font_title,SpalshImage } from '../config/Constants';
import * as colors from '../assets/css/Colors';
import { StatusBar } from '../components/GeneralComponents';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { connect } from 'react-redux';
import { serviceActionPending, serviceActionError, serviceActionSuccess } from '../actions/SplashActions';
import { notifications } from "react-native-firebase-push-notifications"
class Splash extends Component<Props> {
  async componentDidMount() {
    await this.getToken();
    await this.settings();
    await this.home();
  }

  getToken = async () => {
    //get the messeging token
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    if (!fcmToken) {
      let fcmToken = await notifications.getToken();
      if (fcmToken) {
        try {
          AsyncStorage.setItem("fcmToken", fcmToken);
          global.fcm_token = fcmToken;
        } catch (e) {}
      }
    } else {
      global.fcm_token = fcmToken;
    }
  };

  getInitialNotification = async () => {
    //get the initial token (triggered when app opens from a closed state)
    const notification = await notifications.getInitialNotification();
    console.log("getInitialNotification", notification);
    return notification;
  };

  onNotificationOpenedListener = () => {
    //remember to remove the listener on un mount
    //this gets triggered when the application is in the background
    this.removeOnNotificationOpened = notifications.onNotificationOpened(
      (notification) => {
        console.log("onNotificationOpened", notification);
        //do something with the notification
      }
    );
  };

  onNotificationListener = () => {
    //remember to remove the listener on un mount
    //this gets triggered when the application is in the forground/runnning
    //for android make sure you manifest is setup - else this wont work
    //Android will not have any info set on the notification properties (title, subtitle, etc..), but _data will still contain information
    this.removeOnNotification = notifications.onNotification((notification) => {
      //do something with the notification
      console.log("onNotification", notification);
    });
  };

  onTokenRefreshListener = () => {
    //remember to remove the listener on un mount
    //this gets triggered when a new token is generated for the user
    this.removeonTokenRefresh = messages.onTokenRefresh((token) => {
      //do something with the new token
    });
  };

  setBadge = async (number) => {
    //only works on iOS for now
    return await notifications.setBadge(number);
  };

  getBadge = async () => {
    //only works on iOS for now
    return await notifications.getBadge();
  };

  hasPermission = async () => {
    //only works on iOS
    return await notifications.hasPermission();
    //or     return await messages.hasPermission()
  };

  requestPermission = async () => {
    //only works on iOS
    return await notifications.requestPermission();
    //or     return await messages.requestPermission()
  };

  componentWillUnmount() {
    //remove the listener on unmount
    if (this.removeOnNotificationOpened) {
      this.removeOnNotificationOpened();
    }
    if (this.removeOnNotification) {
      this.removeOnNotification();
    }

    if (this.removeonTokenRefresh) {
      this.removeonTokenRefresh();
    }
  }

  settings = async () => {
    this.props.serviceActionPending();
    await axios({
      method: "get",
      url: api_url + settings,
    })
      .then(async (response) => {
        await this.props.serviceActionSuccess(response.data);
      })
      .catch((error) => {
        alert(error);
        this.props.serviceActionError(error);
      });
  };

  home = async () => {
    const user_id = await AsyncStorage.getItem("user_id");
    const customer_name = await AsyncStorage.getItem("customer_name");
    const phone_number = await AsyncStorage.getItem("phone_number");
    const email = await AsyncStorage.getItem("email");
    global.currency = this.props.data.default_currency;
    global.currency_short_code = this.props.data.currency_short_code;
    global.application_name = this.props.data.application_name;
    global.razorpay_key = this.props.data.razorpay_key;
    global.delivery_charge = this.props.data.delivery_charge;
    global.free_delivery_amount = this.props.data.free_delivery_amount;
    global.admin_phone = this.props.data.contact_number;
    global.admin_email = this.props.data.email;
    global.admin_address = this.props.data.address;
    if (user_id !== null) {
      global.id = user_id;
      global.customer_name = customer_name;
      global.phone_number = phone_number;
      global.email = email;
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Home" }],
        })
      );
    } else {
      global.id = "";
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
    }
  };

render(){
    return(
      <View style={styles.spl_style1}>
              <Image source={SpalshImage} style={{ position: 'absolute', left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }} />

        <View>
          <StatusBar />
        </View>
        <View>
          {/* <Text style={styles.spl_style2}>MedApp</Text> */}
          <View style={styles.spl_style3} />
          {/* <Text style={styles.spl_style4}>Customer Application</Text> */}
        </View>
      </View>
    )
  }
 
} 

function mapStateToProps(state) {
  return {
    isLoding: state.splash.isLoding,
    error: state.splash.error,
    data: state.splash.data,
    message: state.splash.message,
    status: state.splash.status,
  };
}

const mapDispatchToProps = (dispatch) => ({
  serviceActionPending: () => dispatch(serviceActionPending()),
  serviceActionError: (error) => dispatch(serviceActionError(error)),
  serviceActionSuccess: (data) => dispatch(serviceActionSuccess(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Splash);

const styles = StyleSheet.create({
  spl_style1: {
    height:'100%',
    width:'100%',
    alignItems: 'center',
    justifyContent:'center'
  },
  spl_style2:{fontFamily:font_title,fontSize:50,color:colors.theme_bg,letterSpacing:5},
  spl_style3:{borderWidth:0.5,borderColor:colors.theme_bg,margin:5},
  spl_style4:{fontFamily:font_description,fontSize:18,color:colors.theme_bg,letterSpacing:2},

});