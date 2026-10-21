import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";

import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useParcels } from "../context/ParcelsContext";

export default function HomeScreen() {
  const { parcels } = useParcels();

  const [isRouteActive, setIsRouteActive] = useState(false);

  const totalParcels = parcels.length;

  const deliveredCount = parcels.filter(
    (parcel) => parcel.status === "delivered",
  ).length;

  const pendingCount = parcels.filter(
    (parcel) => parcel.status === "pending",
  ).length;

  const failedCount = parcels.filter(
    (parcel) => parcel.status === "failed",
  ).length;

  const nextDelivery = parcels.find((parcel) => parcel.status === "pending");

  const todayEarnings = 320;

  function handleRouteButton() {
    setIsRouteActive((current) => !current);
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>CourierFlow</Text>

          <Text style={styles.greeting}>Good evening, Dmitry 👋</Text>
        </View>

        <Pressable style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={23} color="#111111" />
        </Pressable>
      </View>

      {isRouteActive && (
        <View style={styles.activeBadge}>
          <View style={styles.activeDot} />

          <Text style={styles.activeText}>ROUTE ACTIVE</Text>
        </View>
      )}

      <View style={styles.statsCard}>
        <Text style={styles.sectionTitle}>TODAY&apos;S ROUTE</Text>

        <View style={styles.mainStats}>
          <View>
            <Text style={styles.bigNumber}>{totalParcels}</Text>

            <Text style={styles.bigLabel}>Parcels</Text>
          </View>

          <View style={styles.earningsBlock}>
            <Text style={styles.earnings}>{todayEarnings} PLN</Text>

            <Text style={styles.earningsLabel}>Estimated earnings</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <View style={[styles.statusCircle, styles.deliveredCircle]}>
              <Ionicons name="checkmark" size={16} color="#239A4B" />
            </View>

            <Text style={styles.statNumber}>{deliveredCount}</Text>

            <Text style={styles.statLabel}>Delivered</Text>
          </View>

          <View style={styles.statItem}>
            <View style={[styles.statusCircle, styles.pendingCircle]}>
              <Ionicons name="time-outline" size={16} color="#D97706" />
            </View>

            <Text style={styles.statNumber}>{pendingCount}</Text>

            <Text style={styles.statLabel}>Pending</Text>
          </View>

          <View style={styles.statItem}>
            <View style={[styles.statusCircle, styles.failedCircle]}>
              <Ionicons name="close" size={16} color="#D9363E" />
            </View>

            <Text style={styles.statNumber}>{failedCount}</Text>

            <Text style={styles.statLabel}>Failed</Text>
          </View>
        </View>
      </View>

      {nextDelivery && (
        <>
          <Text style={styles.blockTitle}>NEXT DELIVERY</Text>

          <Pressable
            style={styles.nextDeliveryCard}
            onPress={() => router.push(`/delivery/${nextDelivery.id}`)}
          >
            <View style={styles.deliveryIcon}>
              <Ionicons name="navigate" size={25} color="#111827" />
            </View>

            <View style={styles.deliveryInfo}>
              <Text style={styles.deliveryAddress}>{nextDelivery.address}</Text>

              <Text style={styles.deliveryCity}>
                {nextDelivery.city}, {nextDelivery.postalCode}
              </Text>

              <View style={styles.deliveryMeta}>
                <Text style={styles.parcelId}>Parcel #{nextDelivery.id}</Text>

                <Text style={styles.distance}>{nextDelivery.distance} km</Text>
              </View>
            </View>

            <Ionicons name="chevron-forward" size={21} color="#89919D" />
          </Pressable>
        </>
      )}

      <Pressable
        style={[styles.routeButton, isRouteActive && styles.routeButtonActive]}
        onPress={handleRouteButton}
      >
        <Ionicons
          name={isRouteActive ? "pause-circle" : "navigate-circle"}
          size={24}
          color="#FFFFFF"
        />

        <Text style={styles.routeButtonText}>
          {isRouteActive ? "Route in progress" : "Start Route"}
        </Text>
      </Pressable>

      <Pressable
        style={styles.allDeliveriesButton}
        onPress={() => router.push("/deliveries")}
      >
        <Text style={styles.allDeliveriesText}>View all deliveries</Text>

        <Ionicons name="arrow-forward" size={18} color="#111111" />
      </Pressable>
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
    paddingTop: 65,
    paddingBottom: 120,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    fontSize: 30,
    fontWeight: "800",
  },

  greeting: {
    marginTop: 7,
    fontSize: 15,
    color: "#505866",
  },

  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  activeBadge: {
    alignSelf: "flex-start",
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6F7EC",
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 20,
  },

  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#239A4B",
    marginRight: 8,
  },

  activeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#239A4B",
  },

  statsCard: {
    marginTop: 24,
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 22,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#737B88",
    letterSpacing: 0.7,
  },

  mainStats: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  bigNumber: {
    fontSize: 46,
    fontWeight: "800",
  },

  bigLabel: {
    marginTop: -3,
    fontSize: 15,
    color: "#737B88",
  },

  earningsBlock: {
    alignItems: "flex-end",
  },

  earnings: {
    fontSize: 28,
    fontWeight: "800",
  },

  earningsLabel: {
    marginTop: 3,
    fontSize: 12,
    color: "#737B88",
  },

  divider: {
    height: 1,
    backgroundColor: "#EDF0F4",
    marginVertical: 20,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  statItem: {
    flex: 1,
    alignItems: "center",
  },

  statusCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 7,
  },

  deliveredCircle: {
    backgroundColor: "#E6F7EC",
  },

  pendingCircle: {
    backgroundColor: "#FFF1E3",
  },

  failedCircle: {
    backgroundColor: "#FDE8E8",
  },

  statNumber: {
    fontSize: 20,
    fontWeight: "800",
  },

  statLabel: {
    marginTop: 2,
    fontSize: 12,
    color: "#737B88",
  },

  blockTitle: {
    marginTop: 28,
    marginBottom: 10,
    fontSize: 12,
    fontWeight: "700",
    color: "#737B88",
    letterSpacing: 0.7,
  },

  nextDeliveryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
  },

  deliveryIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#F2F5FA",
    alignItems: "center",
    justifyContent: "center",
  },

  deliveryInfo: {
    flex: 1,
    marginLeft: 14,
  },

  deliveryAddress: {
    fontSize: 17,
    fontWeight: "700",
  },

  deliveryCity: {
    marginTop: 3,
    color: "#7B8492",
  },

  deliveryMeta: {
    flexDirection: "row",
    marginTop: 9,
    gap: 14,
  },

  parcelId: {
    fontSize: 12,
    color: "#737B88",
  },

  distance: {
    fontSize: 12,
    color: "#737B88",
  },

  routeButton: {
    marginTop: 24,
    height: 58,
    borderRadius: 17,
    backgroundColor: "#111111",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  routeButtonActive: {
    backgroundColor: "#239A4B",
  },

  routeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  allDeliveriesButton: {
    marginTop: 12,
    height: 52,
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  allDeliveriesText: {
    fontSize: 15,
    fontWeight: "600",
  },
});
