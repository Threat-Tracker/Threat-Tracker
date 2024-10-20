import React, { useState } from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity, TextInput, Slider, Platform } from 'react-native';
import MapView, { Heatmap, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';

function WelcomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [radiusModalVisible, setRadiusModalVisible] = useState(false);
  const [threatDetails, setThreatDetails] = useState('');
  const [notificationRadius, setNotificationRadius] = useState(10);

  const points = [
    { latitude: 37.782551, longitude: -122.445368, weight: 1 },
    { latitude: 37.782745, longitude: -122.444586, weight: 1 },
    // Add more points as needed
  ];

  const handleAddThreat = () => {
    setModalVisible(true);
  };

  const handleSaveThreat = () => {
    setModalVisible(false);
    console.log('Threat Details:', threatDetails);
  };

  const handleRadiusSet = () => {
    setRadiusModalVisible(false);
    console.log('Notification Radius:', notificationRadius);
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Heatmap
          points={points}
          radius={20}
          opacity={1}
          gradient={{
            colors: ["yellow", "red"],
            startPoints: Platform.OS === 'ios' ? [0.01, 0.1] : [0.02, 0.66],
            colorMapSize: 2000
          }}
        />
      </MapView>

      <TouchableOpacity style={styles.settingsIcon} onPress={() => setRadiusModalVisible(true)}>
        <Icon name="settings-outline" size={30} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleAddThreat}>
        <Text style={styles.buttonText}>Add a threat</Text>
      </TouchableOpacity>

      {/* Threat Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Add Threat Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter threat details"
              value={threatDetails}
              onChangeText={setThreatDetails}
            />
            <TouchableOpacity style={styles.button} onPress={handleSaveThreat}>
              <Text style={styles.buttonText}>Save Threat</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Notification Radius Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={radiusModalVisible}
        onRequestClose={() => setRadiusModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.radiusModalView}>
            <Text style={styles.modalTitle}>Notification Radius</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              minimumTrackTintColor="#1e90ff"
              maximumTrackTintColor="#d3d3d3"
              thumbTintColor="#1e90ff"
              value={notificationRadius}
              onValueChange={setNotificationRadius}
              step={1}
            />
            <Text style={styles.sliderLabel}>Miles</Text>
            <View style={styles.sliderLabels}>
              <Text>0</Text>
              <Text>100</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleRadiusSet}>
              <Text style={styles.buttonText}>Set</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  settingsIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
    elevation: 3,
  },
  button: {
    backgroundColor: '#1c64ff', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 3,
    alignItems: 'center',
    alignSelf: 'center',
    width: 150,
    position: 'absolute',
    bottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: '40%',
  },
  radiusModalView: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: '35%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  slider: {
    width: '80%',
    height: 40,
  },
  sliderLabel: {
    fontSize: 16,
    marginTop: 10,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  cancelButton: {
    marginTop: 10,
    color: '#e74c3c',
    textAlign: 'center',
  },
});

export default WelcomeScreen;
