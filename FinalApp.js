import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, Slider, Platform } from 'react-native';
import MapView, { Heatmap, PROVIDER_GOOGLE } from 'react-native-maps';

function WelcomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [threatDetails, setThreatDetails] = useState('');
  const [threatLevel, setThreatLevel] = useState(1);

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

      <TouchableOpacity style={styles.button} onPress={handleAddThreat}>
        <Text style={styles.buttonText}>Add a threat</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Add Threat Details</Text>
            <Text style={styles.sliderLabel}>Threat level</Text>
            <View style={styles.sliderRow}>
              <Text style={styles.sliderLabelLeft}>0</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={10}
                minimumTrackTintColor="#1e90ff"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#1e90ff"
                value={threatLevel}
                onValueChange={setThreatLevel}
                step={1}
              />
              <Text style={styles.sliderLabelRight}>10</Text>
            </View>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder="Enter threat details"
                value={threatDetails}
                onChangeText={setThreatDetails}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSaveThreat}>
              <Text style={styles.buttonText}>Save Threat</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButton}>Cancel</Text>
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
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    height: '40%',
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  slider: {
    width: '80%',
    height: 40,
    marginBottom: 20,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  sliderLabelLeft: {
    marginLeft: 30,
  },
  sliderLabelRight: {
    marginRight: 30,
  },
  sliderLabel: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    height: 40,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 10,
    flex: 1,
    paddingHorizontal: 10,
  },
  cancelButton: {
    marginTop: 10,
    color: '#e74c3c',
    textAlign: 'center',
  },
});

export default WelcomeScreen;
