import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";

import type { BarcodeScanningResult } from "expo-camera";
import { router } from "expo-router";
import { useState } from "react";

import { Pressable, StyleSheet, Text, View } from "react-native";

import { useParcels } from "../context/ParcelsContext";

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanned, setIsScanned] = useState(false);
  const [scanMessage, setScanMessage] = useState(
    "Point the camera at the parcel barcode or QR code.",
  );

  const { parcels } = useParcels();

  function handleBarcodeScanned(result: BarcodeScanningResult) {
    if (isScanned) {
      return;
    }

    setIsScanned(true);

    const parcelId = Number(result.data.match(/\d+/)?.[0]);

    if (!parcelId) {
      setScanMessage(`Scanned: ${result.data}`);
      return;
    }

    const parcel = parcels.find((item) => item.id === parcelId);

    if (!parcel) {
      setScanMessage(`Parcel #${parcelId} was not found.`);
      return;
    }

    setScanMessage(`Parcel #${parcel.id} found. Opening delivery...`);

    setTimeout(() => {
      router.push(`/delivery/${parcel.id}`);
    }, 500);
  }

  function resetScanner() {
    setIsScanned(false);
    setScanMessage("Point the camera at the parcel barcode or QR code.");
  }
  function handleDemoScan() {
    const demoParcel = parcels.find((parcel) => parcel.id === 10243);

    if (!demoParcel) {
      setScanMessage("Demo parcel not found.");
      return;
    }

    setIsScanned(true);

    setScanMessage(`Parcel #${demoParcel.id} found. Opening delivery...`);

    setTimeout(() => {
      router.push(`/delivery/${demoParcel.id}`);
    }, 500);
  }
  if (!permission) {
    return (
      <View style={styles.centered}>
        <Text style={styles.loadingText}>Checking camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <View style={styles.permissionIcon}>
          <Ionicons name="camera-outline" size={34} color="#111111" />
        </View>

        <Text style={styles.permissionTitle}>Camera access</Text>

        <Text style={styles.permissionText}>
          CourierFlow needs camera access to scan parcel barcodes and QR codes.
        </Text>

        <Pressable style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Allow camera</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Scan</Text>

        <View style={styles.headerIcon}>
          <Ionicons name="scan-outline" size={22} color="#111111" />
        </View>
      </View>

      <Text style={styles.subtitle}>
        Scan a parcel to open its delivery details.
      </Text>

      <View style={styles.cameraCard}>
        <CameraView
          style={StyleSheet.absoluteFill}
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: [
              "qr",
              "code128",
              "code39",
              "ean13",
              "ean8",
              "upc_a",
              "upc_e",
            ],
          }}
          onBarcodeScanned={isScanned ? undefined : handleBarcodeScanned}
        />

        <View style={styles.overlay}>
          <View style={styles.scanFrame}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />

            <View style={styles.scanLine} />
          </View>
        </View>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoIcon}>
          <Ionicons
            name={
              isScanned
                ? "checkmark-circle-outline"
                : "information-circle-outline"
            }
            size={24}
            color="#111111"
          />
        </View>

        <Text style={styles.infoText}>{scanMessage}</Text>
      </View>
      {__DEV__ && (
        <Pressable style={styles.demoButton} onPress={handleDemoScan}>
          <Ionicons name="flask-outline" size={20} color="#111111" />

          <Text style={styles.demoButtonText}>Demo scan — Parcel #10243</Text>
        </Pressable>
      )}
      {isScanned && (
        <Pressable style={styles.scanAgainButton} onPress={resetScanner}>
          <Ionicons name="scan" size={20} color="#FFFFFF" />

          <Text style={styles.scanAgainText}>Scan again</Text>
        </Pressable>
      )}

      <View style={styles.helpCard}>
        <Text style={styles.helpTitle}>How scanning works</Text>

        <View style={styles.helpRow}>
          <Text style={styles.helpNumber}>1</Text>
          <Text style={styles.helpText}>
            Hold the barcode inside the frame.
          </Text>
        </View>

        <View style={styles.helpRow}>
          <Text style={styles.helpNumber}>2</Text>
          <Text style={styles.helpText}>
            CourierFlow detects the parcel number.
          </Text>
        </View>

        <View style={styles.helpRow}>
          <Text style={styles.helpNumber}>3</Text>
          <Text style={styles.helpText}>
            The matching delivery opens automatically.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    paddingHorizontal: 20,
    paddingTop: 65,
  },

  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F7FA",
  },

  loadingText: {
    color: "#737B88",
    fontSize: 15,
  },

  permissionContainer: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },

  permissionIcon: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  permissionTitle: {
    marginTop: 20,
    fontSize: 26,
    fontWeight: "800",
  },

  permissionText: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 22,
    color: "#737B88",
    textAlign: "center",
  },

  permissionButton: {
    marginTop: 26,
    height: 56,
    paddingHorizontal: 28,
    borderRadius: 17,
    backgroundColor: "#111111",
    alignItems: "center",
    justifyContent: "center",
  },

  permissionButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 34,
    fontWeight: "800",
  },

  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: "#737B88",
  },

  cameraCard: {
    height: 390,
    marginTop: 24,
    borderRadius: 26,
    overflow: "hidden",
    backgroundColor: "#111111",
  },

  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.18)",
  },
  scanFrame: {
    width: 250,
    height: 180,
    position: "relative",
  },

  corner: {
    position: "absolute",
    width: 34,
    height: 34,
    borderColor: "#FFFFFF",
  },

  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 10,
  },

  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 10,
  },

  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 10,
  },

  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 10,
  },

  scanLine: {
    position: "absolute",
    left: 12,
    right: 12,
    top: "50%",
    height: 2,
    backgroundColor: "#FFFFFF",
  },

  infoCard: {
    marginTop: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  infoIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#EEF4FD",
    alignItems: "center",
    justifyContent: "center",
  },

  infoText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    lineHeight: 20,
    color: "#505866",
  },

  scanAgainButton: {
    marginTop: 14,
    height: 54,
    borderRadius: 17,
    backgroundColor: "#111111",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },

  scanAgainText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  helpCard: {
    marginTop: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
  },

  helpTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 14,
  },

  helpRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 9,
  },

  helpNumber: {
    width: 26,
    height: 26,
    borderRadius: 13,
    textAlign: "center",
    lineHeight: 26,
    backgroundColor: "#EEF2F6",
    fontSize: 12,
    fontWeight: "700",
  },

  helpText: {
    flex: 1,
    marginLeft: 10,
    color: "#606876",
    fontSize: 14,
  },
  demoButton: {
    marginTop: 14,
    height: 54,
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    borderWidth: 1,
    borderColor: "#E4E8EE",
  },

  demoButtonText: {
    color: "#111111",
    fontSize: 14,
    fontWeight: "700",
  },
});
