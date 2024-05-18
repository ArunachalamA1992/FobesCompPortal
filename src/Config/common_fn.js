import {Platform, ToastAndroid, LayoutAnimation, UIManager} from 'react-native';

const common_fn = {
  showToast: msg => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    }
  },
  Accordion: () => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  },
  AccordionAnimation: () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  },
};
export default common_fn;
