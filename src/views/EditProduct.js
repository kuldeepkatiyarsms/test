import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, } from 'react-native';
import { Container, Content, Left, Body, Right, Icon, Row, Col, Footer,Card, CardItem } from 'native-base';
import * as colors from '../assets/css/Colors';
import { img_url, font_title,font_description } from '../config/Constants';
import UIStepper from 'react-native-ui-stepper';
import { addToCart, productReset } from '../actions/ProductActions';
import {  subTotal, deliveryCharge, productVendor, reset } from '../actions/CartActions';
import { connect } from 'react-redux';

class EditProdcut extends Component<Props> {

  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      data:this.props.route.params.data,
      isLoding:false
    }
   
  }

  handleBackButtonClick= () => {
    this.props.navigation.goBack(null);
  }

  cart = () => {
    this.props.navigation.navigate('Cart');
  }

  add_to_cart = async (qty,product_id,product_name,price,image,description) => {

       let cart_items = this.props.cart_items;
       let old_product_details = cart_items[product_id];
       let sub_total = parseFloat(this.props.sub_total);
       let total_price = parseFloat(qty * price);
       
       if(old_product_details != undefined && total_price > 0){

         let final_price = parseFloat(total_price) - parseFloat(old_product_details.price);
         sub_total = parseFloat(sub_total) + parseFloat(final_price);

       }else if(total_price > 0){
         let final_price = parseFloat(qty * price);
         sub_total = parseFloat(sub_total) + parseFloat(final_price);
       }

       if(qty > 0){
          let product_data = {
            product_id: product_id,
            product_name: product_name,
            qty: qty,
            unit_price: price,
            image:image,
            description:description,
            price: parseFloat(qty * price)
          }
          cart_items[product_id] = product_data;
          await this.props.addToCart(cart_items);
          await this.props.subTotal(sub_total.toFixed(2));
          if(sub_total < global.free_delivery_amount){
            await this.props.deliveryCharge(global.delivery_charge.toFixed(2));
          }else{
            await this.props.deliveryCharge(0.00);
          }
       }else{
          delete cart_items[product_id];
          sub_total = parseFloat(sub_total) - parseFloat(price);
          await this.props.addToCart(cart_items);
          await this.props.subTotal(sub_total);
          if(sub_total < global.free_delivery_amount){
            await this.props.deliveryCharge(global.delivery_charge);
          }else{
            await this.props.deliveryCharge(0);
          }
       }   
     
  }

  render() {

    const { cart_items, cart_count } = this.props

    return (
      <Container>
       <View style={styles.edit_style1} >
          <View style={styles.edit_style2}>
          <Card style={styles.edit_style3}>
              <Row style={styles.edit_style4}>
                <Left style={styles.edit_style5}>
                 <TouchableOpacity style={styles.edit_style6} onPress={this.handleBackButtonClick} activeOpacity={1} >
                     <Icon onPress={this.handleBackButtonClick} style={styles.edit_style7} name='ios-arrow-back' />
                  </TouchableOpacity> 
                </Left>
                <Body style={styles.edit_style8}>
                  <Text
                    style={styles.edit_style9}
                  >
                    My Orders
                  </Text>
                </Body>
                <Right />
              </Row>
            </Card>
          </View>
          </View>
        <View style={styles.edit_style10}/>
        <Content>
          <View>
            <Image source={{ uri : img_url + this.state.data.image }} style={styles.edit_style11}/>
          </View>
          <View style={styles.edit_style12} />
          <Card>
          <CardItem>
          <Body>
            <Text style={styles.edit_style13}>{this.state.data.product_name}</Text>
          </Body>
          </CardItem>
          </Card>
          <View style={styles.edit_style14} />
          <Card>
          <CardItem bordered>
          <Body>
             <Text style={styles.edit_style15}>About product</Text>
          </Body>
          </CardItem>
          <CardItem>
          <Body>
            <Text style={styles.edit_style16}>{this.state.data.description}</Text>
          </Body>
          </CardItem>
          </Card>
          <View style={styles.edit_style17}>
            <Row>
              <Left>
                <Text style={styles.edit_style18}>{global.currency}{this.state.data.unit_price} <Text style={styles.edit_style19}></Text></Text>
              </Left>
              <Right>
                <UIStepper
                  onValueChange={(value) => { this.add_to_cart(value,this.state.data.product_id,this.state.data.product_name,this.state.data.unit_price,this.state.data.image,this.state.data.description) }}
                  displayValue={true}
                  initialValue={cart_items[this.state.data.product_id] ? cart_items[this.state.data.product_id].qty : 0 }
                  borderColor={colors.theme_fg}
                  textColor={colors.theme_fg}
                  tintColor={colors.theme_fg}
                />
              </Right>
            </Row>
          </View>
          <View style={styles.edit_style20} />
          <Text style={styles.edit_style21}>Related product</Text>
        </Content>
        {cart_count ?
          <Footer style={styles.edit_style22} >
            <TouchableOpacity activeOpacity={1} style={styles.edit_style23}>
              <Row>
                <Col onPress={() => this.cart()}  style={styles.edit_style24} >
                  <Text style={styles.edit_style25}>VIEW CART( {global.currency}{ this.props.sub_total} )</Text>
                </Col>
              </Row>
            </TouchableOpacity>
          </Footer> : null }
      </Container>
    );
  }
}

function mapStateToProps(state){
  return{
    isLoding : state.product.isLoding,
    error : state.product.error,
    data : state.product.data,
    message : state.product.message,
    status : state.product.status,
    cart_items : state.product.cart_items,
    cart_count : state.product.cart_count,
    sub_total : state.cart.sub_total,
    delivery_charge : state.cart.delivery_charge,
    current_vendor : state.cart.current_vendor,
    product_vendor : state.cart.product_vendor
  };
}

const mapDispatchToProps = (dispatch) => ({
  addToCart: (data) => dispatch(addToCart(data)),
  subTotal: (data) => dispatch(subTotal(data)),
  productVendor: (data) => dispatch(productVendor(data)),
  deliveryCharge: (data) => dispatch(deliveryCharge(data)),
  productReset: () => dispatch(productReset()),
  reset: () => dispatch(reset())
  
});


export default connect(mapStateToProps,mapDispatchToProps)(EditProdcut);

const styles = StyleSheet.create({
  edit_style1: {
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
  edit_style2:{position:'absolute',top:'55%',alignSelf:'center',width:'75%'},
  edit_style3:{alignItems: "center",borderRadius: 15,justifyContent: "center"},
  edit_style4:{padding:10, justifyContent:'center'},
  edit_style5:{flex:1},
  edit_style6:{width:100, justifyContent:'center'},
  edit_style7:{color:colors.theme_bg},
  edit_style8:{flex:3, justifyContent:'center'},
  edit_style9:{fontSize: 18,fontFamily: font_title,color: colors.theme_bg,justifyContent:'center'},
  edit_style10:{margin:20},
  edit_style11:{width:'100%', height:200},
  edit_style12:{margin:10},
  edit_style13:{fontSize:15, alignSelf:'center',fontFamily:font_description},
  edit_style14:{margin:5},
  edit_style15:{fontSize:15, fontFamily:font_title, color:colors.theme_fg_two},
  edit_style16:{fontSize:14 ,fontFamily:font_description},
  edit_style17:{padding:10},
  edit_style18:{color:colors.theme_fg, fontSize:25,fontFamily:font_title},
  edit_style19:{fontSize:10, color:colors.theme_fg_two},
  edit_style20:{margin:10},
  edit_style21:{fontSize:15, fontFamily:font_title, color:colors.theme_fg_two, marginLeft:10},
  edit_style22:{backgroundColor:'transparent'},
  edit_style23:{width:'100%',backgroundColor:colors.theme_bg},
  edit_style24:{alignItems:'center',justifyContent:'center'},
  edit_style25:{color:colors.theme_fg_three,fontFamily:font_title},
});
