import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Text,
  StatusBar
} from "react-native";

import { WebView } from "react-native-webview";
import { Button, Icon, Card, Input } from "react-native-elements";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      PostCode: "",
      hide: true
    };
    this.CheckPost = this.CheckPost.bind(this);
    this.Focus = this.Focus.bind(this);
    this.reload = this.reload.bind(this);
  }

  Focus() {
    // this.refs.myWebView.injectJavaScript(`document.getElementById('delivery_location').focus()`);
    this.refs.myWebView.injectJavaScript(`
    var x = document.getElementsByName('deliveryOptionsForm');
    x[0].submit();
    
    `);
    // this.reload();
  }
  CheckPost(value) {
    this.refs.myWebView.injectJavaScript(`document.getElementById("delivery_location").value="${value}";`);

    // this.reload();
  }
  reload() {
    this.refs.myWebView.reload();
  }

  render() {
    let { PostCode, hide } = this.state;
    let jsCode = `(function() {
var iconPopup = document.createElement("div");


  iconPopup.id = "popupIcon";
  iconPopup.className = "Iconpopup"

  // Add styling of popup
  document.getElementById("popupIcon").style.color = "#"
  document.getElementById("popupIcon").style.position = "absolute"
  document.getElementById("popupIcon").style.right = "0"
  document.getElementById("popupIcon").style.borderRadius = "30"

  alert(aNewBodyElement); 
})();

true;`;
    // ref => (this.myWebView = ref)
    return (
      <View style={styles.container}>
        <WebView
          source={{
            uri: "https://www.theiconic.com.au/shuffle-tank-892964.html"
          }}
          style={styles.webView}
          ref={'myWebView'}
          bounces={false}
          onShouldStartLoadWithRequest={() => true}
          javaScriptEnabledAndroid={true}
          startInLoadingState={true}
          onMessage={event => console.log(event.nativeEvent.data)}
        />

        {hide === false && (
          <Card style={{ justifyContent: "flex-end", alignContent: "center" }}>
            <TextInput
              style={{ borderColor: "black", borderWidth: 1, margin: 5 }}
              value={PostCode}
              // onFocus={this.Focus}
              onChangeText={text => {
                this.setState({ PostCode: text });
                this.CheckPost(text)
              }}
            />
            <Button
              containerStyle={{ margin: 5, width: 150, alignSelf: "flex-end" }}
              title="Test PostCode"
              onPress={this.Focus}
            />
          </Card>
        )}
        <Icon
          containerStyle={{
            margin: 10,
            alignSelf: "flex-end"
          }}
          name="arrow-up-circle"
          type="simple-line-icon"
          size={22}
          onPress={() => this.setState({ hide: !hide })}
          color="blue"
        />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  webView: {
    flex: 1,
    backgroundColor: "#fff",
    height: 350
  }
});

export default App;