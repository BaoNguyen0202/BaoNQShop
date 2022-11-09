import React, {useEffect, useState} from 'react';
import {
  Box,
  HStack,
  Icon,
  Text,
  VStack,
  Image,
  ScrollView,
  Pressable,
  Center as Left,
  Divider,
  Button,
  IconButton,
  Stack,
  Hidden,
  CircleIcon,
  Select,
  CheckIcon,
  useToast,
} from 'native-base';

import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {AsyncStorage, LogBox} from 'react-native';
import {DataDraftOrder, DraftOrder} from '../../models/DraftOrder';
import {ApiServiceImpl} from '../../base/apiServiceImpl';
import {API_ADMIN_URL} from '../../src/eviroment/Enviroment';
import {CheckAuth} from '../../base/checkAuth';

const listDetail = (deliveryTime: any) => {
  var view = (
    <VStack marginBottom={'3%'}>
      <Text fontWeight={600} style={{color: '#582d9c'}}>
        <CircleIcon style={{color: '#582d9c', fontSize: 11, height: 8}} />
        Arriving by {deliveryTime.substring(0, 10)}
      </Text>
    </VStack>
  );
  return view;
};

const AddToCartButton = ({navigation}: any) => {
  return (
    <HStack marginTop={-5} space="4" alignItems="center" marginBottom={2}>
      <Button
        marginX={5}
        onPress={() => console.log('errrrr') + navigation.navigate('Homes')}
        flex={1}
        h="100%"
        py={3}
        borderRadius="4"
        _dark={{bg: 'violet.700'}}
        _light={{bg: 'primary.900'}}
        _text={{fontSize: 'md', fontWeight: 'semibold'}}>
        Continue shopping
      </Button>
    </HStack>
  );
};

export default function MyOrder({navigation}: any) {
  const [tabName, setTabName] = React.useState('Orders');
  const [data, setData] = useState<DraftOrder[]>();
  const restAPI = new ApiServiceImpl();
  const toast = useToast();

  const gridViewListOrder = (
    orders: DraftOrder[] | undefined,
    navigation: any,
  ) => {
    return orders?.map((o, index) => {
      if (o.cart.items[0]) {
        return (
          <Box
            key={index}
            p="2"
            bg="primary.100"
            borderRadius="md"
            w={{base: '100%', md: '50%'}}
            pr={{base: '2', md: '4'}}
            marginBottom={'5%'}>
            <VStack my="3" px="4" key={o.id}>
              <HStack justifyContent="space-between">
                <HStack space="3">
                  <HStack space="1">
                    <Text
                      numberOfLines={1}
                      fontSize="sm"
                      style={{color: '#444d59'}}>
                      Created at: {o.created_at.substring(0, 10)}
                    </Text>
                  </HStack>
                </HStack>
                <Text
                  fontSize="sm"
                  marginBottom={'5%'}
                  style={{
                    color:
                      o.status == 'open'
                        ? '#3fae8c'
                        : o.status == ''
                        ? '#bec3cb'
                        : '#5f2db9',
                  }}>
                  {o.status}
                </Text>
              </HStack>
              <HStack justifyContent="space-between">
                <HStack space="3">
                  <Image
                    alt="Alternate Text"
                    source={{uri: o.cart.items[0].variant.product.thumbnail}}
                    height="75"
                    width="70"
                    style={{borderRadius: 7}}
                  />
                  <VStack space="1">
                    <Text
                      fontSize="16"
                      fontWeight="900"
                      style={{color: '#1f2937'}}>
                      {o.id.substring(0, 20) + '....'}
                    </Text>
                    <HStack space="1">
                      <Text
                        alignItems="center"
                        _light={{color: 'coolGray.500'}}
                        _dark={{color: 'coolGray.300'}}
                        fontSize="sm"
                        width="100%">
                        Email: {o.cart.email}
                      </Text>
                    </HStack>
                    <HStack space="1">
                      <Text
                        alignItems="center"
                        _light={{color: 'coolGray.500'}}
                        _dark={{color: 'coolGray.300'}}
                        fontSize="sm"
                        width="100%">
                        Items:{' '}
                        {o?.cart.items.reduce(
                          (sum, i) => sum + i.quantity,
                          0,
                        ) ?? 0}
                      </Text>
                    </HStack>
                  </VStack>
                </HStack>
              </HStack>
              {/*Button outline*/}
              {btnViewInRow('DETAIL', 'CANCLE', o.id, navigation)}
            </VStack>
            {listDetail(o.created_at)}
          </Box>
        );
      }
    });
  };

  const btnViewInRow = (
    title1: any,
    title2: any,
    orderId: any,
    navigation: any,
  ) => {
    var view = (
      <HStack space={1} justifyContent="center" marginTop={'5%'}>
        <Button
          w={'100%'}
          size="sm"
          variant="outline"
          style={{borderColor: '#582d9c'}}
          onPress={() =>
            navigation.navigate('OrderItemScreen', {
              orderId: orderId,
            })
          }>
          <Text fontWeight={600} style={{color: '#582d9c'}}>
            {title1}
          </Text>
        </Button>
        {/* <Button
          w={'50%'}
          size="sm"
          variant="outline"
          style={{borderColor: '#582d9c'}}
          onPress={() => {
            cancleDraftOrder(orderId);
            getItems();
          }}>
          <Text fontWeight={600} style={{color: '#582d9c'}}>
            {title2}
          </Text>
        </Button> */}
      </HStack>
    );
    return view;
  };

  const cancleDraftOrder = async (orderId: any) => {
    console.log('DELTE ORDER');
    toast.show({description: 'DELETING ORDER'});
    var rs = await restAPI.apiDelete(API_ADMIN_URL, `draft-orders/${orderId}`);
    if (rs.deleted) {
      toast.show({description: `Cancle Order ${orderId} successfully !`});
      getItems();
    } else {
      toast.show({description: 'ERROR ORDER SCREEN API DELETE'});
      console.error('ERROR DELETE ORDER SCREEN API');
    }
  };

  const getItems = async () => {
    const dataDraftOrder = restAPI.apiGet(API_ADMIN_URL + 'draft-orders');
    const _email = await AsyncStorage.getItem('Email');

    if (dataDraftOrder) {
      var rs = await dataDraftOrder;
      var _order = rs.draft_orders.filter(
        (x: DraftOrder) => x.cart.email == _email,
      );
      setData(_order);
    }
  };

  useEffect(() => {
    getItems();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, [navigation]);

  const checkInfo = async () => {
    var check = new CheckAuth();
    await check.auth(navigation);
    return <></>;
  };

  checkInfo();

  function GridMobileHeader() {
    var view = (
      <Hidden from="md">
        <HStack space="2" justifyContent="space-between">
          <HStack space="2" alignItems="center">
            <Text color="coolGray.50" fontSize="lg" onPress={getItems}>
              My Orders
            </Text>
          </HStack>
        </HStack>
      </Hidden>
    );
    return view;
  }

  return (
    <>
      <VStack flex={1} _light={{bg: 'primary.50'}} _dark={{bg: 'customGray'}}>
        <Box
          px={{base: '4', md: '8'}}
          pt={{base: '4', md: '3'}}
          pb={{base: '5', md: '3'}}
          borderBottomWidth={{md: '5'}}
          _dark={{bg: 'coolGray.900', borderColor: 'coolGray.700'}}
          _light={{
            bg: {base: 'primary.900', md: 'white'},
            borderColor: 'coolGray.200',
          }}>
          <GridMobileHeader />
          {/* {/* Desktop header */
          /*gridDesktopHeader(props, colorMode)} */}
        </Box>
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
                  <Pressable>
                    <Icon
                      size="6"
                      as={AntDesign}
                      name={'arrowleft'}
                      _light={{color: 'coolGray.800'}}
                      _dark={{color: 'coolGray.50'}}
                    />
                  </Pressable>
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
                borderColor="#E5E7EB"
                borderRadius={8}
                direction={{base: 'column', md: 'row'}}
                space="6">
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Box flex={1} px={{base: '4'}}>
                    <HStack mt="8" space="5">
                      <Pressable
                        onPress={() => {
                          setTabName('Orders');
                        }}>
                        <Text
                          fontSize="16"
                          fontWeight="medium"
                          letterSpacing="0.4"
                          _light={{
                            color:
                              tabName == 'Orders'
                                ? 'primary.900'
                                : 'coolGray.400',
                          }}
                          _dark={{
                            color:
                              tabName == 'Orders'
                                ? 'coolGray.50'
                                : 'coolGray.400',
                          }}>
                          Orders ({data?.length ?? 0})
                        </Text>
                        {tabName == 'Orders' ? (
                          <Box width="100%" py="1">
                            <Divider bg="primary.900" />
                          </Box>
                        ) : (
                          <></>
                        )}
                      </Pressable>
                    </HStack>
                    {/* {filterForm()} */}
                    {tabName === 'Orders' ? (
                      gridViewListOrder(data, navigation)
                    ) : (
                      <></>
                    )}
                  </Box>
                </ScrollView>
                <AddToCartButton navigation={navigation} />
              </Stack>
            </VStack>
          </ScrollView>
        </Box>
      </VStack>
    </>
  );
}
