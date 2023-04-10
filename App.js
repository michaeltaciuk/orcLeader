import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Leaderboard from './screens/Leaderboard.js';
import Submission from './screens/SubmissionScreen';
import SignIn from './screens/SignInScreen.js';
import Account from './screens/AccountScreen.js';

import api from './api/api.js';

const Tab = createBottomTabNavigator();

let today = new Date().getDay();
let startOfWeek = new Date();
startOfWeek.setDate(startOfWeek.getDate() - (today - 1));
let endOfWeek = new Date();
endOfWeek.setDate(endOfWeek.getDate() + (7 - today));
endOfWeek = endOfWeek.toLocaleDateString('default', {month: 'long', day: 'numeric'});
startOfWeek = startOfWeek.toLocaleDateString('default', {month: 'long', day: 'numeric'});

function TitleSection() {

  const [dataChallange, setDataChallange] = useState({
    challange: '-NO DATA-',
    desciption: '-NO DATA-',
    units: '-NO DATA-',
  });

  useEffect(() => {
    getChallengeData();
  }, []);

  async function getChallengeData() {
    try {
      const response = await api.getChallengeData();
      let dataChallange = response.data;
      setDataChallange(dataChallange);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <View>
      <Text style={styles.title}>{`ORC Fitness Challange`}</Text>
      <Text style={styles.challange}>{`${startOfWeek} to ${endOfWeek}`}</Text>
      <Text style={styles.challange}>{`This weeks challange is: ${dataChallange.challange}`}</Text>
    </View>
  );
}

function AccountScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Account/>
    </SafeAreaView>
  );
}

function LeaderboardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <TitleSection/>
      <Leaderboard/>
    </SafeAreaView>
  );
}

function SubmissionScreen() {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <TitleSection/>
      <Submission/>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Leaderboard" 
        options={{headerShown: false,
          tabBarIcon: ({ focused, size }) => (
            <MaterialCommunityIcons name="trophy" color={focused ? 'gold' : 'gray'} size={size} />
          ),}}
        component={LeaderboardScreen} />
      <Tab.Screen 
        name="Submt" 
        options={{headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="send" color={color} size={size} />
          ),}} 
        component={SubmissionScreen} />
      <Tab.Screen 
        name="Account" 
        options={{headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),}} 
        component={AccountScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignIn = () => {
    setIsSignedIn(true);
  };

  // Render the sign-in screen if the user is not signed in
  if (!isSignedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <SignIn onSignIn={handleSignIn} />
      </SafeAreaView>
    );
  }

  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e7695',
    paddingTop: 5,
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  challange: {
    paddingBottom: 12,
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  },
});
