
import React from 'react';
import { StyleSheet, Text, View, Image, Button, Platform, Pressable } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import useStore from '../store';

import orcLogo from '../assets/orcLogo.png';

const SignInScreen = ({ onSignIn }) => {
  const setUserName = useStore();

  const handleAppleSignIn = async () => {
    try {
      const result = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (onSignIn) {
        setUserName(result.fullName.givenName);
        onSignIn();
      }
    } catch (error) {
      if (error.code === 'ERR_CANCELED') {
        console.warn('User canceled Apple Sign in.');
      } else if (error.message === 'The user canceled the authorization attempt') {
        console.warn('User canceled Apple Sign in.');
      } else {
        console.error('Apple SignIn Error:', error);
      }
    }
  };

  // Render Apple Sign in button on iOS devices
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
          onPress={handleAppleSignIn}
          style={styles.appleButton}
        />
        {/* <Button
            title="Bypass sign in for dev"
            style={styles.appleButton}
            onPress={() => {onSignIn()}}
        /> */}
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
