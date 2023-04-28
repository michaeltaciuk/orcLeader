import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  Animated
} from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";

import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

import orcLogo from "../assets/orcLogo.png";

async function handleSignIn(credential) {
  //console.log(credential)
  if (credential.fullName.givenName && credential.fullName.familyName) {
    storeUserName(`${credential.fullName.givenName} ${credential.fullName.familyName}`);
  } else if (credential.fullName.givenName) {
    storeUserName(`${credential.fullName.givenName}`);
  } else if (credential.fullName.familyName) {
    storeUserName(`${credential.fullName.familyName}`);
  }

  if (credential) {
    const { authorizationCode } = credential;
    storeAuthorizationCode(authorizationCode);
    const email = jwtDecode(credential.identityToken);
    storeUserEmail(email.email);
  }

  
}

const storeAuthorizationCode = async (value) => {
  try {
    await AsyncStorage.setItem("@authorization_code", value);
  } catch (e) {
    console.log(e);
  }
};

const storeUserName = async (value) => {
  try {
    await AsyncStorage.setItem("@user_name", value);
  } catch (e) {
    console.log(e);
  }
};

const storeUserEmail = async (value) => {
  try {
    await AsyncStorage.setItem("@user_email", value);
  } catch (e) {
    console.log(e);
  }
};

const SignInScreen = ({ onSignIn }) => {

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  }, []);

  if (Platform.OS === "ios") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>ORC Weekly Fitness Challange</Text>

        <Animated.View
          style={[
            styles.fadingContainer,
            {
              opacity: fadeAnim,
            },
          ]}>
          <Image source={orcLogo} style={{ width: 300, height: 300 }} />
        </Animated.View>

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
              if (e.code === "ERR_REQUEST_CANCELED") {
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 100,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
    textAlign: "center",
  },
  appleButton: {
    width: "80%",
    height: 60,
  },
});

export default SignInScreen;
