// screens/ProfileScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';

const ProfileScreen = ({ navigation }) => {
  const [qrCodeValue, setQrCodeValue] = useState('');

  useEffect(() => {
    const getQrCode = async () => {
      const value = await AsyncStorage.getItem('userQrCode');
      if (value) {
        setQrCodeValue(value);
      }
    };
    getQrCode();
  }, []);

  return (
    <View style={styles.container}>
      <Text>My Profile</Text>
      {qrCodeValue ? (
        <QRCode value={qrCodeValue} />
      ) : (
        <Text>No QR Code found</Text>
      )}
      <Button title="Borrow Tool" onPress={() => navigation.navigate('BorrowTool')} />
      <Button title="Exchange Tool" onPress={() => navigation.navigate('ExchangeTool')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
