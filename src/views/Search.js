import React, {Component} from 'react';
import { StyleSheet, Text, ActivityIndicator } from 'react-native';
import { Container, Content, List, ListItem, Body, Col } from 'native-base';
import { api_url, search_products, height_30, no_data,font_title } from '../config/Constants';
import * as colors from '../assets/css/Colors';
import { Loader } from '../components/GeneralComponents';
import axios from 'axios';
import { SearchBar } from 'react-native-elements';

export default class Search extends Component<Props> {

  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state={
      search: '',
      data:[],
      count:undefined,
      on_search:0,
      vendor_id: this.props.route.params.vendor_id,
      isLoding:false
    }
  }

  handleBackButtonClick= () => {
    this.props.navigation.goBack(null);
  }

  move_product_details = (item) =>{
    this.props.navigation.navigate('ProductDetails',{ data : item, vendor_id:this.state.vendor_id });
  }

  updateSearch = async(search) => {
    //this.setState({ isLoding : true });
    this.setState({ search : search, on_search:1 });
    if(search != ""){
      await axios({
        method: 'post', 
        url: api_url + search_products,
        data:{ search: search, vendor_id : this.state.vendor_id }
      })
      .then(async response => {
        //this.setState({ isLoding : false });
        this.setState({ data : response.data.result, count: response.data.count, on_search:0 });
      })
      .catch(error => {
        //this.setState({ isLoding : false });
          this.setState({ data : [], count: undefined, on_search:0 });
      });
    }else{
      this.setState({ data : [], count: undefined, on_search:0 });
    }
  };

  render() {

    return (
      <Container>
        
        <Content>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
            value={this.state.search}
            inputContainerStyle={styles.ser_style1}
            containerStyle={styles.ser_style2}
          />
          {this.state.on_search == 1 && <ActivityIndicator size="large" color={colors.theme_fg} /> }
          <List>
            {this.state.data.map((item, index) => (
            <ListItem onPress={() => this.move_product_details(item)}>
              <Col>
                <Text style={styles.ser_style3}>{item.product_name}</Text>
                <Text style={styles.ser_style4}>{item.category_name}/{item.sub_category_name}</Text>
              </Col>
            </ListItem> 
            ))}                 
          </List>
          {this.state.count == 0 && <Body style={styles.ser_style5} >
            <Text>{no_data}</Text>
          </Body>}
        </Content>
        <Loader visible={this.state.isLoding} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  ser_style1:{backgroundColor:colors.theme_bg_three},
  ser_style2:{backgroundColor:colors.theme_bg},
  ser_style3:{color:colors.theme_fg,fontFamily:font_title},
  ser_style4:{fontSize:10,fontFamily:font_title},
  ser_style5:{marginTop:height_30},
});
