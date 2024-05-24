// screens/ExchangeToolScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const ExchangeToolScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [step, setStep] = useState(1);
  const [toolData, setToolData] = useState('');
  const [employeeData, setEmployeeData] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    if (step === 1) {
      setToolData(data);
      setStep(2);
      setScanned(false);
    } else {
      setEmployeeData(data);
      setScanned(true);
      // Envoyer l'information au serveur pour enregistrer l'échange
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ExchangeToolScreen;
