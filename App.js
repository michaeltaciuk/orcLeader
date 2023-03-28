import { StatusBar } from 'expo-status-bar';
import { 
  FlatList,
  StyleSheet, 
  Text, 
  View,
  Pressable,
  SafeAreaView, 
  TextInput
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Leaderboard from './screens/Leaderboard.js';

const dataUserScores = [
  {name: 'John', score: 30},
  {name: 'Bob', score: 20},
  {name: 'Sally', score: 10},
  {name: 'Sue', score: 38},
  {name: 'Alex', score: 120},
  {name: 'Jane', score: 12},
  {name: 'Jim', score: 17},
  {name: 'Mike', score: 46},
  {name: 'Jack', score: 21},
  {name: 'Jen', score: 346},
  {name: 'Adam', score: 22},
];

const dataChallange ={
  challange: 'longest plank',
  desciption: 'hold a plank for as long as you can',
  units: 'Seconds',
};

const Tab = createBottomTabNavigator();

let today = new Date().getDay();
let startOfWeek = new Date();
startOfWeek.setDate(startOfWeek.getDate() - (today - 1));
let endOfWeek = new Date();
endOfWeek.setDate(endOfWeek.getDate() + (7 - today));
endOfWeek = endOfWeek.toLocaleDateString('default', {month: 'long', day: 'numeric'});
startOfWeek = startOfWeek.toLocaleDateString('default', {month: 'long', day: 'numeric'});

function LeaderboardScreen() {
  dataUserScores.sort((a, b) => (a.score > b.score) ? -1 : 1);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>{`ORC Fitness Challange`}</Text>
      <Text style={styles.challange}>{`${startOfWeek} to ${endOfWeek}`}</Text>
      <Text style={styles.challange}>{`This weeks challange is: ${dataChallange.challange}`}</Text>
      <View style={styles.legend}>
        <Text style={styles.itemText}>{`Rank `}</Text>
        <Text style={styles.itemText}>{`${dataChallange.units}`}</Text>
      </View>
      <Leaderboard/>
    </SafeAreaView>
  );
}

function SubmissionScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>{`ORC Fitness Challange`}</Text>
      <Text style={styles.challange}>{`${startOfWeek} to ${endOfWeek}`}</Text>
      <Text style={styles.challange}>{`This weeks challange is: ${dataChallange.challange}`}</Text>
      <View style={styles.submissionScreen}>
        <Text style={styles.submissionTitle}>Submit your score for this weeks challage:</Text>
        <View style={styles.scoreInput}>
          <Text style={styles.scoreInputText}>{`Your Name: `}</Text>
          <TextInput style={styles.scoreInputText} placeholder="Enter your name here" />
        </View>
        <View style={styles.scoreInput}>
          <Text style={styles.scoreInputText}>{`Your Score: `}</Text>
          <TextInput style={styles.scoreInputText} placeholder="Enter your score here" />
        </View>
        <Pressable style={styles.button} onPress={handleSubmission}>
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function handleSubmission() {
  console.log('submit');
}

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Leaderboard" 
        options={{headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="trophy" color={color} size={size} />
          ),}}
        component={LeaderboardScreen} />
      <Tab.Screen 
        name="Submt" 
        options={{headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="send" color={color} size={size} />
          ),}} 
        component={SubmissionScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
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
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderWidth: 4,
    borderColor: '#20232a',
    borderLeftWidth: 0,
    borderRightWidth: 0,
    backgroundColor: '#21b0da',
  },

  submissionScreen: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 5,
    height: '100%',
  },
  submissionTitle: {
    marginTop: 16,
    color: '#0e7695',
    paddingVertical: 8,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  scoreInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'white',
    width: '90%'
  },
  scoreInputText: {
    fontSize: 18,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#0e7695',
    marginTop: 20,
    width: '50%',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
