import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import type { ParcelStatus } from "../data/parcels";

type ParcelCardProps = {
  id: number;
  address: string;
  distance: number;
  status: ParcelStatus;
  onPress: () => void;
};

export default function ParcelCard({
  id,
  address,
  distance,
  status,
  onPress,
}: ParcelCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
    >
      <View style={styles.icon}>
        <Ionicons name="cube-outline" size={24} color="#245EB7" />
      </View>

      <View style={styles.info}>
        <Text style={styles.address}>{address}</Text>

        <Text style={styles.parcelId}>Parcel #{id}</Text>

        <View style={styles.distanceRow}>
          <Ionicons name="location-outline" size={17} color="#737B88" />

          <Text style={styles.distance}>{distance} km</Text>
        </View>
      </View>

      <View
        style={[
          styles.statusBadge,
          status === "pending" && styles.statusPending,
          status === "delivered" && styles.statusDelivered,
          status === "failed" && styles.statusFailed,
        ]}
      >
        <Text style={styles.statusText}>{status}</Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color="#89919D" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginTop: 12,
    borderRadius: 18,
  },

  cardPressed: {
    opacity: 0.7,
  },

  icon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: "#EEF4FD",
    alignItems: "center",
    justifyContent: "center",
  },

  info: {
    flex: 1,
    marginLeft: 14,
  },

  address: {
    fontSize: 16,
    fontWeight: "700",
  },

  parcelId: {
    marginTop: 3,
    color: "#7B8492",
  },

  distanceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },

  distance: {
    marginLeft: 4,
    color: "#737B88",
  },

  statusBadge: {
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 20,
    marginRight: 8,
  },

  statusPending: {
    backgroundColor: "#FFF1E3",
  },

  statusDelivered: {
    backgroundColor: "#E6F7EC",
  },

  statusFailed: {
    backgroundColor: "#FDE8E8",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "capitalize",
  },
});
