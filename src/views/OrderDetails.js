import React, {Component} from 'react';
import { StyleSheet, Text, View, Image , TouchableOpacity } from 'react-native';
import { Container, Content, Left, Body, Icon, Row, Col, List, ListItem, Footer, Radio } from 'native-base';
import * as colors from '../assets/css/Colors';
import ProgressCircle from 'react-native-progress-circle';
import { Divider } from 'react-native-elements';
import Moment from 'moment';
import axios from 'axios';
import { tablet, cancelation_reasons, api_url, cancel_order,font_description,font_title, order_details } from '../config/Constants';
import { Button as Btn } from 'react-native-elements';
import { Loader } from '../components/GeneralComponents';
import Dialog, { DialogTitle, SlideAnimation, DialogContent, DialogFooter, DialogButton } from 'react-native-popup-dialog';
import { fb } from '../config/firebaseConfig';
export default class OrderDetails extends Component<Props> {

  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.open_dialog = this.open_dialog.bind(this);
    this.state = {
      data : this.props.route.params.data,
      isDialogVisible:false,
      isLoding:false,
      reasons:[],
      selected_reason:1
    }
    this.get_reasons();
    this.booking_sync();
  }

  booking_sync = () =>{
    fb.ref('/customers/'+global.id+'/orders/'+this.state.data.id).on('value', snapshot => {
      if(snapshot.val().status != this.state.data.status){
        this.get_order_details();
      }
    });
  }

  get_order_details = async () => {
    this.setState({ isLoding : true });
    await axios({
      method: 'post', 
      url: api_url + order_details,
      data: { id : this.state.data.id }
    })
    .then(async response => {
      this.setState({ isLoding : false, data:response.data.result });
    })
    .catch(error => {
      this.setState({ isLoding : false });
    });
  }

  get_reasons = async() =>{
    this.setState({ isLoding:true });
    await axios({
      method: "get",
      url: api_url + cancelation_reasons
    })
    .then(async (response) => {
      this.setState({ isLoding:false });
      this.setState({ reasons : response.data.result });
    })
    .catch((error) => {
      this.setState({ isLoding:false });
      alert("Something went wrong");
    });
  }

  cancel_order = async() =>{
    this.setState({ isLoding:true, isDialogVisible:false });
    await axios({
      method: "post",
      url: api_url + cancel_order,
      data:{ order_id : this.state.data.id }
    })
    .then(async (response) => {
      this.setState({ isLoding:false });
      let data = this.state.data;
      data.status = response.data.result.id;
      data.label_name = response.data.result.label_name;
      this.setState({ data : data });
    })
    .catch((error) => {
      this.setState({ isLoding:false });
      alert("Something went wrong");
    });
  }

  open_dialog = () =>{
    this.setState({ isDialogVisible: true })
  }

  change_reason = (reason) =>{
    this.setState({ selected_reason : reason });
  }

  handleBackButtonClick= () => {
    this.props.navigation.goBack(null);
  }

  render() {
    return (
      <Container>
        <View>
          <View style={styles.od_style1}>
            <TouchableOpacity style={styles.od_style2} onPress={this.handleBackButtonClick} activeOpacity={1} >
              <Icon onPress={this.handleBackButtonClick} style={styles.od_style3} name='arrow-back' />
            </TouchableOpacity>
            <View style={styles.od_style4} />
            <Text style={styles.od_style5}>Bhuvi Store</Text>
          </View>
         </View>
        <Content>
            <Row>
              <Body>
                <Text style={styles.od_style6}>Order Id - {this.state.data.order_id}</Text>
                <Text style={styles.od_style7}>{Moment(this.state.data.created_at).format('DD MMM-YYYY hh:mm')}</Text>
              </Body>
            </Row>
            <Row style={styles.od_style8} >
              <Body>
                <ProgressCircle
                  percent={ this.state.data.status * 16.666}
                  radius={60}
                  borderWidth={3}
                  color={colors.theme_fg}
                  shadowColor="#e6e6e6"
                  bgColor="#FFFFFF"
                >
                  <View style={styles.od_style9} >
                    <Image
                      style={styles.od_style10}
                      source={tablet}
                    />
                  </View>
                </ProgressCircle>
                <Text style={styles.od_style11}>{this.state.data.label_name}</Text>
              </Body>
            </Row>
            <Divider style={styles.od_style12} />
            <Row style={styles.od_style13}>
              <Left>
                <Text style={styles.od_style14}>Delivery Address</Text>
                <Text style={styles.od_style15}>{this.state.data.address}</Text>
              </Left>
            </Row>
            <Row style={styles.od_style16}>
              <Left>
                <Text style={styles.od_style17}>Payment Mode</Text>
                <Text style={styles.od_style18}>{this.state.data.payment_name}</Text>
              </Left>
            </Row>
            <View style={styles.od_style19} />
            <Divider style={styles.od_style20} />
            <Row style={styles.od_style21}>
              <Left>
                <Text style={styles.od_style22}>Your items</Text>
              </Left>
            </Row>
            <List>
              {JSON.parse(this.state.data.items).map((row, index) => (
                <ListItem>
                  <Row>
                    <Col style={styles.od_style23} >
                      <Text style={styles.od_style24} >{row.qty}x</Text>
                    </Col>
                    <Col>
                      <Text style={styles.od_style25}>{row.product_name}</Text>
                    </Col>
                    <Col style={styles.od_style26} >
                      <Text style={styles.od_style27}>{global.currency}{row.price}</Text>
                    </Col>
                  </Row>
                </ListItem>
              ))}
            </List>
            <Row style={styles.od_style28} >
              <Col>
                <Text style={styles.od_style29}>Subtotal</Text>
              </Col>
              <Col style={styles.od_style30} >
                <Text style={styles.od_style31} >{global.currency}{this.state.data.sub_total}</Text>
              </Col>
            </Row>
            <Row style={styles.od_style32} >
              <Col>
                <Text style={styles.od_style33}>Discount</Text>
              </Col>
              <Col style={styles.od_style34} >
                <Text style={styles.od_style35} >{global.currency}{this.state.data.discount}</Text>
              </Col>
            </Row>
            <Row style={styles.od_style36} >
              <Col>
                <Text style={styles.od_style37}>Delivery Charge</Text>
              </Col>
              <Col style={styles.od_style38} >
                <Text style={styles.od_style39} >{global.currency}{this.state.data.delivery_charge}</Text>
              </Col>
            </Row>
            <Row style={styles.od_style40} >
              <Col>
                <Text style={styles.od_style41}>Tax</Text>
              </Col>
              <Col style={styles.od_style42} >
                <Text style={styles.od_style43} >{global.currency}{this.state.data.tax}</Text>
              </Col>
            </Row>
            <View style={styles.od_style44} />
            <Divider style={styles.od_style45} />
            <Row style={styles.od_style46} >
              <Col>
                <Text style={styles.od_style47}>Total</Text>
              </Col>
              <Col style={styles.od_style48} >
                <Text style={styles.od_style49} >{global.currency}{this.state.data.total}</Text>
              </Col>
            </Row>
            <View style={styles.od_style50} />
            <Loader visible={this.state.isLoding} />
        </Content>
          {this.state.data.status <= 2 && <Footer style={styles.od_style51} >
            <View style={styles.od_style52}>
              <Btn
                title="Cancel"
                onPress={this.open_dialog}
                buttonStyle={styles.od_style53}
              />
            </View>
          </Footer>}
          <Dialog
          visible={this.state.isDialogVisible}
          width="90%"
          animationDuration={100}
          dialogTitle={<DialogTitle title="Please select reason" />}
          dialogAnimation={new SlideAnimation({
            slideFrom: 'bottom',
          })}
          footer={
            <DialogFooter>
              <DialogButton
                text="CLOSE"
                textStyle={styles.od_style54}
                onPress={() => { this.setState({ isDialogVisible: false })}}
              />
              <DialogButton
                text="OK"
                textStyle={styles.od_style55}
                onPress={this.cancel_order.bind(this)}
              />
            </DialogFooter>
          }
          onTouchOutside={() => {
            this.setState({ isDialogVisible: false });
          }}
        >
          <DialogContent>
            <List>
              {this.state.reasons.map((row, index) => (
                <ListItem onPress={this.change_reason.bind(this,row.id)}>
                  <Col>
                    <Text style={styles.od_style56}>{row.reason}</Text>
                  </Col>
                  <Col style={styles.od_style57}>
                    <Radio selectedColor={colors.theme_fg} selected={this.state.selected_reason == row.id ? true : false } />
                  </Col>
                </ListItem>
              ))}
            </List>
          </DialogContent>
        </Dialog>
         <Loader visible={this.state.isLoding} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  od_style1:{alignItems:'flex-start',margin:10},
  od_style2:{width:100, justifyContent:'center'},
  od_style3:{color:colors.theme_fg_two, fontSize:30},
  od_style4:{margin:5},
  od_style5:{fontSize:25,color:colors.theme_fg_two,fontFamily: font_title},
  od_style6:{marginTop:10,fontSize:15,color:colors.theme_fg_two,fontFamily:font_title},
  od_style7:{marginTop:5,fontSize:12,fontFamily:font_description},
  od_style8:{margin:20},
  od_style9:{height:60,width:60},
  od_style10:{flex:1,width:undefined,height:undefined},
  od_style11:{marginTop:10,fontSize:13,color:colors.theme_fg,fontFamily:font_title},
  od_style12:{backgroundColor:colors.theme_fg_two,width:'90%',alignSelf:'center'},
  od_style13:{marginLeft:20,marginRight:20,marginTop:10},
  od_style14:{marginTop:10,fontSize:13,color:colors.theme_fg_two,fontFamily:font_title},
  od_style15:{marginTop:5,fontSize:13,fontFamily:font_description},
  od_style16:{marginLeft:20,marginRight:20,marginTop:10},
  od_style17:{marginTop:10,fontSize:13,color:colors.theme_fg_two,fontFamily:font_title},
  od_style18:{marginTop:5,fontSize:13,fontFamily:font_description},
  od_style19:{marginTop:10},
  od_style20:{backgroundColor:colors.theme_fg_two,width:'90%',alignSelf:'center'},
  od_style21:{marginLeft:20,marginRight:20,marginTop:10},
  od_style22:{marginTop:10,fontSize:13,color:colors.theme_fg_two,fontFamily:font_title},
  od_style23:{width:40},
  od_style24:{fontSize:15,color:colors.theme_fg,fontFamily:font_title},
  od_style25:{fontFamily:font_description},
  od_style26:{width:70},
  od_style27:{fontFamily:font_description},
  od_style28:{marginLeft:20,marginRight:20,marginTop:10},
  od_style29:{fontFamily:font_title},
  od_style30:{width:70},
  od_style31:{fontFamily:font_title},
  od_style32:{marginLeft:20,marginRight:20,marginTop:10},
  od_style33:{fontFamily:font_title},
  od_style34:{width:70},
  od_style35:{fontFamily:font_title},
  od_style36:{marginLeft:20,marginRight:20,marginTop:10},
  od_style37:{fontFamily:font_title},
  od_style38:{width:70},
  od_style39:{fontFamily:font_title},
  od_style40:{marginLeft:20,marginRight:20,marginTop:10},
  od_style41:{fontFamily:font_title},
  od_style42:{width:70},
  od_style43:{fontFamily:font_title},
  od_style44:{marginBottom:20},
  od_style45:{backgroundColor:colors.theme_fg_two,width:'90%',alignSelf:'center'},
  od_style46:{marginLeft:20,marginRight:20,marginTop:10},
  od_style47:{fontFamily:font_title,color:colors.theme_fg_two,fontSize:18},
  od_style48:{width:80},
  od_style49:{fontFamily:font_title,color:colors.theme_fg_two,fontSize:18},
  od_style50:{margin:10},
  od_style51:{backgroundColor:colors.theme_bg_three},
  od_style52:{width:'90%',justifyContent:'center'},
  od_style53:{backgroundColor:colors.theme_bg,fontFamily:font_title},
  od_style54:{fontSize:16, color:colors.theme_fg_two},
  od_style55:{fontSize:16, color:colors.theme_fg_two},
  od_style56:{fontFamily:font_description},
  od_style57:{width:'15%',alignItems:'flex-end'},
});
