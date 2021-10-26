import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Keyboard,FlatList } from 'react-native';
import { api_url, get_profile, profile_update, profile_picture, font_description, font_title, get_blood_list, getSizeHeight, getSizeWidth, getFontRatio, Lato_Regular, Lato_Bold } from '../config/Constants';
import { Icon, Button, Thumbnail, Picker } from 'native-base';
import { StatusBar, Loader } from '../components/GeneralComponents';
import * as colors from '../assets/css/Colors';
import axios from 'axios';
import { connect } from 'react-redux';
import { editServiceActionPending, editServiceActionError, editServiceActionSuccess, updateServiceActionPending, updateServiceActionError, updateServiceActionSuccess, updateProfilePicture } from '../actions/ProfileActions';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-community/async-storage';
import { getIconType, Input } from 'react-native-elements';
import Back from '../config/SVG/Back';
import ProfileUser from '../config/SVG/ProfileUser';
import Dob from '../config/SVG/Dob';
import LocationIcon from '../config/SVG/Location';
import Moment from 'moment';
import DateTimePickerComp from '../components/DateTimePickerComp';
const weightdata=["4 ft",
   "4 ft 1 inches/cm",
   "4 ft 2 inches/cm",
   "4 ft 3 inches/cm",
   "4 ft 4 inches/cm",
   "4 ft 5 inches/cm",
   "4 ft 6 inches/cm",
   "4 ft 7 inches/cm",
   "4 ft 8 inches/cm",
   "4 ft 9 inches/cm",
   "4 ft 10 inches/cm",
   "4 ft 11 inches/cm",
   "5 ft",
   "5 ft 1 inches/cm",
   "5 ft 2 inches/cm",
   "5 ft 3 inches/cm",
   "5 ft 4 inches/cm",
   "5 ft 5 inches/cm",
   "5 ft 6 inches/cm",
   "5 ft 7 inches/cm",
   "5 ft 8 inches/cm",
   "5 ft 9 inches/cm",
   "5 ft 10 inches/cm",
   "5 ft 11 inches/cm",
   "6 ft",
   "6 ft  1 inches/cm",
   "6 ft  2 inches/cm",
   "6 ft  3 inches/cm",
   "6 ft  4 inches/cm",
   "6 ft  5 inches/cm",
   "6 ft  6 inches/cm",
   "6 ft  7 inches/cm",
   "6 ft  8 inches/cm",
   "6 ft  9 inches/cm",
   "6 ft  10 inches/cm",
   "6 ft  11 inches/cm",
   "7 ft",
  "7 ft  1 inches/cm",
  "7 ft  2 inches/cm",
   "7 ft  3 inches/cm",
   "7 ft  4 inches/cm",
   "7 ft  5 inches/cm",
   "7 ft  6 inches/cm",
   "7 ft  7 inches/cm",
   "7 ft  8 inches/cm",
   "7 ft  9 inches/cm",
   "7 ft  10 inches/cm",
   "7 ft  11 inches/cm",
   "8 ft",
  "8 ft  1 inches/cm",
  "8 ft  2 inches/cm",
  "8 ft  3 inches/cm",
  "8 ft  4 inches/cm",
  "8 ft  5 inches/cm",
  "8 ft  6 inches/cm",
  "8 ft  7 inches/cm",
  "8 ft  8 inches/cm",
  "8 ft  9 inches/cm",
  "8 ft  10 inches/cm",
  "8 ft  11 inches/cm"]
const options = {
  title: "Select a photo",
  takePhotoButtonTitle: "Take a photo",
  chooseFromLibraryButtonTitle: "Choose from gallery",
};
  const renderItem = ({ item }) => (
    <Item title={item} />
  );
class Profile extends Component<Props> {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      profile_picture: "",
      customer_name: "",
      phone_number: "",
      email: "",
      password: "",
      validation: true,
      data: "",
      blood_group: "",
      blood_group_list: [],
      Gender:'',
      YearofBirth:'',
      Relationship:'',
      Location:'',
      Weight:'',
      height:'',
      FlatListVisible:false,
      isDateTimePickerVisible: false,
      medicalconditionsList: [
        { title: 'Diabetes', isSelected: false },
        { title: 'Hypertension', isSelected: false },
        { title: 'Obesity', isSelected: false },
        { title: 'Thyroid', isSelected: false },
        { title: 'Arthritis', isSelected: false },
        { title: 'Heart Ailments', isSelected: false },

    ],
    Alergies: [
      { title: 'Milk', isSelected: false },
      { title: 'Egg', isSelected: false },
      { title: 'Wheat', isSelected: false },
      { title: 'Medicines', isSelected: false },
     

  ],
  Otherconditions:'',
  medicalconditions:'',
  AlergiesConditioPost:''

    }
    this.get_blood_list();
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
  };

  async componentDidMount() {
    await this.get_profile();
  }

  get_profile = async () => {
    this.props.editServiceActionPending();
    await axios({
      method: "post",
      url: api_url + get_profile,
      data: { customer_id: global.id }
    })
      .then(async (response) => {
        console.log('response===',response.data)
        await this.props.editServiceActionSuccess(response.data);
        await this.setState({
          customer_name: this.props.data.customer_name,
          email: this.props.data.email,
          phone_number: this.props.data.phone_number,
          profile_picture: this.props.profile_picture,
          blood_group: this.props.data.blood_group,
          Gender:this.props.data.gender,
          YearofBirth:this.props.data.dob,
          Relationship:this.props.data.relationship,
          Location:this.props.data.location,
          Weight:this.props.data.weight,
          height:this.props.data.height,
           medicalconditions:this.props.data.medical_condition,
          AlergiesConditioPost:this.props.data.alergies,
          Otherconditions:this.props.data.otherconditions,

        });
      })
      .catch((error) => {
        this.showSnackbar("Sorry something went wrong!");
        this.props.editServiceActionError(error);
      });
  };

  update_profile = async () => {
    Keyboard.dismiss();
    await this.checkValidate();
    if (this.state.validation) {
      this.props.updateServiceActionPending();
      await axios({
        method: "post",
        url: api_url + profile_update,
        data: {
          id: global.id, customer_name: this.state.customer_name, phone_number: this.state.phone_number,
          email: this.state.email, password: this.state.password, blood_group: this.state.blood_group,
          gender:this.state.Gender,
          dob:this.state.YearofBirth,
          relationship:this.state.Relationship,
          location:this.state.Location,
          Weight:this.state.Weight,
          height:this.state.height,
          alergies:this.state.AlergiesConditioPost,
          medical_condition:this.state.medicalconditions,
          otherconditions:this.state.Otherconditions
        },

        })
        .then(async (response) => {
          alert("Successfully updated");
          await this.props.updateServiceActionSuccess(response.data);
          await this.saveData();
        })
        .catch((error) => {
          alert(error);
          this.props.updateServiceActionError(error);
        });
    }
  };

  saveData = async () => {
    if (this.props.status == 1) {
      try {
        await AsyncStorage.setItem("user_id", this.props.data.id.toString());
        await AsyncStorage.setItem(
          "customer_name",
          this.props.data.customer_name.toString()
        );
        global.id = await this.props.data.id;
        global.customer_name = await this.props.data.customer_name;
        await this.showSnackbar("Profile updated Successfully");
        await this.setState({ password: "" });
      } catch (e) { }
    } else {
      alert(this.props.message);
    }
  };

  checkValidate() {
    if (
      this.state.email == "" ||
      this.state.phone_number == "" ||
      this.state.blood_group == "" ||
      this.state.customer_name == ""
    ) {
      this.state.validation = false;
      this.showSnackbar("Please fill all the fields.");
      return true;
    }
  }

  select_photo() {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        const source = { uri: response.uri };
        this.setState({
          data: response.data,
        });
        this.props.updateProfilePicture(source);
        this.profileimageupdate();
      }
    });
  }

  profileimageupdate = async () => {
console.log("global.id.toString()",global.id.toString(),)

    RNFetchBlob.fetch(
      "POST",
      api_url + profile_picture,
      {
        "Content-Type": "multipart/form-data",
      },
      [
        {
          name: "profile_picture",
          filename: "image.png",
          type: "image/png",
          data: this.state.data,
        },
        {
          name: "customer_id",
          data: global.id.toString(),
        },
      ]
    )
      .then((resp) => {
        console.log("resp",resp)
        this.showSnackbar("Profile Picture Updated Successfully");
      })
      .catch((err) => {
        this.showSnackbar("Error on while uploading,Try again");
      });
  };

  get_blood_list = async () => {
    await axios({
      method: "get",
      url: api_url + get_blood_list
    })
      .then(async (response) => {
        this.setState({ blood_group_list: response.data.result });
      })
      .catch((error) => {
        alert('Sorry, something went wrong!')
      });
  }

  select_blood_group = (value) => {
    this.setState({ blood_group: value });
  }

  showSnackbar(msg) {
    Snackbar.show({
      title: msg,
      duration: Snackbar.LENGTH_SHORT,
    });
  }

  render() {
    const {
      isLoding, profile_picture } = this.props;
    // console.log("profile_picture",profile_picture.uri)
    let bl_list = this.state.blood_group_list.map((s, i) => {
      return <Picker.Item key={i} value={s.blood_group} label={s.blood_group} />
    });

    return (
      <View style={{ backgroundColor: '#E5E5E5' }}>
        <View>
          <StatusBar />
        </View>
        <Loader visible={isLoding} />
        <DateTimePickerComp
            mode="date"
            isDateTimePickerVisible={this.state.isDateTimePickerVisible}
            handleDatePicked={this.handleDatePicked}
            hideDateTimePicker={this.hideDateTimePicker}
          />
        <View>
          <View style={styles.pro_style1}>
            <TouchableOpacity style={styles.pro_style2} onPress={this.handleBackButtonClick} activeOpacity={1} >
              <Back></Back>
            </TouchableOpacity>
            <View style={styles.pro_style4} />
            <View >
              <Text style={styles.pro_style5}>My Profile</Text></View>
            <View style={{ position: 'absolute', right: getSizeWidth(12) }}>
              <Text style={styles.pro_style5Edit}>EDIT</Text></View>

          </View>
        </View>


        <ScrollView keyboardShouldPersistTaps="always">
          <View style={styles.pro_style6}>
            <View style={styles.pro_style7} />
            <View style={styles.pro_style8}>
              <TouchableOpacity onPress={this.select_photo.bind(this)}>
            <Thumbnail large source={profile_picture} />
          
              </TouchableOpacity>
            </View>
            <View style={styles.pro_style9} />

            <View style={styles.pro_style10}>
              <Input
                inputContainerStyle={{ height: getSizeHeight(30), borderBottomWidth: 1, borderBottomColor: '#A8A8A8' }}
                inputStyle={styles.pro_style11}
                label="Name"
                labelStyle={styles.pro_style12}
                placeholder="john"
                value={this.state.customer_name}
                onChangeText={TextInputValue =>
                  this.setState({ customer_name: TextInputValue })}

              />
            </View>
            <View style={{ marginTop:getSizeHeight(-5), marginHorizontal:getSizeHeight(10), width: '95%', flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={styles.pro_style14}>
                <Input
                  inputContainerStyle={{ height: getSizeHeight(30), borderBottomWidth: 1, borderBottomColor: '#A8A8A8' }}
                  inputStyle={styles.pro_style11}
                  label="Phone Number"
                  labelStyle={styles.pro_style12}
                  placeholder='+91xxxxxxxxxx'
                  keyboardType="phone-pad"
                  value={this.state.phone_number}
                  onChangeText={(TextInputValue) =>
                    this.setState({ phone_number: TextInputValue })}
               
                />
              </View>

              <View style={styles.pro_style14}>
                <Input
                  inputContainerStyle={{ height: getSizeHeight(30), borderBottomWidth: 1, borderBottomColor: '#A8A8A8' }}
                  inputStyle={styles.pro_style11}
                  label="Gender"
                  labelStyle={styles.pro_style12}
                  placeholder="Male"
                  value={this.state.Gender}
                  onChangeText={TextInputValue =>
                    this.setState({ Gender: TextInputValue })}

                />
              </View>


            </View>

            <View style={{ marginTop:getSizeHeight(-5), marginHorizontal:getSizeHeight(10), width: '95%', flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={styles.pro_style14}>
                <Input
                  inputContainerStyle={{ height: getSizeHeight(30), borderBottomWidth: 1, borderBottomColor: '#A8A8A8' }}
                  inputStyle={styles.pro_style11}
                 
                  labelStyle={styles.pro_style12}
                  label="Email"
                  
                  placeholder="abcd@gmail.com"
                  keyboardType="email-address"
                  value={this.state.email}
                  onChangeText={(TextInputValue) =>
                    this.setState({ email: TextInputValue })
                  }
               
                />
              </View>
            <TouchableOpacity   onPress={() => this.setState({ isDateTimePickerVisible: true })} style={styles.pro_style14}>             
                <Input
                   editable={false}
                  inputContainerStyle={{ height: getSizeHeight(30), borderBottomWidth: 1, borderBottomColor: '#A8A8A8' }}
                  inputStyle={styles.pro_style11}
                  label="Year of Birth"
                  labelStyle={styles.pro_style12}
                  placeholder="1988"
                  value={this.state.YearofBirth}
                

                  onChangeText={TextInputValue =>
                    this.setState({ YearofBirth: TextInputValue })}
                    rightIcon={
                      <Dob></Dob>
                    
                    }

                />
              </TouchableOpacity>

            </View>

            <View style={{ marginTop:getSizeHeight(-5), marginHorizontal:getSizeHeight(10), width: '95%', flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={styles.pro_style14}>
                <Input
                  inputContainerStyle={{ height: getSizeHeight(30), borderBottomWidth: 1, borderBottomColor: '#A8A8A8' }}
                  inputStyle={styles.pro_style11} 
                  labelStyle={styles.pro_style12}
                  label="Relationship"
                  placeholder="Single"
                  value={this.state.Relationship}
                  onChangeText={(TextInputValue) =>
                    this.setState({ Relationship: TextInputValue })
                  }
               
                />
              </View>

              <View style={styles.pro_style14}>
                <Input
                  inputContainerStyle={{ height: getSizeHeight(30), borderBottomWidth: 1, borderBottomColor: '#A8A8A8' }}
                  inputStyle={styles.pro_style11}
                  label="Location"
                  labelStyle={styles.pro_style12}
                  placeholder="Banglore"
                  value={this.state.Location}
                  onChangeText={TextInputValue =>
                    this.setState({ Location: TextInputValue })}
                    rightIcon={
                      <LocationIcon></LocationIcon>
                    
                    }

                />
              </View>

            </View>

            <View style={{ marginTop:getSizeHeight(-5), marginHorizontal:getSizeHeight(10), width: '95%', flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={styles.pro_style14}>
                <Input
                  inputContainerStyle={{ height: getSizeHeight(30), borderBottomWidth: 1, borderBottomColor: '#A8A8A8' }}
                  inputStyle={styles.pro_style11}
                  labelStyle={styles.pro_style12}
                  label="Weight"
                  placeholder="68 kgs"
                  value={this.state.Weight}
                  keyboardType="number-pad"
                  onChangeText={(TextInputValue) =>
                    this.setState({ Weight: TextInputValue })
                  }
               
                />
              </View>

              <TouchableOpacity onPress={()=> this.setState({FlatListVisible:true})} style={styles.pro_style14}>
                <Input
                editable={false}
                  inputContainerStyle={{ height: getSizeHeight(30), borderBottomWidth: 1, borderBottomColor: '#A8A8A8' }}
                  inputStyle={styles.pro_style11}
                  label="Height"
                  labelStyle={styles.pro_style12}
                  placeholder="5 ft 2 inches/cm"
                  value={this.state.height}
                  onChangeText={TextInputValue =>
                    this.setState({ height: TextInputValue })}
                    // rightIcon={
                    //   <LocationIcon></LocationIcon>
                    
                    // }

                />
              </TouchableOpacity>

            </View>
            {this.state.FlatListVisible===true&&  <View style={{height:'48%', width:'60%', position:'absolute',top:'25%',backgroundColor:'#ffffff' ,borderWidth:0.5,borderColor:'#A8A8A8'}}>
           <FlatList
            data={weightdata}
            keyExtractor={index => index.toString()}
            renderItem={item => this.listItem(item.item)}
          /></View>}
            
            {/* <View style={styles.pro_style22}>
              <Input
                inputStyle={styles.pro_style23}
                placeholder="**********"
                label="Password"
                labelStyle={styles.pro_style24}
                leftIcon={
                  <Icon
                    name='key'
                    size={20}
                    color='black'
                    style={styles.pro_style25}
                  />
                }
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={ TextInputValue =>
                  this.setState({password : TextInputValue }) }
              />
            </View> */}
            <View style={styles.pro_style26}>
            <Text style={styles.pro_style33}>{"Existing Medical Conditions"}</Text>
                            <View style={{marginBottom:getSizeHeight(15), flexDirection: 'row', flexWrap: 'wrap', marginTop: getSizeHeight(10), marginRight: getSizeWidth(30), marginTop: '10%' }}>

                                {this.state.medicalconditionsList.map((item, index) => {
                                    return (
                                        <TouchableOpacity style={[styles.itemAgeGender, item.isSelected && styles.selectedItemAgeGender]}
                                            onPress={() => this.selectAgeGender(index, 'gender')}>
                                            <Text style={[styles.textItemAgeGender, item.isSelected && styles.textSelectedItemAgeGender]}>
                                                {item.title}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                                )}
                            </View>
             
            </View>

            <View style={styles.pro_style26}>
            <Text style={styles.pro_style33}>{"Existing Medical Conditions"}</Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: getSizeHeight(10), marginRight: getSizeWidth(30), marginTop: '10%' }}>

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
                            </View>
             
            </View>

            <View style={[styles.pro_style10,{marginTop:'5%'}]}>
              <Input
                inputContainerStyle={{ height: getSizeHeight(35), borderBottomWidth: 1, borderBottomColor: '#A8A8A8' }}
                inputStyle={styles.pro_style11}
                label="Other medical conditions to share with the doctors"
                labelStyle={[styles.pro_style12,{marginBottom:5}]}
                placeholder="Write description here as notes with word limit"
                value={this.state.Otherconditions}
                onChangeText={TextInputValue =>
                  this.setState({ Otherconditions: TextInputValue })}

              />
            </View>
             
            <View style={styles.pro_style29} />
            <View style={styles.pro_style30}>
              <Button
                block
                style={styles.pro_style31}
                onPress={this.update_profile}
              >
                <Text style={styles.pro_style32}>UPDATE</Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };
  handleDatePicked = date => {

    this.hideDateTimePicker();
    this.setState({
      YearofBirth: Moment(date).format('yyyy-MM-DD')

    })

  };

  listItem = item => {
    // console.log('item:',item)
    return (
      <TouchableOpacity 
      onPress={()=> this.setselectedvalue(item)}      >
        <View
        style={{width:'100%', justifyContent:'center',alignItems:'center', height:getSizeHeight(40),borderBottomWidth: 1, borderBottomColor: '#A8A8A8',}}
          >
          <Text
          style={{fontFamily:Lato_Regular,fontSize:12,color: '#2D3E4D'}}
            >
            {item}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  setselectedvalue(item){
    this.setState({FlatListVisible:false,height:item})
  }
  selectAgeGender = (index, type) => {
    var arr = [...this.state.medicalconditionsList]
    // const updatedArr = arr.map((el) => {
    //     el.isSelected = false
    //     return el
    // })
    arr[index].isSelected = true

    this.setState({
        medicalconditionsList: arr,medicalconditionsSelect:arr[index].title
    })

}
Alergies = (index, type) => {
  var arr = [...this.state.Alergies]
  // const updatedArr = arr.map((el) => {
  //     el.isSelected = false
  //     return el
  // })
  arr[index].isSelected = true

  this.setState({
    Alergies: arr,medicalconditionsSelect:arr[index].title
  })

}
}

function mapStateToProps(state) {
  return {
    isLoding: state.profile.isLoding,
    message: state.profile.message,
    status: state.profile.status,
    data: state.profile.data,
    profile_picture: state.profile.profile_picture,
  };
}

const mapDispatchToProps = (dispatch) => ({
  editServiceActionPending: () => dispatch(editServiceActionPending()),
  editServiceActionError: (error) => dispatch(editServiceActionError(error)),
  editServiceActionSuccess: (data) => dispatch(editServiceActionSuccess(data)),
  updateServiceActionPending: () => dispatch(updateServiceActionPending()),
  updateServiceActionError: (error) =>
    dispatch(updateServiceActionError(error)),
  updateServiceActionSuccess: (data) =>
    dispatch(updateServiceActionSuccess(data)),
  updateProfilePicture: (data) => dispatch(updateProfilePicture(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
  pro_style1: { marginTop: getSizeHeight(8), height: getSizeHeight(60), flexDirection: 'row', alignItems: 'center', marginHorizontal: getSizeWidth(12) },
  pro_style2: { height: getSizeHeight(60), paddingLeft: getSizeWidth(8), width: getSizeWidth(40), justifyContent: 'center' },
  pro_style3: { color: colors.theme_fg_two, fontSize: 30 },
  pro_style4: { flexDirection: 'row', },
  pro_style5: { fontSize: getFontRatio(20), color: colors.theme_new_text, fontFamily: Lato_Regular },
  pro_style5Edit: { fontSize: getFontRatio(12), color: colors.theme_bg_dark, fontFamily: Lato_Regular, lineHeight: 14.4 },

  pro_style6: { height: "90%", justifyContent: "center", alignItems: "center" },
  pro_style7: { marginTop: "20%" },
  pro_style8: { alignSelf: "center", borderColor: colors.theme_bg, borderWidth: 2, borderRadius: 45 },
  pro_style9: { marginTop: getSizeHeight(40) },
  pro_style10: { width: '95%', marginHorizontal: getSizeWidth(16), alignSelf: "center" },
  pro_style11: { fontSize: getSizeWidth(14), fontFamily: Lato_Regular, color: '#2D3E4D', marginBottom: getSizeHeight(-4) },
  pro_style12: { fontFamily: Lato_Regular, fontSize: getFontRatio(12), marginBottom: getSizeHeight(-1), marginLeft: getSizeWidth(5) },
  pro_style13: { color: colors.theme_bg },
  pro_style14: { width: "50%", alignSelf: "center" },
  pro_style15: { fontSize: 14, fontFamily: font_description },
  pro_style16: { fontFamily: font_title },
  pro_style17: { color: colors.theme_bg },
  pro_style18: { width: "80%", alignSelf: "center" },
  pro_style19: { fontSize: 14, fontFamily: font_description },
  pro_style20: { fontFamily: font_title },
  pro_style21: { color: colors.theme_bg },
  pro_style22: { width: "80%", alignSelf: "center" },
  pro_style23: { fontSize: 14, fontFamily: font_description },
  pro_style24: { fontFamily: font_title },
  pro_style25: { color: colors.theme_bg },
  pro_style26: { width: "90%", alignSelf: "center" },
  pro_style27: { color: 'grey', fontWeight: 'bold', fontSize: 15, marginLeft: '3%', fontFamily: font_description },
  pro_style28: { height: 50, width: '100%' },
  pro_style29: { marginTop: "15%" },
  pro_style30: { width: "80%", alignSelf: "center",marginBottom:getSizeHeight(100) },
  pro_style31: { backgroundColor: colors.theme_bg, borderRadius: 5, height: 40, fontFamily: font_title },
  pro_style32: { color: colors.theme_fg_three, fontFamily: font_title, letterSpacing: 0.5 },
  pro_style33: {  fontSize: getSizeWidth(14), fontFamily: Lato_Bold, color: '#2D3E4D', marginBottom: getSizeHeight(-10) },
  itemAgeGender: {
    marginRight: getSizeWidth(12),
    borderRadius: getSizeWidth(8),
    backgroundColor: '#FEF2EF',
    flexDirection: 'row',
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
    marginVertical: getSizeHeight(15),
    fontFamily: Lato_Regular,
    textAlign: 'center',
    marginHorizontal:getSizeWidth(25),
    fontSize: getFontRatio(14),
    color: '#787878'
},
textSelectedItemAgeGender: {
    color: colors.theme_bg_three
},
});
