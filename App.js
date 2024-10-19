import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Platform
} from 'react-native';
import MapView, { Heatmap, PROVIDER_GOOGLE } from 'react-native-maps';

export default class HeatMap extends Component {

  static navigationOptions = {
    title: 'San Francisco',
  };

  state = {
    initialPosition: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
  }

  points = [
    { latitude: 37.782551, longitude: -122.445368, weight: 1 },
    { latitude: 37.782745, longitude: -122.444586, weight: 1 },
    { latitude: 37.782842, longitude: -122.443688, weight: 1 },
    { latitude: 37.782919, longitude: -122.442815, weight: 1 },
    { latitude: 37.782992, longitude: -122.442112, weight: 1 },
    { latitude: 37.7831, longitude: -122.441461, weight: 1 },
    { latitude: 37.783206, longitude: -122.440829, weight: 1 },
    { latitude: 37.783273, longitude: -122.440324, weight: 1 },
    { latitude: 37.783316, longitude: -122.440023, weight: 1 },
    { latitude: 37.783357, longitude: -122.439794, weight: 1 },
    { latitude: 37.783371, longitude: -122.439687, weight: 1 },
    { latitude: 37.783368, longitude: -122.439666, weight: 1 },
    { latitude: 37.783383, longitude: -122.439594, weight: 1 },
    { latitude: 37.783508, longitude: -122.439525, weight: 1 },
    { latitude: 37.783842, longitude: -122.439591, weight: 1 },
    { latitude: 37.784147, longitude: -122.439668, weight: 1 },
    { latitude: 37.784206, longitude: -122.439686, weight: 1 },
    { latitude: 37.784386, longitude: -122.43979, weight: 1 },
    { latitude: 37.784701, longitude: -122.439902, weight: 1 },
    { latitude: 37.784965, longitude: -122.439938, weight: 1 },
    { latitude: 37.78501, longitude: -122.439947, weight: 1 },
    { latitude: 37.78536, longitude: -122.439952, weight: 1 },
    { latitude: 37.785715, longitude: -122.44003, weight: 1 },
    { latitude: 37.786117, longitude: -122.440119, weight: 1 },
    { latitude: 37.786564, longitude: -122.440209, weight: 1 },
    { latitude: 37.786905, longitude: -122.44027, weight: 1 },
    { latitude: 37.786956, longitude: -122.440279, weight: 1 },
    { latitude: 37.800224, longitude: -122.43352, weight: 1 },
    { latitude: 37.800155, longitude: -122.434101, weight: 1 },
    { latitude: 37.80016, longitude: -122.43443, weight: 1 },
    { latitude: 37.800378, longitude: -122.434527, weight: 1 },
    { latitude: 37.800738, longitude: -122.434598, weight: 1 },
    { latitude: 37.800938, longitude: -122.43465, weight: 1 },
    { latitude: 37.801024, longitude: -122.434889, weight: 1 },
    { latitude: 37.800955, longitude: -122.435392, weight: 1 },
    { latitude: 37.800886, longitude: -122.435959, weight: 1 },
    { latitude: 37.800811, longitude: -122.436275, weight: 1 },
    { latitude: 37.800788, longitude: -122.436299, weight: 1 },
    { latitude: 37.800719, longitude: -122.436302, weight: 1 },
    { latitude: 37.800702, longitude: -122.436298, weight: 1 },
    { latitude: 37.800661, longitude: -122.436273, weight: 1 },
    { latitude: 37.800395, longitude: -122.436172, weight: 1 },
    { latitude: 37.800228, longitude: -122.436116, weight: 1 },
    { latitude: 37.789371, longitude: -122.391701, weight: 1 },
    { latitude: 37.789722, longitude: -122.390952, weight: 1 },
    { latitude: 37.790315, longitude: -122.390305, weight: 1 },
    { latitude: 37.790738, longitude: -122.389616, weight: 1 },
    { latitude: 37.779448, longitude: -122.438702, weight: 1 },
    { latitude: 37.779023, longitude: -122.438585, weight: 1 },
    { latitude: 37.778542, longitude: -122.438492, weight: 1 },
    { latitude: 37.7781, longitude: -122.438411, weight: 1 },
    { latitude: 37.777986, longitude: -122.438376, weight: 1 },
    { latitude: 37.77768, longitude: -122.438313, weight: 1 },
    { latitude: 37.777316, longitude: -122.438273, weight: 1 },
    { latitude: 37.777135, longitude: -122.438254, weight: 1 },
    { latitude: 37.776987, longitude: -122.438303, weight: 1 },
    { latitude: 37.776946, longitude: -122.438404, weight: 1 },
    { latitude: 37.776944, longitude: -122.438467, weight: 1 },
    { latitude: 37.776892, longitude: -122.438459, weight: 1 },
    { latitude: 37.776842, longitude: -122.438442, weight: 1 },
    { latitude: 37.776822, longitude: -122.438391, weight: 1 },
    { latitude: 37.776814, longitude: -122.438412, weight: 1 },
    { latitude: 37.776787, longitude: -122.438628, weight: 1 },
    { latitude: 37.776729, longitude: -122.43865, weight: 1 },
    { latitude: 37.776759, longitude: -122.438677, weight: 1 },
    { latitude: 37.776772, longitude: -122.438498, weight: 1 },
    { latitude: 37.776787, longitude: -122.438389, weight: 1 },
    { latitude: 37.776848, longitude: -122.438283, weight: 1 },
    { latitude: 37.77687, longitude: -122.438239, weight: 1 },
    { latitude: 37.777015, longitude: -122.438198, weight: 1 },
    { latitude: 37.777333, longitude: -122.438256, weight: 1 },
    { latitude: 37.777595, longitude: -122.438308, weight: 1 },
    { latitude: 37.777797, longitude: -122.438344, weight: 1 },
    { latitude: 37.77816, longitude: -122.438442, weight: 1 },
    { latitude: 37.778414, longitude: -122.438508, weight: 1 },
    { latitude: 37.778445, longitude: -122.438516, weight: 1 },
    { latitude: 37.778503, longitude: -122.438529, weight: 1 },
    { latitude: 37.778607, longitude: -122.438549, weight: 1 },
    { latitude: 37.77867, longitude: -122.438644, weight: 1 },
    { latitude: 37.778847, longitude: -122.438706, weight: 1 },
    { latitude: 37.77924, longitude: -122.438744, weight: 1 },
    { latitude: 37.779738, longitude: -122.438822, weight: 1 },
    { latitude: 37.780201, longitude: -122.438882, weight: 1 },
    { latitude: 37.7804, longitude: -122.438905, weight: 1 },
    { latitude: 37.780501, longitude: -122.438921, weight: 1 },
    { latitude: 37.780892, longitude: -122.438986, weight: 1 },
    { latitude: 37.781446, longitude: -122.439087, weight: 1 },
    { latitude: 37.781985, longitude: -122.439199, weight: 1 },
    { latitude: 37.782239, longitude: -122.439249, weight: 1 },
    { latitude: 37.782286, longitude: -122.439266, weight: 1 },
    { latitude: 37.797847, longitude: -122.429388, weight: 1 },
    { latitude: 37.797874, longitude: -122.42918, weight: 1 },
    { latitude: 37.797885, longitude: -122.429069, weight: 1 },
    { latitude: 37.797887, longitude: -122.42905, weight: 1 },
    { latitude: 37.797933, longitude: -122.428954, weight: 1 },
    { latitude: 37.798242, longitude: -122.42899, weight: 1 },
    { latitude: 37.798617, longitude: -122.429075, weight: 1 },
    { latitude: 37.798719, longitude: -122.429092, weight: 1 },
    { latitude: 37.798944, longitude: -122.429145, weight: 1 },
    { latitude: 37.79932, longitude: -122.429251, weight: 1 },
    { latitude: 37.79959, longitude: -122.429309, weight: 1 },
    { latitude: 37.799677, longitude: -122.429324, weight: 1 },
    { latitude: 37.799966, longitude: -122.42936, weight: 1 },
    { latitude: 37.800288, longitude: -122.42943, weight: 1 },
    { latitude: 37.800443, longitude: -122.429461, weight: 1 },
    { latitude: 37.800465, longitude: -122.429474, weight: 1 },
    { latitude: 37.800644, longitude: -122.42954, weight: 1 },
    { latitude: 37.800948, longitude: -122.42962, weight: 1 },
    { latitude: 37.801242, longitude: -122.429685, weight: 1 },
    { latitude: 37.801375, longitude: -122.429702, weight: 1 },
    { latitude: 37.8014, longitude: -122.429703, weight: 1 },
    { latitude: 37.801453, longitude: -122.429707, weight: 1 },
    { latitude: 37.801473, longitude: -122.429709, weight: 1 },
    { latitude: 37.801532, longitude: -122.429707, weight: 1 },
    { latitude: 37.801852, longitude: -122.429729, weight: 1 },
    { latitude: 37.802173, longitude: -122.429789, weight: 1 },
    { latitude: 37.802459, longitude: -122.429847, weight: 1 },
    { latitude: 37.802554, longitude: -122.429825, weight: 1 },
    { latitude: 37.802647, longitude: -122.429549, weight: 1 },
    { latitude: 37.802693, longitude: -122.429179, weight: 1 },
    { latitude: 37.802729, longitude: -122.428751, weight: 1 },
    { latitude: 37.766104, longitude: -122.409291, weight: 1 },
    { latitude: 37.766103, longitude: -122.409268, weight: 1 },
    { latitude: 37.766138, longitude: -122.409229, weight: 1 },
    { latitude: 37.766183, longitude: -122.409231, weight: 1 },
    { latitude: 37.766153, longitude: -122.409276, weight: 1 },
    { latitude: 37.766005, longitude: -122.409365, weight: 1 },
    { latitude: 37.765897, longitude: -122.40957, weight: 1 },
    { latitude: 37.765767, longitude: -122.409739, weight: 1 },
    { latitude: 37.765693, longitude: -122.410389, weight: 1 },
    { latitude: 37.765615, longitude: -122.411201, weight: 1 },
    { latitude: 37.765635, longitude: -122.413092, weight: 1 },
    { latitude: 37.765706, longitude: -122.413279, weight: 1 },
    { latitude: 37.765883, longitude: -122.413605, weight: 1 },
    { latitude: 37.76601, longitude: -122.413783, weight: 1 },
    { latitude: 37.766022, longitude: -122.413758, weight: 1 },
    { latitude: 37.76603, longitude: -122.413783, weight: 1 },
    { latitude: 37.766138, longitude: -122.413962, weight: 1 },
    { latitude: 37.766183, longitude: -122.413991, weight: 1 },
    { latitude: 37.766317, longitude: -122.414161, weight: 1 },
    { latitude: 37.766401, longitude: -122.414339, weight: 1 },
    { latitude: 37.76643, longitude: -122.414364, weight: 1 },
    { latitude: 37.766413, longitude: -122.414438, weight: 1 },
    { latitude: 37.766544, longitude: -122.414595, weight: 1 },
    { latitude: 37.766753, longitude: -122.41478, weight: 1 },
    { latitude: 37.7669, longitude: -122.414923, weight: 1 },
    { latitude: 37.76693, longitude: -122.414928, weight: 1 },
    { latitude: 37.766954, longitude: -122.414926, weight: 1 },
    { latitude: 37.766993, longitude: -122.414939, weight: 1 },
    { latitude: 37.767004, longitude: -122.414942, weight: 1 },
    { latitude: 37.752884, longitude: -122.447556, weight: 5 },

    
];


  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={map => this._map = map}
          style={styles.map}
          initialRegion={this.state.initialPosition}>
          <Heatmap
            points={this.points}
            radius={20}
            opacity={1}
            gradient={{
              colors: ["yellow", "red"],
              startPoints: Platform.OS === 'ios' ? [0.01, 0.1] :
                [0.02, 0.66],
              colorMapSize: 2000
            }}
          >
          </Heatmap>
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});