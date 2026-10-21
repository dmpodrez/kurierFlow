import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useParcels } from "../../context/ParcelsContext";

export default function DeliveryDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { parcels, updateParcelStatus } = useParcels();
  const parcel = parcels.find((item) => item.id === Number(id));

  if (!parcel) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundTitle}>Delivery not found</Text>

        <Pressable onPress={() => router.back()}>
          <Text style={styles.backLink}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  const callRecipient = async () => {
    const phone = parcel.phone.replace(/\s/g, "");
    const url = `tel:${phone}`;

    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#111111" />
        </Pressable>

        <Text style={styles.title}>Delivery details</Text>
      </View>

      <View style={styles.mainCard}>
        <View style={styles.addressRow}>
          <View style={styles.addressIcon}>
            <Ionicons name="navigate" size={25} color="#111827" />
          </View>

          <View style={styles.addressInfo}>
            <Text style={styles.address}>{parcel.address}</Text>

            <Text style={styles.city}>
              {parcel.city}, {parcel.postalCode}
            </Text>
          </View>

          <View
            style={[
              styles.statusBadge,

              parcel.status === "pending" && styles.pending,

              parcel.status === "delivered" && styles.delivered,

              parcel.status === "failed" && styles.failed,
            ]}
          >
            <Text style={styles.statusText}>{parcel.status}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Ionicons name="barcode-outline" size={22} color="#737B88" />

          <Text style={styles.infoLabel}>Parcel ID</Text>

          <Text style={styles.infoValue}>#{parcel.id}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="person-outline" size={22} color="#737B88" />

          <Text style={styles.infoLabel}>Recipient</Text>

          <Text style={styles.infoValue}>{parcel.recipient}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="call-outline" size={22} color="#737B88" />

          <Text style={styles.infoLabel}>Phone</Text>

          <Text style={styles.infoValue}>{parcel.phone}</Text>

          <Pressable style={styles.callButton} onPress={callRecipient}>
            <Ionicons name="call" size={18} color="#111111" />
          </Pressable>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="wallet-outline" size={22} color="#737B88" />

          <Text style={styles.infoLabel}>COD</Text>

          <Text style={styles.infoValue}>
            {parcel.codAmount.toFixed(2)} PLN
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={22} color="#737B88" />

          <Text style={styles.infoLabel}>Delivery window</Text>

          <Text style={styles.infoValue}>{parcel.deliveryWindow}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>NOTES</Text>

        <View style={styles.notesRow}>
          <Ionicons name="document-text-outline" size={24} color="#737B88" />

          <Text style={styles.notes}>{parcel.notes}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>ROUTE TO DELIVERY</Text>

        <View style={styles.mapPlaceholder}>
          <Ionicons name="map-outline" size={34} color="#737B88" />

          <Text style={styles.mapText}>Map preview</Text>

          <Text style={styles.mapDistance}>{parcel.distance} km</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>PACKAGE VERIFICATION</Text>

        <View style={styles.verificationRow}>
          <View>
            <Ionicons name="barcode-outline" size={70} color="#111111" />

            <Text style={styles.barcodeId}>Parcel #{parcel.id}</Text>
          </View>

          <Pressable
            style={styles.scanButton}
            onPress={() => router.push("/scan")}
          >
            <Ionicons name="scan-outline" size={26} color="#111111" />

            <Text style={styles.scanText}>Scan</Text>
          </Pressable>
        </View>
      </View>

      <Pressable
        style={styles.navigateButton}
        onPress={() => router.push("/route")}
      >
        <Ionicons name="navigate" size={21} color="#FFFFFF" />

        <Text style={styles.navigateText}>Navigate</Text>
      </Pressable>

      <Pressable
        style={styles.deliveredButton}
        onPress={() => {
          updateParcelStatus(parcel.id, "delivered");
        }}
      >
        <Ionicons name="checkmark-circle" size={22} color="#FFFFFF" />

        <Text style={styles.deliveredText}>Mark Delivered</Text>
      </Pressable>

      <Pressable
        style={styles.failedButton}
        onPress={() => {
          updateParcelStatus(parcel.id, "failed");
        }}
      >
        <Ionicons name="close-circle" size={22} color="#E53935" />

        <Text style={styles.failedText}>Report Failed</Text>
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
    paddingBottom: 130,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  backButton: {
    width: 42,
    height: 42,
    justifyContent: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginLeft: 4,
  },

  mainCard: {
    marginTop: 24,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
  },

  addressRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  addressIcon: {
    width: 54,
    height: 54,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F5FA",
  },

  addressInfo: {
    flex: 1,
    marginLeft: 14,
  },

  address: {
    fontSize: 19,
    fontWeight: "700",
  },

  city: {
    marginTop: 3,
    fontSize: 14,
    color: "#7B8492",
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },

  pending: {
    backgroundColor: "#FFF1E3",
  },

  delivered: {
    backgroundColor: "#E6F7EC",
  },

  failed: {
    backgroundColor: "#FDE8E8",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "capitalize",
  },

  divider: {
    height: 1,
    backgroundColor: "#EDF0F4",
    marginVertical: 18,
  },

  infoRow: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
  },

  infoLabel: {
    width: 115,
    marginLeft: 12,
    color: "#7B8492",
  },

  infoValue: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
  },

  callButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#EEF4FD",
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    marginTop: 14,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#7B8492",
    letterSpacing: 0.8,
  },

  notesRow: {
    flexDirection: "row",
    marginTop: 16,
    alignItems: "center",
  },

  notes: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    lineHeight: 21,
  },

  mapPlaceholder: {
    height: 150,
    marginTop: 16,
    borderRadius: 16,
    backgroundColor: "#EEF2F6",
    alignItems: "center",
    justifyContent: "center",
  },

  mapText: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: "600",
  },

  mapDistance: {
    marginTop: 3,
    color: "#7B8492",
  },

  verificationRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
  },

  barcodeId: {
    textAlign: "center",
    color: "#7B8492",
  },

  scanButton: {
    width: 70,
    height: 70,
    borderRadius: 16,
    backgroundColor: "#F2F5FA",
    alignItems: "center",
    justifyContent: "center",
  },

  scanText: {
    marginTop: 3,
    fontSize: 12,
  },

  navigateButton: {
    marginTop: 20,
    height: 58,
    borderRadius: 17,
    backgroundColor: "#111111",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  navigateText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  deliveredButton: {
    marginTop: 12,
    height: 58,
    borderRadius: 17,
    backgroundColor: "#36A85C",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  deliveredText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  failedButton: {
    marginTop: 12,
    height: 58,
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: "#E53935",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  failedText: {
    color: "#E53935",
    fontSize: 16,
    fontWeight: "700",
  },

  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  notFoundTitle: {
    fontSize: 24,
    fontWeight: "700",
  },

  backLink: {
    marginTop: 14,
    color: "#245EB7",
  },
});
