import React, { useEffect, useState } from 'react';
import { Image, View, StyleSheet, Modal, Text, TouchableOpacity, TextInput } from 'react-native';
import MapView, { Heatmap, PROVIDER_GOOGLE, Marker } from 'react-native-maps';
// import Voice from '@react-native-voice/voice';


function MapScreen() {
  const [threatLevel, setThreatLevel] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [threatDetails, setThreatDetails] = useState('');
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [radiusModalVisible, setRadiusModalVisible] = useState(false);
  const [radiusDetails, setRadiusDetails] = useState('');
  const [points, setPoints] = useState([]);


    useEffect(() => {
        // Define the async function inside useEffect
        const fetchData = async () => {
            try {
                const requestOptions = {
                    method: "GET",
                    redirect: "follow"
                };

                let response = await fetch("https://rxh-prod-api-threattracker.fly.dev/locations", requestOptions);
                let json = await response.json();

                // Assuming convertData is defined elsewhere in your code
                const convertedPoints = convertData(json);
                setPoints(convertedPoints);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData(); // Call the async function

        // No cleanup needed, so we return nothing or undefined explicitly
        return undefined;
    }, []); // Empty dependency array to run only once

    useEffect(() => {
        console.log(points)
    },[points])

  const handleAddThreat = () => {
    setModalVisible(true);


  };

  const handleRadius = () => {
    setRadiusModalVisible(true)
  };

  const handleCancel = () => {
    setThreatDetails('');
    setModalVisible(false)
  }

  const radiusCancel = () => {
    setRadiusDetails('');
    setRadiusModalVisible(false);
  }

  function convertData(data) {
    return data.map(item => ({
        latitude: item.latitude,
        longitude: item.longitude,
        weight: item.weight
    }));
}

  const handleSaveThreat = () => {
    setModalVisible(false);
    console.log('Threat Details', threatDetails);
    setThreatDetails('');
  };

  const radiusSaveThreat = () => {
    setRadiusModalVisible(false);
    console.log('Radius Details', )
    setRadiusDetails('');
  }
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 37.78225,
          longitude: -122.4124,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Heatmap
          points={points}
          radius={50}
          opacity={1}
          gradient={{
            colors: ["black", "yellow", "red"],
            // startPoints: Platform.OS === 'ios' ? [0.01, 0.1] : [0.02, 0.66],
            startPoints: [0.01, 0.2, 1.0],
            colorMapSize: 256
          }}
        />
        <Marker
            coordinate = {{latitude: 37.782872,longitude: -122.401}}
            title="User Location"/>
      </MapView>

      <TouchableOpacity style={styles.parentIcon} onPress={handleRadius}>
        <Image style={styles.settingsIcon} source={require("./xd.png")}/>
      </TouchableOpacity>

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
            <TextInput
              style={styles.input}
              placeholder="Enter threat details"
              value={threatDetails}
              onChangeText={setThreatDetails}
            />

            <TouchableOpacity style={styles.button} onPress={handleSaveThreat}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

          </View>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text onPress={handleCancel} style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={radiusModalVisible}
        onRequestClose={() => setRadiusModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Notification Radius</Text>
            <TextInput
              style={styles.input}
              placeholder="Whats the danger level?"
              value={radiusDetails}
              onChangeText={setRadiusDetails}
            />

            <TouchableOpacity style={styles.button} onPress={radiusSaveThreat}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

          </View>
        </View>
        <TouchableOpacity onPress={() => setRadiusModalVisible(false)}>
              <Text onPress={radiusCancel} style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

// export function VoiceRecognition() {
//     const [isListening, setIsListening] = useState(false);
//     const [recognizedText, setRecognizedText] = useState('');
//     const [partialResults, setPartialResults] = useState([]);
  
//     useEffect(() => {
//       Voice.onSpeechStart = onSpeechStart;
//       Voice.onSpeechRecognized = onSpeechRecognized;
//       Voice.onSpeechEnd = onSpeechEnd;
//       Voice.onSpeechError = onSpeechError;
//       Voice.onSpeechPartialResults = onSpeechPartialResults; 
  
//       return () => {
//         Voice.destroy().then(Voice.removeAllListeners);
//       };
//     }, []);
  
//     const onSpeechStart = () => console.log('Speech started');
//     const onSpeechRecognized = () => console.log('Speech recognized');
//     const onSpeechEnd = () => setIsListening(false);
//     const onSpeechError = (error) => console.error(error);
//     const onSpeechResults = (event) => {
//       setRecognizedText(event.value[0]);
//       analyzeSpeech(event.value[0]);
//     };
//     const onSpeechPartialResults = (event) => {
//       setPartialResults(event.value);
//     };
  
//     const startListening = async () => {
//       try {
//         await Voice.start('en-US');
//         setIsListening(true);
//       } catch (error) {
//         console.error(error);
//       }
//     };
  
//     const stopListening = async () => {
//       try {
//         await Voice.stop();
//         setIsListening(false);
//       } catch (error) {
//         console.error(error);
//       }
//     };
  
//     const analyzeSpeech = (text) => {
//       // Implement your speech analysis logic here
//       console.log('Analyzing speech:', text);
//     };
  
//     return (
//       <View style={styles.container}>
//         <Text style={styles.titleText}>Voice Recognition</Text>
//         <TouchableOpacity
//           style={[styles.button, isListening && styles.buttonListening]}
//           onPress={isListening ? stopListening : startListening}
//         >
//           <Text style={styles.buttonText}>
//             {isListening ? 'Stop Listening' : 'Start Listening'}
//           </Text>
//         </TouchableOpacity>
//         <Text style={styles.partialText}>{partialResults.join(' ')}</Text>
//         <Text style={styles.recognizedText}>{recognizedText}</Text>
//       </View>
//     );
//   }
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
    bottom: 60,
  },
  parentIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    position: 'absolute',
    top: 50,
    right: 20
  },

  settingsIcon: {
    height: 30,
    width: 30
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
    height: '50%'
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: '40%',
    textAlign: 'center'
  },
  cancelButton: {
    marginTop: 10,
    color: '#e74c3c',
    textAlign: 'center',
    position: 'absolute',
    bottom: 25,
    left: '44%'
  },
});


export default MapScreen;

// import React, { useState, useEffect } from 'react';

// import AudioRecorderPlayer, {
//     AudioEncoderAndroidType,
//     AudioSourceAndroidType,
//     AVEncoderAudioQualityIOSType,
//     AVEncodingOption,
// }, start from 'react-native-audio-recorder-player';

// const App = () => {
//     const [recordSecs, setRecordSecs] = useState(0);
//     const [recordTime, setRecordTime] = useState('00:00:00');

//     const audioRecorderPlayer = new AudioRecorderPlayer();

//     useEffect(() => {
//         // Optional: Set the subscription duration (similar to componentDidMount)
//         audioRecorderPlayer.setSubscriptionDuration(0.09);
//     }, []);

//     const onStartRecord = async () => {
//         const path = 'hello.m4a';
//         const audioSet = {
//             AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
//             AudioSourceAndroid: AudioSourceAndroidType.MIC,
//             AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
//             AVNumberOfChannelsKeyIOS: 2,
//             AVFormatIDKeyIOS: AVEncodingOption.aac,
//         };

//         console.log('audioSet', audioSet);

//         try {
//             const uri = await audioRecorderPlayer.startRecorder(path, audioSet);
//             console.log(`uri: ${uri}`);

//             audioRecorderPlayer.addRecordBackListener((e) => {
//                 setRecordSecs(e.current_position);
//                 setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.current_position)));
//             });
//         } catch (error) {
//             console.error('Failed to start recording:', error);
//         }
//     };

//     return (


// <TouchableOpacity style={styles.button} onPress={onStartRecord}>
//              <Text style={styles.buttonText}>Hello</Text>
//              </TouchableOpacity>

//     );
// };

// export default App;