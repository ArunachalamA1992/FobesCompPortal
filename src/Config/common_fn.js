import moment from 'moment';
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
  calculateRemainingTime: endDate => {
    const end = new Date(endDate);
    const now = new Date();

    const diffInMs = end - now;
    if (diffInMs <= 0) return 'Expired';

    const msInDay = 24 * 60 * 60 * 1000;
    const daysRemaining = Math.floor(diffInMs / msInDay);

    const weeks = Math.floor(daysRemaining / 7);
    const days = daysRemaining % 7;

    return `${weeks}w ${days}d Remaining`;
  },
};
export default common_fn;
