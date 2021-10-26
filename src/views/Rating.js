import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Card, Left, Body, Right, Icon, Row, Footer } from 'native-base';
import * as colors from '../assets/css/Colors';
import { app_name, heart, rating_update, api_url,font_title } from '../config/Constants';
import { AirbnbRating } from 'react-native-ratings';
import { Loader } from '../components/GeneralComponents';
import { Button as Btn } from 'react-native-elements';
import axios from 'axios';
export default class Rating extends Component<Props> {

  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      data : this.props.route.params.data,
      rating:5,
      isLoding:false
    }
  }

  handleBackButtonClick= () => {
    this.props.navigation.goBack(null);
  }

  rating_completed = (value) =>{
    this.setState({ rating : value});
  }

  update_rating = async() =>{
    this.setState({ isLoding : true });
    await axios({
      method: "post",
      url: api_url + rating_update,
      data: {
        customer_id: this.state.data.customer_id,
        vendor_id: this.state.data.vendor_id,
        order_id: this.state.data.order_id,
        ratings: this.state.rating
      },
    })
    .then(async (response) => {
      this.setState({ isLoding : false });
      if(response.data.status == 1){
        this.handleBackButtonClick();
      }
    })
    .catch((error) => {
      this.setState({ isLoding : false });
      alert('Sorry something went wrong');
    });
  }

  render() {
    return (
      <Container>
        <View style={styles.rat_style1} >
          <View style={styles.rat_style2}>
          <Card style={styles.rat_style3}>
              <Row style={styles.rat_style4}>
                <Left style={styles.rat_style5}>
                 <TouchableOpacity style={styles.rat_style6} onPress={this.handleBackButtonClick} activeOpacity={1} >
                     <Icon onPress={this.handleBackButtonClick} style={styles.rat_style7} name='ios-arrow-back' />
                  </TouchableOpacity> 
                </Left>
                <Body style={styles.rat_style8}>
                  <Text
                    style={styles.rat_style9}
                  >
                   Rating
                  </Text>
                </Body>
                <Right />
              </Row>
            </Card>
          </View>
          </View>
        <View style={styles.rat_style10}/>
        <Content padder>
          <View style={styles.rat_style11} />
          <View style={styles.rat_style12}>
              <Image
                style={styles.rat_style13}
                source={heart}
              />
          </View>
          <Row style={styles.rat_style14}>
            <Body>
              <Text style={styles.rat_style15}>How would you rate your</Text>
              <Text style={styles.rat_style16}>experience at <Text style={styles.rat_style17}>{app_name}</Text></Text>
            </Body>
          </Row>
          <View style={styles.rat_style18} />
          <AirbnbRating
            count={5}
            reviews={["Bad", "Meh", "OK", "Good", "Very Good"]}
            defaultRating={5}
            onFinishRating={this.rating_completed}
            size={30}
          />
        </Content>
        <Footer style={styles.rat_style19} >
          <View style={styles.rat_style20}>
            <Btn
              title="Submit"
              onPress={this.update_rating}
              buttonStyle={styles.rat_style21}
            />
          </View>
        </Footer>
        <Loader visible={this.state.isLoding} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  rat_style1: {
    justifyContent: "flex-start",
    height: "10%",
    backgroundColor: colors.theme_bg,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
    shadowOffset: { width: 0, height: 15 },
    shadowColor: colors.theme_bg,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  rat_style2:{position:'absolute',top:'55%',alignSelf:'center',width:'80%'},
  rat_style3:{alignItems:"center",borderRadius:15,justifyContent:"center"},
  rat_style4:{padding:10,justifyContent:'center'},
  rat_style5:{flex:1},
  rat_style6:{width:100,justifyContent:'center'},
  rat_style7:{color:colors.theme_bg},
  rat_style8:{flex:3,justifyContent:'center'},
  rat_style9:{fontSize:18,fontFamily:font_title,color:colors.theme_bg,justifyContent:'center'},
  rat_style10:{margin:20},
  rat_style11:{margin:20},
  rat_style12:{height:100,width:100,alignSelf:'center'},
  rat_style13:{flex:1,width:undefined,height:undefined},
  rat_style14:{padding:20},
  rat_style15:{fontSize:20,color:'grey',fontFamily:font_title},
  rat_style16:{fontSize:20,color:'grey',fontFamily:font_title},
  rat_style17:{fontFamily:font_title,color:colors.theme_fg_two},
  rat_style18:{margin:20},
  rat_style19:{backgroundColor:colors.theme_bg_three},
  rat_style20:{width:'90%',justifyContent:'center'},
  rat_style21:{backgroundColor:colors.theme_bg,fontFamily:font_title},
  
  header_card_item: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowOffset: { width: 0, height: 15 },
    shadowColor: colors.theme_bg,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  icon:{
    color:colors.theme_fg_two
  },
  header_body: {
    flex: 3,
    justifyContent: 'center'
  },
  title:{
    alignSelf:'center', 
    color:colors.theme_fg_two,
    alignSelf:'center', 
    fontSize:16, 
    fontFamily:font_title
  },
  
});
