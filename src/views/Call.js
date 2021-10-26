import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import { Container } from 'native-base';
import { api_url, font_title, font_description, get_access_token_for_voice } from '../config/Constants';
import * as colors from '../assets/css/Colors';
import axios from 'axios';
import TwilioVoice from 'react-native-twilio-programmable-voice';
import {request, check, PERMISSIONS, RESULTS} from 'react-native-permissions';

export default class Call extends Component<Props> {

  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state={
      accessToken:'',
      isLoding:false
    }
    this.permission_check();
    this.initTelephony();
    TwilioVoice.connect({To: 'kiruthika'})
  }

  permission_check(){
    /*check(PERMISSIONS.ANDROID.RECORD_AUDIO)
    .then((result) => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          alert(
            'This feature is not available (on this device / in this context)',
          );
          break;
        case RESULTS.DENIED:
          alert(
            'The permission has not been requested / is denied but requestable',
          );
          break;
        case RESULTS.GRANTED:
          alert('The permission is granted');
          break;
        case RESULTS.BLOCKED:
          alert('The permission is denied and not requestable anymore');
          break;
      }
    })
    .catch((error) => {
      // …
    });*/
    request(PERMISSIONS.ANDROID.RECORD_AUDIO).then((result) => {
      // …
    });

  }
  handleBackButtonClick= () => {
      this.props.navigation.goBack(null);
  }

  async initTelephony() {
    
      try {
          await this.getAccessTokenFromServer();
          const success = await TwilioVoice.initWithToken(this.state.accessToken);

      } catch (err) {
          console.log(err)
      }
  }
  
  getAccessTokenFromServer = async () => {
    this.setState({ isLoding : true });
      await axios({
      method: "get",
      url: api_url + get_access_token_for_voice+'/sarath'
      })
      .then(async (response) => {
        this.setState({ isLoding : false });
        this.setState({ accessToken : response.data.result});
      })
      .catch((error) => {
       this.setState({ isLoding : false });
      });
  };

  initTelephonyWithToken(token) {
      TwilioVoice.initWithAccessToken(token)
   
      // iOS only, configure CallKit
      try {
          TwilioVoice.configureCallKit({
              appName:       'TwilioVoiceExample',                  // Required param
              imageName:     'my_image_name_in_bundle',             // OPTIONAL
              ringtoneSound: 'my_ringtone_sound_filename_in_bundle' // OPTIONAL
          })
      } catch (err) {
          console.err(err)
      }
  }

  componentDidMount(){
    TwilioVoice.addEventListener('deviceReady', function() {
      
    });

    TwilioVoice.addEventListener('deviceNotReady', function(data) {
        
    })
    TwilioVoice.addEventListener('connectionDidConnect', function(data) {
        // {
        //     call_sid: string,  // Twilio call sid
        //     call_state: 'CONNECTED' | 'ACCEPTED' | 'CONNECTING' | 'RINGING' | 'DISCONNECTED' | 'CANCELLED',
        //     call_from: string, // "+441234567890"
        //     call_to: string,   // "client:bob"
        // }
    })
    TwilioVoice.addEventListener('connectionIsReconnecting', function(data) {
        // {
        //     call_sid: string,  // Twilio call sid
        //     call_from: string, // "+441234567890"
        //     call_to: string,   // "client:bob"
        // }
    })
    TwilioVoice.addEventListener('connectionDidReconnect', function(data) {
        // {
        //     call_sid: string,  // Twilio call sid
        //     call_from: string, // "+441234567890"
        //     call_to: string,   // "client:bob"
        // }
    })
    TwilioVoice.addEventListener('connectionDidDisconnect', function(data: mixed) {
        //   | null
        //   | {
        //       err: string
        //     }
        //   | {
        //         call_sid: string,  // Twilio call sid
        //         call_state: 'CONNECTED' | 'ACCEPTED' | 'CONNECTING' | 'RINGING' | 'DISCONNECTED' | 'CANCELLED',
        //         call_from: string, // "+441234567890"
        //         call_to: string,   // "client:bob"
        //         err?: string,
        //     }
    });
  }

  render() {

    return (
      <Container>
        
      </Container>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  header:{
    backgroundColor:colors.theme_bg_three
  },
  icon:{
    color:colors.theme_fg_two
  },
  header_body: {
    flex: 3,
    justifyContent: 'center'
  },
  title:{
    alignSelf:'center', 
    color:colors.theme_fg_two,
    alignSelf:'center', 
    fontSize:16, 
    fontFamily:font_title
  },
  faq_title: {
    color: colors.theme_fg_two,
    fontSize: 15,
    fontFamily:font_description
  },
});
