import { Dimensions, Platform, PixelRatio,PermissionsAndroid } from 'react-native';
import {GoogleSignin, GoogleSigninButton, statusCodes} from '@react-native-community/google-signin';
import { AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

// export const base_url = "http://mrpharman.demoproducts.in/";
// export const api_url = "http://mrpharman.demoproducts.in/api/";
export const settings = "app_setting";
// export const img_url = "http://mrpharman.demoproducts.in/public/uploads/";
// export const base_url = "http://wecare.rithlaundry.com/";

// -----staging Base Url------
export const base_url = "https://doctorapp.grratz.com/";
export const api_url = "https://doctorapp.grratz.com/api/";
export const img_url = "https://doctorapp.grratz.com/public/uploads/";

// -----Live Base Url------
// export const base_url = "https://holybasilplus.com/";
// export const api_url = "https://holybasilplus.com/api/";
// export const img_url = "https://holybasilplus.com/public/uploads/";


export const chat_icon = img_url + 'chat_icons/patient.png';
export const vendor_category = "vendor/category";
export const sub_category = "vendor/sub_category";
export const faq = "customer/faq";
export const privacy = "privacy_policy";
export const products = "vendor/products";
export const search_products = "search_products";
export const related_products = "related_products";
export const register = "customer";
export const login = "customer/login";
export const sociallogin = "customer/social_login";

export const address = "address";
export const address_list = "address/all";
export const address_delete = "address/delete";
export const my_orders = "customer/bookings";
export const order_details = "customer/order_details";
export const booking_details = "customer/booking_details";
export const promo_code = "promo";
export const get_profile = "customer/get_profile";
export const profile_picture = "customer/profile_picture";
export const forgot = "customer/forgot_password";
export const reset = "customer/reset_password";
export const place_order = "order";
export const image_upload = "image_upload";
export const prescription = "prescription";
export const prescription_list = "prescription_list";
export const order_generation = "order_generation";
export const reject_order = "reject_order";
export const get_payment_list = "payment_modes";
export const vendor_list = "vendor_list";
export const vendor_detail = "vendor_detail";
export const profile_update = "customer/profile_update";
export const filter = "customer/filter";
export const last_active_address = "customer/last_active_address";
export const get_taxes = "get_taxes";
export const get_wallet = "customer/get_wallet";
export const add_wallet = "customer/add_wallet";
export const rating_update = "vendor/rating_upload";
export const cancelation_reasons = "cancelation_reasons";
export const cancel_order = "customer/cancel_order";
export const home_banners = "home_banners";
export const get_doctors = "customer/get_doctors";
export const home_details = "customer/home";
export const create_booking = "customer/create_booking";
export const check_available_timing = "customer/check_available_timing";
export const doctor_details = "doctor/detail";
export const get_doctor_by_ratings = "get_doctor_by_ratings";
export const get_doctor_by_specialists = "get_doctor_by_specialists";
export const get_doctor_by_services = "get_doctor_by_services";
export const get_access_token_for_voice = "get_access_token_for_voice";
export const get_access_token_for_video = "get_access_token_for_video";
export const get_blood_list = "blood_group";
export const chat_pusher = "chat_pusher";
export const doctor_sub_category = "doctor_sub_category";
export const get_clinics = "customer/get_clinics";
export const get_nearest_doctor = "customer/get_nearest_doctor";

export const app_name = "WeCare";
export const no_data = "Sorry no data found...";
//Size
export const screenHeight = Math.round(Dimensions.get('window').height);
export const height_40 = Math.round(40 / 100 * screenHeight);
export const height_50 = Math.round(50 / 100 * screenHeight);
export const height_60 = Math.round(60 / 100 * screenHeight);
export const height_35 = Math.round(35 / 100 * screenHeight);
export const height_20 = Math.round(20 / 100 * screenHeight);
export const height_30 = Math.round(30 / 100 * screenHeight);
export const height_17 = Math.round(17 / 100 * screenHeight);

//Path

export const logo_with_name = require('.././assets/img/logo_with_name.png');
export const splash = require('.././assets/img/splash.png');
export const logo_image = require('.././assets/img/logo.png');
export const heart = require('.././assets/img/heart.png');
export const forgot_password = require('.././assets/img/forgot.png');
export const otp_image = require('.././assets/img/otp.png');
export const reset_password = require('.././assets/img/reset_password.png');
export const loading = require('.././assets/img/loading.png');
export const pin = require('.././assets/img/location_pin.png');
export const tablet = require('.././assets/img/tablet.png');
export const list = require('.././assets/img/list.png');
export const banner1 = require('.././assets/img/banner1.jpeg');
export const banner2 = require('.././assets/img/banner2.jpeg');
export const banner3 = require('.././assets/img/banner3.jpeg');
export const upload = img_url + "images/upload.png";
export const safety_icon = require('.././assets/img/safety.png');
export const order_icon = require('.././assets/img/order.png');
export const trust_icon = require('.././assets/img/trust.png');
export const wallet_icon = require('.././assets/img/wallet.png');
export const doctor = require('.././assets/img/doctor.png');
export const location_icon = require('.././assets/img/location_icon.png');
export const dentist = require('.././assets/img/dentist.png');
export const cardiologist = require('.././assets/img/cardiologist.png');
export const orthopedics = require('.././assets/img/orthopedics.png');
export const surgery = require('.././assets/img/surgery.png');
export const tablet_house = require('.././assets/img/tablet_house.png');
export const doctor_one = require('.././assets/img/doctor_one.png');
export const doc = require('.././assets/img/doc.jpg');
export const covid = require('.././assets/img/covid.png');
export const headache = require('.././assets/img/headache.png');
export const fever = require('.././assets/img/fever.png');
export const diabetes= require('.././assets/img/diabetes.png');
export const throat_pain = require('.././assets/img/throat_pain.png');
export const back_pain = require('.././assets/img/back_pain.png');
export const cough = require('.././assets/img/cough.png');
export const acidity = require('.././assets/img/acidity.png');
export const infections = require('.././assets/img/infections.png');
export const weight_loss = require('.././assets/img/weight_loss.png');
export const constipation = require('.././assets/img/constipation.png');
export const depression = require('.././assets/img/depression.png');
export const hairfall = require('.././assets/img/hairfall.png');
export const anxiety = require('.././assets/img/anxiety.png');
export const stomach_ache = require('.././assets/img/stomach_ache.png');
export const blood_pressure = require('.././assets/img/blood_pressure.png');
export const location = require('.././assets/img/location.png');
export const doctor_image = require('.././assets/img/doctor_image.png');
export const doctorthree = require('.././assets/img/doctorthree.jpg');
export const SpalshImage = require('.././assets/img/splashMain.png');
export const buttonfacebook= require('.././assets/img/button-facebook.png');
export const buttongoogle= require('.././assets/img/button-google.png');
export const profile= require('.././assets/img/profile.png');
export const Bitmapuser= require('.././assets/img/Bitmap.png');
export const videoimg_one= require('.././assets/img/videoimg_one.png');
export const videoimg_two= require('.././assets/img/videoimg_two.png');
export const BasicPlan= require('.././assets/img/BasicPlan.png');
export const AdvancePlan= require('.././assets/img/AdvancePlan.png');
export const bigBasicPlan= require('.././assets/img/bigBasicPlan.png');
export const ViewMore= require('.././assets/img/ViewMore.png');
export const BigActivePlan= require('.././assets/img/BigActivePlan.png');
export const viewLess= require('.././assets/img/viewLess.png');




//Lottie
export const doctor_lottie = require('.././assets/json/noservice_lottie.json');
export const wallet_lottie = require('.././assets/json/noservice_lottie.json');
export const address_lottie = require('.././assets/json/noservice_lottie.json');
export const no_data_lottie = require('.././assets/json/no_data_lottie.json');
export const no_appointment_lottie = require('.././assets/json/no_appointment.json');
export const no_orders_lottie = require('.././assets/json/no_orders.json');
export const no_prescription_lottie = require('.././assets/json/no_prescription.json');
export const no_address_lottie = require('.././assets/json/no_address.json');
export const no_wallet_lottie = require('.././assets/json/no_wallet.json');
export const doctor_list = require('.././assets/json/doctor_list.json');
//Font Family
export const font_description  = "GoogleSans-Medium";
export const font_title  = "GoogleSans-Bold";
export const Lato_Regular  = "Lato-Regular";
export const Lato_Bold  = "Lato-Bold";
export const Roboto  = "Roboto";


//Map
export const GOOGLE_KEY = "AIzaSyAzOlLQfIFs-TZg4HtshNMdlCoVS_Jig7g";
export const LATITUDE_DELTA = 0.0150;
export const LONGITUDE_DELTA =0.0152;

//More Menu
export const menus = [
  {
    menu_name: 'My Profile',
    icon: 'person',
    route:'Profile'
  },
  {
    menu_name: 'Manage Addresses',
    icon: 'pin',
    route:'AddressList'
  },
  // {
  //   menu_name: 'Wallet',
  //   icon: 'wallet',
  //   route:'Wallet'
  // },
  {
    menu_name: 'FAQ',
    icon: 'help',
    route:'Faq'
  },
  {
    menu_name: 'Privacy Policy',
    icon: 'alert',
    route:'PrivacyPolicy'
  },
  {
    menu_name: 'Contact Us',
    icon: 'call',
    route:'ContactUs'
  },
  {
    menu_name: 'Logout',
    icon: 'log-out',
    route:'Logout'
  },
]

export const loginToGoogle = async () => {

  try {

      GoogleSignin.configure(
          {
              scopes: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
              webClientId: "87955217014-o35mpojc6v5u2p7l28bhm2f4ne7bcpbe.apps.googleusercontent.com",
              // iosClientId: DeviceInfo.getApplicationName() != 'PropEase' ? '369514627178-2db5i1uer8hglu3mrj0jpd6q8cok6tq6.apps.googleusercontent.com'
              //     : '739272576306-hamlvpfgg84db51pqs3gc8t4gcj21hvr.apps.googleusercontent.com',
             
          }
      )

      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })

  

      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn()
      return userInfo

  } catch (error) {

     
      return null
  }
}

export const fbLogin = async (callback) => {

  try {

      await LoginManager.logOut()

      const data = await LoginManager.logInWithPermissions(["public_profile", "email"])

      if (!data.isCancelled) {

          const access = await AccessToken.getCurrentAccessToken()

          const infoRequest = new GraphRequest(
              '/me?fields=name,picture.type(large),first_name,last_name,email',
              null,
              callback
          );

          new GraphRequestManager().addRequest(infoRequest).start()
      } else {

      

          throw (data)
      }

  } catch (error) {

      console.log("error ", JSON.stringify(error))

  }
}



export const standardWidth = 414;
export const standardHeight = 812;
export const standardWidthiPad = Platform.OS === 'ios' ? 1536 : 1080;
export const standardHeightiPad = Platform.OS === 'ios' ? 2048 : 1920;

export const screenWidth = Math.round(Dimensions.get('window').width);
export const screenHeights = Math.round(Dimensions.get('window').height);
export const fontRatioPhones = Math.round(Dimensions.get('window').width) / (Platform.OS === 'ios' ? 375 : 400);
export var drawerNavigation = null;


export function getSizeWidth(value) {
  var screenRatio = screenWidth / standardWidth;
  if (isTabletiPad() === true) {
    screenRatio = screenWidth / standardWidthiPad;
  }
  return (value / standardWidth) * Dimensions.get('window').width;
}
export function getAspectRatioHeight(value) {
  var screenRatio = screenWidth / standardWidth;
  if (isTabletiPad() === true) {
    screenRatio = screenWidth / standardWidthiPad;
  }
  return (value / standardWidth) * Dimensions.get('window').width;
}
export function getSizeHeight(value) {
  var screenRatio = screenHeights / standardHeight;
  if (isTabletiPad() === true) {
    screenRatio = screenHeights / standardHeightiPad;
  }
  return value * screenRatio;
}
export function getFontRatio(value) {
  if (isTabletiPad() === true) {
    return (
      (value * Math.round(Dimensions.get('window').width)) /
      (Platform.OS === 'ios' ? 600 : 500)
    );
  }
  return (
    (value * Math.round(Dimensions.get('window').width)) /
    (Platform.OS === 'ios' ? 375 : 400)
  );
}
export function isTabletiPad() {
  if (Platform.OS === 'ios') {
    return Platform.isPad;
  } else {
    let ratio = PixelRatio.get();
    // let ratio = height / width
    if (ratio > 1.6) {
      return false;
    } else {
      return true;
    }
  }
}