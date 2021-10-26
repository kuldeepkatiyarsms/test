import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Container, Content, Left, Body, Right, Icon, List, ListItem, Button } from 'native-base';
import * as colors from '../assets/css/Colors';
import { Divider } from '../components/GeneralComponents';
import { menus,font_description,font_title, getFontRatio, Lato_Regular, getSizeHeight, getSizeWidth } from '../config/Constants';
import Dialog from "react-native-dialog";
import Profile from '../config/SVG/Profile';
import Address from '../config/SVG/Address';
import Faq from '../config/SVG/Faq';
import PrivacyPolicy from '../config/SVG/PrivacyPolicy';
import ContactUs from '../config/SVG/ContactUs';
import LogOut from '../config/SVG/LogOut';
import { TouchableOpacity } from 'react-native';




export default class More extends Component<Props> {

  constructor(props) {
    super(props)
    this.state = {
      dialogVisible:false
    }
  }

  navigate = (route) => {
    if(route == 'Logout'){
      this.showDialog();
    }else if(route == 'AddressList'){
      this.props.navigation.navigate(route,{ from : 'More'});
    }else{
      this.props.navigation.navigate(route);
    }
  }

  showDialog = () => {
    this.setState({ dialogVisible: true });
  }

  closeDialog = () => {
    this.setState({ dialogVisible: false });
  }

  handleCancel = () => {
    this.setState({ dialogVisible: false });
  }
 
  handleLogout = async() => {
    await this.closeDialog();
    await this.props.navigation.navigate('Logout');
  }


  render() {
    return (
      <Container style={styles.more_style1} >
        <View style={styles.more_style2} >
          <Text style={styles.more_style3} >More</Text>
        </View>
        
        <Content style={styles.more_style4} >
        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>Confirm</Dialog.Title>
          <Dialog.Description>
            Do you want to logout?
          </Dialog.Description>
          <Dialog.Button label="Yes" onPress={this.handleLogout} />
          <Dialog.Button label="No" onPress={this.handleCancel} />
        </Dialog.Container>

       
            <FlatList
              data={menus}
              renderItem={({ item,index }) => (
                <TouchableOpacity icon onPress={() => this.navigate(item.route)}>
                 
                  <View style={{paddingLeft:getSizeWidth(5), marginHorizontal:getSizeWidth(25), alignItems:'center', height:getSizeHeight(54), flexDirection:'row',justifyContent:'flex-start',borderBottomWidth:0.4,borderBottomColor:'#E8E8E8'}}>  
                    {index===0&& <Profile></Profile>}
                    {index===1&& <Address></Address>}
                    {index===2&& <Faq></Faq>}
                    {index===3&& <PrivacyPolicy></PrivacyPolicy>}
                    {index===4&& <ContactUs></ContactUs>}
                    {index===5&& <LogOut></LogOut>}

                    <Text style={[styles.more_style6,{marginLeft:getSizeWidth(15)}]} >{item.menu_name}</Text>
                    </View>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.menu_name}
            />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  more_style1:{backgroundColor: colors.theme_bg_two},
  more_style2:{backgroundColor:colors.theme_bg_three,padding:10},
  more_style3:{marginBottom:getSizeHeight(5), fontSize:getFontRatio(24),color:'#2D3E4D',fontFamily:Lato_Regular,marginTop:getSizeHeight(20),marginLeft:getSizeWidth(14)},
  more_style4:{backgroundColor:colors.theme_bg_three},
  more_style5:{backgroundColor: colors.theme_bg},
  more_style6:{fontSize:getFontRatio(18),lineHeight:24,color:'#2D3E4D',fontFamily:Lato_Regular},
});

