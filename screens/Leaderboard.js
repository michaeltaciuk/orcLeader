import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { 
  FlatList,
  StyleSheet,
  Text, 
  View,
} from 'react-native';

import api from '../api/api.js';

export default function LeaderboardScreen() {

  const [dataUserScores, setDataUserScores] = useState([]);

  useEffect(() => {
    getLeaderboardData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getLeaderboardData();
    }, [])
  );
    
  async function getLeaderboardData() {
    try {
      const response = await api.getLeaderboardData();
      let dataUserScores = response.data;
      dataUserScores.sort((a, b) => (a.score > b.score) ? -1 : 1);
      setDataUserScores(dataUserScores);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <View style={styles.leaderboardScreen}>
      <View style={styles.legend}>
          <Text style={styles.itemText}>{`Rank `}</Text>
          <Text style={styles.itemText}>{`Score`}</Text>
      </View>
      <FlatList
        data={dataUserScores}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({item, index}) =>
          <View style={styles.item}>
            <Text style={styles.itemText}>{`${index + 1}. ${item.name} `}</Text>
            <Text style={styles.itemText}>{`${item.score} `}</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  leaderboardScreen: {
    height: '100%',
    backgroundColor: 'white',
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
});
  