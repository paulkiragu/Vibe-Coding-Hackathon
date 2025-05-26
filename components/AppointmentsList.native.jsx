// components/AppointmentsList.native.jsx
import React from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import { Card } from "./ui/card"; // shared cross-platform component

export default function AppointmentsList({ appointments }) {
  if (!appointments || appointments.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No appointments found.</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.details}>Doctor: {item.doctorName}</Text>
      <Text style={styles.details}>Time: {item.datetime}</Text>
      <Text style={styles.details}>Channel: {item.channel}</Text>
    </Card>
  );

  return (
    <FlatList
      data={appointments}
      keyExtractor={(item, index) => item.id?.toString() || index.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  emptyContainer: {
    padding: 16,
    alignItems: "center",
  },
  emptyText: {
    color: "#888",
  },
  card: {
    marginBottom: 12,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  details: {
    color: "#555",
    marginTop: 4,
  },
});
