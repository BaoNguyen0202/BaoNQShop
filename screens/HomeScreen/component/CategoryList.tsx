import {
  Box,
  Center,
  FavouriteIcon,
  FlatList,
  HamburgerIcon,
  HStack,
  IconButton,
  Image,
  NativeBaseProvider,
  Pressable,
  SearchIcon,
  ShareIcon,
  StatusBar,
  Text,
  ThreeDotsIcon,
  useToast,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {LogBox} from 'react-native';
import {ApiServiceImpl} from '../../../base/apiServiceImpl';
import {Collection} from '../../../models/Collection';
import {DataProduct, Product} from '../../../models/Product';
import {
  API_ADMIN_URL,
  API_STORE_URL,
  TOKEN,
} from '../../../src/eviroment/Enviroment';

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
        <HStack alignItems="center">
          <IconButton
            width={50}
            height={50}
            onPress={() => navigation.navigate('Home')}>
            <HamburgerIcon color="#FFF" />
          </IconButton>
          <Text color="white" fontSize="20" fontWeight="bold">
            CategoryList
          </Text>
        </HStack>
      </HStack>
    </>
  );
}

export default function CategoryList({navigation, route}: any) {
  function RenderProduct() {
    const _keyExtractor = (item: any) => item.id.toString();

    const [data, setData] = useState<Collection>();
    const [dataProducts, setDataProduct] = useState<DataProduct>();
    const [datas, setDatas] = useState<DataProduct>();
    const restAPI = new ApiServiceImpl();
    const toast = useToast();

    const dataCollection = restAPI.apiGetWithParam(
      API_STORE_URL + 'collections',
      '/' + route.params.collectionId,
    );
    const products = restAPI.apiGet(API_STORE_URL + 'products');
    const getItems = async () => {
      if (dataCollection) {
        var rs = await dataCollection;
        setData(rs.collection);
      } else {
        toast.show({description: 'ERROR CATEGORYLIST SCREEN API'});
        console.error('ERROR CATEGORYLIST SCREEN API');
      }
      if (await products) {
        var _listP = await products;
        var listFitler: any = [];

        setDataProduct(_listP);
        _listP.products.map((x: any) => {
          if (x.collection_id === route.params.collectionId) {
            listFitler.push(x);
          }
        });
        return setDatas(listFitler);
      }
    };

    useEffect(() => {
      LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
      getItems();
    }, []);

    const getVariantId = (id: any) => {
      var _product = dataProducts?.products.filter((p: Product) => p.id === id);
      if (_product) {
        return _product[0]?.variants[0].id;
      }
    };

    return (
      <Center>
        <FlatList
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={datas}
          renderItem={({item}: any) => (
            <Box
              bg="purple.200"
              size={'160'}
              marginY={2}
              marginX={2}
              height={'auto'}>
              <Pressable
                onPress={() =>
                  navigation.navigate('ProductScreen', {
                    productId: item.id,
                    VariantId: getVariantId(item.id),
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
              <Box marginX={5}>
                <Text height={5} fontWeight={'bold'}>
                  {item.title}
                </Text>
                <HStack justifyContent={'space-between'}>
                  <Text fontWeight={'bold'}>
                    $:{' '}
                    {dataProducts?.products[0].variants[0].prices[0].amount ??
                      0}
                  </Text>
                </HStack>
              </Box>
            </Box>
          )}
          keyExtractor={_keyExtractor}
        />
      </Center>
    );
  }

  return (
    <NativeBaseProvider>
      <AppBar navigation={navigation} />
      <Box>
        <RenderProduct />
      </Box>
    </NativeBaseProvider>
  );
}
