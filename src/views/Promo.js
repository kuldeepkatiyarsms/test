import React, {Component} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity  } from 'react-native';
import { Container, Left, Body, Right, Icon, Row ,Card } from 'native-base';
import { api_url, promo_code,font_title,font_description } from '../config/Constants';
import * as colors from '../assets/css/Colors';
import { Loader } from '../components/GeneralComponents';
import axios from 'axios';
import { connect } from 'react-redux';
import { serviceActionPending, serviceActionError, serviceActionSuccess, addPromo } from '../actions/PromoActions';
import { promo } from '../actions/CartActions';

class Promo extends Component<Props> {

  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.Promo();
  }

  handleBackButtonClick= () => {
    this.props.navigation.goBack(null);
  }

  Promo = async () => {
    this.props.serviceActionPending();
    await axios({
      method: 'get', 
      url: api_url + promo_code
    })
    .then(async response => {
        await this.props.serviceActionSuccess(response.data)
    })
    .catch(error => {
        this.props.serviceActionError(error);
    });
  }

  apply = async (data) => {
    await this.props.promo(data);
    await this.handleBackButtonClick();
  }

  render() {

    const { isLoding, data } = this.props

    return (
      <Container style={styles.promo_style1} >
       <View style={styles.promo_style2} >
          <View style={styles.promo_style3}>
          <Card style={styles.promo_style4}>
              <Row style={styles.promo_style5}>
                <Left style={styles.promo_style6}>
                 <TouchableOpacity style={styles.promo_style7} onPress={this.handleBackButtonClick} activeOpacity={1} >
                     <Icon onPress={this.handleBackButtonClick} style={styles.promo_style8} name='ios-arrow-back' />
                  </TouchableOpacity> 
                </Left>
                <Body style={styles.promo_style9}>
                  <Text
                    style={styles.promo_style10}
                  >
                    Promo
                  </Text>
                </Body>
                <Right />
              </Row>
            </Card>
          </View>
          </View>
        <View style={styles.promo_style11}/>
        <ScrollView>
        <View style={styles.promo_style12} >
          {data.map((row, index) => (
            <View style={styles.promo_style13} >
              <View style={styles.promo_style14} >
                <Left>
                  <Text style={styles.promo_style15} >{row.promo_code}</Text>
                </Left>
                <Right>
                  <Text onPress={() => this.apply(row)} style={styles.promo_style16} >APPLY</Text>
                </Right>
              </View>
              <View style={styles.promo_style17} >
                <Left>
                  <Text style={styles.promo_style18} >{row.promo_name}</Text>
                </Left>
              </View>
              <View style={styles.promo_style19} >
                <Left>
                  <Text style={styles.promo_style20} >
                    {row.description}
                  </Text>
                </Left>
              </View>
            </View>
          ))}         
        </View>
        </ScrollView>
        <Loader visible={isLoding} />
      </Container>
    );
  }
}

function mapStateToProps(state){
  return{
    isLoding : state.promo.isLoding,
    error : state.promo.error,
    data : state.promo.data,
    message : state.promo.message,
    status : state.promo.status
  };
}

const mapDispatchToProps = (dispatch) => ({
    serviceActionPending: () => dispatch(serviceActionPending()),
    serviceActionError: (error) => dispatch(serviceActionError(error)),
    serviceActionSuccess: (data) => dispatch(serviceActionSuccess(data)),
    addPromo: (data) => dispatch(addPromo(data)),
    promo: (data) => dispatch(promo(data))
});


export default connect(mapStateToProps,mapDispatchToProps)(Promo);

const styles = StyleSheet.create({
  promo_style1:{backgroundColor:colors.theme_bg_two},
  promo_style2: {
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
  promo_style3:{position:'absolute',top:'55%',alignSelf:'center',width:'75%'},
  promo_style4:{alignItems:"center",borderRadius:15,justifyContent:"center"},
  promo_style5:{padding:10,justifyContent:'center'},
  promo_style6:{flex:1},
  promo_style7:{width:100,justifyContent:'center'},
  promo_style8:{color:colors.theme_bg},
  promo_style9:{flex:3,justifyContent:'center'},
  promo_style10:{fontSize:18,fontFamily:font_title,color:colors.theme_bg,justifyContent:'center'},
  promo_style11:{margin:20},
  promo_style12:{alignItems:'center'},
  promo_style13:{width:'100%',padding:20,backgroundColor:colors.theme_bg_three,marginTop:10},
  promo_style14:{flexDirection:'row'},
  promo_style15: {
    borderWidth:1, 
    borderColor:colors.promo_color, 
    color:colors.promo_color, 
    paddingTop:5, 
    paddingRight:10, 
    paddingBottom:5, 
    paddingLeft:10,
    fontFamily:font_description
  },
  promo_style16:{fontSize:14,fontFamily:font_title,color:colors.theme_fg},
  promo_style17:{flexDirection:'row'},
  promo_style18:{fontSize:15,fontFamily:font_title,color:colors.theme_fg_two,marginTop:10},
  promo_style19:{flexDirection:'row'},
  promo_style20:{fontSize:12,marginTop:5,fontFamily:font_description},  
});

