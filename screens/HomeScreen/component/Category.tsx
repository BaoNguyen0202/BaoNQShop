import {
  Box,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  Toast,
  useToast,
  VStack,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {LogBox} from 'react-native';
import {ApiServiceImpl} from '../../../base/apiServiceImpl';
import {Collection, CollectionStore} from '../../../models/CollectionStore';
import {API_STORE_URL} from '../../../src/eviroment/Enviroment';

// {
//   item.variants[0].prices.filter((p: any) => p.currency_code === 'usd')[0]
//     .amount;
// }
export default function CATEGORY({navigation}: any) {
  const toast = useToast();
  const [dataCollections, setDataCollections] = useState<CollectionStore>();

  const restAPI = new ApiServiceImpl();
  const _collections = restAPI.apiGet(API_STORE_URL + 'collections');

  const getItems = async () => {
    if (_collections) {
      setDataCollections(await _collections);
    } else {
      toast.show({description: 'ERROR CATEGORY SCREEN API'});
      console.error('ERROR CATEGORY SCREEN API');
    }
  };

  const renderProduct = (collection: Collection) => {
    var _img =
      collection.title.toLowerCase() === 'other'
        ? 'https://medusa-public-images.s3.eu-west-1.amazonaws.com/coffee-mug.png'
        : collection.title.toLowerCase() === 'trousers'
        ? 'https://medusa-public-images.s3.eu-west-1.amazonaws.com/shorts-vintage-front.png'
        : collection.title.toLowerCase() === 'shirt'
        ? 'https://medusa-public-images.s3.eu-west-1.amazonaws.com/black_hoodie_front.png'
        : 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg';
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('CategoryList', {
            collectionId: collection.id,
          })
        }>
        <Image
          marginY={1}
          alignSelf={'center'}
          maxWidth={100}
          size={100}
          alt="Alternate Text"
          source={{uri: _img}}
        />
      </Pressable>
    );
  };

  useEffect(() => {
    getItems();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  return (
    <ScrollView
      flex={1}
      horizontal={true}
      showsHorizontalScrollIndicator={false}>
      <VStack>
        <HStack alignItems="center">
          {dataCollections?.collections.map((val: any, index: any) => (
            <Box
              key={index}
              maxW={20}
              width={100}
              marginRight={'16'}
              height={5}
              marginTop={5}>
              <Text
                textTransform={'uppercase'}
                fontWeight={'600'}
                numberOfLines={1}
                width={70}
                ellipsizeMode="tail"
                color="black">
                {val.title}
              </Text>
            </Box>
          ))}
        </HStack>
        <HStack space={8} alignItems="center" marginTop={2}>
          {dataCollections?.collections.map((val: any, index: any) => (
            <Box marginBottom={5} key={index} size={110} bg="purple.200">
              {renderProduct(val)}
            </Box>
          ))}
        </HStack>
      </VStack>
    </ScrollView>
  );
}
