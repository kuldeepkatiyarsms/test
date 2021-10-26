import React, { Component } from "react";
import * as colors from "../assets/css/Colors";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { Container, Content, Body, Button, Icon, Row, Col, Footer } from "native-base";
import { create_booking, api_url,font_title,font_description, check_available_timing } from "../config/Constants";
import { Loader } from '../components/GeneralComponents';
import DateTimePicker from "react-native-modal-datetime-picker";
import axios from 'axios';
import RazorpayCheckout from 'react-native-razorpay';
import { Input } from 'react-native-elements';

export default class CreateAppointment extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state={
      description:'',
      title:'',
      deliveryDatePickerVisible : false,
      delivery_date:'',
      delivery_time:'',
      start_time: '',
      doctor_id: this.props.route.params.id,
      type: this.props.route.params.type,
      price_per_conversation: this.props.route.params.price_per_conversation,
      isLoding:false
    }
  }

  handleBackButtonClick= () => {
    this.props.navigation.goBack(null);
  }

  create_booking = async() =>{
      this.setState({ isLoding:true });
      await axios({
        method: 'post', 
        url: api_url + create_booking,
        data:{
            patient_id: global.id, 
            doctor_id: this.state.doctor_id,  
            start_time: this.state.start_time, 
            payment_mode:2, 
            title:this.state.title, 
            description: this.state.description, 
            total_amount: this.state.price_per_conversation,
            booking_type: this.state.type },
      })
      .then(async response => {
        this.setState({ isLoding: false });
        if(response.data.status == 0){
          alert(response.data.message);
        }else{
          this.setState({ title:'', description:'', start_time:'' });
        }
          
        if(response.data.status == 1){
          await Alert.alert(
            'Success',
            'Your order has been successfully placed.',
            [
              { text: 'OK', onPress: () => this.my_orders() }
            ],
            { cancelable: false }
          );
        }
      })
      .catch(error => {
          alert('something went wrong');
          this.setState({ isLoding: false });
      });
  }

  check_timing = async() =>{
      this.setState({ isLoding:true });
      await axios({
        method: 'post', 
        url: api_url + check_available_timing,
        data:{
            doctor_id: this.state.doctor_id,  
            start_time: this.state.start_time,
            booking_type: this.state.type
          }
      })
      .then(async response => {
        this.setState({ isLoding: false });
        if(response.data.status == 0){
          alert(response.data.message);
        }else{
          this.make_payment();
        }
      })
      .catch(error => {
          alert('something went wrong');
          this.setState({ isLoding: false });
      });
  }

  check_validation = () =>{
    if(this.state.title == ""){
      alert('Please write title');
    }else if(this.state.description == ""){
      alert('Please write description');
    }else if(this.state.start_time == ""){
      alert('Please choose booking time');
    }else{
      this.check_timing();
    }
  }

  make_payment = () =>{
    
    var options = {
      currency: global.currency_short_code,
      key: global.razorpay_key,
      amount: this.state.price_per_conversation * 100,
      name: global.application_name,
      prefill: {
        email: global.email,
        contact: global.phone_number,
        name: global.customer_name
      },
      theme: {color: colors.theme_fg}
    }
    RazorpayCheckout.open(options).then(() => {
      this.create_booking();
    }).catch((error) => {
      alert('Your transaction declined')
    });
  }

  my_orders = () => {
   this.props.navigation.navigate('MyOrders');
  }

  showDeliveryDatePicker = () => {
    this.setState({ deliveryDatePickerVisible: true });
  };
 
  hideDeliveryDatePicker = () => {
    this.setState({ deliveryDatePickerVisible: false });
  };

  handleDeliveryDatePicked = async(date) => {
    var d = new Date(date);
    let delivery_date = d.getDate() + '-' + ("0" + (d.getMonth() + 1)).slice(-2) + '-' + d.getFullYear();
    let hr = d.getHours();
    let min = d.getMinutes();
    if (min < 10) {
        min = "0" + min;
    }
    let ampm = "AM";
    if( hr > 12 ) {
        hr -= 12;
        ampm = "PM";
    }
    let delivery_time = hr+':'+min+' '+ampm;

    let start_time = delivery_date +' '+ delivery_time;
    this.setState({ start_time : start_time, delivery_date : delivery_date, deliveryDatePickerVisible:false, delivery_time : delivery_time });
  };
  
  AppointmentList = () => {
    this.props.navigation.navigate('AppointmentDetail');
  }
 
   render() {
    return (
      <Container>
        <View>
          <View style={styles.create_style1}>
            <TouchableOpacity style={styles.create_style2} onPress={this.handleBackButtonClick} activeOpacity={1} >
              <Icon onPress={this.handleBackButtonClick} style={styles.create_style3} name='arrow-back' />
            </TouchableOpacity>
            <View style={styles.create_style4} />
            <Text style={styles.create_style5}>New Appointment</Text>
          </View>
         </View>
        <Content padder>
          <View style={styles.create_style6} />
          <Input
            inputStyle={styles.create_style7}
            label="Title"
            labelStyle={styles.create_style8}
            placeholder="I have viral fever last two days..."
            onChangeText={(TextInputValue) =>
              this.setState({ title: TextInputValue })
            }
          />
          <View style={styles.create_style9} />
          <Input
            inputStyle={styles.create_style10}
            label="Description"
            labelStyle={styles.create_style11}
            placeholder="Write short description..."
            
            onChangeText={(TextInputValue) =>
              this.setState({ description: TextInputValue })
            }
          />
          <View style={styles.create_style12} />
          <Row>
            <Body>
              <Button onPress={this.showDeliveryDatePicker} style={{ width:100 }} transparent>
                <Icon style={styles.create_style13} name='time' />
              </Button>
               <Text style={styles.create_style14}>(Select your date & time)</Text>
               <View style={styles.create_style15} />
               <Text style={styles.create_style16}>{this.state.start_time}</Text>
               <DateTimePicker
                  isVisible={this.state.deliveryDatePickerVisible}
                  onConfirm={this.handleDeliveryDatePicked}
                  onCancel={this.hideDeliveryDatePicker}
                  minimumDate={new Date()}
                  mode='datetime'
                />
            </Body>
          </Row>
          <Loader visible={this.state.isLoding} />
        </Content>
        <Footer style={styles.create_style17} >
          <TouchableOpacity activeOpacity={1} style={styles.create_style18} onPress = { this.check_validation }>
            <Row>
              <Col style={styles.create_style19} >
                <Text style={styles.create_style20} >SUBMIT</Text>
              </Col>
            </Row>
          </TouchableOpacity>
        </Footer>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  create_style1:{alignItems:'flex-start', margin:10},
  create_style2:{width:100, justifyContent:'center'},
  create_style3:{color:colors.theme_fg_two, fontSize:30},
  create_style4:{margin:5},
  create_style5:{fontSize:25, color:colors.theme_fg_two, fontFamily: font_title},
  create_style6:{margin:10},
  create_style7:{fontSize:14},
  create_style8:{fontFamily: font_title},
  create_style9:{margin:10},
  create_style10:{fontSize:14, height:80},
  create_style11:{fontFamily: font_title},
  create_style12:{margin:10},
  create_style13:{fontSize:50, color:colors.theme_fg},
  create_style14:{fontSize:12, color:colors.grey,fontFamily:font_description},
  create_style15:{margin:10},
  create_style16:{fontFamily:font_description},
  create_style17:{backgroundColor:'transparent'},
  create_style18:{width:'100%',backgroundColor:colors.theme_bg},
  create_style19:{alignItems:'center',justifyContent:'center'},
  create_style20:{color:colors.theme_fg_three,fontFamily:font_title,fontSize:18},

});