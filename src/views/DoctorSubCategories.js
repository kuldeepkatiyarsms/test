import React,{ Component } from 'react';
import { View,Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Content, Container, Body, Left, List, ListItem, Icon, Right, Thumbnail } from 'native-base';
import {img_url, api_url, doctor_sub_category,font_title, doctor_list} from '../config/Constants';
import * as colors from "../assets/css/Colors";
import axios from 'axios';
import { Loader } from '../components/GeneralComponents';
import LottieView from 'lottie-react-native';
export default class DoctorSubCategories extends Component<props> {
   constructor(props) {
    super(props);
    this.state = {
      id: this.props.route.params.id,
      category_name: this.props.route.params.category_name,
      result: [],
      api_status:0,
      isLoding:false
    };
    this.get_sub_categories();
  }

  async get_sub_categories(){
    this.setState({ isLoding : true });
    await axios({
      method: "post",
      url: api_url + doctor_sub_category,
      data: { category_id: this.state.id }
    })
    .then(async (response) => {
      this.setState({ isLoding : false, api_status:1 });
      this.setState({ result: response.data.result })
    })
    .catch((error) => {
      this.setState({ isLoding : false });
      alert('Something went wrong');
    });
  }
 
  doctor_list = (data) => {
    this.props.navigation.navigate('DoctorList', { id:this.state.id, sub_id:data.id, type:1});
  }  

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
  };
  
  render() {
    return(
      <Container>
        <View>
          <View style={styles.sub_style1}>
            <TouchableOpacity style={styles.sub_style2} onPress={this.handleBackButtonClick} activeOpacity={1} >
            <Icon onPress={this.handleBackButtonClick} style={styles.sub_style3} name='arrow-back' />
            </TouchableOpacity>
            <View style={styles.sub_style4} />
            <Text style={styles.sub_style5}>{this.state.category_name}</Text>
          </View>
        </View>
        <Content>
          <List>
             
          </List>
          <List>
            <FlatList
              data={this.state.result}
              renderItem={({ item,index }) => (
                <ListItem avatar activeOpacity={1} onPress={this.doctor_list.bind(this, item)}>
                    <Left>
                      <Thumbnail square style={styles.sub_style6} source={{uri : img_url + item.sub_category_image}} />
                    </Left>
                    <Body>
                      <Text style={styles.sub_style7}>{item.sub_category_name}</Text>
                      <View style={styles.sub_style8} />
                      <Text style={styles.sub_style9}>{item.description}</Text>
                      <View style={styles.sub_style10} />
                    </Body>
                    <Right style={styles.sub_style11}>
                      <Icon onPress={this.handleBackButtonClick} style={styles.sub_style12} name='arrow-forward' />
                    </Right>
                </ListItem>
                )}
                keyExtractor={item => item.id}
            />
          </List>
          { this.state.result.length == 0 && this.state.api_status == 1 &&
                <View>
                  <View style={styles.sub_style13}>
                    <LottieView source={doctor_list} autoPlay loop />
                  </View>
                  <Text style={styles.sub_style14}>Sorry, no doctor list found</Text>
                </View>
              }
        </Content>
        <Loader visible={this.state.isLoding} />
      </Container>
    
    );
  }
}  

const styles = StyleSheet.create({
  sub_style1:{alignItems:'flex-start', margin:10},
  sub_style2:{width:100, justifyContent:'center'},
  sub_style3:{color:colors.theme_fg_two, fontSize:30},
  sub_style4:{margin:5},
  sub_style5:{fontSize:25, color:colors.theme_fg_two, fontFamily: font_title},
  sub_style6:{borderRadius:10},
  sub_style7:{fontSize:14, fontFamily:font_title, color:colors.theme_fg_two},
  sub_style8:{margin:1},
  sub_style9:{fontSize:12, color:colors.grey,fontFamily:font_title},
  sub_style10:{margin:1},
  sub_style11:{alignItems:'center', justifyContent:'center'},
  sub_style12:{color:colors.theme_fg_two, fontSize:20},
  sub_style13:{height:250, marginTop:'40%'},
  sub_style14:{alignSelf:'center', fontFamily:font_title},
});
