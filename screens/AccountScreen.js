import React from "react";
import { useState, useEffect } from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    Animated, 
    Pressable,
    FlatList } from "react-native";

import api from "../api/api.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AccountScreen = () => {
  const [userName, setUserName] = useState([]);
  const [userEmail, setUserEmail] = useState([]);
  const [userSubmissions, setUserSubmissions] = useState([]);

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const userEmailString = await AsyncStorage.getItem("@user_email");
      const userNameString = await AsyncStorage.getItem("@user_name");
      if (userEmailString !== null) {
        const email = userEmailString;
        setUserEmail(email);
      }
      if (userNameString !== null) {
        const name = userNameString;
        setUserName(name);
      }
      getUserSubmissionData(userNameString);
    } catch (error) {
      console.log(error);
    }
  };

  async function getUserSubmissionData(name) {
    try {
    console.log(`getUserSubmissionData: ${name}`);
      const response = await api.getUserSubmissions(name);
      console.log(`------response------${response.data}`);
      let userSubmissions = response.data;
      setUserSubmissions(userSubmissions);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleDeleteAccount() {
    console.log("Handle Delete Account");
    // if (!userName || !userEmail) {
    //   alert("No Account Info");
    // } else {
    //   try {
    //     await api.deleteUserSubmissions(userName);
    //     Alert.alert(`Your submissions have been deleted.`);
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // }
  }

  async function handleDeleteSubmission(_id) {
    console.log("Handle Delete Submission");
  }

  const animatedButtonScale = new Animated.Value(1);

  const onPressIn = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1.5,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const animatedScaleStyle = {
    transform: [{ scale: animatedButtonScale }],
  };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>User Information</Text>
            <Text style={styles.userInfo}>Name: {userName}</Text>
            <Text style={styles.userInfo}>Email: {userEmail}</Text>
            <Text style={styles.title}>Your Submissions:</Text>
        </View>
      {userSubmissions.length > 0 ? (
          <FlatList
            data={userSubmissions}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
                console.log(item),
              <View style={styles.item}>
                <Text style={styles.itemText}>
                  {item.name} - {item.score}
                </Text>
                <Animated.View style={[styles.buttonAnimationContainer, animatedScaleStyle]}>
                    <Pressable
                        style={styles.buttonSubmission}
                        onPress={handleDeleteAccount}
                        onPressIn={onPressIn}
                        onPressOut={onPressOut} >
                        <Text style={styles.buttonText}>Delete</Text>
                    </Pressable>
                </Animated.View>
              </View>
            )}
          />
      ) : (
        <Text style={styles.title}>No submissions yet</Text>
        
      )}
        <Animated.View
            style={[styles.buttonAnimationContainer, animatedScaleStyle]}
          >
            <Pressable
              style={styles.button}
              onPress={handleDeleteAccount}
              onPressIn={onPressIn}
              onPressOut={onPressOut} >
            <Text style={styles.buttonText}>Delete Account</Text>
        </Pressable>
          </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    },

  title: {
    marginTop: 20,
    fontSize: 24,
    color: "#0e7695",
    fontWeight: "bold",
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 18,
    color: "#0e7695",
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 18,
  },
  buttonAnimationContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "red",
    marginBottom: 20,
    width: 200,
  },
  buttonSubmission: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "red",
    marginBottom: 20,
    width: 100,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default AccountScreen;
