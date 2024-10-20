import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Modal, TextInput, Button} from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from 'react-native/Libraries/NewAppScreen';
// import Voice from '@react-native-voice/voice';
const Stack = createStackNavigator();

// Set notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Function to check if the user is within a radius
function isWithinRadius(currentLat, currentLon, targetLat, targetLon, radius) {
  const earthRadius = 3958.8; // Radius of the Earth in miles

  const toRadians = (degrees) => degrees * (Math.PI / 180);

  const lat1 = toRadians(currentLat);
  const lon1 = toRadians(currentLon);
  const lat2 = toRadians(targetLat);
  const lon2 = toRadians(targetLon);

  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadius * c;
  
  return distance <= radius;
}

// Home Screen Component
function HomeScreen({ navigation }) {
  const [radius, setRadius] = useState(10);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const checkLocationPermission = async () => {
      let { status } = await Location.getForegroundPermissionsAsync();
      if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        navigation.navigate('Welcome');
      }
    };

    checkLocationPermission();
  }, []);

  const handleNearMePress = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Permission to access location was denied');
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      navigation.navigate('Welcome');
    } catch (error) {
      Alert.alert('Error', 'Could not get your location. Please try again.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Threat Track</Text>
      
      <Text style={styles.label}>Press to add your location</Text>
      <TouchableOpacity style={styles.locationButton} onPress={handleNearMePress}>
        <Icon name="navigate" size={100} color="black" />
      </TouchableOpacity>

      <Text style={styles.label}>Notifications Radius</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        minimumTrackTintColor="#1e90ff"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor="#1e90ff"
        value={radius}
        onValueChange={setRadius}
        step={1}
      />

      <Text style={styles.label}>Manual Location Entry</Text>
      <View style={styles.separator} />
    </View>
  );
}

// Welcome Screen Component
function WelcomeScreen() {
  const [threatLevel, setThreatLevel] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [threatDetails, setThreatDetails] = useState('');
  // const [result, setResult] = useState('');
  // const [error, setError] = useState('');
  // const [isRecording, setIsRecording] = useState(false);
  
  // Voice.onSpeechStart = () => setIsRecording(true);
  // Voice.onSpeechEnd = () => setIsRecording(false);
  // Voice.onSpeechError = err => setError(err.error);
  // Voice.onSpeechResults = result => setResult(result.value[0]);

  // const startRecording = async () => {
  //   const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
  //   if (status !== 'granted') {
  //     Alert.alert('Permission Denied', 'Permission to access the microphone was denied');
  //     return;
  //   }

  //   try {
  //     await Voice.start(`en-US`);
  //   } catch (err) {
  //     setError(err)
  //   }
  // }

  // const stopRecording = async () => {
  //   try {
  //     await Voice.stop();
  //   } catch (err) {
  //     setError(err)
  //   }
  // }

  const handleAddThreat = () => {
    setModalVisible(true);
  }
  
  const handleSaveThreat = () => {
    setModalVisible(false);
    console.log('Threat Details', threatDetails);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World</Text>

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
            
            {/* <TouchableOpacity
              style={styles.microphoneButton}
              onPress={isRecording ? stopRecording : startRecording}>
              <Icon name="mic" size={28} color="black" />
            </TouchableOpacity> */}

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

// App Component
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
  locationButton: {
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider: {
    width: '80%',
    height: 40,
    marginBottom: 40,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  sliderLabelLeft: {
    marginLeft: 30,
  },
  sliderLabelRight: {
    marginRight: 30,
  },

  sliderLabel: {
    fontSize: 16,
    marginBottom: -10,
    textAlign: 'center',
    marginTop: 10,
  },
  separator: {
    width: '15%',
    height: 1,
    backgroundColor: '#d3d3d3',
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1c64ff', 
    paddingVertical: 10,        
    paddingHorizontal: 20,  
    borderRadius: 30,           
    elevation: 3,
    alignItems: 'center',
    alignSelf: 'center',
    width: 150
  },
  buttonText: {
    color: '#fff',               
    fontSize: 18,                
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0)',
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
    height: '40%'
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    marginTop: 15

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
  microphoneButton: {
    padding: 10,
    borderRadius: 30,
    marginLeft: 10,
  },
  cancelButton: {
    marginTop: 10,
    color: '#e74c3c',
    textAlign: 'center',
  }
});