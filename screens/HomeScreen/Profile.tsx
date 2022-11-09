import {Heading, NativeBaseProvider} from 'native-base';
import React from 'react';
export default function Profile() {
  return (
    <NativeBaseProvider>
      <Heading alignItems={'center'}>Profile</Heading>
    </NativeBaseProvider>
  );
}
