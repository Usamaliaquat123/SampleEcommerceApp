import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { WebView } from 'react-native-webview';
import { Button, Icon, Card, Input } from 'react-native-elements';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      PostCode: "",
      hide: true
    };
  }

  render() {
    let { PostCode, hide } = this.state
    let jsCode = `
    document.querySelector('#delivery_location').value = ${PostCode};
    `;
    return (
      <View style={styles.container}>
        <WebView
          source={{ uri: 'https://www.theiconic.com.au/shuffle-tank-892964.html' }}
          style={styles.webView}
          ref="myWebView"
          injectedJavaScript={PostCode!==""?jsCode:null}
          javaScriptEnabledAndroid={true}

        >

        </WebView>


        {hide === false &&
          <Card style={{ justifyContent: "flex-end", alignContent: "center",
          }}

          >
            <Input containerStyle={{borderColor:"black",borderWidth:1,margin:5}} value={PostCode} onChange={(text) => this.setState({ PostCode: text })} />
            <Button containerStyle={{margin:5,width:150,alignSelf:"flex-end"}} title="Test PostCode" />
          </Card>
        }
        <Icon
          containerStyle={{
            margin:10,
            alignSelf: "flex-end"
          }}
          name="arrow-up-circle"
          type="simple-line-icon"
          size={22}
          onPress={() => this.setState({ hide: !hide })}
          color='blue'
        />

      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webView: {
    flex: 1,
    backgroundColor: '#fff',
    height: 350,
  }
});

export default App;
