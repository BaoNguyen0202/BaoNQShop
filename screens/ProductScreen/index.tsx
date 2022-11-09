import React, {useEffect, useState} from 'react';
import {
  Box,
  HStack,
  Text,
  VStack,
  StatusBar,
  Image,
  ScrollView,
  Pressable,
  Center,
  Divider,
  Button,
  Stack,
  Link,
  Hidden,
  FavouriteIcon,
  useToast,
  Toast,
} from 'native-base';

import {AsyncStorage, LogBox} from 'react-native';
import {API_STORE_URL, token} from '../../src/eviroment/Enviroment';
import {ApiServiceImpl} from '../../base/apiServiceImpl';
import {Product} from '../../models/Product';
import {CheckAuth} from '../../base/checkAuth';

const categories = [
  {
    category: 'New Born',
  },
  {
    category: 'Tiny Baby',
  },
  {
    category: '0-3 M',
  },
];

const addToCart = async (variant_id: any, navigation: any) => {
  var obj = new dataPost();
  obj.variant_id = variant_id;
  obj.quantity = 1;
  var cartId = await AsyncStorage.getItem('CartId');
  if (cartId == null) {
    try {
      await fetch(API_STORE_URL + 'carts', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          country_code: 'AE',

          items: [
            {
              variant_id: variant_id,
              quantity: 1,
            },
          ],
          context: {
            ip: '::1',
            user_agent: 'Chrome',
          },
        }),
      })
        .then(response => response.json())
        .then(data => {
          myCart(data.cart.id);
        });
      Toast.show({description: 'Add to Cart successfully !'});
      navigation.navigate('MyCart');
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      await fetch(API_STORE_URL + `carts/${cartId}/line-items`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      });
      Toast.show({description: 'Add to Cart successfully !'});
      navigation.navigate('MyCart');
    } catch (error) {
      console.error(error);
    }
  }
};
const myCart = (cart_id: any) => {
  AsyncStorage.setItem('CartId', cart_id);
};

class dataPost {
  variant_id!: string;
  quantity!: number;
}

const checkInfo = async (variant_id: string, navigation: any) => {
  var check = new CheckAuth();
  var rs = await check.auth(navigation);
  if (rs.token) {
    addToCart(variant_id, navigation);
  }
};

const AddToCartButton = ({parentToChild, navigation}: any) => {
  return (
    <HStack mt="5" space="4" alignItems="center">
      {/* <Center>
        <FavouriteIcon />
      </Center> */}
      <Button
        onPress={() => checkInfo(parentToChild, navigation)}
        flex={1}
        h="100%"
        py={3}
        borderRadius="4"
        _dark={{bg: 'violet.700'}}
        _light={{bg: 'primary.900'}}
        _text={{fontSize: 'md', fontWeight: 'semibold'}}>
        Add To Cart
      </Button>
    </HStack>
  );
};

export default function ({navigation, route}: any) {
  const [data, setData] = useState<Product>();
  const toast = useToast();
  const restAPI = new ApiServiceImpl();
  const dataProduct = restAPI.apiGet(
    API_STORE_URL + '/products/' + route.params.productId,
  );
  const getItems = async () => {
    if (dataProduct) {
      var rs = await dataProduct;
      setData(rs.product);
    } else {
      toast.show({description: 'ERROR PRODUCT SCREEN API'});
      console.error('ERROR PRODUCT SCREEN API');
    }
  };

  useEffect(() => {
    getItems();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const [tabName, setTabName] = React.useState('Description');

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Box
        safeAreaTop
        _light={{bg: 'primary.900'}}
        _dark={{bg: 'coolGray.900'}}
      />
      <VStack flex={1} _light={{bg: 'primary.50'}} _dark={{bg: 'customGray'}}>
        <Box
          flex={1}
          flexDirection={{base: 'column', md: 'row'}}
          _light={{
            borderTopColor: 'coolGray.200',
          }}
          _dark={{
            bg: 'coolGray.800',
            borderTopColor: 'coolGray.700',
          }}>
          <ScrollView
            flex={1}
            p={{md: 8}}
            contentContainerStyle={{
              alignItems: 'center',
              flex: 1,
            }}>
            <VStack maxW="1016px" flex={1} width="100%">
              <Hidden till="md">
                <HStack mb="4" space={2}>
                  <Text
                    fontSize="lg"
                    _dark={{color: 'coolGray.50'}}
                    _light={{color: 'coolGray.800'}}>
                    Body Suit
                  </Text>
                </HStack>
              </Hidden>

              <Stack
                flex={1}
                p={{md: '8'}}
                _light={{bg: 'white'}}
                _dark={{
                  borderColor: 'coolGray.700',
                  bg: {md: 'coolGray.900', base: 'coolGray.800'},
                }}
                borderWidth={1}
                borderColor="#E5E7EB"
                borderRadius={8}
                direction={{base: 'column', md: 'row'}}
                space="6">
                <Box
                  p="2"
                  bg="purple.200"
                  borderRadius="md"
                  alignItems="center"
                  w={{base: '100%', md: '50%'}}
                  h={{base: '40%', md: 'auto'}}
                  pr={{base: '2', md: '4'}}
                  justifyContent="center">
                  <Image
                    key={data?.id}
                    width="full"
                    height={{base: 'full', md: 'full'}}
                    rounded="lg"
                    alt="Alternate Text"
                    source={{uri: data?.thumbnail}}
                  />
                </Box>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Box flex={1} px={{base: '4'}}>
                    <VStack space={1}>
                      <HStack
                        justifyContent="space-between"
                        alignItems="center">
                        <Text
                          fontSize="lg"
                          _light={{color: 'coolGray.800'}}
                          _dark={{color: 'coolGray.50'}}>
                          {data?.title}
                        </Text>
                      </HStack>

                      <Text
                        fontSize="xl"
                        fontWeight="medium"
                        _light={{color: 'coolGray.800'}}
                        _dark={{color: 'coolGray.50'}}>
                        $:
                        {data?.variants[0].prices[0].amount}
                      </Text>
                    </VStack>

                    <HStack space="2" mt="5" alignItems="center">
                      <Text
                        fontSize="sm"
                        fontWeight="medium"
                        _dark={{color: 'coolGray.50'}}
                        _light={{color: 'coolGray.800'}}>
                        Selected Size
                      </Text>
                      <Text
                        fontSize="sm"
                        fontWeight="bold"
                        color="coolGray.400">
                        ({data?.variants[0].title})
                      </Text>
                      {/* <Link
                        ml="auto"
                        _text={{textDecoration: 'none'}}
                        _light={{
                          _text: {
                            color: 'primary.800',
                            fontSize: 'sm',
                            fontWeight: 'medium',
                          },
                        }}
                        _dark={{
                          _text: {
                            color: 'primary.400',
                            fontSize: 'sm',
                            fontWeight: 'medium',
                          },
                        }}>
                        Size Chart
                      </Link> */}
                    </HStack>
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}>
                      {/* <Button.Group space="2" mt={3} alignItems="center">
                        {categories.map((item, index: any) => {
                          return (
                            <Button
                              key={index}
                              py="4"
                              px="5"
                              borderRadius="4"
                              variant="subtle"
                              _text={{
                                _dark: {color: 'coolGray.50'},
                                _light: {color: 'coolGray.800'},
                                fontWeight: 'normal',
                              }}
                              //@ts-ignore
                              _light={{colorScheme: 'primary'}}
                              _dark={{
                                bg: 'coolGray.900',
                                //@ts-ignore
                                colorScheme: 'dark',
                              }}>
                              {item.category}
                            </Button>
                          );
                        })}
                    </Button.Group> */}
                    </ScrollView>
                    <HStack mt="8" space="5">
                      <Pressable
                        onPress={() => {
                          setTabName('Description');
                        }}>
                        <Text
                          fontSize="16"
                          fontWeight="medium"
                          letterSpacing="0.4"
                          _light={{
                            color:
                              tabName == 'Description'
                                ? 'primary.900'
                                : 'coolGray.400',
                          }}
                          _dark={{
                            color:
                              tabName == 'Description'
                                ? 'coolGray.50'
                                : 'coolGray.400',
                          }}>
                          Description
                        </Text>
                        {tabName == 'Description' ? (
                          <Box width="100%" py="1">
                            <Divider bg="primary.900" />
                          </Box>
                        ) : (
                          <></>
                        )}
                      </Pressable>
                      <Pressable
                        onPress={() => {
                          setTabName('Reviews');
                        }}>
                        {/* <Text
                          fontSize="16"
                          fontWeight="medium"
                          letterSpacing="0.4"
                          _light={{
                            color:
                              tabName == 'Reviews'
                                ? 'primary.900'
                                : 'coolGray.400',
                          }}
                          _dark={{
                            color:
                              tabName == 'Reviews'
                                ? 'coolGray.50'
                                : 'coolGray.400',
                          }}>
                          Reviews
                        </Text> */}
                        {tabName == 'Reviews' ? (
                          <Box width="100%" py="1">
                            <Divider bg="primary.900" />
                          </Box>
                        ) : (
                          <></>
                        )}
                      </Pressable>
                    </HStack>
                    {tabName === 'Description' ? (
                      <Text
                        mt="3"
                        fontSize="sm"
                        lineHeight="lg"
                        fontWeight="medium"
                        letterSpacing="0.3"
                        _light={{color: 'coolGray.800'}}
                        _dark={{color: 'coolGray.50'}}>
                        {data?.description}
                      </Text>
                    ) : null}
                    <AddToCartButton
                      base="flex"
                      md="none"
                      parentToChild={route.params.VariantId}
                      navigation={navigation}
                    />
                  </Box>
                </ScrollView>
              </Stack>
            </VStack>
          </ScrollView>
        </Box>
      </VStack>
    </>
  );
}
