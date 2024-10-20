import React, { useEffect, useState } from 'react';
import { Image, View, StyleSheet, Modal, Text, TouchableOpacity, TextInput } from 'react-native';
import MapView, { Heatmap, PROVIDER_GOOGLE, Marker } from 'react-native-maps';


function MapScreen() {
  const [threatLevel, setThreatLevel] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [threatDetails, setThreatDetails] = useState('');
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [radiusModalVisible, setRadiusModalVisible] = useState(false);
  const [radiusDetails, setRadiusDetails] = useState('');
  const [points, setPoints] = useState([]);
// points = [
//     { latitude: 37.782551, longitude: -122.445368, weight: 1 },
//     { latitude: 37.782745, longitude: -122.444586, weight: 1 },
//     { latitude: 37.782842, longitude: -122.443688, weight: 1 },
//     { latitude: 37.782919, longitude: -122.442815, weight: 1 },
//     { latitude: 37.782992, longitude: -122.442112, weight: 1 },
//     { latitude: 37.7831, longitude: -122.441461, weight: 1 },
//     { latitude: 37.783206, longitude: -122.440829, weight: 1 },
//     { latitude: 37.783273, longitude: -122.440324, weight: 1 },
//     { latitude: 37.783316, longitude: -122.440023, weight: 1 },
//     { latitude: 37.783357, longitude: -122.439794, weight: 1 },
//     { latitude: 37.783371, longitude: -122.439687, weight: 1 },
//     { latitude: 37.783368, longitude: -122.439666, weight: 1 },
//     { latitude: 37.783383, longitude: -122.439594, weight: 1 },
//     { latitude: 37.783508, longitude: -122.439525, weight: 1 },
//     { latitude: 37.783842, longitude: -122.439591, weight: 1 },
//     { latitude: 37.784147, longitude: -122.439668, weight: 1 },
//     { latitude: 37.784206, longitude: -122.439686, weight: 1 },
//     { latitude: 37.784386, longitude: -122.43979, weight: 1 },
//     { latitude: 37.784701, longitude: -122.439902, weight: 1 },
//     { latitude: 37.784965, longitude: -122.439938, weight: 1 },
//     { latitude: 37.78501, longitude: -122.439947, weight: 1 },
//     { latitude: 37.78536, longitude: -122.439952, weight: 1 },
//     { latitude: 37.785715, longitude: -122.44003, weight: 1 },
//     { latitude: 37.786117, longitude: -122.440119, weight: 1 },
//     { latitude: 37.786564, longitude: -122.440209, weight: 1 },
//     { latitude: 37.786905, longitude: -122.44027, weight: 1 },
//     { latitude: 37.786956, longitude: -122.440279, weight: 1 },
//     { latitude: 37.800224, longitude: -122.43352, weight: 1 },
//     { latitude: 37.800155, longitude: -122.434101, weight: 1 },
//     { latitude: 37.80016, longitude: -122.43443, weight: 1 },
//     { latitude: 37.800378, longitude: -122.434527, weight: 1 },
//     { latitude: 37.800738, longitude: -122.434598, weight: 1 },
//     { latitude: 37.800938, longitude: -122.43465, weight: 1 },
//     { latitude: 37.801024, longitude: -122.434889, weight: 1 },
//     { latitude: 37.800955, longitude: -122.435392, weight: 1 },
//     { latitude: 37.800886, longitude: -122.435959, weight: 1 },
//     { latitude: 37.800811, longitude: -122.436275, weight: 1 },
//     { latitude: 37.800788, longitude: -122.436299, weight: 1 },
//     { latitude: 37.800719, longitude: -122.436302, weight: 1 },
//     { latitude: 37.800702, longitude: -122.436298, weight: 1 },
//     { latitude: 37.800661, longitude: -122.436273, weight: 1 },
//     { latitude: 37.800395, longitude: -122.436172, weight: 1 },
//     { latitude: 37.800228, longitude: -122.436116, weight: 1 },
//     { latitude: 37.789371, longitude: -122.391701, weight: 1 },
//     { latitude: 37.789722, longitude: -122.390952, weight: 1 },
//     { latitude: 37.790315, longitude: -122.390305, weight: 1 },
//     { latitude: 37.790738, longitude: -122.389616, weight: 1 },
//     { latitude: 37.779448, longitude: -122.438702, weight: 1 },
//     { latitude: 37.779023, longitude: -122.438585, weight: 1 },
//     { latitude: 37.778542, longitude: -122.438492, weight: 1 },
//     { latitude: 37.7781, longitude: -122.438411, weight: 1 },
//     { latitude: 37.777986, longitude: -122.438376, weight: 1 },
//     { latitude: 37.77768, longitude: -122.438313, weight: 1 },
//     { latitude: 37.777316, longitude: -122.438273, weight: 1 },
//     { latitude: 37.777135, longitude: -122.438254, weight: 1 },
//     { latitude: 37.776987, longitude: -122.438303, weight: 1 },
//     { latitude: 37.776946, longitude: -122.438404, weight: 1 },
//     { latitude: 37.776944, longitude: -122.438467, weight: 1 },
//     { latitude: 37.776892, longitude: -122.438459, weight: 1 },
//     { latitude: 37.776842, longitude: -122.438442, weight: 1 },
//     { latitude: 37.776822, longitude: -122.438391, weight: 1 },
//     { latitude: 37.776814, longitude: -122.438412, weight: 1 },
//     { latitude: 37.776787, longitude: -122.438628, weight: 1 },
//     { latitude: 37.776729, longitude: -122.43865, weight: 1 },
//     { latitude: 37.776759, longitude: -122.438677, weight: 1 },
//     { latitude: 37.776772, longitude: -122.438498, weight: 1 },
//     { latitude: 37.776787, longitude: -122.438389, weight: 1 },
//     { latitude: 37.776848, longitude: -122.438283, weight: 1 },
//     { latitude: 37.77687, longitude: -122.438239, weight: 1 },
//     { latitude: 37.777015, longitude: -122.438198, weight: 1 },
//     { latitude: 37.777333, longitude: -122.438256, weight: 1 },
//     { latitude: 37.777595, longitude: -122.438308, weight: 1 },
//     { latitude: 37.777797, longitude: -122.438344, weight: 1 },
//     { latitude: 37.77816, longitude: -122.438442, weight: 1 },
//     { latitude: 37.778414, longitude: -122.438508, weight: 1 },
//     { latitude: 37.778445, longitude: -122.438516, weight: 1 },
//     { latitude: 37.778503, longitude: -122.438529, weight: 1 },
//     { latitude: 37.778607, longitude: -122.438549, weight: 1 },
//     { latitude: 37.77867, longitude: -122.438644, weight: 1 },
//     { latitude: 37.778847, longitude: -122.438706, weight: 1 },
//     { latitude: 37.77924, longitude: -122.438744, weight: 1 },
//     { latitude: 37.779738, longitude: -122.438822, weight: 1 },
//     { latitude: 37.780201, longitude: -122.438882, weight: 1 },
//     { latitude: 37.7804, longitude: -122.438905, weight: 1 },
//     { latitude: 37.780501, longitude: -122.438921, weight: 1 },
//     { latitude: 37.780892, longitude: -122.438986, weight: 1 },
//     { latitude: 37.781446, longitude: -122.439087, weight: 1 },
//     { latitude: 37.781985, longitude: -122.439199, weight: 1 },
//     { latitude: 37.782239, longitude: -122.439249, weight: 1 },
//     { latitude: 37.782286, longitude: -122.439266, weight: 1 },
//     { latitude: 37.797847, longitude: -122.429388, weight: 1 },
//     { latitude: 37.797874, longitude: -122.42918, weight: 1 },
//     { latitude: 37.797885, longitude: -122.429069, weight: 1 },
//     { latitude: 37.797887, longitude: -122.42905, weight: 1 },
//     { latitude: 37.797933, longitude: -122.428954, weight: 1 },
//     { latitude: 37.798242, longitude: -122.42899, weight: 1 },
//     { latitude: 37.798617, longitude: -122.429075, weight: 1 },
//     { latitude: 37.798719, longitude: -122.429092, weight: 1 },
//     { latitude: 37.798944, longitude: -122.429145, weight: 1 },
//     { latitude: 37.79932, longitude: -122.429251, weight: 1 },
//     { latitude: 37.79959, longitude: -122.429309, weight: 1 },
//     { latitude: 37.799677, longitude: -122.429324, weight: 1 },
//     { latitude: 37.799966, longitude: -122.42936, weight: 1 },
//     { latitude: 37.800288, longitude: -122.42943, weight: 1 },
//     { latitude: 37.800443, longitude: -122.429461, weight: 1 },
//     { latitude: 37.800465, longitude: -122.429474, weight: 1 },
//     { latitude: 37.800644, longitude: -122.42954, weight: 1 },
//     { latitude: 37.800948, longitude: -122.42962, weight: 1 },
//     { latitude: 37.801242, longitude: -122.429685, weight: 1 },
//     { latitude: 37.801375, longitude: -122.429702, weight: 1 },
//     { latitude: 37.8014, longitude: -122.429703, weight: 1 },
//     { latitude: 37.801453, longitude: -122.429707, weight: 1 },
//     { latitude: 37.801473, longitude: -122.429709, weight: 1 },
//     { latitude: 37.801532, longitude: -122.429707, weight: 1 },
//     { latitude: 37.801852, longitude: -122.429729, weight: 1 },
//     { latitude: 37.802173, longitude: -122.429789, weight: 1 },
//     { latitude: 37.802459, longitude: -122.429847, weight: 1 },
//     { latitude: 37.802554, longitude: -122.429825, weight: 1 },
//     { latitude: 37.802647, longitude: -122.429549, weight: 1 },
//     { latitude: 37.802693, longitude: -122.429179, weight: 1 },
//     { latitude: 37.802729, longitude: -122.428751, weight: 1 },
//     { latitude: 37.766104, longitude: -122.409291, weight: 1 },
//     { latitude: 37.766103, longitude: -122.409268, weight: 1 },
//     { latitude: 37.766138, longitude: -122.409229, weight: 1 },
//     { latitude: 37.766183, longitude: -122.409231, weight: 1 },
//     { latitude: 37.766153, longitude: -122.409276, weight: 1 },
//     { latitude: 37.766005, longitude: -122.409365, weight: 1 },
//     { latitude: 37.765897, longitude: -122.40957, weight: 1 },
//     { latitude: 37.765767, longitude: -122.409739, weight: 1 },
//     { latitude: 37.765693, longitude: -122.410389, weight: 1 },
//     { latitude: 37.765615, longitude: -122.411201, weight: 1 },
//     { latitude: 37.765635, longitude: -122.413092, weight: 1 },
//     { latitude: 37.765706, longitude: -122.413279, weight: 1 },
//     { latitude: 37.765883, longitude: -122.413605, weight: 1 },
//     { latitude: 37.76601, longitude: -122.413783, weight: 1 },
//     { latitude: 37.766022, longitude: -122.413758, weight: 1 },
//     { latitude: 37.76603, longitude: -122.413783, weight: 1 },
//     { latitude: 37.766138, longitude: -122.413962, weight: 1 },
//     { latitude: 37.766183, longitude: -122.413991, weight: 1 },
//     { latitude: 37.766317, longitude: -122.414161, weight: 1 },
//     { latitude: 37.766401, longitude: -122.414339, weight: 1 },
//     { latitude: 37.76643, longitude: -122.414364, weight: 1 },
//     { latitude: 37.766413, longitude: -122.414438, weight: 1 },
//     { latitude: 37.766544, longitude: -122.414595, weight: 1 },
//     { latitude: 37.766753, longitude: -122.41478, weight: 1 },
//     { latitude: 37.7669, longitude: -122.414923, weight: 1 },
//     { latitude: 37.76693, longitude: -122.414928, weight: 1 },
//     { latitude: 37.766954, longitude: -122.414926, weight: 1 },
//     { latitude: 37.766993, longitude: -122.414939, weight: 1 },
//     { latitude: 37.767004, longitude: -122.414942, weight: 1 },
//     { latitude: 37.752884, longitude: -122.447556, weight: 5 },
//     { latitude: 37.781365, longitude: -122.406955, weight: 3 },
//   { latitude: 37.764182, longitude: -122.425887, weight: 8 },
//   { latitude: 37.742899, longitude: -122.452455, weight: 6 },
//   { latitude: 37.798625, longitude: -122.410235, weight: 9 },
//   { latitude: 37.773512, longitude: -122.444365, weight: 5 },
//   { latitude: 37.752482, longitude: -122.434221, weight: 2 },
//   { latitude: 37.787658, longitude: -122.447655, weight: 10 },
//   { latitude: 37.767852, longitude: -122.411355, weight: 4 },
//   { latitude: 37.776254, longitude: -122.463512, weight: 7 },
//   { latitude: 37.764256, longitude: -122.456755, weight: 1 },
//   { latitude: 37.758932, longitude: -122.438655, weight: 5 },
//   { latitude: 37.788365, longitude: -122.424798, weight: 6 },
//   { latitude: 37.782154, longitude: -122.448125, weight: 9 },
//   { latitude: 37.798564, longitude: -122.407655, weight: 3 },
//   { latitude: 37.749582, longitude: -122.421544, weight: 8 },
//   { latitude: 37.751258, longitude: -122.431256, weight: 2 },
//   { latitude: 37.769312, longitude: -122.444212, weight: 7 },
//   { latitude: 37.774785, longitude: -122.432354, weight: 4 },
//   { latitude: 37.786235, longitude: -122.405854, weight: 6 },
//   { latitude: 37.765445, longitude: -122.439987, weight: 10 },
//   { latitude: 37.763245, longitude: -122.423787, weight: 1 },
//   { latitude: 37.781352, longitude: -122.449785, weight: 5 },
//   { latitude: 37.799124, longitude: -122.426351, weight: 8 },
//   { latitude: 37.754325, longitude: -122.410255, weight: 9 },
//   { latitude: 37.760458, longitude: -122.437895, weight: 4 },
//   { latitude: 37.787356, longitude: -122.444589, weight: 7 },
//   { latitude: 37.769548, longitude: -122.458965, weight: 2 },
//   { latitude: 37.792875, longitude: -122.430254, weight: 6 },
//   { latitude: 37.779652, longitude: -122.440985, weight: 10 },
//   { latitude: 37.773695, longitude: -122.408756, weight: 1 },
//   { latitude: 37.781456, longitude: -122.439256, weight: 5 },
//   { latitude: 37.756987, longitude: -122.448754, weight: 3 },
//   { latitude: 37.794125, longitude: -122.449654, weight: 9 },
//   { latitude: 37.761487, longitude: -122.403654, weight: 6 },
//   { latitude: 37.764556, longitude: -122.447589, weight: 8 },
//   { latitude: 37.782659, longitude: -122.421254, weight: 7 },
//   { latitude: 37.746982, longitude: -122.412365, weight: 2 },
//   { latitude: 37.790654, longitude: -122.427455, weight: 10 },
//   { latitude: 37.785623, longitude: -122.409654, weight: 4 },
//   { latitude: 37.768548, longitude: -122.418796, weight: 1 },
//   { latitude: 37.793254, longitude: -122.454987, weight: 5 },
//   { latitude: 37.750589, longitude: -122.443654, weight: 7 },
//   { latitude: 37.764365, longitude: -122.425654, weight: 6 },
//   { latitude: 37.798214, longitude: -122.406354, weight: 9 },
//   { latitude: 37.769874, longitude: -122.410254, weight: 2 },
//   { latitude: 37.755986, longitude: -122.446365, weight: 3 },
//   { latitude: 37.776854, longitude: -122.434652, weight: 10 },
//   { latitude: 37.780789, longitude: -122.442654, weight: 8 },
//   { latitude: 37.774365, longitude: -122.436598, weight: 4 },
//   { latitude: 37.757856, longitude: -122.412365, weight: 7 },
//   { latitude: 37.781265, longitude: -122.421456, weight: 6 },
//   { latitude: 37.790258, longitude: -122.453987, weight: 1 },
//   { latitude: 37.759654, longitude: -122.407856, weight: 9 },
//   { latitude: 37.782659, longitude: -122.445365, weight: 3 },
//   { latitude: 37.774569, longitude: -122.455987, weight: 5 },
//   { latitude: 37.787987, longitude: -122.440215, weight: 2 },
//   { latitude: 37.764852, longitude: -122.427454, weight: 4 },
//   { latitude: 37.793548, longitude: -122.446598, weight: 7 },
//   { latitude: 37.751458, longitude: -122.437459, weight: 6 },
//   { latitude: 37.774589, longitude: -122.407598, weight: 10 },
//   { latitude: 37.765789, longitude: -122.450365, weight: 1 },
//   { latitude: 37.783654, longitude: -122.424579, weight: 9 },
//   { latitude: 37.796245, longitude: -122.448756, weight: 7 },
//   { latitude: 37.775365, longitude: -122.443598, weight: 4 },
//   { latitude: 37.769124, longitude: -122.435987, weight: 2 },
//   { latitude: 37.746895, longitude: -122.414325, weight: 6 },
//   { latitude: 37.779548, longitude: -122.446598, weight: 3 },
//   { latitude: 37.754365, longitude: -122.428954, weight: 5 },
//   { latitude: 37.772589, longitude: -122.457987, weight: 9 },
//   { latitude: 37.780125, longitude: -122.424598, weight: 1 },
//   { latitude: 37.793658, longitude: -122.444365, weight: 6 },
//   { latitude: 37.787456, longitude: -122.440987, weight: 4 },
//   { latitude: 37.776245, longitude: -122.450365, weight: 7 },
//   { latitude: 37.751365, longitude: -122.439654, weight: 10 },
//   { latitude: 37.782456, longitude: -122.420365, weight: 8 },
//   { latitude: 37.759215, longitude: -122.416854, weight: 5 },
//   { latitude: 37.768569, longitude: -122.456215, weight: 9 },
//   { latitude: 37.788965, longitude: -122.442365, weight: 3 },
//   { latitude: 37.746365, longitude: -122.414789, weight: 2 },
//   { latitude: 37.764578, longitude: -122.432548, weight: 1 },
//   { latitude: 37.782458, longitude: -122.435987, weight: 6 },
//   { latitude: 37.772589, longitude: -122.440987, weight: 8 },
//   { latitude: 37.765124, longitude: -122.451589, weight: 5 },
//   { latitude: 37.751365, longitude: -122.437854, weight: 7 },
//   { latitude: 37.794587, longitude: -122.420987, weight: 4 },
//   { latitude: 37.767113, longitude: -122.446112, weight: 8 },
//   { latitude: 37.748956, longitude: -122.462678, weight: 4 },
//   { latitude: 37.779157, longitude: -122.414582, weight: 1 },
//   { latitude: 37.796294, longitude: -122.435967, weight: 7 },
//   { latitude: 37.764909, longitude: -122.429865, weight: 3 },
//   { latitude: 37.751835, longitude: -122.432753, weight: 6 },
//   { latitude: 37.798493, longitude: -122.448912, weight: 10 },
//   { latitude: 37.792695, longitude: -122.411098, weight: 2 },
//   { latitude: 37.774013, longitude: -122.407863, weight: 5 },
//   { latitude: 37.753329, longitude: -122.433567, weight: 9 },
//   { latitude: 37.767390, longitude: -122.468015, weight: 4 },
//   { latitude: 37.788325, longitude: -122.414987, weight: 3 },
//   { latitude: 37.746419, longitude: -122.423845, weight: 6 },
//   { latitude: 37.758162, longitude: -122.425874, weight: 5 },
//   { latitude: 37.779620, longitude: -122.438117, weight: 8 },
//   { latitude: 37.762839, longitude: -122.471940, weight: 1 },
//   { latitude: 37.790492, longitude: -122.402287, weight: 7 },
//   { latitude: 37.796825, longitude: -122.413755, weight: 10 },
//   { latitude: 37.784227, longitude: -122.433479, weight: 2 },
//   { latitude: 37.767142, longitude: -122.419206, weight: 3 },
//   { latitude: 37.780303, longitude: -122.438027, weight: 4 },
//   { latitude: 37.762938, longitude: -122.463182, weight: 6 },
//   { latitude: 37.751495, longitude: -122.404115, weight: 5 },
//   { latitude: 37.775969, longitude: -122.467074, weight: 9 },
//   { latitude: 37.799825, longitude: -122.430623, weight: 8 },
//   { latitude: 37.743652, longitude: -122.418903, weight: 1 },
//   { latitude: 37.757314, longitude: -122.432431, weight: 7 },
//   { latitude: 37.758455, longitude: -122.450834, weight: 2 },
//   { latitude: 37.790648, longitude: -122.423509, weight: 5 },
//   { latitude: 37.795111, longitude: -122.461919, weight: 6 },
//   { latitude: 37.786294, longitude: -122.411023, weight: 3 },
//   { latitude: 37.748057, longitude: -122.450149, weight: 4 },
//   { latitude: 37.763144, longitude: -122.427215, weight: 10 },
//   { latitude: 37.794508, longitude: -122.452088, weight: 8 },
//   { latitude: 37.753741, longitude: -122.438557, weight: 9 },
//   { latitude: 37.772031, longitude: -122.411899, weight: 6 },
//   { latitude: 37.796184, longitude: -122.459634, weight: 5 },
//   { latitude: 37.774874, longitude: -122.439970, weight: 3 },
//   { latitude: 37.780168, longitude: -122.422207, weight: 4 },
//   { latitude: 37.753920, longitude: -122.412310, weight: 7 },
//   { latitude: 37.785304, longitude: -122.443019, weight: 1 },
//   { latitude: 37.798056, longitude: -122.454287, weight: 2 },
//   { latitude: 37.791285, longitude: -122.437845, weight: 9 },
//   { latitude: 37.751963, longitude: -122.460534, weight: 6 },
//   { latitude: 37.765344, longitude: -122.426115, weight: 5 },
//   { latitude: 37.767883, longitude: -122.442213, weight: 3 },
//   { latitude: 37.794332, longitude: -122.420054, weight: 8 },
//   { latitude: 37.747635, longitude: -122.431239, weight: 10 },
//   { latitude: 37.791542, longitude: -122.455329, weight: 4 },
//   { latitude: 37.773720, longitude: -122.454861, weight: 2 },
//   { latitude: 37.798469, longitude: -122.444291, weight: 5 },
//   { latitude: 37.759046, longitude: -122.425004, weight: 7 },
//   { latitude: 37.790902, longitude: -122.439802, weight: 1 },
//   { latitude: 37.774208, longitude: -122.411940, weight: 6 },
//   { latitude: 37.786126, longitude: -122.431469, weight: 8 },
//   { latitude: 37.770256, longitude: -122.438876, weight: 4 },
//   { latitude: 37.783978, longitude: -122.455297, weight: 9 },
//   { latitude: 37.740914, longitude: -122.461064, weight: 3 },
//   { latitude: 37.782455, longitude: -122.448178, weight: 2 },
//   { latitude: 37.746112, longitude: -122.456729, weight: 10 },
//   { latitude: 37.796368, longitude: -122.430540, weight: 5 },
//   { latitude: 37.764068, longitude: -122.455194, weight: 7 },
//   { latitude: 37.783174, longitude: -122.418072, weight: 1 },
//   { latitude: 37.769998, longitude: -122.422378, weight: 6 },
//   { latitude: 37.788244, longitude: -122.405984, weight: 8 },
//   { latitude: 37.793556, longitude: -122.448389, weight: 4 },
//   { latitude: 37.766259, longitude: -122.430181, weight: 3 },
//   { latitude: 37.751160, longitude: -122.420354, weight: 9 },
//   { latitude: 37.762307, longitude: -122.435708, weight: 2 },
//   { latitude: 37.796839, longitude: -122.414597, weight: 10 },
//   { latitude: 37.775189, longitude: -122.440654, weight: 5 },
//   { latitude: 37.762852, longitude: -122.456123, weight: 6 },
//   { latitude: 37.788074, longitude: -122.469332, weight: 7 },
//   { latitude: 37.755482, longitude: -122.446785, weight: 3 },
//   { latitude: 37.764901, longitude: -122.408442, weight: 1 },
//   { latitude: 37.794459, longitude: -122.424952, weight: 4 },
//   { latitude: 37.782107, longitude: -122.436452, weight: 8 },
//   { latitude: 37.778111, longitude: -122.447899, weight: 5 },
//   { latitude: 37.788337, longitude: -122.437894, weight: 9 },
//   { latitude: 37.779368, longitude: -122.457965, weight: 1 },
//   { latitude: 37.758640, longitude: -122.415865, weight: 5 },
//   { latitude: 37.765756, longitude: -122.421489, weight: 8 },
//   { latitude: 37.793658, longitude: -122.430896, weight: 2 },
//   { latitude: 37.774589, longitude: -122.406394, weight: 4 },
//   { latitude: 37.798971, longitude: -122.451257, weight: 10 },
//   { latitude: 37.779582, longitude: -122.440567, weight: 3 },
//   { latitude: 37.756895, longitude: -122.459781, weight: 6 },
//   { latitude: 37.765427, longitude: -122.405715, weight: 7 },
//   { latitude: 37.790248, longitude: -122.421874, weight: 8 },
//   { latitude: 37.786423, longitude: -122.439214, weight: 5 },
//   { latitude: 37.759849, longitude: -122.426194, weight: 1 },
//   { latitude: 37.747840, longitude: -122.459145, weight: 4 },
//   { latitude: 37.775015, longitude: -122.445698, weight: 9 },
//   { latitude: 37.781850, longitude: -122.413127, weight: 2 },
//   { latitude: 37.743596, longitude: -122.420705, weight: 6 },
//   { latitude: 37.795829, longitude: -122.437103, weight: 3 },
//   { latitude: 37.774910, longitude: -122.454237, weight: 8 },
//   { latitude: 37.764395, longitude: -122.412889, weight: 7 },
//   { latitude: 37.796222, longitude: -122.430064, weight: 10 },
//   { latitude: 37.778159, longitude: -122.424357, weight: 5 },
//   { latitude: 37.762154, longitude: -122.444296, weight: 2 },
//   { latitude: 37.751623, longitude: -122.450318, weight: 1 },
//   { latitude: 37.785134, longitude: -122.401859, weight: 6 },
//   { latitude: 37.792342, longitude: -122.434641, weight: 9 },
//   { latitude: 37.794786, longitude: -122.413763, weight: 3 },
//   { latitude: 37.771249, longitude: -122.429301, weight: 4 },
//   { latitude: 37.778597, longitude: -122.440813, weight: 5 },
//   { latitude: 37.767923, longitude: -122.458601, weight: 10 },
//   { latitude: 37.788601, longitude: -122.427005, weight: 8 },
//   { latitude: 37.774345, longitude: -122.408295, weight: 2 },
//   { latitude: 37.754368, longitude: -122.418760, weight: 7 },
//   { latitude: 37.791837, longitude: -122.429120, weight: 9 },
//   { latitude: 37.799256, longitude: -122.458765, weight: 1 },
//   { latitude: 37.756411, longitude: -122.441279, weight: 6 },
//   { latitude: 37.773402, longitude: -122.447604, weight: 5 },
//   { latitude: 37.798971, longitude: -122.410421, weight: 4 },
//   { latitude: 37.765580, longitude: -122.426777, weight: 3 },
//   { latitude: 37.787234, longitude: -122.459843, weight: 10 },
//   { latitude: 37.752639, longitude: -122.440148, weight: 8 },
//   { latitude: 37.796512, longitude: -122.415879, weight: 7 },
//   { latitude: 37.779811, longitude: -122.420965, weight: 2 },
//   { latitude: 37.766030, longitude: -122.459246, weight: 9 },
//   { latitude: 37.753839, longitude: -122.442010, weight: 6 },
//   { latitude: 37.762149, longitude: -122.439775, weight: 5 },
//   { latitude: 37.779953, longitude: -122.445555, weight: 1 },
//   { latitude: 37.754429, longitude: -122.460176, weight: 3 },
//   { latitude: 37.788297, longitude: -122.430221, weight: 8 },
//   { latitude: 37.766048, longitude: -122.418164, weight: 10 },
//   { latitude: 37.775675, longitude: -122.431979, weight: 2 },
//   { latitude: 37.759482, longitude: -122.458572, weight: 4 },
//   { latitude: 37.740895, longitude: -122.414895, weight: 6 },
//   { latitude: 37.769209, longitude: -122.436025, weight: 7 },
//   { latitude: 37.787365, longitude: -122.425412, weight: 3 },
//   { latitude: 37.771193, longitude: -122.455422, weight: 5 },
//   { latitude: 37.795917, longitude: -122.401315, weight: 9 },
//   { latitude: 37.774636, longitude: -122.454371, weight: 2 },
//   { latitude: 37.752960, longitude: -122.438234, weight: 6 },
//   { latitude: 37.776112, longitude: -122.412364, weight: 1 },
//   { latitude: 37.786684, longitude: -122.455310, weight: 8 },
//   { latitude: 37.764594, longitude: -122.447221, weight: 4 },
//   { latitude: 37.792400, longitude: -122.431286, weight: 10 },
//   { latitude: 37.748943, longitude: -122.414670, weight: 5 },
//   { latitude: 37.795664, longitude: -122.436038, weight: 3 },
//   { latitude: 37.784803, longitude: -122.449819, weight: 7 },
//   { latitude: 37.798674, longitude: -122.408792, weight: 9 },
//   { latitude: 37.759120, longitude: -122.401935, weight: 2 },
//   { latitude: 37.781348, longitude: -122.428519, weight: 6 },
//   { latitude: 37.773712, longitude: -122.401716, weight: 8 }
    

    
// ];

    // get the data and plot it on the heat map
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
        <Marker
            coordinate = {{latitude: 37.78825,longitude: -122.4324}}
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