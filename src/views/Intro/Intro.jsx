import React, { useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Core
import { Alert, Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { theme } from '../../theme';

// Utils
import { connectWithBridge } from '../../http/connection.http';
import { useEffect } from 'react';
import { AuthContext } from '../../providers';

const Intro = ({ navigation }) => {
  const [ipValue, setIpValue] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);
  

  const getToken = async() => {
    try {
      const value = await AsyncStorage.getItem('@user_token')
      if (value !== null) navigation.navigate('home', { user_token: value });
    } catch(e) {
      console.error(e);
    }
  };

  const handleChange = text => {
    setIpValue(text);
  }

  const onNext = async() => {
    setError(null);
    const connection = await connectWithBridge();
    if (connection.error) return connectionAlert(connection.error_description);
    AsyncStorage.setItem('@user_token', connection.user_token);
    navigation.navigate('home', { user_token: connection.user_token });
  };

  const connectionAlert = description =>
  Alert.alert(
    "Unable to connect",
    description,
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      {
        text: "Understood",
        onPress: () => setError(null)
      },
    ],
    { cancelable: false }
  );


  return (
    <View style={styles.container}>
      <Text style={styles.text}>First, let's connect your Hue Bridge</Text>
      <TextInput onChangeText={text => handleChange(text)} placeholder="Hue Bridge IP address" textAlign="center" style={styles.textInput} />

      <Pressable style={ipValue ? styles.pressable : styles.pressableDisabled} disabled={!ipValue} onPress={onNext}>
        {({ pressed }) => <Text style={styles.text}>{pressed ? 'Pressed!' : 'Press Me'}</Text>}
      </Pressable>

      {/* {error && (
        <View style={styles.errorMessage}>
          <Text style={{ color: '#fff', fontSize: 12 }}>{error}</Text>
        </View>
      )} */}
      {error && connectionAlert}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.dark,
  },
  textInput: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 20 / 2,
    minWidth: 200,
    margin: 16,
    textAlign: 'center',
  },
  errorMessage: {
    padding: 12,
    borderColor: '#D90D32',
    borderWidth: 2,
    backgroundColor: '#D94169', 
    borderRadius: 24 / 2, 
    marginTop: 16,
  },
  pressable: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: 16,
    borderRadius: 50 / 2,
  },
  pressableDisabled: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.grey[50],
    padding: 16,
    borderRadius: 50 / 2,
  },
  text: {
    fontSize: 16,
    color: theme.palette.common.white,
  }
});

export default Intro;
