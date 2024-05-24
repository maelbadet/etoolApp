// screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [qrCodeValue, setQrCodeValue] = useState('');
  const [message, setMessage] = useState('');

  const registerUser = () => {
    axios.post('http://your-api-url/api/register', {
      email,
      password,
      firstName,
      lastName
    })
    .then(response => {
      const userData = `${response.data.firstName},${response.data.lastName}`;
      setQrCodeValue(userData);
      AsyncStorage.setItem('userQrCode', userData);
      setMessage('User registered successfully');
      navigation.navigate('Profile');
    })
    .catch(error => {
      setMessage('Error registering user');
      console.error(error);
    });
  };

  return (
    <View style={styles.container}>
      <Text>Email:</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      <Text>Password:</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
      <Text>First Name:</Text>
      <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />
      <Text>Last Name:</Text>
      <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />
      <Button title="Register" onPress={registerUser} />
      {qrCodeValue ? (
        <QRCode value={qrCodeValue} />
      ) : null}
      <Text>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});

export default RegisterScreen;