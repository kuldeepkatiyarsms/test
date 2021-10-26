import React, {Component} from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Container, Left, Icon, Footer, Col } from 'native-base';
import { Button } from 'react-native-elements';
import axios from 'axios';
import { connect } from 'react-redux';
import { Loader } from '../components/GeneralComponents';
import { listServiceActionPending, listServiceActionError, listServiceActionSuccess, deleteServiceActionPending, deleteServiceActionError, deleteServiceActionSuccess } from '../actions/AddressListActions';
import { selectAddress } from '../actions/CartActions';
import { api_url, address_list, address_delete, img_url, last_active_address, font_title, font_description, no_address_lottie } from '../config/Constants';
import { ConfirmDialog  } from 'react-native-simple-dialogs';
import * as colors from '../assets/css/Colors';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import LottieView from 'lottie-react-native';
class AddressList extends Component<Props> {

  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      dialogVisible:false,
      deleting_address:0,
      from:this.props.route.params.from,
      isLoding:false,
      api_status:0,
      result:[]
    }
  }

  async componentDidMount(){
  this._unsubscribe=this.props.navigation.addListener('focus',()=>{
    this.address_list();
  });
  }
  
  componentWillUnmount(){
    this._unsubscribe();
  }

  address_list = async () => {
    this.setState({ isLoding : true });
    this.setState({dialogVisible: false})
    this.props.deleteServiceActionPending();
    await axios({
      method: 'post', 
      url: api_url + address_list,
      data:{ customer_id: global.id}
    })
    .then(async response => {
      //alert(JSON.stringify(response));
      this.setState({ isLoding : false,result: response.data.result, api_status:1 });
      await this.props.deleteServiceActionSuccess(response.data);
    })
    .catch(error => {
      this.setState({ isLoding : false });
      this.props.deleteServiceActionError(error);
    });
  }

  address_delete = async () => {
    this.setState({ isLoding : true });
    this.setState({dialogVisible: false})
    this.props.deleteServiceActionPending();
    await axios({
      method: 'post', 
      url: api_url + address_delete,
      data:{ customer_id: global.id, address_id : this.state.deleting_address}
    })
    .then(async response => {
      this.setState({ isLoding : false });
      await this.props.deleteServiceActionSuccess(response.data);
      await this.setState({deleting_address: 0});
      
    })
    .catch(error => {
      this.setState({ isLoding : false });
      this.props.deleteServiceActionError(error);
    });
  }

  open_popup(id){
    this.setState({dialogVisible: true, deleting_address:id})
  }

  close_popup(){
    this.setState({dialogVisible: false, deleting_address:0})
  }

  handleBackButtonClick= () => {
    this.props.navigation.goBack(null);
  }

  add_address = () => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
    .then(data => {
      this.props.navigation.navigate('Address',{ id:0 });
    }).catch(err => {
      alert('Please enable your location');
    });
  }

  edit_address = (id) => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
    .then(data => {
      this.props.navigation.navigate('Address',{ id: id});
    }).catch(err => {
      alert('Please enable your location');
    });
    
  }

  select_address= async (id) => {
    this.setState({ isLoding : true });
    await axios({
      method: 'post', 
      url: api_url + last_active_address, 
      data:{ customer_id: global.id, address_id : id}
    })
    .then(async response => {
      this.setState({ isLoding : false });
      if(response.data.status == 1){
        this.handleBackButtonClick();
      }else{
        alert(response.data.message);
      }
    })
    .catch(error => {
      this.setState({ isLoding : false });
      alert('Sorry something went wrong');
    });
  }

  render() {
    
    const { isLoding, data } = this.props

    const address_list = data.map((row,key) => {
      return (
        <View style={styles.add_list_style1} >
          <View style={styles.add_list_style2} >
            <Left>
              <Text style={styles.add_list_style3} >Address #{key+1}</Text>
            </Left>
          </View>
          <View style={styles.add_list_style4} >
            <Image
              style= {styles.add_list_style5}
              source={{uri:  img_url + row.static_map }}
            />
          </View>  
          <View style={styles.add_list_style6} >
            <Left>
            <Text style={styles.add_list_style7} >
                {row.door_no}
              </Text>
              <Text style={styles.add_list_style7} >
                {row.address}
              </Text>
            </Left>
          </View>
          <View style={styles.add_list_style8} >
            <Col style={styles.add_list_style9} >
              <Text onPress={ this.edit_address.bind(this,row.id) } style={styles.add_list_style10} >EDIT</Text>
            </Col>
            {/*<Col style={{ width:'25%' }}>
              <Text onPress={this.open_popup.bind(this,row.id)} style={styles.btn} >DELETE</Text>
            </Col>*/}
            {this.state.from == 'home' && 
              <Col style={styles.add_list_style11}>
                <Text onPress={this.select_address.bind(this,row.id)} style={styles.add_list_style12} >SELECT</Text>
              </Col>
            }
          </View>
        </View>
      )
    })

    return (
      <Container style={styles.add_list_style13} > 
        <View>
          <View style={styles.add_list_style14}>
            <TouchableOpacity style={styles.add_list_style15} onPress={this.handleBackButtonClick} activeOpacity={1} >
            <Icon onPress={this.handleBackButtonClick} style={styles.add_list_style16} name='arrow-back' />
            </TouchableOpacity>
            <View style={styles.add_list_style17} />
            <Text style={styles.add_list_style18}>Address List</Text>
          </View>
        </View>
        <ScrollView>
        <View style={styles.add_list_style19} >
          {address_list}
          {data.length == 0 && this.state.api_status == 1 &&
            <View>
              <View style={styles.add_list_style20}>
                <LottieView source={no_address_lottie} autoPlay loop />
              </View>
              <Text style={styles.add_list_style21}>How can we find you?</Text>
            </View>
          }
        </View>
        </ScrollView> 
        <Footer style={styles.add_list_style22} >
          <View style={styles.add_list_style23}>
            <Button
              title="ADD NEW ADDRESS"
              onPress={this.add_address}
              buttonStyle={styles.add_list_style24}
              titleStyle={styles.add_list_style25}
            />
          </View>
        </Footer>
        <Loader visible={isLoding} />
        <Loader visible={this.state.isLoding} />
        <ConfirmDialog
          title="Confirm Dialog"
          message="Are you sure about that?"
          animationType="fade"
          visible={this.state.dialogVisible}
          onTouchOutside={() => this.setState({dialogVisible: false})}
          positiveButton={{
              title: "YES",
              onPress: this.address_delete ,
              titleStyle: {
                color: colors.theme_fg,
                fontFamily:font_description
              },
          }}
          negativeButton={{
              title: "NO",
              onPress: () => this.setState({dialogVisible: false}),
              titleStyle: {
                color: colors.theme_fg,
                fontFamily:font_description
              },
          }}
        />
      </Container>
    );
  }
}

function mapStateToProps(state){
  return{
    isLoding : state.address_list.isLoding,
    message : state.address_list.isLoding,
    status : state.address_list.isLoding,
    data : state.address_list.data,
    address_count : state.address_list.address_count
  };
}

const mapDispatchToProps = (dispatch) => ({
    listServiceActionPending: () => dispatch(listServiceActionPending()),
    listServiceActionError: (error) => dispatch(listServiceActionError(error)),
    listServiceActionSuccess: (data) => dispatch(listServiceActionSuccess(data)),
    deleteServiceActionPending: () => dispatch(deleteServiceActionPending()),
    deleteServiceActionError: (error) => dispatch(deleteServiceActionError(error)),
    deleteServiceActionSuccess: (data) => dispatch(deleteServiceActionSuccess(data)),
    selectAddress: (data) => dispatch(selectAddress(data)),
});

export default connect(mapStateToProps,mapDispatchToProps)(AddressList);

const styles = StyleSheet.create({
  add_list_style1:{
    width:'100%', 
    padding:10, 
    backgroundColor:colors.theme_bg_three, 
    marginBottom:10 
  },
  add_list_style2: { flexDirection:'row' },
  add_list_style3:{
    fontSize:15, 
    fontFamily:font_title, 
    color:colors.theme_fg_two 
  },
  add_list_style4:{
    height:100, 
    width:'100%', 
    marginTop:10
  },
  add_list_style5: {flex:1 , width: undefined, height: undefined},
  add_list_style6: { flexDirection:'row' },
  add_list_style7:{
    fontSize:15, 
    marginTop:5,
    fontFamily:font_description
  },
  add_list_style8:{
    flexDirection:'row', 
    marginTop:10
  },
  add_list_style9: { width:'25%' },
  add_list_style10:{
    fontSize:14, 
    fontFamily:font_title, 
    color:colors.theme_fg,
    fontFamily:font_title
  },
  add_list_style11: { width:'25%' },
  add_list_style12:{
    fontSize:14, 
    fontFamily:font_title, 
    color:colors.theme_fg,
    fontFamily:font_title
  },
  add_list_style13: { backgroundColor: colors.theme_bg_two },
  add_list_style14: { alignItems:'flex-start', margin:20},
  add_list_style15: { width:100, justifyContent:'center'},
  add_list_style16: {color:colors.theme_fg_two, fontSize:30},
  add_list_style17: { margin:5 },
  add_list_style18: { fontSize:25, color:colors.theme_fg_two, fontFamily: font_title},
  add_list_style19: {
    alignItems: 'center'
  },
  add_list_style20: { height:250, marginTop:'30%' },
  add_list_style21: { alignSelf:'center', fontFamily:font_title },
  add_list_style22:{
    backgroundColor:colors.theme_bg_three
  },
  add_list_style23:{
    width:'90%', 
    justifyContent:'center'
  },
  add_list_style24:{
    backgroundColor:colors.theme_bg,
    fontFamily:font_title
  },
  add_list_style25: {color:colors.theme_bg_three,fontFamily:font_description},

});

