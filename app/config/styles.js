import { Platform } from 'react-native';
import colors from './colors';

export default {
    colors,
    text: {
        ...Platform.select({
            ios: {
                fontSize: 20,
                fontFamily: "Avenir",
                color: colors.dark
            },
            android: {
                fontSize: 18,
                fontFamily: "Roboto",
                color:colors.dark
            }
        })
    }
}
 
