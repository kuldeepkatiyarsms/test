import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Content, Container, Body, Left, Icon, Right, Card, CardItem, List, ListItem, Thumbnail} from 'native-base';
import * as colors from '../assets/css/Colors';
import axios from 'axios';
import { Loader } from '../components/GeneralComponents';
import { wallet_icon, api_url, get_wallet, add_wallet ,font_description,font_title , no_wallet_lottie} from '../config/Constants';
import { Button } from 'react-native-elements';
import DialogInput from 'react-native-dialog-input';
import Moment from 'moment';
import RazorpayCheckout from 'react-native-razorpay';
import LottieView from 'lottie-react-native';
class Wallet extends Component<Props> {

  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.open_dialog = this.open_dialog.bind(this);
    this.add_wallet = this.add_wallet.bind(this);
    this.state = {
      isDialogVisible:false,
      wallet:0,
      wallet_histories:[],
      isLoding:false,
      api_status:0
    }
    this.get_wallet();
  }

  get_wallet = async() =>{
    this.setState({ isLoding:true });
    await axios({
      method: "post",
      url: api_url + get_wallet,
      data: { id : global.id }
    })
    .then(async (response) => {
      this.setState({ isLoding:false ,api_status:1});
      this.setState({ wallet : response.data.result.wallet, wallet_histories : response.data.result.wallet_histories })
    })
    .catch((error) => {
      this.setState({ isLoding:false });
      alert("Something went wrong");
    });
  }

  add_wallet_success = async(amount) =>{
    this.setState({ isLoding:true });
    await axios({
      method: "post",
      url: api_url + add_wallet,
      data: { id : global.id, amount : amount }
    })
    .then(async (response) => {
      this.setState({ isLoding:false });
      this.get_wallet();
    })
    .catch((error) => {
      this.setState({ isLoding:false });
      alert("Your transaction declined");
    });
  }

  handleBackButtonClick= () => {
      this.props.navigation.goBack(null);
  }

  open_dialog(){
    this.setState({ isDialogVisible: true });
  }

  add_wallet(amount){
    if(!isNaN(amount)){
      var options = {
        currency: global.currency_short_code,
        key: global.razorpay_key,
        amount: amount * 100,
        name: global.application_name,
        prefill: {
          email: global.email,
          contact: global.phone_number,
          name: global.customer_name
        },
        theme: {color: colors.theme_fg}
      }
      RazorpayCheckout.open(options).then((data) => {
        this.add_wallet_success(amount);
      }).catch((error) => {
        alert('Sorry something went wrong');
      });
    }else{
      alert('Please enter valid amount');
    }
    this.setState({ isDialogVisible: false });
  }

  render() {
    return (
      <Container>
        <View>
          <View style={styles.wall_style1}>
            <TouchableOpacity style={styles.wall_style2} onPress={this.handleBackButtonClick} activeOpacity={1} >
            <Icon onPress={this.handleBackButtonClick} style={styles.wall_style3} name='arrow-back' />
            </TouchableOpacity>
            <View style={styles.wall_style4} />
            <Text style={styles.wall_style5}>Wallet</Text>
          </View>
        </View>
        <Content padder>
          <Card style={styles.wall_style6}>
            <CardItem header bordered style={styles.wall_style7}>
              <Left>
                <View>
                 <Icon style={styles.wall_style8} name='ios-wallet' />
                </View>
                <View style={styles.wall_style9} />
                <View>
                  <Text style={styles.wall_style10}>{global.currency}{this.state.wallet}</Text>
                  <Text style={styles.wall_style11} >Your balance</Text>
                </View>
              </Left>
              <Right>
                 <Button
                  title="+ Add Money"
                  onPress={this.open_dialog}
                  type="outline"
                />
              </Right>
            </CardItem>
          </Card>
          <View style={styles.wall_style12} />
          <Text style={styles.wall_style13}>Wallet transactions</Text>
          <List>
            <FlatList
              data={this.state.wallet_histories}
              renderItem={({ item,index }) => (
                <ListItem avatar>
                  <Left>
                    <Thumbnail square source={wallet_icon} style={styles.wall_style14} />
                  </Left>
                  <Body>
                    <Text style={styles.wall_style15}>{item.message}</Text>
                    <Text style={styles.wall_style16}>{Moment(item.created_at).format('DD MMM-YYYY hh:mm')}</Text>
                  </Body>
                  <Right>
                    <Text style={styles.wall_style17}>{global.currency}{item.amount} {item.transaction_type == 1 ? <Text style={styles.wall_style18}>Cr</Text> : <Text style={styles.wall_style19}>Dr</Text> }</Text>
                  </Right>
                </ListItem>
              )}
              keyExtractor={item => item.menu_name}
            />
          </List>
          <Loader visible={this.state.isLoding} />
          {this.state.wallet_histories.length == 0 && this.state.api_status == 1 &&
            <View>
              <View style={styles.wall_style20}>
                <LottieView source={no_wallet_lottie} autoPlay loop />
              </View>
              <Text style={styles.wall_style21}>No transactions found</Text>
            </View>
          }
        </Content>
        <DialogInput isDialogVisible={this.state.isDialogVisible}
          title={"Add Wallet"}
          message={"Please enter your amount here"}
          hintInput ={"Enter amount"}
          keyboardType="numeric"
          submitInput={ (inputText) => {this.add_wallet(inputText)} }
          closeDialog={ () => {this.setState({ isDialogVisible : false })}}>
        </DialogInput>
      </Container>
    );
  }
}

export default Wallet;

const styles = StyleSheet.create({
  wall_style1:{alignItems:'flex-start', margin:10},
  wall_style2:{ width:100, justifyContent:'center'},
  wall_style3:{color:colors.theme_fg_two, fontSize:30},
  wall_style4:{ margin:5 },
  wall_style5:{ fontSize:25, color:colors.theme_fg_two,  fontFamily: font_title},
  wall_style6:{ borderRadius: 8 },
  wall_style7:{ borderRadius: 8 },
  wall_style8:{ fontSize:30, color:colors.theme_fg },
  wall_style9:{ margin:5 },
  wall_style10: { 
    fontSize:18 ,
    fontFamily:font_description
  },
  wall_style11: { 
    fontSize:13, 
    color:colors.theme_fg,
    fontFamily:font_title
  },
  wall_style12:{margin:10},
  wall_style13:{fontSize:16,fontFamily:font_title},
  wall_style14:{ height:35, width:35 },
  wall_style15:{ 
    fontSize:14, 
    color:colors.theme_fg_two ,
    fontFamily:font_description
  },
  wall_style16:{fontSize:12,color:colors.theme_fg_four,fontFamily:font_description},
  wall_style17:{ 
    fontSize:16, 
    color:colors.theme_fg_two ,
    fontFamily:font_description
  },
  wall_style18:{ color:"green" },
  wall_style19:{ color:"red" },
  wall_style20:{ height:200, marginTop:'30%' },
  wall_style21:{ alignSelf:'center', fontFamily:font_title },

});
