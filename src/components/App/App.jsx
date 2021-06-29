import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Core
import { View } from 'react-native';
import { HomeView, IntroView } from '../../views';
import { AuthContext } from '../../providers';

const Router = createStackNavigator();

const App = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Router.Navigator>
          {!currentUser && (
            <Router.Screen 
              name="intro" 
              component={IntroView}
              options={{
                title: false,
                headerTransparent: true
              }} 
            />
          )}
          <Router.Screen 
            name="home"
            component={HomeView}
            options={{
              headerShown: false,
            }} 
          />
        </Router.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
