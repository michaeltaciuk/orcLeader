import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
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
    
  async function getLeaderboardData() {
    try {
      const response = await api.getLeaderboardData();
      console.log(response.data);
      let dataUserScores = response.data;
      dataUserScores.sort((a, b) => (a.score > b.score) ? -1 : 1);
      setDataUserScores(dataUserScores);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <FlatList
      data={dataUserScores}
      renderItem={({item, index}) =>
        <View style={styles.item}>
          <Text style={styles.itemText}>{`${index + 1}. ${item.name} `}</Text>
          <Text style={styles.itemText}>{`${item.score} `}</Text>
        </View>
      }
    />
  );
}

  const styles = StyleSheet.create({
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
      backgroundColor: 'white',
      borderBottomWidth: 1,
    },
    itemText: {
      fontSize: 18,
    }
  });
  