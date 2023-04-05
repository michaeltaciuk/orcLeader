import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  Keyboard,
  Animated,
} from "react-native";

import api from "../api/api.js";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SubmissionScreen() {
  const [name, setName] = useState("");
  const [nameString, setNameString] = useState("Please enter your name");
  const [score, setScore] = useState(0);
  const [dataUserSubmission, setDataUserSubmission] = useState([]);

  useEffect(() => {
    getUserName();
    getUserSubmissionData();
  }, []);

  async function handleSubmitPress() {
    console.log("handleSubmitPress");
    if (name === "" || score === 0) {
      alert("Please enter your name and score");
    } else {
      try {
        const response = await api.postUserSubmissionData({
          id: 1,
          name: name,
          score: score,
        });
        Alert.alert(`Success!`, `Your score has been submitted.`);
        Keyboard.dismiss();
        setDataUserSubmission({ id: 1, name: name, score: score });
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  async function getUserSubmissionData() {
    try {
      const response = await api.getUserSubmissionData();
      console.log(response.data);
      let dataUserSubmission = response.data;
      setDataUserSubmission(dataUserSubmission);
    } catch (error) {
      console.log(error.message);
    }
  }

  const getUserName = async () => {
    try {
      const value = await AsyncStorage.getItem('@user_name')
      if(value !== null) {
        setName(value);
        setNameString(value);
      }else {
        console.log("No name found");
      }
    } catch(e) {
      console.log(e);
    }
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
      transform: [{scale: animatedButtonScale}],
  };

  return (
    <View style={styles.submissionScreen}>
      <Text style={styles.submissionTitle}>
        Submit your score for this weeks challage:
      </Text>
      <View style={styles.scoreInput}>
        <Text style={styles.scoreInputText}>{`Your Name: `}</Text>
        <TextInput
          style={styles.scoreInputText}
          placeholder={nameString}
          value={name === "" ? null : name}
          editable={name === "" ? true : false}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.scoreInput}>
        <Text style={styles.scoreInputText}>{`Your Score: `}</Text>
        <TextInput
          style={styles.scoreInputText}
          keyboardType="numeric"
          placeholder="Enter your score here"
          onChangeText={(text) => setScore(parseInt(text, 10) || 0)}
        />
      </View>
      <Animated.View style={[styles.buttonAnimationContainer, animatedScaleStyle]}>
        <Pressable style={styles.button} onPress={handleSubmitPress} onPressIn={onPressIn} onPressOut={onPressOut}>
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  submissionScreen: {
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 5,
    height: "100%",
  },
  submissionTitle: {
    marginTop: 16,
    color: "#0e7695",
    paddingVertical: 8,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  scoreInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "white",
    width: "90%",
  },
  scoreInputText: {
    fontSize: 18,
  },
  buttonAnimationContainer: {
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
    backgroundColor: "#0e7695",
    marginTop: 20,
    width: 200,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
