import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";

import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import ParcelCard from "../components/ParcelCard";
import { useParcels } from "../context/ParcelsContext";
import type { ParcelStatus } from "../data/parcels";

type Filter = "all" | ParcelStatus;

const filters: {
  label: string;
  value: Filter;
}[] = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Delivered",
    value: "delivered",
  },
  {
    label: "Failed",
    value: "failed",
  },
];

export default function DeliveriesScreen() {
  const { parcels } = useParcels();

  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const filteredParcels =
    activeFilter === "all"
      ? parcels
      : parcels.filter((parcel) => parcel.status === activeFilter);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Deliveries</Text>

        <View style={styles.headerActions}>
          <Pressable style={styles.iconButton}>
            <Ionicons name="search" size={22} color="#111111" />
          </Pressable>

          <Pressable style={styles.iconButton}>
            <Ionicons name="options-outline" size={22} color="#111111" />
          </Pressable>
        </View>
      </View>

      <View style={styles.filters}>
        {filters.map((filter) => {
          const isActive = activeFilter === filter.value;

          return (
            <Pressable
              key={filter.value}
              style={[
                styles.filterButton,
                isActive && styles.filterButtonActive,
              ]}
              onPress={() => setActiveFilter(filter.value)}
            >
              <Text
                style={[styles.filterText, isActive && styles.filterTextActive]}
              >
                {filter.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.summary}>
        {filteredParcels.length}{" "}
        {filteredParcels.length === 1 ? "delivery" : "deliveries"}
      </Text>

      {filteredParcels.map((parcel) => (
        <ParcelCard
          key={parcel.id}
          id={parcel.id}
          address={parcel.address}
          distance={parcel.distance}
          status={parcel.status}
          onPress={() => router.push(`/delivery/${parcel.id}`)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 120,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
  },

  headerActions: {
    flexDirection: "row",
    gap: 10,
  },

  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  filters: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 5,
    borderRadius: 16,
    marginTop: 28,
  },

  filterButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 12,
  },

  filterButtonActive: {
    backgroundColor: "#111111",
  },

  filterText: {
    color: "#747B88",
    fontWeight: "600",
  },

  filterTextActive: {
    color: "#FFFFFF",
  },

  summary: {
    marginTop: 26,
    marginBottom: 4,
    fontSize: 16,
    color: "#747B88",
  },
});
