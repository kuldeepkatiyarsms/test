import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Keyboard, FlatList,Modal } from 'react-native';
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
import { CommonActions } from '@react-navigation/native';
import LoadCircle from '../config/SVG/LoadCircle';

const weightdata = ["4 ft",
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
class OptionalPage extends Component<Props> {
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
            Gender_list: [{ 'Gender': 'Male' }, { 'Gender': 'Female' }, { 'Gender': 'Non-binary' }, { 'Gender': 'Prefer not to share' }],
            Gender: '',
            YearofBirth: '',
            Relationship: '',
            Location: '',
            Weight: '',
            height: '',
            medicalconditionsSelect:'',
            FlatListVisible: false,
            isDateTimePickerVisible: false,

            medicalconditions: [
                { title: 'Diabetes', isSelected: false },
                { title: 'Hypertension', isSelected: false },
                { title: 'Obesity', isSelected: false },
                { title: 'Thyroid', isSelected: false },
                { title: 'Arthritis', isSelected: false },
                { title: 'Heart Ailments', isSelected: false },

            ],
            modalVisible: false


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
                console.log('response===', response.data)
                await this.props.editServiceActionSuccess(response.data);
                await this.setState({
                    customer_name: this.props.data.customer_name,
                    email: this.props.data.email,
                    phone_number: this.props.data.phone_number,
                    profile_picture: this.props.profile_picture,
                    blood_group: this.props.data.blood_group,
                    Gender: this.props.data.gender,
                    YearofBirth: this.props.data.dob,
                    Relationship: this.props.data.relationship,
                    Location: this.props.data.location,
                    Weight: this.props.data.weight,
                    height: this.props.data.height,
                    

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
                    gender: this.state.Gender,
                    dob: this.state.YearofBirth,
                    relationship: this.state.Relationship,
                    location: this.state.Location,
                    Weight: this.state.Weight,
                    height: this.state.height,
                    medical_condition:this.state.medicalconditionsSelect

                },

            })
                .then(async (response) => {
                    // alert("Successfully updated");


                    if(response.data.message==="Success")
                    {
                      this.setState({modalVisible:true})
                      setTimeout(async () => {
                        this.setState({modalVisible:false})
                        
                      }, 3000);
          
                      setTimeout(async () => {
                        this.setState({modalVisible:false})
                        await this.props.updateServiceActionSuccess(response.data);
                        await this.saveData();
                      }, 2500);
          
                     
                     
                    }else
                    {
                        await this.props.updateServiceActionSuccess(response.data);
                        await this.saveData();
                    }

                    
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
                await this.home();
            } catch (e) { }
        } else {
            alert(this.props.message);
        }
    };

    checkValidate() {
        if (
        
            this.state.blood_group == "" ||
            this.state.Weight == ""||
            this.state.medicalconditionsSelect == ""
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
        console.log("global.id.toString()", global.id.toString(),)

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
                console.log("resp", resp)
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
    select_Gender = (value) => {
        this.setState({ Gender: value });
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

        let Gender_list = this.state.Gender_list.map((s, i) => {
            return <Picker.Item key={i} value={s.Gender} label={s.Gender} />
        });

        return (
            <View style={{ backgroundColor: '#F2F2F2' }}>
                <View>
                    <StatusBar />
                </View>
                <Loader visible={isLoding} />
                <Modal
                animationType="slide"
                visible={this.state.modalVisible}
                onRequestClose={() => {
                 Alert.alert("Modal has been closed.");
                this.setModalVisible(!this.state.modalVisible);
                 }}
        >

        <View style={styles.modalstyle}>
          <View style={{marginTop:getSizeHeight(138),justifyContent:'center',alignItems:'center'}}>
          <LoadCircle></LoadCircle>
          </View>
          <View style={{marginTop:getSizeHeight(100),alignItems:'center'}}>
          <Text style={[{textAlign:'center',  fontSize: getFontRatio(26),  fontFamily: Lato_Regular,color:colors.theme_bg_three  }]}>{'We’re personalising HP to bring you the best experience'}</Text>

          </View>
        </View>

        </Modal>
                <DateTimePickerComp
                    mode="date"
                    isDateTimePickerVisible={this.state.isDateTimePickerVisible}
                    handleDatePicked={this.handleDatePicked}
                    hideDateTimePicker={this.hideDateTimePicker}
                />
                <View>
                    <View style={styles.reg_style1}>
                        <TouchableOpacity style={styles.reg_style2} onPress={this.handleBackButtonClick} activeOpacity={1} >
                            <Icon onPress={this.handleBackButtonClick} style={styles.reg_style3} name='arrow-back' />
                        </TouchableOpacity>
                        <Text style={styles.pro_style5}>Health Details</Text>

                    </View>
                </View>





                <ScrollView keyboardShouldPersistTaps="always">
                    <View style={styles.pro_style6}>
                        <View style={styles.pro_style7} />



                        <View style={styles.pro_style26}>
                            <Text style={styles.pro_style33}>{"Gender"}</Text>
                            <Picker
                                selectedValue={this.state.Gender}
                                style={styles.pro_style28}
                                itemStyle={{fontSize:1}}
                                onValueChange={(itemValue, itemIndex) => this.select_Gender(itemValue)}
                                placeholderIconColor={'#E2E2E2'}

                            >
                                {Gender_list}
                            </Picker>
                            <View style={{ marginTop: -10, borderBottomWidth: 0.5, borderBottomColor: '#A8A8A8', width: '99%' }}>
                            </View>
                        </View>

                        <View style={styles.pro_style10}>
                            <Input
                                inputContainerStyle={{ height: getSizeHeight(30), borderBottomWidth: 1, borderBottomColor: '#A8A8A8' }}
                                inputStyle={styles.pro_style11}
                                labelStyle={styles.pro_style12}
                                label="Weight"
                                placeholder="68 Kg"
                                keyboardType="number-pad"
                                value={this.state.Weight}
                                onChangeText={(TextInputValue) =>
                                    this.setState({ Weight: TextInputValue })
                                }

                            />
                        </View>


                        <View style={styles.pro_style26}>
                            <Text style={styles.pro_style33}>{"Blood Group"}</Text>
                            <Picker
                                selectedValue={this.state.blood_group}
                                style={styles.pro_style28}
                                onValueChange={(itemValue, itemIndex) => this.select_blood_group(itemValue)}
                                placeholderIconColor={'#E2E2E2'}

                            >
                                {bl_list}
                            </Picker>
                            <View style={{ marginTop: -10, borderBottomWidth: 0.5, borderBottomColor: '#A8A8A8', width: '99%' }}>
                            </View>
                        </View>

                        <View style={styles.pro_style34}>
                            <Text style={styles.pro_style33}>{"Any existing medical conditions"}</Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: getSizeHeight(10), marginRight: getSizeWidth(30), marginTop: '10%' }}>

                                {this.state.medicalconditions.map((item, index) => {
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


                        <View style={styles.pro_style29} />
                        <View style={styles.pro_style30}>
                            <Button
                                block
                                style={styles.pro_style31}
                                onPress={this.update_profile}
                            >
                                <Text style={styles.pro_style32}>SUBMIT</Text>
                            </Button>
                        </View>
                   <TouchableOpacity onPress={()=>this.home()}>
                        <Text style={styles.pro_style35}>SKIP</Text></TouchableOpacity>

                    </View>
                </ScrollView>
            </View>
        );
    }





    selectAgeGender = (index, type) => {
        var arr = [...this.state.medicalconditions]
        // const updatedArr = arr.map((el) => {
        //     el.isSelected = false
        //     return el
        // })
        if(arr[index].isSelected === true)
        {
            arr[index].isSelected = false
        }else{
            arr[index].isSelected = true
        }
        

        this.setState({
            medicalconditions: arr,medicalconditionsSelect:arr[index].title
        })

    }

    home = () => {
        this.props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Home" }],
          })
        );
      };
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

export default connect(mapStateToProps, mapDispatchToProps)(OptionalPage);

const styles = StyleSheet.create({
    pro_style1: { marginTop: getSizeHeight(8), height: getSizeHeight(60), flexDirection: 'row', alignItems: 'center', marginHorizontal: getSizeWidth(12) },
    pro_style2: { height: getSizeHeight(60), paddingLeft: getSizeWidth(8), width: getSizeWidth(40), justifyContent: 'center' },
    pro_style3: { color: colors.theme_fg_two, fontSize: 30 },
    pro_style4: { flexDirection: 'row', },
    pro_style5: { marginLeft: 10, marginTop: getSizeHeight(10), fontSize: getFontRatio(20), color: '#1D5471', fontFamily: Lato_Bold, },
    pro_style5Edit: { fontSize: getFontRatio(12), color: colors.theme_bg_dark, fontFamily: Lato_Regular, lineHeight: 14.4 },

    pro_style6: { marginTop: getSizeHeight(12), height: "80%", justifyContent: "center", alignItems: "center" },
    pro_style7: { marginTop: "28%" },
    pro_style8: { alignSelf: "center", borderColor: colors.theme_bg, borderWidth: 2, borderRadius: 45 },
    pro_style9: { marginTop: getSizeHeight(40) },
    pro_style10: { width: '95%', marginHorizontal: getSizeWidth(16), alignSelf: "center", marginTop: getSizeHeight(20) },
    pro_style11: { fontSize: getSizeWidth(14), fontFamily: Lato_Regular, color: '#2D3E4D', marginBottom: getSizeHeight(-4) },
    pro_style12: { color: '#1D5471', fontFamily: Lato_Regular, fontSize: getFontRatio(12), marginBottom: getSizeHeight(-1), marginLeft: getSizeWidth(5) },
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
    pro_style26: { width: "90%", },
    pro_style27: { color: 'grey', fontWeight: 'bold', fontSize: 15, marginLeft: '3%', fontFamily: font_description },
    pro_style28: { height: 50, width: '100%' },
    pro_style29: { marginTop: "6%" },
    pro_style30: { width: "80%", alignSelf: "center" },
    pro_style31: { backgroundColor: colors.theme_bg, borderRadius: 5, height: 40, fontFamily: font_title },
    pro_style32: { color: colors.theme_fg_three, fontFamily: Lato_Bold, letterSpacing: 0.5 },
    reg_style1: { alignItems: 'flex-start', margin: 10 },
    reg_style2: { width: 100, justifyContent: 'center' },
    pro_style33: { marginLeft: 5, fontSize: getSizeWidth(13), fontFamily: Lato_Bold, color: '#1D5471', marginBottom: getSizeHeight(-10) },

    pro_style34: { width: '90%', marginTop: getSizeHeight(30) },
    pro_style35: { marginTop:'8%', color: '#2D3E4D', fontFamily: Lato_Bold, letterSpacing: 0.5 },

    itemAgeGender: {
        marginRight: getSizeWidth(12),
        borderRadius: getSizeWidth(1),

        backgroundColor: '#F8F8F8',
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
        width: getSizeWidth(130),
        fontSize: getFontRatio(14),
        color: '#787878'
    },
    textSelectedItemAgeGender: {
        color: colors.theme_bg_three
    },
    modalstyle:{width:'100%',height:'100%', backgroundColor:colors.theme_bg_dark},

});
