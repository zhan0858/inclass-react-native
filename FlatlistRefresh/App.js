import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Helper function to generate random data
const generateRandomData = () => {
  return {
    id: Math.random().toString(),
    value: `Random Item ${Math.floor(Math.random() * 100)}`,
  };
};

const App = () => {
  // State to track if refreshing is happening
  const [refreshing, setRefreshing] = useState(false);

  // State to hold the list data
  const [data, setData] = useState([generateRandomData()]);

  // Function to handle pull-to-refresh action
  const onRefresh = useCallback(() => {
    // Set the refreshing state to true
    setRefreshing(true);

    // Simulate a network request or data fetching
    setTimeout(() => {
      // Once the data is "fetched", add a new random item to the list
      setData(prevData => [...prevData, generateRandomData()]);
      setRefreshing(false);
    }, 2000); // 2 seconds delay to mimic a network request
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>{item.value}</Text>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.contentContainer}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  itemContainer: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 18,
  },
});

export default App;