import {
  Box,
  Button,
  FavouriteIcon,
  FlatList,
  HamburgerIcon,
  HStack,
  IconButton,
  Image,
  NativeBaseProvider,
  Pressable,
  ScrollView,
  SearchIcon,
  ShareIcon,
  StatusBar,
  Text,
  ThreeDotsIcon,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {LogBox} from 'react-native';
import {apiItems, token} from '../../src/eviroment/Enviroment';
function AppBar({navigation}: any) {
  return (
    <>
      <StatusBar backgroundColor="#3700B3" barStyle="light-content" />
      <Box safeAreaTop bg="violet.600" />
      <HStack
        bg="violet.800"
        px="1"
        py="3"
        justifyContent="space-between"
        alignItems="center"
        w="100%">
        <HStack marginLeft={5} alignItems="center">
          <Text color="white" fontSize="20" fontWeight="bold">
            Product
          </Text>
        </HStack>
      </HStack>
    </>
  );
}
export default function ProductCatelog({navigation}: any) {
  const [data, setData] = useState([]);
  const getItems = async () => {
    try {
      const response = await fetch(apiItems + 'store/products', {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'GET',
      });
      const json = await response.json();
      setData(json.products);
    } catch (error) {
      console.error(error);
    }
  };
  function getProductId(p: any) {
    const proID = p.id;

    return proID;
  }
  const VariantId = (p: any) => {
    const VarID = p.variants[0].id;
    console.log('Varrrr', VarID);

    return VarID;
  };
  useEffect(() => {
    getItems();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  const Render = (Fetchdata: any) => {
    return (
      <Box justifyContent={'space-between'}>
        <FlatList
          scrollEnabled={false}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={Fetchdata}
          renderItem={({item}: any) => (
            <Box
              bg="purple.200"
              w={'47%'}
              marginRight={5}
              marginY={2}
              height={'auto'}>
              <Pressable
                onPress={() =>
                  navigation.navigate('ProductScreen', {
                    productId: getProductId(item),
                    VariantId: VariantId(item),
                  })
                }>
                <Image
                  margin={2.5}
                  borderRadius={5}
                  source={{
                    uri: item.thumbnail,
                  }}
                  alt="Alternate Text"
                  w={'88%'}
                  height={200}
                />
              </Pressable>
              <Box marginLeft={3} marginY={3}>
                <Text>{item.title}</Text>
                <HStack justifyContent={'space-between'}>
                  <Text fontWeight={'bold'}>
                    $ :
                    {
                      item.variants[0].prices.filter(
                        (p: any) => p.currency_code === 'usd',
                      )[0].amount
                    }
                  </Text>
                </HStack>
              </Box>
            </Box>
          )}
          keyExtractor={(item: any, index: any) => 'key' + index}
        />
      </Box>
    );
  };
  return (
    <NativeBaseProvider>
      <AppBar navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        marginLeft={5}
        marginRight={5}>
        <>{Render(data)}</>
      </ScrollView>
    </NativeBaseProvider>
  );
}
