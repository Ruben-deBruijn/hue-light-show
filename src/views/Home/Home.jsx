import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';

// Core
import { ActivityIndicator, StyleSheet, Text, SafeAreaView, Platform } from 'react-native';
import { useContext } from 'react/cjs/react.development';
import { ListItemSwitch } from '../../components/List';
import { AuthContext } from '../../providers';

import { theme } from '../../theme';

const getLights = async token => {
  try {
    let response = await fetch(
      `http://192.168.2.1/api/${token}/lights`
    );
    let json = await response.json();
    setData(json);
  } catch (error) {
    console.error(error);
  }
  setLoading(false);
};

const Home = ({ route }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({ lights: null, groups: null });
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://192.168.2.1/api/${currentUser}/lights`)
      .then((response) => response.json())
      .then((json) => {
        const availableLights = [];
        for (const [key, value] of Object.entries(json)) {
          availableLights.push({ lightId: key, state: value.state, name: value.name })
        }
        setData({ lights: availableLights });
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch(`http://192.168.2.1/api/${currentUser}/groups`)
      .then((response) => response.json())
      .then((json) => {
        const availableGroups = [];
        for (const [key, value] of Object.entries(json)) {
          availableGroups.push({ groupId: key, name: value.name, lights: value.lights })
        }
        setData({ groups: availableGroups });
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  if (isLoading) return <ActivityIndicator size="large" />;
  console.log(data);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: theme.text.h2, color: theme.palette.text.light, padding: 16 }}>Beschikbare lampen</Text>

      <Picker
        selectedValue={1}
        onValueChange={(itemValue, itemIndex) =>
          console.log(itemValue)
        }>
          {data.groups && data.groups.map(group => (
            <Picker.Item label={group.name} value={group.groupId} />
          ))}
      </Picker>

      {data.lights && data.lights.map(({ name, lightId, state }) => (
        <ListItemSwitch 
          label={name} 
          key={lightId} 
          lightId={lightId}
          user={currentUser}
          state={state}
        />
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.palette.primary.dark,
    paddingTop: Platform.OS === 'android' ? 24 : 0
  },
});

export default Home;
