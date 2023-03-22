import { StatusBar } from 'expo-status-bar';
import { 
  ScrollView, 
  FlatList,
  StyleSheet, 
  Text, 
  View 
} from 'react-native';

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
  units: 'seconds',
};

export default function App() {
  let today = new Date().getDay();
  let startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - (today - 1));
  startOfWeek = startOfWeek.toISOString().split('T')[0];
  
  dataUserScores.sort((a, b) => (a.score > b.score) ? -1 : 1);


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>{`ORC challange for the week of ${startOfWeek}`}</Text>
      <Text style={styles.challange}>{`This weeks challange is: ${dataChallange.challange}`}</Text>
      <View style={styles.item}>
        <Text style={styles.itemText}>{`Rank `}</Text>
        <Text style={styles.itemText}>{`${dataChallange.units}`}</Text>
      </View>
      <FlatList
        data={dataUserScores}
        renderItem={({item, index}) =>
          <View style={styles.item}>
            <Text style={styles.itemText}>{`${index + 1}. ${item.name} `}</Text>
            <Text style={styles.itemText}>{`${item.score} ${dataChallange.units}`}</Text>
          </View>
        }
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 5,
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: '#20232a',
    borderRadius: 6,
    backgroundColor: '#61dafb',
    color: '#20232a',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  challange: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: '#20232a',
    borderRadius: 6,
    backgroundColor: '#61dafb',
    color: '#20232a',
    textAlign: 'center',
    fontSize: 18,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#61dafb',
  },
  itemText: {
    fontSize: 18,
  },
});
