import React,{ Component } from 'react';
import { View,Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Content, Container, List, ListItem, Col, Icon, Thumbnail } from 'native-base';
import {img_url, api_url, get_doctor_by_specialists, get_doctor_by_ratings, get_doctor_by_services,font_title, doctor_list} from '../config/Constants';
import * as colors from "../assets/css/Colors";
import axios from 'axios';
import { Loader } from '../components/GeneralComponents';
import { Rating } from 'react-native-ratings';
import LottieView from 'lottie-react-native';
export default class DoctorList extends Component<props> {
   constructor(props) {
    super(props);
    this.state = {
      id: this.props.route.params.id,
      sub_id: this.props.route.params.sub_id,
      type: this.props.route.params.type,
      result: [],
      api_status:0,
      isLoding:false
    };
    this.get_doctors();
  }

  get_doctors = async () => {
    if(this.state.type == 1){
      this.get_doctors_by_category();
    }else if(this.state.type == 2){
      this.get_doctors_by_symptoms();
    }else if(this.state.type == 3){
      this.get_doctors_by_ratings();
    }
  };

  async get_doctors_by_category(){
    this.setState({ isLoding : true });
    await axios({
      method: "post",
      url: api_url + get_doctor_by_specialists,
      data: { specialist: this.state.id, specialist_sub_category:this.state.sub_id }
    })
    .then(async (response) => {
      this.setState({ isLoding : false,api_status:1 });
      this.setState({ result: response.data.result })
    })
    .catch((error) => {
      this.setState({ isLoding : false });
      alert('Something went wrong');
    });
  }

  async get_doctors_by_symptoms(){
    this.setState({ isLoding : true });
    await axios({
      method: "post",
      url: api_url + get_doctor_by_services,
      data: { service_id: this.state.id }
    })
    .then(async (response) => {
      this.setState({ isLoding : false ,api_status:1 });
      this.setState({ result: response.data.result })
    })
    .catch((error) => {
      this.setState({ isLoding : false });
      alert('Something went wrong');
    });
  }

  async get_doctors_by_ratings(){
    this.setState({ isLoding : true });
    await axios({
      method: "post",
      url: api_url + get_doctor_by_ratings
    })
    .then(async (response) => {
      this.setState({ isLoding : false,api_status:1  });
      this.setState({ result: response.data.result })
    })
    .catch((error) => {
      this.setState({ isLoding : false });
      alert('Something went wrong');
    });
  }

  get_symptom_doctors = async (row) => {
    this.setState({ isLoding : true });
    await axios({
      method: "post",
      url: api_url + get_symptom_doctors,
      data: { service_id: this.state.data.id }
    })
    .then(async (response) => {
      this.setState({ isLoding : false, api_status: 1 });
      this.setState({ result: response.data.result })
    })
    .catch((error) => {
      this.setState({ isLoding : false });
        alert('Something went wrong');
    });
  };

 
  doctor_details = (data) => {
    console.log("data==",data)

    this.props.navigation.navigate('DoctorDetail', { data: data});
  }  

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
  };
  
  render() {
    return(
      <Container>
        <View>
          <View style={styles.list_style1}>
            <TouchableOpacity style={styles.list_style2} onPress={this.handleBackButtonClick} activeOpacity={1} >
            <Icon onPress={this.handleBackButtonClick} style={styles.list_style3} name='arrow-back' />
            </TouchableOpacity>
            <View style={styles.list_style4} />
            <Text style={styles.list_style5}>Doctor List</Text>
          </View>
        </View>
        <Content>
          <List>
             
          </List>
          <List>
            <FlatList
              data={this.state.result}
              renderItem={({ item,index }) => (
                <ListItem avatar onPress={this.doctor_details.bind(this, item)}>
                    <Col style={{ width:75 }}>
                      <Thumbnail source={{uri : img_url + item.profile_image}} />
                    </Col>
                    <Col>
                      <Text style={styles.list_style6}>Dr.{item.doctor_name}</Text>
                      <View style={styles.list_style7} />
                      <Text style={styles.list_style8}>{item.qualification} ({item.specialist})</Text>
                      <View style={styles.list_style9} />
                      <Text style={styles.list_style10}>{item.experience} Years experience</Text>
                      <View style={styles.list_style11} />
                      {parseInt(item.overall_rating) > 0 &&
                        <Rating
                          ratingCount={5}
                          startingValue={item.overall_rating}
                          imageSize={12}
                          readonly={true}
                        />
                      }
                    </Col>
                </ListItem>
                )}
                keyExtractor={item => item.id}
            />
          </List>
          { this.state.result.length == 0 && this.state.api_status == 1 &&
                <View>
                  <View style={styles.list_style15}>
                    <LottieView source={doctor_list} autoPlay loop />
                  </View>
                  <Text style={styles.list_style16}>Sorry, no doctor list found</Text>
                </View>
              }
        </Content>
        <Loader visible={this.state.isLoding} />
      </Container>
    
    );
  }
}  

const styles = StyleSheet.create({
  list_style1:{alignItems:'flex-start', margin:10},
  list_style2:{width:100, justifyContent:'center'},
  list_style3:{color:colors.theme_fg_two, fontSize:30},
  list_style4:{margin:5},
  list_style5:{fontSize:25, color:colors.theme_fg_two, fontFamily: font_title},
  list_style6:{fontSize:14, fontFamily:font_title, color:colors.theme_fg_two},
  list_style7:{margin:1},
  list_style8:{fontSize:12, color:colors.grey,fontFamily:font_title},
  list_style9:{margin:1},
  list_style10:{fontSize:12, color:colors.grey,fontFamily:font_title},
  list_style11:{margin:1},
  list_style12:{justifyContent:'center'},
  list_style13:{fontSize:18, fontFamily:font_title, color:colors.theme_fg},
  list_style14:{margin:5},
  list_style15:{height:250, marginTop:'40%'},
  list_style16:{alignSelf:'center', fontFamily:font_title},
});
