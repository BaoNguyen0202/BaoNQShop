import {Heading, NativeBaseProvider} from 'native-base';
import React from 'react';
export default function Setting() {
  return (
    <NativeBaseProvider>
      {/* <FOOTER navigation={navigation} /> */}
      <Heading alignItems={'center'}>Product</Heading>
    </NativeBaseProvider>
  );
}
