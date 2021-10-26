import React, {Component} from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, ImageBackground} from 'react-native';
import { Loader } from '../components/GeneralComponents';
import { img_url, api_url, vendor_category, height_30, no_data,font_title, font_description} from '../config/Constants';
import * as colors from '../assets/css/Colors';
import axios from 'axios';
import { connect } from 'react-redux';
import { serviceActionPending, serviceActionError, serviceActionSuccess } from '../actions/CategoryActions';
import { currentVendor } from '../actions/CartActions';
import { productListReset } from '../actions/ProductActions';
import { Button, Icon } from 'react-native-elements';
import { Container, Content, Left, Body, Row, Col,Card,CardItem } from 'native-base';
class Category extends Component<Props> {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      vendor: this.props.route.params.vendor,
      isLoding:false
    };
    this.Category();
    this.props.currentVendor(this.state.vendor.id); 
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
  };

  search = () => {
    this.props.navigation.navigate("Search",{ vendor_id : this.state.vendor.id});
  };

  componentWillMount() {}

  move_prescription = async () => {
    await this.props.navigation.navigate("AddPrescription");
  };

  Category = async () => {
    this.setState({ isLoding : true });
    this.props.serviceActionPending();
    await axios({
      method: "post",
      url: api_url + vendor_category,
      data: { vendor_id: this.state.vendor.id },
    })
    .then(async (response) => {
      this.setState({ isLoding : false });
      await this.props.serviceActionSuccess(response.data);
    })
    .catch((error) => {
      this.setState({ isLoding : false });
      this.props.serviceActionError(error);
    });
  };

  move_sub_category = async (item) => {
    await this.props.navigation.navigate("SubCategory", { list: item });
  };

  render() {
    const {
      isLoding,
      data,
    } = this.props;

    return (
      <Container>
        {data != 0 && data != undefined && (
          <Content>
            <View>
               <View style={styles.cat_style1}>
                  <TouchableOpacity style={styles.cat_style2} onPress={this.handleBackButtonClick} activeOpacity={1} >
                  <Icon onPress={this.handleBackButtonClick} style={styles.cat_style3} name='arrow-back' />
                  </TouchableOpacity>
                  <View style={styles.cat_style4} />
                  <Text style={styles.cat_style5}>Category</Text>
               </View>
            </View>
            <ImageBackground
              source={{ uri: img_url + this.state.vendor.store_image }}
              style={styles.cat_style6}
            >
              <View style={styles.cat_style7}>
                <Text style={[styles.style8,styles.cat_style9]}>
                  {this.state.vendor.store_name}
                </Text>
                <View style={styles.cat_style10} >
                <View style={styles.cat_style11}>
                <TouchableOpacity onPress={this.search} transparent>
                  <Icon  style={styles.cat_style12} name='search' />
                </TouchableOpacity>
                <Text onPress={this.search} style={styles.cat_style13} >Search here...</Text>
                </View>
                </View>
              </View>
            </ImageBackground>

            <View
              style={styles.cat_style14}
            >
              <Button
                icon={
                  <Icon
                    name="cloud-upload"
                    size={20}
                    type="font-awesome"
                    color="white"
                    iconStyle={styles.cat_style15}
                  />
                }
                onPress={this.move_prescription}
                buttonStyle={styles.cat_style16}
                title="Upload your prescription"
                titleStyle={styles.cat_style17}
              />
              {data.map((item, index) => (
                <View>
                  <View style={styles.cat_style18} />

                  <Text style={styles.cat_style19}>
                    {item.name}
                  </Text>
                  <View style={styles.cat_style20} />
                  <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                  >
                    <Row>
                      {item.data.map((row, index1) => (
                        <Col
                          style={styles.cat_style21}
                        >
                          <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => this.move_sub_category(row, index)}
                          >
                            <View style={styles.cat_style22}>
                              <Card
                                style={styles.cat_style23}
                              >
                                <CardItem
                                  cardBody
                                  bordered
                                  style={styles.cat_style24}
                                >
                                  <Image
                                    source={{
                                      uri: img_url + row.category_image,
                                    }}
                                    style={styles.cat_style25}
                                  />
                                </CardItem>
                                <CardItem
                                  bordered
                                  footer
                                  style={styles.cat_style26}
                                >
                                  <Left>
                                    <Text style={styles.cat_style27}>
                                      {row.category_name}
                                    </Text>
                                  </Left>
                                </CardItem>
                              </Card>
                            </View>
                          </TouchableOpacity>
                        </Col>
                      ))}
                    </Row>
                  </ScrollView>
                </View>
              ))}
            </View>
          </Content>
        )}
        {data == 0 && (
          <Body style={styles.cat_style28}>
            <Text style={styles.cat_style29}>{no_data}</Text>
          </Body>
        )}
        <Loader visible={isLoding} />
        <Loader visible={this.state.isLoding} />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoding: state.category.isLoding,
    error: state.category.error,
    data: state.category.data,
    message: state.category.message,
    status: state.category.status,
  };
}

const mapDispatchToProps = (dispatch) => ({
  serviceActionPending: () => dispatch(serviceActionPending()),
  serviceActionError: (error) => dispatch(serviceActionError(error)),
  serviceActionSuccess: (data) => dispatch(serviceActionSuccess(data)),
  productListReset: () => dispatch(productListReset()),
  currentVendor: (data) => dispatch(currentVendor(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);
const styles = StyleSheet.create({
  cat_style1:{alignItems:'flex-start', margin:10},
  cat_style2:{width:100, justifyContent:'center', alignItems:'flex-start'},
  cat_style3:{color:colors.theme_fg_two, fontSize:30},
  cat_style4:{margin:5},
  cat_style5:{fontSize:25, color:colors.theme_fg_two, fontFamily: font_title},
  cat_style6:{height: 150,flex:1,justifyContent:'center'},
  cat_style7:{backgroundColor: colors.theme_opactiy_bg,height: '100%',justifyContent:'center'},
  cat_style8:{marginTop: 20,fontSize: 20,color: "#FFFFFF",fontFamily:font_title,alignSelf: "center",justifyContent:'center'},
  cat_style9:{paddingTop: 10},
  cat_style10:{width:'85%', alignSelf:'center',marginTop:15},
  cat_style11:{flexDirection: "row",justifyContent: "center",alignItems: "center",borderWidth: 1,backgroundColor: '#708090',borderColor: colors.grey,height: 42,borderRadius: 10,marginTop: 5,marginBottom: 25,padding:5,width:'105%'},
  cat_style12:{color: colors.theme_fg_two},
  cat_style13:{flex: 1, marginLeft:10,fontFamily:font_description},
  cat_style14:{padding: 10, backgroundColor: colors.theme_bg_three},
  cat_style15:{marginRight: 10},
  cat_style16:{backgroundColor: colors.theme_fg ,fontFamily:font_title},
  cat_style17:{color:colors.theme_bg_three,fontFamily:font_description},
  cat_style18:{margin: 10},
  cat_style19:{fontSize: 15, fontFamily:font_title},
  cat_style20:{margin: 5},
  cat_style21:{justifyContent: "center",alignItems: "center",flexDirection: "row"},
  cat_style22:{marginRight: 5},
  cat_style23:{borderRadius: 10,alignItems: "center"},
  cat_style24:{borderRadius: 10,padding: 0,margin: 0},
  cat_style25:{width: 200,height: 100,flex: 1,borderTopLeftRadius: 10,borderTopRightRadius: 10},
  cat_style26:{borderBottomLeftRadius: 10,borderBottomRightRadius: 10,padding: 0,margin: 0},
  cat_style27:{fontSize: 15,fontFamily:font_title,color: colors.theme_fg},
  cat_style28:{marginTop: height_30},
  cat_style29:{fontFamily:font_description},
});
