import { deviceName } from 'expo-device';

export const connectWithBridge = async ip => {
    try {
    let response = await fetch('http://192.168.2.1/api', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        devicetype: `hue_light_show#${deviceName}`,
        })
    });
    let json = await response.json();
    if (json[0].error && json[0].error.type === 101) {
        return { error: true, error_description: 'Please press the link button on your Hue Bridge to connect' };
    };
    if (json[0].success) {
        return { error: false, user_token: json[0].success.username };
    }
    } catch (error) {
    console.error(error);
    }
}