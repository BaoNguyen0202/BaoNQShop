import {NativeBaseProvider, View} from 'native-base';
import {Button, Text} from 'react-native';
import React, {useEffect} from 'react';

import {getToken, Init, RecommendModal} from 'onmarketer-sdk';
export default function Detail({navigation}: any) {
  const [tokens, setTokens] = React.useState<string>('');
  const [appId, setAppId] = React.useState<number>(80810); //80810
  const [customerId, setCustomerId] = React.useState<string>(''); //10111

  useEffect(() => {
    getToken().then(t => setTokens(t));
    console.log('token:' + tokens);
  }, []);
  return (
    <NativeBaseProvider>
      <View>
        {/* <Button title="dang ky" onPress={() => Init(80810, tokens, '')} /> */}
        <Button
          onPress={() => Init(appId, tokens, customerId)}
          title="Đăng kí nhận thông báo"
        />
        <Text>Token:{tokens}</Text>
        <Button
          onPress={() => {
            navigation.navigate('Home');
          }}
          title="Home"
        />
        <Text>Detaill</Text>
        {/* <RecommendModal routerScreen={navigation} /> */}
      </View>
    </NativeBaseProvider>
  );
}
