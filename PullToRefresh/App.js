import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, StyleSheet } from 'react-native';

const App = () => {
  // State to track if refreshing is happening
  const [refreshing, setRefreshing] = useState(false);

  // State to track the number of refreshes
  const [count, setCount] = useState(0);

  // Function to handle pull-to-refresh action
  const onRefresh = useCallback(() => {
    // Set the refreshing state to true
    setRefreshing(true);

    // Simulate a network request or data fetching
    setTimeout(() => {
      // Once the data is "fetched", set refreshing to false
      setRefreshing(false);

      // Increment the count state by 1
      setCount(prevCount => prevCount + 1);
    }, 2000); // 2 seconds delay to mimic a network request
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Pull to Refresh Example</Text>
        <Text>Swipe down to refresh the content.</Text>
        <Text style={styles.countText}>Refresh Count: {count}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  countText: {
    fontSize: 18,
    marginTop: 20,
  },
});

export default App;