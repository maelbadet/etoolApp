import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

const ExchangeToolScreen = ({ navigation }) => {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [step, setStep] = useState(1);
  const [toolData, setToolData] = useState('');
  const [employeeData, setEmployeeData] = useState('');

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
        <View style={styles.container}>
          <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const handleBarCodeScanned = ({ type, data }) => {
    if (step === 1) {
      setToolData(data);
      setStep(2);
      setScanned(false);
    } else {
      setEmployeeData(data);
      setScanned(true);
    }
  };

  return (
      <View style={styles.container}>
        <CameraView
            facing={facing}
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        />
        {scanned ? (
            <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
        ) : (
            <Text>
              {step === 1 ? 'Scan Tool QR Code' : 'Scan Employee QR Code'}
            </Text>
        )}
        <Text>{toolData}</Text>
        <Text>{employeeData}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>flip Camera</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ExchangeToolScreen;
