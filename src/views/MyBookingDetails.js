
import React,{ Component } from 'react';
import { View,Text, StyleSheet, Image,  } from 'react-native';
import { Content, Container, Body, Row, Col   } from 'native-base';
import CardView from 'react-native-cardview';
import {doctorthree, font_title, font_description, api_url, img_url, booking_details } from '../config/Constants';
import * as colors from '../assets/css/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Loader } from '../components/GeneralComponents';
import axios from 'axios';
import Moment from 'moment';
import { fb } from '../config/firebaseConfig';
export default class MyBookingDetails extends Component<props> {
    constructor(props) {
    super(props)
      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
      this.state = {
        isLoading:false,
        data:this.props.route.params.data
      };
      this.booking_sync();
  }
 
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  booking_sync = () =>{
    fb.ref('/customers/'+global.id+'/bookings/'+this.state.data.id).on('value', snapshot => {
      if(snapshot.val() != null){
        if(snapshot.val().status != this.state.data.status){
          this.get_booking_details();
        }
      }
    });
  }

  get_booking_details = async () => {
    await axios({
      method: 'post', 
      url: api_url + booking_details,
      data: { id : this.state.data.id }
    })
    .then(async response => {
      this.setState({ data:response.data.result });
    })
    .catch(error => {
      alert('Sorry something went wrong');
    });
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

  
  chat = () =>{
    this.props.navigation.navigate('Chat',{ data : this.state.data });
  }

  video = () =>{
    this.props.navigation.navigate('VideoCall',{ booking_id : this.state.data.booking_id });
  }

  render() {
    return(
      <Container>
        <Content>
          <View>
            <Image style={styles.my_style1} source={doctorthree}/>   
          </View>
          <Row style={styles.my_style2}>
            <Body>           
              <Image style={styles.my_style3} source={{ uri : img_url + this.state.data.profile_image}}/>
            </Body>
          </Row>
        <CardView>
          <View style={styles.my_style4}>
            <Text style={styles.my_style5}>
              Doctor Informations
            </Text>
            <View style={styles.my_style6}/>
            <View style={styles.my_style7}>
              <Row>
                <Col style={styles.my_style8}> 
                  <FontAwesome  name='user' 
                    size={20}
                    color='black'
                    style={styles.my_style9}
                  />
                </Col>
                <Col style={styles.my_style10}> 
                 <Text style={styles.my_style11}>
                    Dr.{this.state.data.doctor_name}
                  </Text>        
                </Col>
              <View style={styles.my_style12}/>
                <Col style={styles.my_style13}> 
                </Col>
              <View style={styles.my_style14}/>
                <Col style={styles.my_style15}> 
                  <FontAwesome  name='mobile' 
                    size={25}
                    color='black'
                    style={styles.my_style16}
                  />
                </Col>
                <Col style={styles.my_style17}> 
                <Text style={styles.my_style18}>
                  {this.state.data.phone_number}
                </Text>         
                </Col>
              </Row>
             
              <View style={styles.my_style19}/>
              <Row>
                <Col style={styles.my_style20}> 
                  <FontAwesome  name='envelope' 
                    size={15}
                    color='black'
                    style={styles.my_style21}
                  />
                </Col>
                <Col style={styles.my_style22}> 
                <Text style={styles.my_style23}>
                  {this.state.data.email}
                </Text>     
                </Col>
              </Row> 
           </View>
          </View>
        </CardView>
        <View style={styles.my_style24}/>
        <CardView>
          <View style={styles.my_style25}>
             <Text style={styles.my_style26}>
              {this.state.data.title}
             </Text>
          <View style={styles.my_style27}/>
             <Text style={styles.my_style28}>
              {this.state.data.description}
            </Text>
          </View>
        </CardView> 
        <View style={styles.my_style29}/>
        <CardView>
          <View style={styles.my_style30}>
             <Text style={styles.my_style31}>
              Booking Information
             </Text>
         <View style={styles.my_style32}/>
           <View style={styles.my_style33}>
            <Row>
                <Col style={styles.my_style34}> 
                  <FontAwesome  name='clock-o' 
                    size={20}
                    color='black'
                    style={styles.my_style35}
                  />
                </Col>
                <Col style={styles.my_style36}> 
               <Text style={styles.my_style37}>
                  Booking Time
                </Text>
              <View style={styles.my_style38}/>
                <Text style={styles.my_style39}>
                  {Moment(this.state.data.start_time).format('hh:mm A')}
                </Text>          
                </Col>
              <View style={styles.my_style40}/>
                <Col style={styles.my_style41}> 
                  <FontAwesome  name='calendar' 
                    size={20}
                    color='black'
                    style={styles.my_style42}
                  />
                </Col>
                <Col style={styles.my_style43}> 
               <Text style={styles.my_style44}>
                  Booking Date
                </Text>
              <View style={styles.my_style45}/>
                <Row>
                  <Col style={styles.my_style46}> 
                    <Text style={styles.my_style47}>
                      {Moment(this.state.data.start_time).format('DD MMM-YYYY')}
                    </Text> 
                  </Col>
                </Row>         
                </Col>
              </Row>
              <View style={{ margin:10 }} />
              <Row>
                <Col style={styles.my_style34}> 
                  <FontAwesome  name='hospital-o' 
                    size={20}
                    color='black'
                    style={styles.my_style35}
                  />
                </Col>
                <Col style={styles.my_style36}> 
               <Text style={styles.my_style37}>
                  Booking Type
                </Text>
              <View style={styles.my_style38}/>
                {this.state.data.booking_type == 1 ? 
                  <Text style={styles.my_style39}>
                    Online consultation
                  </Text>
                  :
                  <Text style={styles.my_style39}>
                    Direct appointment
                  </Text>
                }          
                </Col>
              </Row>
              <View style={styles.my_style48}/>
              {this.state.data.booking_id &&
              <Row>
                <Col style={styles.my_style49}> 
                  <FontAwesome  name='id-badge' 
                    size={20}
                    color='black'
                    style={styles.my_style50}
                  />
                </Col>
                <Col style={styles.my_style51}> 
                <Text style={styles.my_style52}>
                  Booking Id
                </Text>
              <View style={styles.my_style53}/>
                <Text style={styles.my_style54}>
                  #{this.state.data.booking_id}
                </Text>          
                </Col>
              <View style={styles.my_style55}/>
                <Col style={styles.my_style56}> 
                </Col>
              <View style={styles.my_style57}/>
              </Row>  
              }
           </View>
          <View style={styles.my_style58}/>  
          </View>
        </CardView>  
              <View style={styles.my_style59}/>
        {/* {this.state.data.booking_status == 2 && this.state.data.booking_type == 1 &&
        <CardView>
          <View style={styles.my_style60}>
             <Text style={styles.my_style61}>
              Communicate
             </Text>
         <View style={styles.my_style62}/>
           <View style={styles.my_style63}>
            <Row>
                <Col style={styles.my_style64}> 
                  <FontAwesome  name='comments' 
                    size={40}
                    color='black'
                    onPress={this.chat}
                    style={styles.my_style65}
                  />
                  <Text style={styles.my_style66}>
                    Chat
                  </Text>
                </Col>
                <Col style={styles.my_style67}> 
                  <FontAwesome  name='video-camera' 
                    size={40}
                    color='black'
                    onPress={this.video}
                    style={styles.my_style68}
                  />
                  <Text style={styles.my_style69}>
                    Video
                  </Text>
                </Col>
            </Row>  
           </View> 
          </View>
        </CardView> 
        } */}
        <Loader visible={this.state.isLoading} />
        </Content>  
      </Container>
    
    );
  }
}  

const styles = StyleSheet.create({
  my_style1:{alignSelf:'center',height:200,width:'100%'},
  my_style2:{marginTop:-45},
  my_style3:{alignSelf:'center',height:90,width:90,borderRadius:45},
  my_style4:{backgroundColor:colors.theme_fg_three,width:"100%",padding:10},
  my_style5:{fontSize:14, color:colors.theme_fg,fontFamily:font_title},
  my_style6:{margin:5},
  my_style7:{padding:5},
  my_style8:{height:"100%",width:"10%",alignSelf:'center'},
  my_style9:{color:colors.theme_fg},
  my_style10:{height:"100%",width:"35%",justifyContent:'center',marginLeft:5},
  my_style11:{fontSize:12, color:'#C4C3C3',fontFamily:font_description},
  my_style12:{margin:2},
  my_style13:{height:"100%",width:"5%",alignSelf:'center'},
  my_style14:{margin:5},
  my_style15:{height:"100%",width:"10%",alignSelf:'center'},
  my_style16:{color:colors.theme_fg},
  my_style17:{height:"100%",width:"90%",justifyContent:'center',marginLeft:5},
  my_style18:{fontSize:12, color:'#C4C3C3',fontFamily:font_description},
  my_style19:{margin:5},
  my_style20:{height:"100%",width:"10%",alignSelf:'center'},
  my_style21:{color:colors.theme_fg},
  my_style22:{height:"100%",width:"90%",justifyContent:'center',marginLeft:5},
  my_style23:{fontSize:12, color:'#C4C3C3',fontFamily:font_description},
  my_style24:{margin:2},
  my_style25:{backgroundColor:colors.theme_fg_three,width:"100%",padding:10},
  my_style26:{fontSize:14, color:colors.theme_fg,fontFamily:font_title},
  my_style27:{margin:5},
  my_style28:{fontSize:12,paddingRight:20, color:'#C4C3C3',fontFamily:font_description},
  my_style29:{margin:2},
  my_style30:{backgroundColor:colors.theme_fg_three,width:"100%",padding:10},
  my_style31:{fontSize:14, color:colors.theme_fg,fontFamily:font_title},
  my_style32:{margin:5},
  my_style33:{padding:5},
  my_style34:{height:"100%",width:"10%",alignSelf:'center'},
  my_style35:{color:colors.theme_fg},
  my_style36:{height:"100%",width:"45%",alignSelf:'center',marginLeft:5},
  my_style37:{fontSize:12, color:'#C4C3C3',fontFamily:font_title},
  my_style38:{margin:2},
  my_style39:{fontSize:14, color:colors.theme_fg_five,fontFamily:font_description},
  my_style40:{margin:5},
  my_style41:{height:"100%",width:"10%",alignSelf:'center'},
  my_style42:{color:colors.theme_fg},
  my_style43:{height:"100%",width:"35%",alignSelf:'center',marginLeft:5},
  my_style44:{fontSize:12, color:'#C4C3C3',fontFamily:font_title},
  my_style45:{margin:2},
  my_style46:{height:"100%",width:"70%",alignSelf:'center'},
  my_style47:{fontSize:14, color:colors.theme_fg_five,fontFamily:font_description},
  my_style48:{margin:10},
  my_style49:{height:"100%",width:"10%",alignSelf:'center'},
  my_style50:{color:colors.theme_fg},
  my_style51:{height:"100%",width:"35%",alignSelf:'center',marginLeft:5},
  my_style52:{fontSize:12, color:'#C4C3C3',fontFamily:font_title},
  my_style53:{margin:2},
  my_style54:{fontSize:14, color:colors.theme_fg_five,fontFamily:font_description},
  my_style55:{margin:2},
  my_style56:{height:"100%",width:"5%",alignSelf:'center'},
  my_style57:{margin:5},
  my_style58:{margin:5},
  my_style59:{margin:2},
  my_style60:{backgroundColor:colors.theme_fg_three,width:"100%",padding:10},
  my_style61:{fontSize:14, color:colors.theme_fg,fontFamily:font_title},
  my_style62:{margin:5},
  my_style63:{padding:5},
  my_style64:{alignItems:'center', justifyContent:'center'},
  my_style65:{color:colors.theme_fg},
  my_style66:{fontSize:12, color:colors.theme_fg_two,fontFamily:font_title},
  my_style67:{alignItems:'center', justifyContent:'center'},
  my_style68:{color:colors.theme_fg},
  my_style69:{fontSize:12, color:colors.theme_fg_two,fontFamily:font_title},
});
