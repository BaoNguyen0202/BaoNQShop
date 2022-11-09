/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  NativeBaseProvider,
  extendTheme,
  theme as nbTheme,
  View,
  Image,
} from 'native-base';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import OTP from './screens/OTP';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import Detail from './screens/HomeScreen/Detail';
import Product from './screens/ProductScreen';
import Order from './screens/OrderScreen/index';
import OrderItem from './screens/OrderScreen/orderItem';
import ProductCatelog from './screens/ProductCatelog/ProductCatelog';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyCart from './screens/HomeScreen/MyCart';
import CategoryList from './screens/HomeScreen/component/CategoryList';
import {
  getToken,
  requestUserPermission,
  messageForeground,
  messageBackground,
  Start,
  InAppPush,
  RecommendModal,
  fetchNotifyBackground,
  fetchNotifyQuit,
  ShowInApp,
} from 'onmarketer-sdk';
import {navigationRef, navigate} from './src/RootNavigation';
import {AsyncStorage} from 'react-native';
import {Provider} from 'react-redux';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const theme = extendTheme({
  colors: {
    primary: nbTheme.colors.violet,
  },
});
function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Homes"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 5}}>
              <Image
                size={5}
                alt="fallback text"
                source={{
                  uri: 'https://icon-library.com/images/home-button-icon-png/home-button-icon-png-10.jpg',
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Products"
        component={ProductCatelog}
        options={{
          tabBarIcon: () => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 5}}>
              <Image
                size={5}
                alt="fallback text"
                source={{
                  uri: 'https://static.thenounproject.com/png/4866792-200.png',
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={MyCart}
        options={{
          tabBarIcon: () => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 5}}>
              <Image
                size={5}
                alt="fallback text"
                source={{
                  uri: 'https://static.vecteezy.com/system/resources/previews/000/583/299/non_2x/online-shopping-bag-icon-vector.jpg',
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Order"
        component={Order}
        options={{
          tabBarIcon: () => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 5}}>
              <Image
                size={5}
                alt="fallback text"
                source={{
                  uri: 'https://icon-library.com/images/order-icon/order-icon-12.jpg',
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const App = () => {
  const [isNavigate, setIsNavigate] = useState(false);
  const [nameScreen, setNameScreen] = useState<string>();

  useEffect(() => {
    const storeData = async (value: string) => {
      try {
        await AsyncStorage.setItem('token', value);
      } catch (e) {
        // saving error
      }
    };
    getToken().then(t => storeData(t));

    requestUserPermission();
    // messageForeground();

    // if(Platform.OS == "android") {
    //   messageBackground();
    // }
    fetchNotifyBackground(navigate);
    fetchNotifyQuit(navigate);

    // return () => {
    //   isReadyRef.current = false
    // };
    Start();
  }, []);
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer
        ref={navigationRef}
        // onReady={() => {
        //   // console.log(
        //   //   'Ready:' +
        //   //     JSON.stringify(navigationRef?.current?.getCurrentRoute()?.name),
        //   // );
        //   // const f = navigationRef?.current?.getCurrentRoute()?.name;
        //   // navigate('Recommend', {
        //   //   screen: navigationRef?.current?.getCurrentRoute()?.name,
        //   // });
        //   // navigate('Server', {
        //   //   screenParam: navigationRef?.current?.getCurrentRoute()?.name,
        //   // });
        //   navigate('InApp', {});
        // }}
        onStateChange={() => {
          const routeName = navigationRef?.current?.getCurrentRoute()?.name;
          if (
            (nameScreen === undefined || nameScreen === 'Homes') &&
            routeName === 'Products'
          ) {
            navigate('Recommend', {
              screen: navigationRef?.current?.getCurrentRoute()?.name,
            });
          }
          setNameScreen(navigationRef?.current?.getCurrentRoute()?.name);

          console.log('logHome:' + routeName);
          navigationRef?.current?.getCurrentRoute()?.name,
            console.log(
              'Change from: ' + nameScreen + '-' + JSON.stringify(routeName),
            );
          if (routeName == 'Homes') {
            ShowInApp(navigationRef);
          }
        }}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="CategoryList" component={CategoryList} />
          <Stack.Screen name="MyCart" component={MyCart} />
          <Stack.Screen name="ProductCatelog" component={ProductCatelog} />
          <Stack.Screen name="Home" component={MyTabs} />
          <Stack.Screen name="Detail" component={Detail} />
          <Stack.Screen name="OTP" component={OTP} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="ProductScreen" component={Product} />
          <Stack.Screen name="OrderScreen" component={Order} />
          <Stack.Screen name="OrderItemScreen" component={OrderItem} />
          <Stack.Group screenOptions={{presentation: 'transparentModal'}}>
            <Stack.Screen
              name="Recommend"
              component={RecommendModal}
              options={{headerShown: false, gestureEnabled: true}}
            />
            <Stack.Screen
              name="InApp"
              component={InAppPush}
              options={{headerShown: false, gestureEnabled: true}}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
