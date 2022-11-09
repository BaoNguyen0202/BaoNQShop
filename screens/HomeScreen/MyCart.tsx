import {
  Box,
  Button,
  Center,
  Divider,
  FlatList,
  HStack,
  NativeBaseProvider,
  Pressable,
  Stack,
  StatusBar,
  Text,
  View,
  VStack,
  Image,
  AddIcon,
  MinusIcon,
  DeleteIcon,
  Toast,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {AsyncStorage, LogBox} from 'react-native';
import {apiItems, token} from '../../src/eviroment/Enviroment';
import axios from 'axios';
import {Item} from '../../models/ListOrderItem';
import {CheckAuth} from '../../base/checkAuth';

const noData = ({navigation}: any) => {
  return (
    <>
      <Image
        flex={1}
        bg="white"
        borderRadius={5}
        source={{
          uri: 'https://rtworkspace.com/wp-content/plugins/rtworkspace-ecommerce-wp-plugin/assets/img/empty-cart.png',
        }}
        alt="Alternate Text"
        size={'xl'}
        height={'100%'}
        width={'100%'}
      />
      <>
        <HStack
          bg={'#FFF'}
          marginTop={-5}
          space="4"
          alignItems="center"
          marginBottom={2}>
          <Button
            marginX={5}
            onPress={() => console.log('errrrr') + navigation.navigate('Homes')}
            flex={1}
            h="100%"
            py={3}
            borderRadius="4"
            bg={'violet.900'}
            _dark={{bg: 'violet.700'}}
            _text={{fontSize: 'md', fontWeight: 'semibold'}}>
            Continue shopping
          </Button>
        </HStack>
      </>
    </>
  );
};
function convertCurency(prices: number) {
  return prices.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

const calculateTotal = (listItem: any) => {
  var total = 0;
  listItem.forEach((x: any) => {
    total += x.count * x.unit_price;
  });
  return convertCurency(total);
};

function AppBar() {
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
        <HStack alignItems="center">
          <Text marginLeft={5} color="white" fontSize="20" fontWeight="bold">
            My Cart
          </Text>
        </HStack>
      </HStack>
    </>
  );
}

export default function MyCart({navigation}: any) {
  const [data, setData] = useState([]);

  const getItems = async () => {
    var id = await AsyncStorage.getItem('CartId');
    console.log(id);
    try {
      const response = await axios.get(apiItems + `store/carts/${id}`);
      var dataCart: any = [];
      response.data.cart.items.forEach((x: any) => {
        var obj = {
          ...x,
          count: x.quantity,
        };
        dataCart.push(obj);
      });
      setData(dataCart);
    } catch (error) {
      if (axios.isCancel(error)) {
      } else {
        // Handle error
      }
    }
  };

  const deleteAllItems = () => {
    data.map(async (p: any) => {
      var id = await AsyncStorage.getItem('CartId');

      await fetch(apiItems + `store/carts/${id}/line-items/` + p.id, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }).then(response => {});
    });

    getItems();
    navigation.navigate('Order');
  };

  const deleteItem = async (p: any) => {
    var id = await AsyncStorage.getItem('CartId');
    const IdItem = p.id;
    await fetch(apiItems + `store/carts/${id}/line-items/` + IdItem, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
        'My-Custom-Header': 'foobar',
      },
    }).then(response => {
      getItems();
      console.log(response.status);
    });
  };

  const reqOrderItem = async (listP: any) => {
    var _email = await AsyncStorage.getItem('Email');
    var reqBody = {
      status: 'open',
      email: _email,
      billing_address: {
        id: 'addr_01G8ZC9VS1XVE149MGH2J7QSSH',
        customer_id: 'cus_01G2SG30J8C85S4A5CHM2S1NS2',
        customer: [{}],
        company: 'NOVAON',
        first_name: 'Arno',
        last_name: 'Willms',
        address_1: '14433 Kemmer Court',
        address_2: 'Suite 369',
        city: 'South Geoffreyview',
        country_code: 'st',
        country: {},
        province: 'Kentucky',
        postal_code: 72093,
        phone: 16128234334802,
        created_at: new Date(),
        metadata: {
          car: 'white',
        },
      },
      items: listP,
      region_id: 'reg_01GC6F7BX40VA1HN3KMGSG9WDJ',
      customer_id: 'string',
      no_notification_order: true,
      shipping_methods: [
        {
          option_id: 'so_01GC6F7C2ZW48KTM3P9W7MK1CN',
          data: {},
          price: 0,
        },
      ],
      metadata: {},
    };

    return reqBody;
  };

  useEffect(() => {
    getItems();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const UpdateCountCartItem = async () => {
    var listP: any = [];
    data.map((p: any) => {
      var _item = new Item();
      _item.variant_id = p.variant_id;
      _item.unit_price = p.unit_price;
      _item.title = p.title;
      _item.quantity = p.count;
      _item.metadata = {car: ''};
      listP.push(_item);
    });
    createItem(listP);
  };

  // const updateCartItem = async (listP: any) => {
  //   var id = await AsyncStorage.getItem('CartId');
  //   await deleteAllItems();
  //   listP.map(async (p: dataCartItem) => {
  //     try {
  //       const response = await fetch(apiItems + `store/carts/${id}/line-items`, {
  //         method: 'POST',
  //         headers: {
  //           Accept: 'application/json',
  //           Authorization: 'Bearer ' + token,
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(p),
  //       });
  //       const json = await response.json();
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   })
  // }

  function CART() {
    const incrementCount = (item: any) => {
      var varId = item.variant_id;
      setData(
        data.map(x => {
          if (x.variant_id === varId) {
            x.count++;
          }
          return x;
        }),
      );
      calculateTotal(data);
    };
    const reductions = (item: any) => {
      var varId = item.variant_id;
      setData(
        data.map(x => {
          if (x.variant_id === varId) {
            x.count--;
          }
          return x;
        }),
      );
      calculateTotal(data);
    };

    return (
      <View flex={15} height="100%" width="100%">
        <Box height="auto" maxHeight="100%">
          <FlatList
            data={data}
            renderItem={({item}) => (
              <View>
                <HStack justifyContent="space-between">
                  <Box flex={3}>
                    <HStack marginLeft={5}>
                      <Box>
                        <Image
                          marginY={2}
                          bg="white"
                          borderRadius={5}
                          source={{
                            uri: item.thumbnail,
                          }}
                          alt="Alternate Text"
                          size={'xl'}
                          height={100}
                          width={65}
                        />
                      </Box>
                      <Box>
                        <VStack marginLeft={3} marginY={2}>
                          <Text fontWeight={'bold'} fontSize={20}>
                            {item.title}
                          </Text>

                          <Text color={'gray.500'}>
                            Size : {item.variant.title}
                          </Text>
                          <Text color={'gray.500'}>{item.status}</Text>
                          <HStack>
                            <Text>
                              ₹ :
                              {/* {
                              item.variants[0].prices.filter(
                                (p: any) => p.currency_code === 'usd',
                              )[0].amount
                            } */}
                              {convertCurency(item.unit_price)}
                            </Text>
                          </HStack>
                        </VStack>
                      </Box>
                    </HStack>
                  </Box>
                  <VStack>
                    <Pressable
                      onPress={() => deleteItem(item)}
                      alignItems={'flex-end'}
                      marginRight={5}
                      marginY={5}>
                      <DeleteIcon />
                    </Pressable>
                    {/* <Button
                      onPress={() => UpdateCoutCartItem(item)}
                      color={'green.700'}
                      marginTop={-3}
                      alignSelf={'center'}>
                      Xác nhận mua
                    </Button> */}
                    <HStack
                      alignItems={'flex-end'}
                      marginRight={5}
                      justifyContent={'flex-end'}
                      flex={1}
                      marginY={2}>
                      <Button
                        onPress={() => reductions(item)}
                        marginRight={3}
                        _pressed={{
                          bg: 'orange.600:alpha.20',
                        }}
                        size={6}
                        background={'violet.300'}>
                        <MinusIcon />
                      </Button>

                      <Text fontWeight={'bold'} width={4}>
                        {/* {item.quantity} */}

                        {item.count}
                      </Text>
                      <Button
                        onPress={() => incrementCount(item)}
                        marginLeft={3}
                        _pressed={{
                          bg: 'orange.600:alpha.20',
                        }}
                        colorScheme="indigo"
                        variant="solid"
                        size={6}
                        background={'violet.300'}>
                        <AddIcon />
                      </Button>
                    </HStack>
                  </VStack>
                </HStack>
                <Divider maxWidth={'90%'} alignSelf="center" />
              </View>
            )}
            keyExtractor={item => item.id}
          />
        </Box>
      </View>
    );
  }

  const createItem = async (listP: any) => {
    try {
      var req = await reqOrderItem(listP);
      const response = await fetch(apiItems + 'admin/draft-orders', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
      });
      const json = await response.json();
      if (json) {
        console.log('Create order successfully !');
        Toast.show({
          description: 'Create Order successfully ! please check your order',
        });
        deleteAllItems();
      }
    } catch (error) {
      console.error(error);
    }
  };

  function FOOTER() {
    // const listP = data.map((p: any) => p.cart.items);

    // const arr = data.map((p: any) => p.unit_price);
    const totalAmout = data.reduce((a, v) => (a = a + v.unit_price), 0);
    return (
      <Stack flex={8} bg="white" width="100%" maxW="100%" alignSelf="center">
        <Divider maxWidth={'90%'} alignSelf="center" />
        <Text marginY={1} marginLeft={5} fontSize={18}>
          Oder Detail ({data.length})
        </Text>
        <Divider maxWidth={'90%'} alignSelf="center" />
        <HStack flex={1.5} justifyContent="space-between" marginX={5}>
          <VStack marginY={2}>
            <Text>Total MRP</Text>
            <Text>Discout on MRP</Text>
            <Text>Shiping</Text>
          </VStack>
          <VStack marginY={2} alignItems={'flex-end'}>
            <Text> ₹ {convertCurency(totalAmout)}</Text>
            <Text>0</Text>
            <Text>
              ₹ <Text textDecorationLine={'line-through'}>10</Text> Free
            </Text>
          </VStack>
        </HStack>
        <Divider maxWidth={'90%'} alignSelf="center" />

        <Divider
          bg="violet.100"
          maxWidth={'90%'}
          height={2}
          alignSelf="center"
        />
        <HStack
          marginX={5}
          marginY={1}
          flex={0.5}
          justifyContent="space-between">
          <Text paddingBottom={1}>Delivery Address</Text>
          <Text color={'purple.700'} fontSize={12}>
            Change
          </Text>
        </HStack>
        <HStack justifyContent="space-between">
          <HStack
            flex={2}
            marginX={5}
            justifyContent="space-between"
            alignItems="center">
            <Text fontSize={16} fontWeight={'bold'} marginTop={1}>
              Total Amount
            </Text>
            <Text fontSize={16} fontWeight={'bold'} marginTop={1}>
              {/* ₹ {convertCurency(totalAmout)} */}₹{calculateTotal(data)}
            </Text>
          </HStack>
          <HStack
            flex={1}
            borderRadius={3}
            marginRight={5}
            bg="violet.800"
            alignItems="center"
            safeAreaBottom>
            <Pressable
              py="3"
              // Truyền tất cả sản phẩm có trong giỏ hàng vào createItem
              onPress={() =>
                Toast.show({
                  description: 'Creating oder',
                }) + UpdateCountCartItem()
              }>
              <Center>
                <Text paddingX={5} color="white" fontSize="12">
                  PLACE ODER
                </Text>
              </Center>
            </Pressable>
          </HStack>
        </HStack>
      </Stack>
    );
  }

  const checkInfo = async () => {
    var check = new CheckAuth();
    await check.auth(navigation);
    return <></>;
  };

  checkInfo();

  if (data.length > 0) {
    return (
      <NativeBaseProvider>
        <AppBar />
        <CART />
        <FOOTER />
      </NativeBaseProvider>
    );
  }
  return (
    <NativeBaseProvider>
      <AppBar />
      {noData((navigation = {navigation}))}
    </NativeBaseProvider>
  );
}
