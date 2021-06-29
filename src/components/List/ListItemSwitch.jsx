import React, { useState } from 'react';

// Core
import { View, Text, Switch } from 'react-native';
import { theme } from '../../theme';
import { FontAwesome5 } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

// Style
import { useListItemStyles } from './ListItem.style';

const ListItemSwitch = ({ label, lightId, user, state }) => {
    const classes = useListItemStyles;
    const [isEnabled, setIsEnabled] = useState(state.on);

    const toggleSwitch = async() => {
        setIsEnabled(previousState => !previousState);
        try {
            let response = await fetch(
            `http://192.168.2.1/api/${user}/lights/${lightId}/state`, {
                method: 'PUT',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                on: !isEnabled,
                })
            });
            let json = await response.json();
            console.log(json);
            } catch (error) {
            console.error(error);
            }
    };

    const setBrightness = async value => {
        try {
            let response = await fetch(
            `http://192.168.2.1/api/${user}/lights/${lightId}/state`, {
                method: 'PUT',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        bri: parseInt(value, 10),
                    })
            });
            let json = await response.json();
            console.log(json);
            } catch (error) {
            console.error(error);
            }
    };

    return (
        <>
        <View style={classes.item}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <FontAwesome5 name="lightbulb" size={24} color={isEnabled ? theme.palette.secondary.light : theme.palette.primary.light} />
                <Text style={classes.label}>
                    {label}
                </Text>
            </View>
            <Switch 
                trackColor={{ false: theme.palette.primary.light, true: theme.palette.success.light }}
                thumbColor="#f2f2f2"
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
        <Slider 
            style={{ marginLeft: 8, marginRight: 8}} 
            minimumValue={1} 
            maximumValue={254} 
            onValueChange={value => setBrightness(value.toFixed(0))}
            minimumTrackTintColor={theme.palette.secondary.light}
            maximumTrackTintColor={theme.palette.primary.light}
            value={isEnabled ? state.bri : 1}
            thumbTintColor={theme.palette.secondary.dark}
        />
        </>
    );
};

export default ListItemSwitch;