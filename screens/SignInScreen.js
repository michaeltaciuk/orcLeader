
import React from 'react';
import { StyleSheet, Text, View, Image, Button, Platform, Pressable } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';


import jwtDecode from 'jwt-decode';
import api from '../api/api.js';

import orcLogo from '../assets/orcLogo.png';

async function handleSignIn(credential) {
  console.log(`login: ${JSON.stringify(credential)}`);
  if (credential.fullName.givenName || credential.fullName.familyName){
    console.log(`fullname: ${credential.fullName.givenName} + ${credential.fullName.familyName}`);
  }else {
    const decoded = jwtDecode(credential.identityToken);
    console.log(`decoded: ${decoded.email}`);
  }
  // const response = await api.postUserSubmissionData({id: 1, name: name, score: score});
}


const SignInScreen = ({ onSignIn }) => {

  if (Platform.OS === 'ios') {
    return (
      <View style={styles.container}>

        <Text style={styles.title}>ORC Weekly Fitness Challange</Text>
        
        <Pressable onPress={() => {onSignIn()}}>
          <Image source={orcLogo} style={{ width: 200, height: 200 }} />
        </Pressable>
        
        <AppleAuthentication.AppleAuthenticationButton
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          cornerRadius={5}
          onPress={async () => {
            try {
              const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                  AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                  AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
              });
              handleSignIn(credential);
              onSignIn();
            } catch (e) {
              if (e.code === 'ERR_REQUEST_CANCELED') {
                // handle that the user canceled the sign-in flow
              } else {
                // handle other errors
              }
            }
          }}
          style={styles.appleButton}
        />
      </View>
    );
  }

  // Render a fallback message for non-iOS devices
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Text>Apple Sign In is only available on iOS devices.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  appleButton: {
    width: '80%',
    height: 45,
  },
});

export default SignInScreen;
