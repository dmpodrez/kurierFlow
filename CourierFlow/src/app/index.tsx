import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

type RouteStats = {
  parcels: number;
  delivered: number;
  pending: number;
  failed: number;
};
const routeStats: RouteStats = {
  parcels: 42,
  delivered: 31,
  pending: 8,
  failed: 3,
};
type ParcelStatus = "pending" | "delivered" | "failed";

type Parcel = {
  id: number;
  address: string;
  status: ParcelStatus;
};
const parcels: Parcel[] = [
  {
    id: 1,
    address: "Grunwaldzka 102",
    status: "pending",
  },
  {
    id: 2,
    address: "Kołobrzeska 34",
    status: "delivered",
  },
  {
    id: 3,
    address: "Długa 12",
    status: "failed",
  },
];
const todayEarnings: number = 320;

export default function HomeScreen() {
  const [isRouteActive, setIsRouteActive] = useState(false);
  function handleStartRoute() {
    setIsRouteActive(true);
  }
  function getStatusLabel(status: ParcelStatus): string {
    if (status === "delivered") {
      return "Delivered";
    }

    if (status === "failed") {
      return "Failed";
    }

    return "Pending";
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CourierFlow</Text>
      <Text style={styles.greeting}>Good evening, Dmitry 👋</Text>
      {isRouteActive && (
        <View style={styles.activeBadge}>
          <Text style={styles.activeText}>● ACTIVE</Text>
        </View>
      )}
      <View style={styles.routeCard}>
        <Text style={styles.sectionTitle}>TODAY&apos;S ROUTE</Text>

        <Text style={styles.parcelCount}>{routeStats.parcels}</Text>
        <Text style={styles.parcelLabel}>Parcels</Text>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{routeStats.delivered}</Text>
            <Text>Delivered</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{routeStats.pending}</Text>
            <Text>Pending</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{routeStats.failed}</Text>
            <Text>Failed</Text>
          </View>
        </View>
      </View>
      <View style={styles.earningsCard}>
        <Text style={styles.sectionTitle}>TODAY&apos;S EARNINGS</Text>

        <Text style={styles.earnings}>{todayEarnings} PLN</Text>
      </View>
      <Pressable style={styles.startButton} onPress={handleStartRoute}>
        <Text style={styles.startButtonText}>
          {isRouteActive ? "Route in progress" : "Start Route"}
        </Text>
      </Pressable>
      <View style={styles.parcelsSection}>
        <Text style={styles.sectionTitle}>DELIVERIES</Text>

        {parcels.map((parcel) => (
          <View key={parcel.id} style={styles.parcelCard}>
            <View>
              <Text style={styles.parcelAddress}>{parcel.address}</Text>

              <Text style={styles.parcelId}>Parcel #{parcel.id}</Text>
            </View>

            <Text style={styles.parcelStatus}>
              {getStatusLabel(parcel.status)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#F5F7FA",
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    marginTop: 60,
  },

  greeting: {
    fontSize: 18,
    marginTop: 12,
  },
  routeCard: {
    marginTop: 32,
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 20,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
  },

  parcelCount: {
    fontSize: 48,
    fontWeight: "700",
    marginTop: 20,
  },

  parcelLabel: {
    fontSize: 16,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
  },

  statItem: {
    alignItems: "center",
  },

  statNumber: {
    fontSize: 24,
    fontWeight: "700",
  },
  earningsCard: {
    marginTop: 16,
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 20,
  },

  earnings: {
    fontSize: 32,
    fontWeight: "700",
    marginTop: 12,
  },

  startButton: {
    marginTop: 24,
    backgroundColor: "#111111",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
  },

  startButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  activeBadge: {
    alignSelf: "flex-start",
    marginTop: 16,
    backgroundColor: "#E8F7EE",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },

  activeText: {
    fontSize: 12,
    fontWeight: "700",
  },
  parcelsSection: {
    marginTop: 32,
  },

  parcelCard: {
    marginTop: 12,
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  parcelAddress: {
    fontSize: 16,
    fontWeight: "600",
  },

  parcelId: {
    fontSize: 12,
    marginTop: 4,
  },

  parcelStatus: {
    fontSize: 13,
    fontWeight: "700",
  },
});
