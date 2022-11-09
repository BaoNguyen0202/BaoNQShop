import { Toast } from "native-base";
import { AsyncStorage } from "react-native";
import { UserInfo } from "../models/UserInfo";

export class CheckAuth {
    async auth(navigation: any) {
        var info = new UserInfo();
        await AsyncStorage.getItem('UserInfo').then((value) => {
            if (value !== null) {
                info = JSON.parse(value);
                if (!info.token) {
                    Toast.show({ description: 'You need to login with account to use this action' });
                    navigation.navigate('SignIn');
                }
            }
            else {
                Toast.show({ description: 'You need to login with account to use this action' });
                navigation.navigate('SignIn');
            }
        });
        return info;
    }
}