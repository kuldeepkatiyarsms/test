import React, {Component} from 'react';
import { StyleSheet, Text, Image, View, Alert, TouchableOpacity } from 'react-native';
import { Container, Content, Icon, Card, CardItem, Col, Footer, Row } from 'native-base';
import { api_url, img_url, reject_order,font_title,font_description } from '../config/Constants';
import * as colors from '../assets/css/Colors';
import { Loader } from '../components/GeneralComponents';
import { Divider, Button } from 'react-native-elements';
import axios from 'axios';
import { connect } from 'react-redux'; 
import { serviceActionPending, serviceActionError, serviceActionSuccess } from '../actions/ViewPrescriptionActions';
import ImageView from 'react-native-image-view';
class ViewPrescription extends Component<Props> {

  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.reject_order = this.reject_order.bind(this);
    this.state = {
      data:this.props.route.params.data,
      image:[],
      isImageViewVisible:false
    }
  }

  handleBackButtonClick= () => {
    this.props.navigation.goBack(null);
  }

  accept_order = () => {
    this.props.navigation.navigate('Payment',{ from : 'prescription', prescription_id:this.state.data.id, prescription_total:this.state.data.total });  
  }

  reject_order = async () => {
    this.props.serviceActionPending();
    await axios({
      method: 'post', 
      url: api_url + reject_order,
      data:{ prescription_id : this.state.data.id }
    })
    .then(async response => {
        await this.props.serviceActionSuccess(response.data)
        if(response.data.status == 1){
          Alert.alert(
            "Rejected",
            "This prescription successfully rejected.",
            [
              { text: "OK", onPress: () => this.props.navigation.goBack(null) }
            ],
            { cancelable: false }
          );

        }else{
          alert(response.data.message);
        }
    })
    .catch(error => {
        this.props.serviceActionError(error);
    });
  }

  view_image = (data) =>{
    let image = [
          {
              source: {
                  uri: img_url + data,
              },
              title: 'Prescription Image',
              width: 806,
              height: 720
          }
      ]

    this.setState({ image : image, isImageViewVisible : true });
  }

  close_popup = () =>{
    this.setState({ isImageViewVisible : false });
  }
  
  render() {

    const { isLoding } = this.props

    return (
      <Container>
        <View>
          <View style={styles.view_style1}>
            <TouchableOpacity style={styles.view_style2} onPress={this.handleBackButtonClick} activeOpacity={1} >
            <Icon onPress={this.handleBackButtonClick} style={styles.view_style3} name='arrow-back' />
            </TouchableOpacity>
            <View style={styles.view_style4} />
            <Text style={styles.view_style5}>View Prescription</Text>
          </View>
        </View>
        <View style={styles.view_style6}/>
        <Content>
          <ImageView
              images={this.state.image}
              imageIndex={0}
              isVisible={this.state.isImageViewVisible}
              onClose={() => this.close_popup() }
          />
          <Card>
            <CardItem header>
              <Text style={styles.view_style7}>Prescription images</Text>
            </CardItem>
            <CardItem>
            {this.state.data.images.map((row, index) => (
              <Col onPress={ ()=> this.view_image(row) }>
                <Image 
                  style={styles.view_style8}
                  resizeMode='cover'
                  source={{ uri : img_url + row}}
                />
              </Col>
            ))}
            </CardItem>
          </Card>
          {this.state.data.customer_notes &&
          <Card>
            <CardItem header>
              <Text style={styles.view_style9}>Your Notes</Text>
            </CardItem>
            <CardItem>
              <Text style={styles.view_style10}>{this.state.data.customer_notes}</Text>
            </CardItem>
          </Card>
          }
          
          <Card>
            <CardItem header>
              <Text style={styles.view_style11}>Delivery Address</Text>
            </CardItem>
            <View style={styles.view_style12}>
              <Text style={styles.view_style13}>{this.state.data.door_no},</Text>
              <Text style={styles.view_style14}>{this.state.data.address}</Text>
            </View>
          </Card>
          {this.state.data.status != 1 &&
          <Card>
            <CardItem header>
              <Text style={styles.view_style15}>Cart Items</Text>
            </CardItem>
            {this.state.data.items.map((row, index) => (
            <CardItem>
              <Row>
                <Col style={styles.view_style16} >
                  <Text style={styles.view_style17} >{row.qty}x</Text>
                </Col>
                <Col style={styles.view_style18}>
                  <Text style={styles.view_style19}>{row.product_name}</Text>
                </Col>
                <Col style={styles.view_style20} >
                  <Text style={styles.view_style21}>{global.currency}{row.price}</Text>
                </Col>
              </Row>
            </CardItem>
            ))}
            <Divider style={styles.view_style22} />
            <Row style={styles.view_style23} >
              <Col>
                <Text style={styles.view_style24}>Subtotal</Text>
              </Col>
              <Col style={styles.view_style25} >
                <Text style={styles.view_style26}>{global.currency}{this.state.data.sub_total}</Text>
              </Col>
            </Row>
            <Row style={styles.view_style27} >
              <Col>
                <Text style={styles.view_style28}>Delivery Charge</Text>
              </Col>
              <Col style={styles.view_style29} >
                <Text style={styles.view_style30}>{global.currency}{this.state.data.delivery_charge}</Text>
              </Col>
            </Row>
            <Row style={styles.view_style31} >
              <Col>
                <Text style={styles.view_style32}>Tax</Text>
              </Col>
              <Col style={styles.view_style33} >
                <Text style={styles.view_style34}>{global.currency}{this.state.data.tax}</Text>
              </Col>
            </Row>
            <View style={styles.view_style35} />
            <Divider style={styles.view_style36} />
            <Row style={styles.view_style37} >
              <Col>
                <Text style={styles.view_style38}>Total</Text>
              </Col>
              <Col style={styles.view_style39} >
                <Text style={styles.view_style40} >{global.currency}{this.state.data.total}</Text>
              </Col>
            </Row>
            <View style={styles.view_style41} />
          </Card>
        }
        </Content>
        {this.state.data.status == 9 &&
        <Footer style={styles.view_style42} >
          <Row style={styles.view_style43}>
            <Col>
              <Button
                title="Reject"
                onPress={this.reject_order}
                buttonStyle={styles.view_style44}
              />
            </Col>
            <Col style={styles.view_style45} />
            <Col>
              <Button
                title="Accept"
                onPress={this.accept_order}
                buttonStyle={styles.view_style46}
              />
            </Col>
          </Row>
        </Footer>
        }
        <Loader visible={isLoding} />
      </Container>
    );
  }
}

function mapStateToProps(state){
  return{
    isLoding : state.view_prescription.isLoding,
    error : state.view_prescription.error,
    data : state.view_prescription.data,
    message : state.view_prescription.message,
    status : state.view_prescription.status,
  };
}

const mapDispatchToProps = (dispatch) => ({
    serviceActionPending: () => dispatch(serviceActionPending()),
    serviceActionError: (error) => dispatch(serviceActionError(error)),
    serviceActionSuccess: (data) => dispatch(serviceActionSuccess(data))
});


export default connect(mapStateToProps,mapDispatchToProps)(ViewPrescription);

const styles = StyleSheet.create({
  view_style1:{alignItems:'flex-start', margin:10},
  view_style2:{width:100, justifyContent:'center'},
  view_style3:{color:colors.theme_fg_two, fontSize:30},
  view_style4:{ margin:5 },
  view_style5:{ fontSize:25, color:colors.theme_fg_two,  fontFamily: font_title},
  view_style6:{margin:20},
  view_style7:{ fontFamily:font_title, color:colors.theme_fg_two },
  view_style8:{
    width: 100,
    height: 70,
    alignSelf:'center',
    borderColor: colors.theme_bg_three,
    borderWidth: 1
  },
  view_style9:{ fontFamily:font_title, color:colors.theme_fg_two },
  view_style10:{fontFamily:font_description},
  view_style11:{ fontFamily:font_title, color:colors.theme_fg_two },
  view_style12:{ paddingLeft:20, paddingRight:20, paddingBottom:10 },
  view_style13:{fontFamily:font_description},
  view_style14:{fontFamily:font_description},
  view_style15:{ fontFamily:font_title, color:colors.theme_fg_two },
  view_style16:{ width:40 },
  view_style17:{fontFamily:font_title},
  view_style18:{ width:'70%' },
  view_style19:{fontFamily:font_description},
  view_style20:{ width:80 },
  view_style21:{fontFamily:font_description},
  view_style22:{
    backgroundColor: colors.theme_fg_two, 
    width:'90%', 
    alignSelf:'center'
  },
  view_style23:{
    marginLeft:20, 
    marginRight:20, 
    marginTop:10
  },
  view_style24:{fontFamily:font_title},
  view_style25:{ width:80 },
  view_style26:{fontFamily:font_description},
  view_style27:{
    backgroundColor: colors.theme_fg_two, 
    width:'90%', 
    alignSelf:'center'
  },
  view_style28:{fontFamily:font_title},
  view_style29:{ width:80 },
  view_style30:{fontFamily:font_description},
  view_style31:{
    backgroundColor: colors.theme_fg_two, 
    width:'90%', 
    alignSelf:'center'
  },
  view_style32:{fontFamily:font_title},
  view_style33:{ width:80 },
  view_style34:{fontFamily:font_description},
  view_style35:{ marginBottom:20 },
  view_style36:{
    marginLeft:20, 
    marginRight:20, 
    marginTop:10
  },
  view_style37:{
    backgroundColor: colors.theme_fg_two, 
    width:'90%', 
    alignSelf:'center'
  },
  view_style38:{fontFamily:font_title},
  view_style39:{ width:80 },
  view_style40:{fontFamily:font_title },
  view_style41:{ marginBottom:20 },
  view_style42:{backgroundColor:'transparent'},
  view_style43:{ padding:10 },
  view_style44:{ backgroundColor:colors.red ,fontFamily:font_title},
  view_style45:{ width:10 },
  view_style46:{ backgroundColor:colors.theme_fg,fontFamily:font_title },
});
