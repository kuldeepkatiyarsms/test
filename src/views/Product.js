import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Container, Body, Icon, Row, Footer, Col, Content, Card,CardItem } from 'native-base';
import { img_url, api_url, products, height_30, no_data,font_title } from '../config/Constants';
import { Loader } from '../components/GeneralComponents';
import * as colors from '../assets/css/Colors';
import axios from 'axios';
import { connect } from 'react-redux';
import { serviceActionPending, serviceActionError, serviceActionSuccess } from '../actions/ProductActions';
class Product extends Component<Props> {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      data: this.props.route.params.data,
    };
  }

  async componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this.Product();
    });
  }
  componentWillUnmount() {
    this._unsubscribe();
  }

  Product = async () => {
    this.props.serviceActionPending();
    await axios({
      method: "post",
      url: api_url + products,
      data: {
        sub_category_id: this.state.data.id,
        vendor_id: this.state.data.vendor_id, 
      },
    })
      .then(async (response) => {
        await this.props.serviceActionSuccess(response.data);
      })
      .catch((error) => {
        this.props.serviceActionError(error);
      });
  };

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
  };

  cart = () => {
    this.props.navigation.navigate("Cart");
  };

  move_product_details = (item) => {
    this.props.navigation.navigate("ProductDetails", { data: item, vendor_id: this.state.data.vendor_id });
  };

  render() {
    const {
      isLoding,
      error,
      data,
      message,
      status,
      cart_items,
      cart_count,
    } = this.props;

    return (
      <Container>
        <View>
          <View style={styles.pro_style1}>
            <TouchableOpacity style={styles.pro_style2} onPress={this.handleBackButtonClick} activeOpacity={1} >
            <Icon onPress={this.handleBackButtonClick} style={styles.pro_style3} name='arrow-back' />
            </TouchableOpacity>
            <View style={styles.pro_style4} />
            <Text style={styles.pro_style5}>Product</Text>
          </View>
        </View>
        {data != 0 && data != undefined && (
          <Content>
          <ImageBackground
              source={{ uri: img_url + data.vendor.store_image }}
              style={styles.pro_style6}
            > 
              <View style={styles.pro_style7}>
                <Text style={styles.pro_style8}>
                  {data.vendor.store_name}
                </Text>
              </View>
          </ImageBackground>
            <View style={styles.pro_style9} />
            {data.products.map((row, index) => (
              <View
                style={styles.pro_style10}
              >
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => this.move_product_details(row)}
                >
                  <Card style={styles.pro_style11}>
                    <CardItem cardBody bordered style={styles.pro_style12}>
                      <Row>
                        <Col style={styles.pro_style13}>
                          <View style={styles.pro_style14}>
                            <Image
                              style={styles.pro_style15}
                              source={{ uri: img_url + row.image }}
                            />
                          </View> 
                        </Col>
                        <Col style={styles.pro_style16}>
                          <Text style={styles.pro_style17}>
                            {row.product_name}
                          </Text>
                          <View style={styles.pro_style18} />
                          <Row> 
                          <Col>   
                            <Text style={styles.pro_style19}>{global.currency}{row.marked_price}/ {row.unit}</Text>
                          </Col> 
                          <Col style={styles.pro_style20}>
                          <Text style={styles.pro_style21}>{row.discount}% OFF</Text>
                          </Col>
                          </Row>
                          <Col>
                            <Text style={styles.pro_style22}>{global.currency}{row.price} <Text style={styles.pro_style23}>/ {row.unit}</Text></Text>
                          </Col>
                        </Col>
                      </Row>
                    </CardItem>
                  </Card> 
                </TouchableOpacity>
              </View>
            ))}
          </Content>
        )}
        {data == 0 && (
          <Body style={styles.pro_style24}>
            <Text>{no_data}</Text>
          </Body>
        )}
        {cart_count ? (
          <Footer style={styles.pro_style25}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this.cart()}
              style={styles.pro_style26}
            >
              <Row>
                <Col style={styles.pro_style27}>
                  <Text style={styles.pro_style28}>VIEW CART</Text>
                </Col>
              </Row>
            </TouchableOpacity>
          </Footer>
        ) : null}
        <Loader visible={isLoding} />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoding: state.product.isLoding,
    error: state.product.error,
    data: state.product.data,
    message: state.product.message,
    status: state.product.status,
    cart_items: state.product.cart_items,
    cart_count: state.product.cart_count,
    sub_total: state.cart.sub_total,
    cart_count: state.product.cart_count,
  };
}

const mapDispatchToProps = (dispatch) => ({
  serviceActionPending: () => dispatch(serviceActionPending()),
  serviceActionError: (error) => dispatch(serviceActionError(error)),
  serviceActionSuccess: (data) => dispatch(serviceActionSuccess(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);

const styles = StyleSheet.create({
  pro_style1:{alignItems:'flex-start',margin:10},
  pro_style2:{width:100,justifyContent:'center'},
  pro_style3:{color:colors.theme_fg_two,fontSize:30},
  pro_style4:{margin:5},
  pro_style5:{fontSize:25,color:colors.theme_fg_two,fontFamily:font_title},
  pro_style6:{flex:1,alignItems:"center",backgroundColor:colors.theme_bg_two},
  pro_style7: {
    backgroundColor: colors.theme_opactiy_bg,
    height: '100%',
    justifyContent:'center',
    width:'50%'
  },
  pro_style8: {
    marginTop: 10,
    fontSize: 20,
    color: "#FFFFFF",
    fontFamily:font_title,
    alignSelf: "center",
  },
  pro_style9:{margin:10},
  pro_style10:{paddingRight:10,paddingBottom:10,paddingLeft:10},
  pro_style11:{borderRadius:10,alignItems:"center"},
  pro_style12: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowOffset: { width: 0, height: 15 },
    shadowColor: colors.theme_bg,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  pro_style13:{width:100},
  pro_style14:{height:75,width:75},
  pro_style15:{flex:1,width:undefined,height:undefined,borderRadius:10},
  pro_style16:{justifyContent:"center"},
  pro_style17: {
    fontSize: 13,
    fontFamily:font_title,
    color: colors.theme_fg_two,
    padding:3
  },
  pro_style18:{margin:2},
  pro_style19:{textDecorationLine:'line-through',textDecorationStyle:'solid',fontSize:11,color:'#FF0000'},
  pro_style20:{marginRight:'50%',padding:1},
  pro_style21:{color:'#006400',fontSize:10,fontFamily:font_title},
  pro_style22:{color:colors.theme_fg,fontSize:15,fontFamily:font_title},
  pro_style23:{fontSize:10,color:colors.theme_fg_two},
  pro_style24:{marginTop:height_30},
  pro_style25:{backgroundColor:"transparent"},
  pro_style26:{width:"100%",backgroundColor:colors.theme_bg},
  pro_style27:{alignItems:"center",justifyContent:"center"},
  pro_style28:{color:colors.theme_fg_three,fontFamily:font_title},
});


