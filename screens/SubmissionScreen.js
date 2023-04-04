import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, TextInput, Pressable, ScrollView } from "react-native";

import api from "../api/api.js";

export default function SubmissionScreen() {
    const [name, setName] = useState("");
    const [nameString, setNameString] = useState("Please enter your name");
    const [score, setScore] = useState(0);

    const [dataUserSubmission, setDataUserSubmission] = useState([]);
    

  useEffect(() => {
    console.log("SubmissionScreen useEffect");
    const realName = useStore((state) => state.userName);
    if (realName) {
        setName(realName);
        setNameString(realName);
    }
    getUserSubmissionData();
  }, []);

    async function handleSubmitPress() {
        console.log("handleSubmitPress");
        if(name === "" || score === 0) {
            console.log("Please enter your name and score");
            alert("Please enter your name and score");
        }else {
            console.log(name);
            console.log(score);
            try {
                const response = await api.postUserSubmissionData({id: 1, name: name, score: score});
                console.log(response.data);
                setDataUserSubmission({id: 1, name: name, score: score});
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    async function getUserSubmissionData() {
        console.log("getUserSubmissionData");
        try {
            const response = await api.getUserSubmissionData();
            console.log(response.data);
            let dataUserSubmission = response.data;
            setDataUserSubmission(dataUserSubmission);
        } catch (error) {
            console.log(error.message);
        }
    }

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
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.scoreInput}>
        <Text style={styles.scoreInputText}>{`Your Score: `}</Text>
        <TextInput
          style={styles.scoreInputText}
          keyboardType='numeric'
          placeholder="Enter your score here"
          onChangeText={(text) => setScore(text)}
        />
      </View>
      <Pressable style={styles.button} onPress={handleSubmitPress}>
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
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
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#0e7695",
    marginTop: 20,
    width: "50%",
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
