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
        const userData = {
            email,
            plainPassword: password,
            firstName,
            lastName
        };

        console.log('Sending registration request with data:', userData);

        axios.post('/api/register', JSON.stringify(userData), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log('Registration successful:', response.data);
                const qrCodeData = `${firstName},${lastName}`;
                setQrCodeValue(qrCodeData);
                AsyncStorage.setItem('userQrCode', qrCodeData);
                setMessage('User registered successfully');
                navigation.navigate('Profile');
            })
            .catch(error => {
                console.error('Registration error:', error);
                setMessage('Error registering user');
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
