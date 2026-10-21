import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import MapView, {
  Marker,
  Polyline,
} from 'react-native-maps';

import { useParcels } from '../context/ParcelsContext';

const routeCoordinates = [
  {
    id: 10243,
    latitude: 54.3787,
    longitude: 18.6035,
  },
  {
    id: 10244,
    latitude: 54.4055,
    longitude: 18.5885,
  },
  {
    id: 10245,
    latitude: 54.3497,
    longitude: 18.6497,
  },
  {
    id: 10246,
    latitude: 54.433,
    longitude: 18.566,
  },
  {
    id: 10247,
    latitude: 54.3458,
    longitude: 18.6546,
  },
];

export default function RouteScreen() {
  const { parcels } = useParcels();

  const pendingParcels = parcels.filter(
    (parcel) => parcel.status === 'pending'
  );

  const nextParcel = pendingParcels[0];

  const nextCoordinate = nextParcel
    ? routeCoordinates.find(
        (point) => point.id === nextParcel.id
      )
    : undefined;

  const totalDistance = parcels.reduce(
    (sum, parcel) => sum + parcel.distance,
    0
  );

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: 54.378,
          longitude: 18.615,
          latitudeDelta: 0.12,
          longitudeDelta: 0.12,
        }}
        showsCompass={false}
        showsScale={false}
      >
        <Polyline
          coordinates={routeCoordinates.map(
            ({ latitude, longitude }) => ({
              latitude,
              longitude,
            })
          )}
          strokeWidth={4}
          strokeColor="#111111"
        />

        {routeCoordinates.map((point, index) => {
          const parcel = parcels.find(
            (item) => item.id === point.id
          );

          const isDelivered =
            parcel?.status === 'delivered';

          const isFailed =
            parcel?.status === 'failed';

          return (
            <Marker
              key={point.id}
              coordinate={{
                latitude: point.latitude,
                longitude: point.longitude,
              }}
              title={parcel?.address}
              description={`Parcel #${point.id}`}
              pinColor={
                isDelivered
                  ? '#2EA85A'
                  : isFailed
                    ? '#D9363E'
                    : '#111111'
              }
            >
              <View
                style={[
                  styles.marker,
                  isDelivered &&
                    styles.markerDelivered,
                  isFailed && styles.markerFailed,
                ]}
              >
                <Text style={styles.markerText}>
                  {index + 1}
                </Text>
              </View>
            </Marker>
          );
        })}

        {nextCoordinate && (
          <Marker
            coordinate={{
              latitude: nextCoordinate.latitude,
              longitude: nextCoordinate.longitude,
            }}
            title="Next stop"
          />
        )}
      </MapView>

      <View style={styles.topArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Route</Text>

          <Pressable style={styles.layersButton}>
            <Ionicons
              name="layers-outline"
              size={22}
              color="#111111"
            />
          </Pressable>
        </View>

        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <View style={styles.metricIcon}>
              <Ionicons
                name="list-outline"
                size={20}
                color="#245EB7"
              />
            </View>

            <View>
              <Text style={styles.metricValue}>
                {pendingParcels.length} stops left
              </Text>

              <Text style={styles.metricLabel}>
                of {parcels.length}
              </Text>
            </View>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.metricIcon}>
              <Ionicons
                name="git-branch-outline"
                size={20}
                color="#111111"
              />
            </View>

            <View>
              <Text style={styles.metricValue}>
                {totalDistance.toFixed(1)} km
              </Text>

              <Text style={styles.metricLabel}>
                total route
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.bottomCard}>
        {nextParcel ? (
          <>
            <Text style={styles.sectionLabel}>
              NEXT STOP
            </Text>

            <View style={styles.nextStopRow}>
              <View style={styles.locationIcon}>
                <Ionicons
                  name="location-outline"
                  size={24}
                  color="#111111"
                />
              </View>

              <View style={styles.nextStopInfo}>
                <Text style={styles.address}>
                  {nextParcel.address}
                </Text>

                <Text style={styles.city}>
                  {nextParcel.city},{' '}
                  {nextParcel.postalCode}
                </Text>
              </View>

              <View style={styles.etaBox}>
                <Ionicons
                  name="time-outline"
                  size={21}
                  color="#239A4B"
                />

                <View>
                  <Text style={styles.etaValue}>
                    8 min
                  </Text>

                  <Text style={styles.etaLabel}>
                    ETA
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.actionsRow}>
              <Pressable
                style={styles.navigateButton}
                onPress={() => {
                  // Real turn-by-turn navigation comes later.
                }}
              >
                <Ionicons
                  name="navigate"
                  size={21}
                  color="#FFFFFF"
                />

                <Text style={styles.navigateText}>
                  Navigate
                </Text>
              </Pressable>

              <Pressable
                style={styles.openButton}
                onPress={() =>
                  router.push(
                    `/delivery/${nextParcel.id}`
                  )
                }
              >
                <Ionicons
                  name="cube-outline"
                  size={21}
                  color="#111111"
                />

                <Text style={styles.openText}>
                  Open delivery
                </Text>
              </Pressable>
            </View>
          </>
        ) : (
          <View style={styles.completeState}>
            <View style={styles.completeIcon}>
              <Ionicons
                name="checkmark"
                size={26}
                color="#239A4B"
              />
            </View>

            <Text style={styles.completeTitle}>
              Route complete
            </Text>

            <Text style={styles.completeText}>
              There are no pending deliveries left.
            </Text>

            <Pressable
              style={styles.deliveriesButton}
              onPress={() =>
                router.push('/deliveries')
              }
            >
              <Text style={styles.deliveriesButtonText}>
                View deliveries
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  topArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 65,
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 34,
    fontWeight: '800',
  },

  layersButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  metricsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },

  metricCard: {
    flex: 1,
    minHeight: 78,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },

  metricIcon: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: '#EEF4FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  metricValue: {
    fontSize: 15,
    fontWeight: '800',
  },

  metricLabel: {
    marginTop: 2,
    fontSize: 12,
    color: '#737B88',
  },

  marker: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 3,
    borderColor: '#111111',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  markerDelivered: {
    borderColor: '#239A4B',
    backgroundColor: '#E6F7EC',
  },

  markerFailed: {
    borderColor: '#D9363E',
    backgroundColor: '#FDE8E8',
  },

  markerText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111111',
  },

  bottomCard: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: 18,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },

  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#737B88',
    letterSpacing: 0.8,
  },

  nextStopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
  },

  locationIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#F2F5FA',
    alignItems: 'center',
    justifyContent: 'center',
  },

  nextStopInfo: {
    flex: 1,
    marginLeft: 12,
  },

  address: {
    fontSize: 18,
    fontWeight: '800',
  },

  city: {
    marginTop: 3,
    fontSize: 13,
    color: '#7B8492',
  },

  etaBox: {
    minWidth: 94,
    borderRadius: 17,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#F2F8F4',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  etaValue: {
    fontSize: 15,
    fontWeight: '800',
  },

  etaLabel: {
    fontSize: 11,
    color: '#737B88',
  },

  divider: {
    height: 1,
    backgroundColor: '#EDF0F4',
    marginVertical: 18,
  },

  actionsRow: {
    flexDirection: 'row',
    gap: 10,
  },

  navigateButton: {
    flex: 1,
    height: 54,
    borderRadius: 17,
    backgroundColor: '#111111',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  navigateText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  openButton: {
    flex: 1,
    height: 54,
    borderRadius: 17,
    backgroundColor: '#F2F5FA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  openText: {
    color: '#111111',
    fontSize: 14,
    fontWeight: '700',
  },

  completeState: {
    alignItems: 'center',
    paddingVertical: 8,
  },

  completeIcon: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: '#E6F7EC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  completeTitle: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '800',
  },

  completeText: {
    marginTop: 5,
    color: '#737B88',
    fontSize: 14,
  },

  deliveriesButton: {
    marginTop: 18,
    height: 50,
    paddingHorizontal: 24,
    borderRadius: 16,
    backgroundColor: '#111111',
    alignItems: 'center',
    justifyContent: 'center',
  },

  deliveriesButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
