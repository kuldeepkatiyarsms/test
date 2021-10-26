import React, {Component} from 'react';
import { StyleSheet, Text, View , TouchableOpacity } from 'react-native';
import { Content, Container, Body, Left,  Row, Icon, Right, Card} from 'native-base';
import * as colors from '../assets/css/Colors';
import { font_title, GOOGLE_KEY } from '../config/Constants';
import { Loader } from '../components/GeneralComponents';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { lat, lng, address } from '../actions/AddressActions';
import { connect } from 'react-redux';
import axios from 'axios';
class LocationSearch extends Component<Props> {

  constructor(props) {
      super(props)
      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
      this.state = {
      isLoding:false
    }
  }

  handleBackButtonClick= () => {
      this.props.navigation.goBack(null);
  }

  getLocations = (data, details) =>{
    this.get_lat_lng(details.place_id);
  }

  get_lat_lng = async(place_id) =>{
    this.setState({ isLoding : true });
    await axios({
      method: 'get', 
      url: 'https://maps.googleapis.com/maps/api/place/details/json?placeid='+place_id+'&key='+GOOGLE_KEY
    })
    .then(async response => {
      this.setState({ isLoding : false });
      await this.props.address(response.data.result.formatted_address);
      await this.props.lat(response.data.result.geometry.location.lat);
      await this.props.lng(response.data.result.geometry.location.lng);
      await this.handleBackButtonClick();
       
    })
    .catch(error => {
      this.setState({ isLoding : false });
    });
  }
 
  render() {
    return (
      <Container>
        <View style={styles.loc_style1} >
          <View style={styles.loc_style2}>
          <Card style={styles.loc_style3}>
              <Row style={styles.loc_style4}>
                <Left style={styles.loc_style5}>
                 <TouchableOpacity style={styles.loc_style6} onPress={this.handleBackButtonClick} activeOpacity={1} >
                     <Icon onPress={this.handleBackButtonClick} style={styles.loc_style7} name='ios-arrow-back' />
                  </TouchableOpacity> 
                </Left>
                <Body style={styles.loc_style8}>
                  <Text
                    style={styles.loc_style9}
                  >
                    Location Search
                  </Text>
                </Body>
                <Right />
              </Row>
            </Card>
          </View>
          </View>
        <View style={styles.loc_style10}/>
        <Content padder style={styles.loc_style11}>
          <GooglePlacesAutocomplete
            placeholder='Type Here'
            currentLocation={true}
            enableHighAccuracyLocation={true}
            styles={styles.loc_style12}
            onPress={(data, details = null) => {
              this.getLocations(data,details);
            }}
            GooglePlacesDetailsQuery={{ fields: 'geometry' }}
            query={{
              key: GOOGLE_KEY,
              language: 'en'
            }}
          />
        </Content>
        <Loader visible={this.state.isLoding} />
      </Container>
    );
  }
}



const mapDispatchToProps = (dispatch) => ({
    address: (data) => dispatch(address(data)),
    lat: (data) => dispatch(lat(data)),
    lng: (data) => dispatch(lng(data))
});


export default connect(null,mapDispatchToProps)(LocationSearch);

const styles = StyleSheet.create({
  loc_style1: {
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
  loc_style2:{position:'absolute',top:'55%',alignSelf:'center',width:'75%'},
  loc_style3:{alignItems: "center",borderRadius: 15,justifyContent: "center"},
  loc_style4:{padding:10, justifyContent:'center'},
  loc_style5:{flex:1},
  loc_style6:{width:100, justifyContent:'center'},
  loc_style7:{color:colors.theme_bg},
  loc_style8:{flex:3, justifyContent:'center'},
  loc_style9:{fontSize: 18,fontFamily:font_title,color: colors.theme_bg,justifyContent:'center'},
  loc_style10:{margin:20},
  loc_style11:{backgroundColor:colors.light_grey},
  loc_style12:{color:colors.theme_bg},
});
