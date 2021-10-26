import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as colors from './src/assets/css/Colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Lato_Regular, Lato_Bold,Roboto,getFontRatio } from './src/config/Constants';

/* Screens */
import Splash from './src/views/Splash';
import Home from './src/views/Home';
import Pharmacy from './src/views/Pharmacy';
import EditProduct from './src/views/EditProduct';
import Call from './src/views/Call';
import VideoCall from './src/views/VideoCall';
import VendorDetails from './src/views/VendorDetails';
import LocationSearch from './src/views/LocationSearch';
import SubCategory from './src/views/SubCategory';
import Product from './src/views/Product';
import Category from './src/views/Category';
import DoctorSubCategories from './src/views/DoctorSubCategories';
import ProductDetails from './src/views/ProductDetails';
import Promo from './src/views/Promo';
import MyOrders from './src/views/MyOrders';
import OrderDetails from './src/views/OrderDetails';
import Cart from './src/views/Cart';
import Profile from './src/views/Profile';
import More from './src/views/More';
import Prescription from './src/views/Prescription';
import AddPrescription from './src/views/AddPrescription';
import ViewPrescription from './src/views/ViewPrescription';
import Address from './src/views/Address';
import AddressList from './src/views/AddressList';
import Payment from './src/views/Payment';
import Login from './src/views/Login';
import Register from './src/views/Register';
import Faq from './src/views/Faq';
import FaqDetails from './src/views/FaqDetails';
import PrivacyPolicy from './src/views/PrivacyPolicy';
import Forgot from './src/views/Forgot';
import Otp from './src/views/Otp';
import Rating from './src/views/Rating';
import Reset from './src/views/Reset';
import ContactUs from './src/views/ContactUs';
import Logout from './src/views/Logout';
import Search from './src/views/Search';
import Wallet from './src/views/Wallet';
import DoctorList from './src/views/DoctorList';
import DoctorDetail from './src/views/DoctorDetail';
import AppointmentDetail  from './src/views/AppointmentDetail';
import CreateAppointment  from './src/views/CreateAppointment';
import MyBookingDetails  from './src/views/MyBookingDetails';
import Chat  from './src/views/Chat';
import { height_40 } from './src/config/Constants';
import MoreIcon from './src/config/SVG/More';
import PrescriptionIcon from './src/config/SVG/Prescription';
import Programme from './src/config/SVG/Programme';
import Discover from './src/config/SVG/Discover';
import HomeIcon from './src/config/SVG/HomeSelect';
import HomeDefault from './src/config/SVG/HomeDefault';
import DiscoverSelect from './src/config/SVG/DiscoverSelect';
import ProgrammeSelect from './src/config/SVG/ProgrammeSelect';
import PrescriptionSelect from './src/config/SVG/PrescriptionSelect';
import MoreSelect from './src/config/SVG/MoreSelect';

import OptionalPage from './src/views/OptionalPage';
import HelpYourSelf from './src/views/HelpYourSelf';
import SeekPersonalHelp from './src/views/SeekPersonalHelp';
import Diabetesprogram from './src/views/Diabetesprogram';
import StartDiabetesprogram from './src/views/StartDiabetesprogram';
import BookAppoitMent from './src/views/BookAppoitMent';
import Consultationbooking from './src/views/Consultationbooking';
import ConsultationbookingStepTwo from './src/views/ConsultationbookingStepTwo';
import HelpYourSelfDiabetes from './src/views/HelpYourSelfDiabetes';







const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: colors.theme_bg_dark,
         inactiveTintColor: '#A6A3A2',
        labelStyle: {  fontFamily:'Roboto' ,marginBottom:5,marginTop:-3,fontSize:getFontRatio(12),lineHeight:14.06},
        style:{
          backgroundColor: '#FAFAFA',
          fontFamily:'Roboto',
         
        }
      }}

    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            // <Icon name='ios-home' color={color} size={size} />
            color===colors.theme_bg_dark? <HomeIcon ></HomeIcon>:<HomeDefault ></HomeDefault>
          ),
        }}
      />
       <Tab.Screen
        name="Pharmacy"
        component={Pharmacy}
        options={{
          tabBarLabel: 'Discover',
          tabBarIcon: ({ color, size }) => (
            // <Icon name='ios-medkit' color={color} size={size} />
          color===colors.theme_bg_dark?<DiscoverSelect ></DiscoverSelect>: <Discover ></Discover>

          ),
        }}
      />
      <Tab.Screen
        name="MyOrders"
        component={MyOrders}
        options={{
          tabBarLabel: 'Programs',
          tabBarIcon: ({ color, size }) => (
            // <Icon name='ios-list' color={color} size={size} />
            color===colors.theme_bg_dark?<ProgrammeSelect></ProgrammeSelect>: <Programme></Programme>
          ),
        }}
      />
      <Tab.Screen
        name="Prescription"
        component={Prescription}
        options={{
          tabBarLabel: 'Prescription',
          tabBarIcon: ({ color, size }) => (
            color===colors.theme_bg_dark? <PrescriptionSelect></PrescriptionSelect>: <PrescriptionIcon></PrescriptionIcon>
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={More}
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({ color, size }) => (
            // <Icon name='ios-more' color={color} size={size} />
            color===colors.theme_bg_dark?  <MoreSelect></MoreSelect> :   <MoreIcon></MoreIcon>
          ),
        }}
      />
    </Tab.Navigator>
  );
}


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Splash" >
      <Stack.Screen name="AddPrescription" component={AddPrescription} />
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="AddressList" component={AddressList} />
      <Stack.Screen name="LocationSearch" component={LocationSearch} />
      <Stack.Screen name="MyBookingDetails" component={MyBookingDetails} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="Faq" component={Faq} />
      <Stack.Screen name="EditProduct" component={EditProduct} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Call" component={Call} />
      <Stack.Screen name="VideoCall" component={VideoCall} />
      <Stack.Screen name="FaqDetails" component={FaqDetails} />
      <Stack.Screen name="Forgot" component={Forgot} />
      <Stack.Screen name="Rating" component={Rating} />
      <Stack.Screen name="Home" component={MyTabs} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="OptionalPage" component={OptionalPage} />
      <Stack.Screen name="HelpYourSelf" component={HelpYourSelf} />
      <Stack.Screen name="SeekPersonalHelp" component={SeekPersonalHelp} />
      <Stack.Screen name="Diabetesprogram" component={Diabetesprogram} />
      <Stack.Screen name="StartDiabetesprogram" component={StartDiabetesprogram} />
      <Stack.Screen name="BookAppoitMent" component={BookAppoitMent} />
      <Stack.Screen name="Consultationbooking" component={Consultationbooking} />
      <Stack.Screen name="ConsultationbookingStepTwo" component={ConsultationbookingStepTwo} />
      <Stack.Screen name="HelpYourSelfDiabetes" component={HelpYourSelfDiabetes} />

      
      
      
      <Stack.Screen name="Logout" component={Logout} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="Promo" component={Promo} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Reset" component={Reset} />
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen name="SubCategory" component={SubCategory} />
      <Stack.Screen name="ViewPrescription" component={ViewPrescription} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Category" component={Category} />
      <Stack.Screen name="VendorDetails" component={VendorDetails} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="DoctorList" component={DoctorList} />
      <Stack.Screen name="DoctorDetail" component={DoctorDetail}/>
      <Stack.Screen name="AppointmentDetail" component={AppointmentDetail} />
      <Stack.Screen name="CreateAppointment" component={CreateAppointment} />
      <Stack.Screen name="DoctorSubCategories" component={DoctorSubCategories} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
