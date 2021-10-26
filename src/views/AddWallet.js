import React, {Component} from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Container, Content, Icon, View } from 'native-base';
import { api_url, place_order, order_generation, get_payment_list,font_title } from '../config/Constants';
import * as colors from '../assets/css/Colors';
import { Loader } from '../components/GeneralComponents';
import axios from 'axios';
import { connect } from 'react-redux';
import { orderServicePending, orderServiceError, orderServiceSuccess, paymentListPending, paymentListError, paymentListSuccess } from '../actions/PaymentActions';
import { reset } from '../actions/CartActions';
import { productReset } from '../actions/ProductActions';
import RazorpayCheckout from 'react-native-razorpay';

class Payment extends Component<Props> {

  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.select_payment_method = this.select_payment_method.bind(this);
    this.state = {
      from:this.props.route.params.from,
      prescription_id:this.props.route.params.prescription_id,
      prescription_total:this.props.route.params.prescription_total,
      isLoding:false
    }
    this.get_payment_modes();
  }

  handleBackButtonClick= () => {
      this.props.navigation.goBack(null);
  }

  get_payment_modes = async () => {
    this.setState({ isLoding : true });
    this.props.paymentListPending();
    await axios({
      method: 'get', 
      url: api_url + get_payment_list
    })
    .then(async response => {
      this.setState({ isLoding : false });
      await this.props.paymentListSuccess(response.data);
    })
    .catch(error => {
      this.setState({ isLoding : false });
      this.props.paymentListError(error);
    });
  }

  place_order = async (payment_mode) => {
    this.setState({ isLoding : true });
    this.props.orderServicePending();
    await axios({
      method: 'post', 
      url: api_url + place_order,
      data:{ customer_id: global.id, vendor_id: this.props.current_vendor, payment_mode: payment_mode, delivery_charge:this.props.delivery_charge, tax:this.props.tax, total:this.props.total, discount:this.props.discount, sub_total:this.props.sub_total, promo_id:this.props.promo_id, items: JSON.stringify(Object.values(this.props.items)) }
    })
    .then(async response => {
      this.setState({ isLoding : false });
      await this.props.orderServiceSuccess(response.data);
      await this.move_orders();
    })
    .catch(error => {
      this.setState({ isLoding : false });
      this.props.orderServiceError(error);
    });
  }

  async move_orders(){
    await this.props.reset();
    await this.props.productReset();
    this.props.navigation.navigate('MyOrders');
  }

  place_prescription_order = async (payment_mode) => {
    this.setState({ isLoding : true });
    this.props.orderServicePending();
    await axios({
      method: 'post', 
      url: api_url + order_generation,
      data:{ customer_id: global.id, payment_mode: payment_mode, prescription_id:this.state.prescription_id }
    })
    .then(async response => {
      this.setState({ isLoding : false });
      await this.props.orderServiceSuccess(response.data);
      await this.move_orders();
    })
    .catch(error => {
      this.setState({ isLoding : false });
      this.props.orderServiceError(error);
    });
  }

  async select_payment_method(payment_mode){
    if(this.state.from == "prescription"){
      if(payment_mode == 1){
        await this.place_prescription_order(payment_mode);
      }else{
        var options = {
          currency: global.currency_short_code,
          key: global.razorpay_key,
          amount: this.state.prescription_total * 100,
          name: global.application_name,
          prefill: {
            email: global.email,
            contact: global.phone_number,
            name: global.customer_name
          },
          theme: {color: colors.theme_fg}
        }
        RazorpayCheckout.open(options).then((data) => {
          this.place_prescription_order(payment_mode);
        }).catch((error) => {
          alert('Sorry something went wrong');
        });
      }
    }else{
      if(payment_mode == 1){
        await this.place_order(payment_mode);
      }else{
        var options = {
          currency: global.currency_short_code,
          key: global.razorpay_key,
          amount: this.props.total * 100,
          name: global.application_name,
          prefill: {
            email: global.email,
            contact: global.phone_number,
            name: global.customer_name
          },
          theme: {color: colors.theme_fg}
        }
        RazorpayCheckout.open(options).then((data) => {
          // handle success
          //alert(`Success: ${data.razorpay_payment_id}`);
          this.place_order(payment_mode);
        }).catch((error) => {
          alert('Sorry something went wrong');
          // handle failure
          //alert(`Error: ${error.code} | ${error.description}`);
        });
      }
    }
  }

  render() {

    const { isLoding, payment_modes } = this.props

    return (
      <Container>
        <View>
          <View style={styles.add_wallet_style1}>
            <TouchableOpacity style={styles.add_wallet_style2} onPress={this.handleBackButtonClick} activeOpacity={1} >
            <Icon onPress={this.handleBackButtonClick} style={styles.add_wallet_style3} name='arrow-back' />
            </TouchableOpacity>
            <View style={styles.add_wallet_style4} />
            <Text style={styles.add_wallet_style5}>Add Wallet</Text>
          </View>
        </View>

        <View style={styles.add_wallet_style6}/>

        <Content style={styles.add_wallet_style7} >
        {payment_modes.map((row, index) => (
          <Text style={styles.add_wallet_style8}  onPress={() => this.select_payment_method(row.id)} >{row.payment_name}</Text>
        ))}
        </Content>
        <Loader visible={isLoding} />
        <Loader visible={this.state.isLoding} />
      </Container>
    );
  }
}

function mapStateToProps(state){
  return{
    isLoding : state.payment.isLoding,
    error : state.payment.error,
    data : state.payment.data,
    message : state.payment.message,
    status : state.payment.status,
    payment_modes : state.payment.payment_modes,
    delivery_date : state.cart.delivery_date,
    total : state.cart.total_amount,
    sub_total : state.cart.sub_total,
    tax : state.cart.tax,
    current_vendor : state.cart.current_vendor,
    delivery_charge : state.cart.delivery_charge,
    discount : state.cart.promo_amount,
    promo_id : state.cart.promo_id,
    items : state.product.cart_items
  };
}

const mapDispatchToProps = (dispatch) => ({
    orderServicePending: () => dispatch(orderServicePending()),
    orderServiceError: (error) => dispatch(orderServiceError(error)),
    orderServiceSuccess: (data) => dispatch(orderServiceSuccess(data)),
    paymentListPending: () => dispatch(paymentListPending()),
    paymentListError: (error) => dispatch(paymentListError(error)),
    paymentListSuccess: (data) => dispatch(paymentListSuccess(data)),
    reset: () => dispatch(reset()),
    productReset: () => dispatch(productReset())
});


export default connect(mapStateToProps,mapDispatchToProps)(Payment);

const styles = StyleSheet.create({
  add_wallet_style1: { alignItems:'flex-start', margin:10},
  add_wallet_style2: { width:100, justifyContent:'center'},
  add_wallet_style3: {color:colors.theme_fg_two, fontSize:30},
  add_wallet_style4: { margin:5 },
  add_wallet_style5: { fontSize:25, color:colors.theme_fg_two, fontFamily: font_title},
  add_wallet_style6: {margin:20},
  add_wallet_style7: { padding:20 },
  add_wallet_style8: {padding:10,color:colors.theme_fg,fontSize:16,fontFamily:font_title,borderBottomWidth:1,borderColor:'#a3ada6'},

});
