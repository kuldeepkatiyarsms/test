import React, {Component} from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Container,Content, Body, Icon, Card, CardItem, View } from 'native-base';
import { font_title, font_description } from '../config/Constants';
import * as colors from '../assets/css/Colors';

export default class FaqDetails extends Component<Props> {

  constructor(props) {
      super(props)
      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
      this.state = {
        data:this.props.route.params.data
      }
  }

  handleBackButtonClick= () => {
      this.props.navigation.goBack(null);
  }

  render() {
    return (
      <Container>
        <View>
          <View style={styles.detail_style1}>
            <TouchableOpacity style={styles.detail_style2} onPress={this.handleBackButtonClick} activeOpacity={1} >
            <Icon onPress={this.handleBackButtonClick} style={styles.detail_style3} name='arrow-back' />
            </TouchableOpacity>
            <View style={styles.detail_style4} />
            <Text style={styles.detail_style5}>Faq Details</Text>
          </View>
        </View>
           <View style={styles.detail_style6}/>
        <Content>
            <Card>
              <CardItem>
                <Body>
                  <Text style={styles.detail_style7}>{this.state.data.answer}</Text>
                </Body>
              </CardItem>
            </Card>
          </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  detail_style1:{alignItems:'flex-start', margin:10},
  detail_style2:{width:100, justifyContent:'center'},
  detail_style3:{color:colors.theme_fg_two, fontSize:30},
  detail_style4:{margin:5},
  detail_style5:{fontSize:25, color:colors.theme_fg_two, fontFamily: font_title},
  detail_style6:{margin:20},
  detail_style7:{ fontFamily: font_description},
});
