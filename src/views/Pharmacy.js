import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, ImageBackground, StatusBar, FlatList, } from 'react-native';
import { Loader } from '../components/GeneralComponents';
import { img_url, api_url, vendor_list, home_banners, font_title, font_description, no_data_lottie, getSizeHeight, getSizeWidth, getFontRatio, Lato_Regular, Lato_Bold, screenWidth } from '../config/Constants';
import * as colors from '../assets/css/Colors';
import axios from 'axios';
import { connect } from 'react-redux';
import { serviceActionPending, serviceActionError, serviceActionSuccess } from '../actions/HomeActions';
import { productListReset } from '../actions/ProductActions';
import { Icon, Divider, SearchBar } from 'react-native-elements';
import { Container, Content, Row, Col } from 'native-base';
import LottieView from 'lottie-react-native';
import YoutubePlayer from "react-native-youtube-iframe";

class Pharmacy extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      result: [],
      address: "Please choose address",
      last_active_address: 0,
      banners: [],
      search: '',
      isLoding: false,
      api_status: 0,
      vendor_list: [],
      Alergies: [
        { title: 'All', isSelected: true },
        { title: 'Diabetes', isSelected: false },
        { title: 'Weightloss', isSelected: false },
        { title: 'Diet', isSelected: false },
        { title: 'Physiotherapy', isSelected: false },
        { title: 'Blogs', isSelected: false },
        { title: 'Videos', isSelected: false },


      ]
    };
    this.get_banners();
  }

  componentWillMount() { }

  setMenuRef = (ref) => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  open_filter = () => {
    this.RBSheet.open();
  };


  get_banners = async () => {
    this.setState({ isLoding: true });
    await axios({
      method: "get",
      url: api_url + home_banners
    })
      .then(async (response) => {
        this.setState({ isLoding: false });
        this.setState({ banners: response.data.result });
      })
      .catch((error) => {
        this.setState({ isLoding: false });
        alert("Something went wrong");
      });
  }

  updateSearch = async (search) => {
    await this.setState({ search: search });
    await this.get_vendor();
  };

  get_vendor = async () => {
    //this.setState({ isLoding : true });
    //this.props.serviceActionPending();
    await axios({
      method: "post",
      url: api_url + vendor_list,
      data: { customer_id: global.id, search: this.state.search }
    })
      .then(async (response) => {
        //alert(JSON.stringify(response));
        this.setState({ vendor_list: response.data.result, api_status: 1 });
        await this.props.serviceActionSuccess(response.data);
        if (response.data.last_active_address) {
          this.setState({ last_active_address: response.data.last_active_address, address: response.data.address.address });
        }
      })
      .catch((error) => {
        //this.setState({ isLoding : false });
        this.props.serviceActionError(error);
        alert('Sorry something went wrong');
      });
  };

  async componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.get_vendor();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  move_to_category = async (data) => {
    if (data.online_status == 1) {
      await this.props.navigation.navigate("Category", { vendor: data });
    }
  };

  select_address = () => {
    this.props.navigation.navigate("AddressList", { from: 'home' });
  }

  move_to_vendor_detail = async (id) => {
    await this.props.navigation.navigate("VendorDetails", { id: id });
  };

  render() {
    const { isLoding, data } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff', alignItems:'center' }}>
        <StatusBar backgroundColor='#FAFAFA' barStyle='dark-content' />


        
        <SearchBar
          placeholder="Discover"
          onChangeText={this.updateSearch}
          value={this.state.search}
          platform="ios"
          inputStyle={{ fontFamily: Lato_Bold, fontSize: getFontRatio(20), color: '#1D5471' }}
          inputContainerStyle={styles.ph_style5}
          containerStyle={styles.ph_style6}
        />

        {/* <ScrollView horizontal={true}>

          <View style={{ height:getSizeHeight(40), marginHorizontal: getSizeWidth(12), marginBottom: getSizeHeight(15), flexDirection: 'row', flexWrap: 'wrap', marginTop: getSizeHeight(10), }}>

            {this.state.Alergies.map((item, index) => {
              return (
                <TouchableOpacity style={[styles.itemAgeGender, item.isSelected && styles.selectedItemAgeGender]}
                  onPress={() => this.Alergies(index, 'gender')}>
                  <Text style={[styles.textItemAgeGender, item.isSelected && styles.textSelectedItemAgeGender]}>
                    {item.title}</Text>
                </TouchableOpacity>
              )
            }
            )}
          </View></ScrollView> */}

          {/* <FlatList
            data={['c9vSR-hnPd0', 'Bsl-YqTk-ws', 'N7NhlxNuRd8']}
            renderItem={item => this.renderPhoto(item)}

          /> */}


<View style={{height:getSizeHeight(5)}}></View>
        
        <Loader visible={isLoding} />
        <Loader visible={this.state.isLoding} />
      </View>
    );
  }
  Alergies = (index, type) => {
    var arr = [...this.state.Alergies]
    const updatedArr = arr.map((el) => {
        el.isSelected = false
        return el
    })
    updatedArr[index].isSelected = true

    this.setState({
      Alergies: updatedArr, medicalconditionsSelect: updatedArr[index].title
    })

  }

  renderPhoto = ({ item, index }) => {
    return (
      <View style={{ marginBottom: getSizeHeight(12), padding: getSizeWidth(5), paddingBottom: 10, width: screenWidth - getSizeWidth(32), height: getSizeHeight(220), }}>
        <YoutubePlayer
          height={getSizeHeight(220)}
          play={this.state.playing}
          videoId={item}
        // onChangeState={onStateChange}
        />
        {/* <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: getSizeHeight(10) }}>
          <ListImages></ListImages>
        </View> */}
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    isLoding: state.home.isLoding,
    error: state.home.error,
    data: state.home.data,
    message: state.home.message,
    status: state.home.status,
  };
}

const mapDispatchToProps = (dispatch) => ({
  serviceActionPending: () => dispatch(serviceActionPending()),
  serviceActionError: (error) => dispatch(serviceActionError(error)),
  serviceActionSuccess: (data) => dispatch(serviceActionSuccess(data)),
  productListReset: () => dispatch(productListReset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pharmacy);

const styles = StyleSheet.create({
  ph_style1: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: colors.theme_fg,
    alignItems: 'center',
  },
  ph_style2: { color: colors.theme_fg },
  ph_style3: { margin: 5 },
  ph_style4: { width: '80%', fontFamily: font_description },
  ph_style5: { backgroundColor: '#FAFAFA' },
  ph_style6: { backgroundColor: '#FAFAFA', height: getSizeHeight(60), marginTop: getSizeHeight(1) },
  ph_style7: { paddingLeft: 10, paddingRight: 10, paddingTop: 10, flexDirection: 'row' },
  ph_style8: { borderRadius: 10 },
  ph_style9: { height: 140, width: 260, borderRadius: 10, marginRight: 10 },
  ph_style10: { padding: 10 },
  ph_style11: { margin: 5 },
  ph_style12: { alignSelf: 'center', height: 220, width: 335, borderRadius: 10 },
  ph_style13: { margin: 5 },
  ph_style14: { alignItems: 'center' },
  ph_style15: { color: colors.theme_fg, fontSize: 16, fontFamily: font_title },
  ph_style16: { fontSize: 11, color: 'grey', fontFamily: font_description },
  ph_style17: { margin: 5 },
  ph_style18: { width: "15%" },
  ph_style19: { flexDirection: 'row' },
  ph_style20: { marginRight: 5 },
  ph_style21: { fontFamily: font_description },
  ph_style22: { alignSelf: 'center' },
  ph_style23: { fontSize: 12, color: '#C4C3C3', fontFamily: font_description },
  ph_style24: { alignSelf: 'center', width: '15%' },
  ph_style25: {
    fontSize: 10,
    color: colors.theme_bg_three,
    backgroundColor: colors.green,
    padding: 2,
    paddingLeft: 5,
    borderRadius: 10,
    width: 50,
    textAlign: 'center',
    fontFamily: font_description,
  },
  ph_style26: {
    fontSize: 10,
    color: colors.theme_bg_three,
    backgroundColor: colors.red,
    padding: 2,
    paddingLeft: 5,
    borderRadius: 10,
    width: 50,
    textAlign: 'center',
    fontFamily: font_description,
  },
  ph_style27: { margin: 10 },
  ph_style28: { backgroundColor: colors.theme_fg },
  ph_style29: { height: 250, marginTop: '20%' },
  itemAgeGender: {
    marginRight: getSizeWidth(12),
    borderRadius: getSizeWidth(12),
    backgroundColor: '#FCD9D1',
    flexDirection: 'row',
    borderColor: colors.light_grey,
    borderWidth: getSizeWidth(0.5),
    marginBottom: getSizeHeight(15),
  },

  selectedItemAgeGender: {
    backgroundColor: colors.theme_bg_dark,
    shadowColor: '#1658D3',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 1,
  },
  textItemAgeGender: {
    marginVertical: getSizeHeight(12),
    fontFamily: Lato_Regular,
    textAlign: 'center',
    marginHorizontal: getSizeWidth(25),
    fontSize: getFontRatio(14),
    color: '#1D5471'
  },
  textSelectedItemAgeGender: {
    color: colors.theme_bg_three
  },
});
