import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Image, Keyboard, PermissionsAndroid, TouchableOpacity } from 'react-native';
import { Container, Content, Left, Icon, Footer} from 'native-base';
import { Button } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { height_50, GOOGLE_KEY, LATITUDE_DELTA, LONGITUDE_DELTA, api_url, address, pin,font_title, font_description, app_name } from '../config/Constants';
import Snackbar from 'react-native-snackbar';
import { serviceActionPending, serviceActionError, serviceActionSuccess, editServiceActionPending, editServiceActionError, editServiceActionSuccess, updateServiceActionPending, updateServiceActionError, updateServiceActionSuccess } from '../actions/AddressActions';
import axios from 'axios';
import { connect } from 'react-redux';
import { Loader } from '../components/GeneralComponents';
import * as colors from '../assets/css/Colors';
import Geolocation from '@react-native-community/geolocation';

class Address extends Component<Props> {

  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      address:'Please select your location...',
      door_no:'',
      mapRegion: null,
      validation:true,
      address_id:this.props.route.params.id,
      open_map:0,
      pin_code:'',
      isLoding:false
    }
    this.mapRef = null;
  }

  add_address = async () => {
    this.setState({ isLoding : true });
    Keyboard.dismiss();
    await this.checkValidate();
    if(this.state.validation){
        this.props.serviceActionPending();
        await axios({
          method: 'post', 
          url: api_url + address,
          data:{ customer_id: global.id, pin_code: this.state.pin_code, address: this.state.address.toString(), door_no: this.state.door_no, latitude: this.state.latitude, longitude: this.state.longitude }
        })
        .then(async response => {
          this.setState({ isLoding : false });
            await this.props.serviceActionSuccess(response.data);
            if(response.data.status == 1){
              await this.redirect(response.data);
            }else{
              alert(response.data.message);
            }
            
        })
        .catch(error => {
          this.setState({ isLoding : false });
            this.showSnackbar("Sorry something went wrong!");
            this.props.serviceActionError(error);
        });
    }
  }

  redirect = async (data) =>{
    if(data.status == 1){
     this.handleBackButtonClick();
    }else{
      alert(data.message);
    }
  }

  checkValidate(){
    if(this.state.door_no == '' ){
      this.state.validation = false;
      this.showSnackbar("Please enter door number");
      return true;
    }else if(this.state.address == 'Please select your location...' ){
      this.state.validation = false;
      this.showSnackbar("Please select your location in map");
      return true;
    }else if(this.state.pin_code == '' ){
      this.state.validation = false;
      this.showSnackbar("Sorry something went wrong");
      return true;
    }else{
      this.state.validation = true;
    }
    
  }

  showSnackbar(msg){
    Snackbar.show({
      title:msg,
      duration: Snackbar.LENGTH_SHORT,
    });
  }

  set_location(){
    if(this.props.address != undefined){
      this.mapRef.animateToCoordinate({
        latitude: this.props.lat,
        longitude: this.props.lng,
      }, 1000);
    }
  }

  handleBackButtonClick= () => {
    this.props.navigation.goBack(null);
  }

  componentWillUnmount() {
    this._unsubscribe();
  }


  async componentDidMount() {   

    if(Platform.OS === "ios"){
        await this.findType();
    }else{
        await this.requestCameraPermission();
    }

    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this.set_location();
    });
    
  }

  async requestCameraPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
                'title': 'Location Access Required',
                'message': app_name+' needs to Access your location for tracking'
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            await this.findType();
        } else {
            await this.handleBackButtonClick();
        }
    } catch (err) {
        await this.handleBackButtonClick();
    }
  }

  async findType(){
    if(this.state.address_id == 0){
      await this.getInitialLocation();
    }else{
      await this.edit_address();
    }
  }

  edit_address = async () => {
    this.setState({ isLoding : true });
    this.props.editServiceActionPending();
    await axios({
      method: 'get', 
      url: api_url+address+'/'+this.state.address_id+'/edit' ,
    })
    .then(async response => {
      this.setState({ isLoding : false });
        await this.props.editServiceActionSuccess(response.data);
        await this.setState({ open_map:1 })
        await this.setLocation();
    })
    .catch(error => {
      this.setState({ isLoding : false });
        this.showSnackbar("Sorry something went wrong!");
        this.props.editServiceActionError(error);
    });
  }

  setLocation(){
    let region = {
      latitude: parseFloat(this.props.data.latitude),
      longitude: parseFloat(this.props.data.longitude),
      latitudeDelta:  LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }
    this.setState({ pin_code : this.props.data.pin_code, address : this.props.data.address, door_no : this.props.data.door_no, mapRegion: region })
  }

  update_address = async () => {
    this.setState({ isLoding : true });
    Keyboard.dismiss();
    await this.checkValidate();
    if(this.state.validation){
        this.props.updateServiceActionPending();
        await axios({
          method: 'patch', 
          url: api_url+address+'/'+this.state.address_id,
          data:{ customer_id: global.id, pin_code: this.state.pin_code, address: this.state.address.toString(), door_no: this.state.door_no, latitude: this.state.latitude, longitude: this.state.longitude }
        })
        .then(async response => {
          this.setState({ isLoding : false });
            await this.props.updateServiceActionSuccess(response.data);
            if(response.data.status == 1){
              await this.redirect(response.data);
            }else{
              alert(response.data.message);
            }
        })
        .catch(error => {
          this.setState({ isLoding : false });
            alert(JSON.stringify(error));
            this.showSnackbar("Sorry something went wrong!");
            this.props.updateServiceActionError(error);
        });
    }
  }

  async getInitialLocation(){

    await Geolocation.getCurrentPosition( async(position) => {
      this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude });
      let region = {
        latitude:       await position.coords.latitude,
        longitude:      await position.coords.longitude,
        latitudeDelta:  LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
      this.setState({ mapRegion: region, open_map:1 });
      console.log("region===",region)
    }, error => console.log('error map',error) , 
    {enableHighAccuracy: false, timeout: 20000 });
  }


  onRegionChange = async(value) => {
    this.setState({ address : 'Please wait...' });
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + value.latitude + ',' + value.longitude + '&key=' + GOOGLE_KEY)
        .then((response) => response.json())
        .then(async(responseJson) => {
           if(responseJson.results[0].formatted_address != undefined){
              let address = responseJson.results[0].address_components;
              let pin_code = address[address.length - 1].long_name;
              this.setState({ pin_code : pin_code, address : responseJson.results[0].formatted_address, latitude: value.latitude, longitude: value.longitude });
           }else{
              this.setState({ address : 'Sorry something went wrong' });
           }
    }) 
  }

  search = () =>{
    this.props.navigation.navigate('LocationSearch');
  }
  render() {

    const { isLoding } = this.props

    return (
      <Container keyboardShouldPersistTaps='always' style={styles.address_style1} > 
        <View>
          <View style={styles.address_style2}>
            <TouchableOpacity style={styles.address_style3} onPress={this.handleBackButtonClick} activeOpacity={1} >
            <Icon onPress={this.handleBackButtonClick} style={styles.address_style4} name='arrow-back' />
            </TouchableOpacity>
            <View style={styles.address_style5} />
            <Text style={styles.address_style6}>Address</Text>
          </View>
        </View>
        {this.state.open_map == 1 && <Content keyboardShouldPersistTaps='always'>
          <View style={styles.address_style7} >
           <MapView
               provider={PROVIDER_GOOGLE} 
               ref={(ref) => { this.mapRef = ref }}
               style={styles.address_style8}
               initialRegion={ this.state.mapRegion }
               onRegionChangeComplete={(region) => {
                  this.onRegionChange(region); 
               }}
            >
            </MapView>
            <View style={styles.address_style9}>
              <View style={styles.address_style10} >
                <Image
                  style= {styles.address_style11}
                  source={pin}
                />
              </View>
            </View>
          </View>
          <View style={styles.address_style12} >
            <View style={styles.address_style13} >
              <Left>
                <Text style={styles.address_style14} >Door no / Landmark</Text>
              </Left>
            </View> 
            <View style={styles.address_style15} >
              <TextInput 
                style={styles.address_style16}
                onChangeText={ TextInputValue =>
                  this.setState({door_no : TextInputValue }) }
                value={this.state.door_no}
              />
            </View>
            <View style={styles.address_style17} />
            <View style={styles.address_style18} >
              <Left>
                <Text style={styles.address_style19} >Address</Text>
              </Left>
            </View> 
            <View style={styles.address_style20} >
              <Left>
                <Text style={styles.address_style21} >
                  {this.state.address}
                </Text>
              </Left>
            </View>
          </View>
        </Content>}
        {this.state.open_map == 1 && <Footer style={styles.address_style22} >
          <View style={styles.address_style23}>
            <Button
              title="DONE"
              onPress={ this.state.address_id != 0 ? this.update_address : this.add_address}
              buttonStyle={styles.address_style24}
              titleStyle={styles.address_style25}
            />
          </View>
        </Footer>}
        <Loader visible={isLoding} />
        <Loader visible={this.state.isLoding} />
      </Container>

    );
  }
}

function mapStateToProps(state){
  return{
    isLoding : state.address.isLoding,
    message : state.address.isLoding,
    status : state.address.isLoding,
    address : state.address.address,
    lat : state.address.lat,
    lng : state.address.lng,
    data : state.address.data
  };
}

const mapDispatchToProps = (dispatch) => ({
    serviceActionPending: () => dispatch(serviceActionPending()),
    serviceActionError: (error) => dispatch(serviceActionError(error)),
    serviceActionSuccess: (data) => dispatch(serviceActionSuccess(data)),
    editServiceActionPending: () => dispatch(editServiceActionPending()),
    editServiceActionError: (error) => dispatch(editServiceActionError(error)),
    editServiceActionSuccess: (data) => dispatch(editServiceActionSuccess(data)),
    updateServiceActionPending: () => dispatch(updateServiceActionPending()),
    updateServiceActionError: (error) => dispatch(updateServiceActionError(error)),
    updateServiceActionSuccess: (data) => dispatch(updateServiceActionSuccess(data))
});

export default connect(mapStateToProps,mapDispatchToProps)(Address);

const styles = StyleSheet.create({

  address_style1: { backgroundColor: colors.theme_bg_three },
  address_style2: { alignItems:'flex-start', margin:10},
  address_style3: { width:100, justifyContent:'center'},
  address_style4: {color:colors.theme_fg_two, fontSize:30},
  address_style5: { margin:5 },
  address_style6: { fontSize:25, color:colors.theme_fg_two, fontFamily: font_title},
  address_style7: {alignItems:'center',justifyContent:'center'},
  address_style8: {width:'100%',height:height_50},
  address_style9: {position: 'absolute'},
  address_style10:{height:30,width:25,top:-15},
  address_style11: {flex:1 , width: undefined, height: undefined},
  address_style12:{width:'100%',padding:20,backgroundColor:colors.theme_bg_three,marginBottom:10},
  address_style13: { flexDirection:'row' },
  address_style14:{fontSize:15,fontFamily:font_title,color:colors.theme_fg_two},
  address_style15:{width:'100%',marginTop:5},
  address_style16:{borderColor: colors.theme_fg,borderBottomWidth: 1,padding:10,borderRadius:5,height:40,fontFamily:font_description},
  address_style17: { marginTop:20 },
  address_style18: { flexDirection:'row' },
  address_style19:{fontSize:15,fontFamily:font_title,color:colors.theme_fg_two},
  address_style20: { flexDirection:'row' },
  address_style21:{fontSize:15,marginTop:5,fontFamily:font_description},
  address_style22:{backgroundColor:colors.theme_bg_three},
  address_style23:{width:'90%',justifyContent:'center'},
  address_style24:{backgroundColor:colors.theme_bg,fontFamily:font_title},
  address_style25: {color:colors.theme_bg_three,fontFamily:font_description},
  
});

