import {
  NativeBaseProvider,
  Box,
  HStack,
  Text,
  StatusBar,
  Heading,
  Image,
  ScrollView,
  Pressable,
  FlatList,
  View,
  useToast,
  Toast,
  Button,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {AsyncStorage, LogBox} from 'react-native';
import {DataProduct, Product} from '../../models/Product';
import {API_STORE_URL, TOKEN} from '../../src/eviroment/Enviroment';
import CATEGORY from './component/Category';
import RNRestart from 'react-native-restart'; // Import package from node modules

const checkEmail = (email: any, navigation: any) => {
  console.log(email);
  if (!email) {
    navigation.navigate('SignIn');
  }
};

function HEADER({navigation}: any) {
  const [data, setData] = useState<string>();

  const getItems = async () => {
    var emailLogin = await AsyncStorage.getItem('Email');
    if (emailLogin) {
      setData(emailLogin);
    } else {
      setData('');
    }
  };

  useEffect(() => {
    getItems();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native']);
  }, []);

  const logout = () => {
    console.log('LOGOUT!');
    AsyncStorage.removeItem('UserInfo');
    AsyncStorage.removeItem('CartId');
    AsyncStorage.removeItem('Email');
    Toast.show({description: 'Logout Successfully !'});
    getItems();
    if (!data) {
      navigation.navigate('SignIn');
      // RNRestart.Restart();
    }
  };
  const hideLogout = (userName: any) => {
    getItems();
    if (userName === 'admin') {
      return (
        <Pressable onPress={logout}>
          <Image
            source={require('./icons8-logout-26.png')}
            alt="Alternate Text"
            w={5}
            height={5}
          />
        </Pressable>
      );
    } else if (userName === '') {
      navigation.navigate('SignIn');
      return null;
    }
  };
  const getInfo = (userName: any) => {
    getItems();
    if (userName) {
      return (
        <Text color="#FFF" fontWeight={'bold'}>
          {data?.substring(0, data.lastIndexOf('@'))}
        </Text>
      );
    } else {
      return (
        <Image
          w={5}
          height={5}
          source={require('./icons8-user-48.png')}
          alt="Alternate Text"
        />
      );
    }
  };

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
        w="100%"
        maxW="100%"
        paddingBottom={10}
        paddingLeft={5}
        paddingRight={5}>
        <Pressable
          onPress={() => {
            RNRestart.Restart();
          }}>
          <Image
            source={require('../HomeScreen/onmarketer_logo.png')}
            alt="Alternate Text"
          />
        </Pressable>
        <HStack space={1}>
          <Pressable
            w={12}
            maxH={20}
            onPress={() => checkEmail(data, navigation)}>
            {getInfo(data?.substring(0, data.lastIndexOf('@')))}
          </Pressable>

          {/* <Pressable onPress={logout}>
            <Image
              source={require('./icons8-logout-26.png')}
              alt="Alternate Text"
              w={5}
              height={5}
            />
          </Pressable> */}
          {hideLogout(data?.substring(0, data.lastIndexOf('@')))}
        </HStack>
      </HStack>
    </>
  );
}

export default function HomeScreen({navigation}: any) {
  const [data, setData] = useState<DataProduct>();
  const toast = useToast();

  // const restAPI = new ApiServiceImpl();
  // const dataProduct = restAPI.apiGet(API_STORE_URL + 'products');

  const getItems = async () => {
    fetch(API_STORE_URL + 'products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: TOKEN,
        Accept: 'application/json',
      },
    })
      .then(async response => {
        var dataProduct = await response.json();
        if (dataProduct) {
          setData(dataProduct);
        } else {
          toast.show({description: 'ERROR HOME SCREEN API'});
          console.error('ERROR HOME SCREEN API');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const getVariantId = (p: Product) => {
    const VarID = p.variants[0].id;
    return VarID;
  };

  const getProductId = (p: Product) => {
    const proID = p.id;
    return proID;
  };

  useEffect(() => {
    getItems();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native']);
  }, []);

  const Render = (dataProduct: DataProduct | undefined) => {
    return (
      <Box justifyContent={'space-between'}>
        <FlatList
          paddingBottom={'1/4'}
          scrollEnabled={false}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={dataProduct?.products}
          renderItem={({item}) => (
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
                    VariantId: getVariantId(item),
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
                  {/* <Box marginX={2}>
                    <FavouriteIcon />
                  </Box> */}
                </HStack>
              </Box>
            </Box>
          )}
          keyExtractor={(item, index) => 'key' + index}
        />
      </Box>
    );
  };

  return (
    <NativeBaseProvider>
      <HEADER navigation={navigation} />

      <View padding={5} paddingTop={-5}>
        {/* <Button
          onPress={() => {
            navigation.navigate('Detail');
          }}>
          Detail
        </Button> */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          width="auto"
          maxHeight={'100%'}>
          <Heading size="sm" paddingTop={2} marginBottom={-2}>
            CATEGORIES
          </Heading>
          <CATEGORY navigation={navigation} />
          <Heading size="sm">FEATURED PRODUCTS</Heading>
          <>{Render(data)}</>
        </ScrollView>
      </View>
    </NativeBaseProvider>
  );
}
