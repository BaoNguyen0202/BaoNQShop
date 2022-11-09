import {Center, NativeBaseProvider} from 'native-base';
import React from 'react';
export default function BlankScreen(data: any[]) {
  if (!data) {
    return (
      <NativeBaseProvider>
        <Center>Chưa có dữ liệu</Center>
      </NativeBaseProvider>
    );
  }
}
