import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Container, Content, List, ListItem, Icon, Col, } from 'native-base';
import { api_url, prescription_list,font_description,font_title, tablet, no_prescription_lottie } from '../config/Constants';
import * as colors from '../assets/css/Colors';
import { Loader } from '../components/GeneralComponents';
import Moment from 'moment';
import axios from 'axios';
import { connect } from 'react-redux'; 
import { serviceActionPending, serviceActionError, serviceActionSuccess } from '../actions/PrescriptionActions';
import ProgressCircle from 'react-native-progress-circle';
import LottieView from 'lottie-react-native';
class Prescription extends Component<Props> {

  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this); 
    this.state = {
      result:[],
      api_status:0,
    };  
  }
  
  async componentDidMount(){
  this._unsubscribe=this.props.navigation.addListener('focus',()=>{
    this.Prescription();
  });
  }
  
  componentWillUnmount(){
    this._unsubscribe();
  }

  handleBackButtonClick= () => {
      this.props.navigation.goBack(null);
  }

  view_prescription = (data) => {
    this.props.navigation.navigate('ViewPrescription',{ data : data}); 
  }

  Prescription = async () => {
    this.props.serviceActionPending();
    await axios({
      method: 'post', 
      url: api_url + prescription_list,
      data :{ customer_id : global.id}
    })
    .then(async response => {
      this.setState({ api_status:1 , result:response.data.result });
        await this.props.serviceActionSuccess(response.data)
    })
    .catch(error => {
        this.props.serviceActionError(error);
    });
  }


  render() {

    const { isLoding, data } = this.props

    return (
      <Container>
        <View>
          <View style={styles.pre_style1}>
            <TouchableOpacity style={styles.pre_style2} onPress={this.handleBackButtonClick} activeOpacity={1} >
            <Icon onPress={this.handleBackButtonClick} style={styles.pre_style3} name='arrow-back' />
            </TouchableOpacity>
            <View style={styles.pre_style4} />
            <Text style={styles.pre_style5}>Prescription</Text>
          </View>
        </View>
        <View style={styles.pre_style6}/>

        <Content>
          <List>
            {data.map((row, index) => (
              <ListItem onPress={() => this.view_prescription(row)}> 
                <Col style={styles.pre_style7}>
                  <ProgressCircle
                    percent={row.status * 10}
                    radius={30}
                    borderWidth={3}
                    color={colors.theme_fg}
                    shadowColor="#e6e6e6"
                    bgColor="#FFFFFF"
                  >
                    <View style={styles.pre_style8} >
                      <Image
                        style= {styles.pre_style9}
                        source={tablet}
                      />
                    </View>
                  </ProgressCircle>
                </Col>
                 <Col style={styles.pre_style10} >
                  <Text style={styles.pre_style11}>Prescription order Id : #{row.id}</Text>
                  <View style={styles.pre_style12} />
                  <Text style={styles.pre_style13} >{Moment(row.created_at).format('DD MMM-YYYY hh:mm')}</Text>
                  {row.status == 9 ? <Text style={styles.pre_style14} >{row.status_name}</Text> : <Text style={styles.pre_style15} >{row.status_name}</Text> }
                  
                </Col>
              </ListItem>
            ))}
          </List>
          {data.length == 0 && this.state.api_status == 1 &&
            <View>
              <View style={styles.pre_style16}>
                <LottieView source={no_prescription_lottie} autoPlay loop />
              </View>
              <Text style={styles.pre_style17}>Upload your first prescription</Text>
            </View>
          }
        </Content>
        <Loader visible={isLoding} />
      </Container>
    );
  }
}

function mapStateToProps(state){
  return{
    isLoding : state.prescription.isLoding,
    error : state.prescription.error,
    data : state.prescription.data,
    message : state.prescription.message,
    status : state.prescription.status,
  };
}

const mapDispatchToProps = (dispatch) => ({
    serviceActionPending: () => dispatch(serviceActionPending()),
    serviceActionError: (error) => dispatch(serviceActionError(error)),
    serviceActionSuccess: (data) => dispatch(serviceActionSuccess(data))
});


export default connect(mapStateToProps,mapDispatchToProps)(Prescription);

const styles = StyleSheet.create({
  pre_style1:{alignItems:'flex-start',margin:10},
  pre_style2:{width:100,justifyContent:'center'},
  pre_style3:{color:colors.theme_fg_two,fontSize:30},
  pre_style4:{margin:5},
  pre_style5:{fontSize:25,color:colors.theme_fg_two,fontFamily:font_title},
  pre_style6:{margin:20},
  pre_style7:{width:'30%'},
  pre_style8:{height:30,width:30},
  pre_style9:{flex:1,width:undefined,height:undefined},
  pre_style10:{width:'50%'},
  pre_style11:{fontFamily:font_description},
  pre_style12:{margin:1},
  pre_style13:{fontSize:10,fontFamily:font_description},
  pre_style14:{color:colors.red},
  pre_style15:{color:colors.theme_fg},
  pre_style16:{height:250,marginTop:'30%'},
  pre_style17:{alignSelf:'center',fontFamily:font_title},
});
