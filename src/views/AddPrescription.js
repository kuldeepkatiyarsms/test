import React, {Component} from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, Keyboard, View, Alert } from 'react-native';
import { Container, Content, Icon, Form, Textarea, Card, CardItem, Col, Footer, Row } from 'native-base';
import { api_url, upload, image_upload, prescription, font_title, font_description, app_name } from '../config/Constants';
import * as colors from '../assets/css/Colors';
import { Loader } from '../components/GeneralComponents';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import axios from 'axios';
import { connect } from 'react-redux'; 
import { serviceActionPending, serviceActionError, serviceActionSuccess } from '../actions/CreatePrescriptionActions';
import { reset } from '../actions/CartActions';

const options = {
  title: 'Select a photo',
  takePhotoButtonTitle: 'Take a photo',
  chooseFromLibraryButtonTitle: 'Choose from gallery',
  quality:1, 
  maxWidth: 500, 
  maxHeight: 500,
};

class AddPrescription extends Component<Props> {

  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      image_one : { uri : upload },
      image_two : { uri : upload },
      image_three : { uri : upload }, 
      prescription_one:'',
      prescription_two:'',
      prescription_three:'',
      customer_notes:'',
      data:'',
      images:[],
      validation:true,
      isLoding:false
    }
  }

  handleBackButtonClick= () => {
      this.props.navigation.goBack(null);
  }

  select_photo(type){
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        if(type == 1){
          this.setState({
            data:response.data,
            image_one: {uri: response.uri }
          });
        }else if(type == 2){
          this.setState({
            data:response.data,
            image_two: {uri: response.uri }
          });
        }else if(type == 3){
          this.setState({
            data:response.data,
            image_three: {uri: response.uri }
          });
        }
        this.image_update(type);
      }
    });
  }

  image_update = async (type) => {
    this.setState({ isLoding : true });
    RNFetchBlob.fetch('POST', api_url + image_upload, {
      'Content-Type' : 'multipart/form-data',
    }, [
      {  
        name : 'image',
        filename : 'image.png', 
        type:'image/png', 
        data: this.state.data
      }
    ]).then((resp) => { 
      this.setState({ isLoding : false });
      let data = JSON.parse(resp.data);
      if(data.status == 1 && type == 1){
        this.setState({ prescription_one : data.result });
      }else if(data.status == 1 && type == 2){
        this.setState({ prescription_two : data.result });
      }else if(data.status == 1 && type == 3){
        this.setState({ prescription_three : data.result });
      }
    }).catch((err) => {
      this.setState({ isLoding : false });
      alert("Error on while uploading,Try again");
    })
  }

  add_prescription = async () => {
    this.setState({ isLoding : true });
    Keyboard.dismiss();
    await this.make_images();
    await this.checkValidate();
    if(this.state.validation){
      this.props.serviceActionPending();
      await axios({
        method: 'post', 
        url: api_url+prescription,
        data:{ customer_id: global.id, images: this.state.images, customer_notes: this.state.customer_notes, vendor_id: this.props.current_vendor }
      })
      .then(async response => {
        this.setState({ isLoding : false });
          await this.props.serviceActionSuccess(response.data);
          if(response.data.status == 1){
            await Alert.alert(
              'Success',
              'Your prescription uploaded, '+app_name+ ' will contact you shortly.',
              [
                { text: 'OK', onPress: () => this.prescription_list() }
              ],
              { cancelable: false }
            );
          }else{
            alert('Sorry something went wrong');
          }
      })
      .catch(error => {
        this.setState({ isLoding : false });
          this.props.serviceActionError(error);
      });
    }
  }

  async prescription_list(){
    this.props.navigation.navigate('Prescription');
  }

  async make_images(){
    let images = [];
    if(this.state.prescription_one){
      images = this.state.prescription_one;
    }
    if(this.state.prescription_two){
      images = images+','+this.state.prescription_two;
    }
    if(this.state.prescription_three){
      images = images+','+this.state.prescription_three;
    }

    this.setState({ images : images});
    return true;

  }
  checkValidate(){
    if(this.state.prescription_one == '' && this.state.prescription_two == '' && this.state.prescription_three == ''){
      this.state.validation = false;
      alert("Please upload images");
      return true;
    }else{
      this.state.validation = true;
      return true;
    }
  }

  render() {

    return (
      <Container>
        <View>
          <View style={styles.ap_style1}>
            <TouchableOpacity style={styles.ap_style2} onPress={this.handleBackButtonClick} activeOpacity={1} >
              <Icon onPress={this.handleBackButtonClick} style={styles.ap_style3} name='arrow-back' />
            </TouchableOpacity>
            <View style={styles.ap_style4} />
            <Text style={styles.ap_style5}>Add Prescription</Text>
          </View>
        </View>
        <View style={styles.ap_style6}/>
        <Content padder>
          <Card>
            <CardItem header>
              <Text style={styles.ap_style7}>You can upload maximum 3 images</Text>
            </CardItem>
            <CardItem button>
              <Col>
                <TouchableOpacity onPress={this.select_photo.bind(this,1)}>
                  <Image 
                    style={styles.ap_style8}
                    resizeMode='cover'
                    source={this.state.image_one}
                  />
                </TouchableOpacity>
              </Col>
              <Col>
                <TouchableOpacity onPress={this.select_photo.bind(this,2)}>
                  <Image 
                    style={styles.ap_style8}
                    resizeMode='cover'
                    source={this.state.image_two}
                  />
                </TouchableOpacity>
              </Col>
              <Col>
                <TouchableOpacity onPress={this.select_photo.bind(this,3)}>
                  <Image 
                    style={styles.ap_style8}
                    resizeMode='cover'
                    source={this.state.image_three}
                  />
                </TouchableOpacity>
              </Col>
            </CardItem>
          </Card>
          <Form>
            <Textarea onChangeText={ TextInputValue => this.setState({customer_notes : TextInputValue }) } rowSpan={5} bordered placeholder="Notes" />
          </Form>
        </Content>
        <Footer style={styles.ap_style9} >
          <TouchableOpacity activeOpacity={1} onPress={() => this.add_prescription()} style={styles.ap_style10}>
            <Row>
              <Col style={styles.ap_style11} >
                <Text style={styles.ap_style12} >ADD PRESCRIPTION</Text>
              </Col>
            </Row>
          </TouchableOpacity>
        </Footer>
        <Loader visible={this.state.isLoding} />
      </Container>
    );
  }
}

function mapStateToProps(state){
  return{
    isLoding : state.create_prescription.isLoding,
    error : state.create_prescription.error,
    data : state.create_prescription.data,
    message : state.create_prescription.message,
    status : state.create_prescription.status,
    address_id : state.create_prescription.address_id,
    address : state.create_prescription.address,
    current_vendor : state.cart.current_vendor,
  };
}

const mapDispatchToProps = (dispatch) => ({
    serviceActionPending: () => dispatch(serviceActionPending()),
    serviceActionError: (error) => dispatch(serviceActionError(error)),
    serviceActionSuccess: (data) => dispatch(serviceActionSuccess(data)),
    reset: () => dispatch(reset()),
});

export default connect(mapStateToProps,mapDispatchToProps)(AddPrescription);

const styles = StyleSheet.create({
  ap_style1: { alignItems:'flex-start', margin:10},
  ap_style2: { width:100, justifyContent:'center'},
  ap_style3: {color:colors.theme_fg_two, fontSize:30},
  ap_style4: { margin:5 },
  ap_style5: { fontSize:25, color:colors.theme_fg_two, fontFamily: font_title},
  ap_style6: {margin:20},
  ap_style7: {fontFamily:font_description},
  ap_style8:{
    width: 100,
    height: 70,
    alignSelf:'center',
    borderColor: colors.theme_bg_three,
    borderWidth: 1
  },
  ap_style9:{
    backgroundColor:'transparent',
    marginBottom:30
  },
  ap_style10:{
    width:'100%', 
    backgroundColor:colors.theme_bg
  },
  ap_style11:{
    alignItems:'center',
    justifyContent:'center'
  },
  ap_style12:{
    color:colors.theme_fg_three, 
    fontFamily:font_title
  }
  
  
  
});
