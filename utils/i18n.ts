import { I18nManager, TextStyle } from 'react-native';

// Forcer le mode RTL
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

// Configuration des styles RTL
export const RTLStyles: TextStyle = {
  textAlign: 'right' as const,
  writingDirection: 'rtl' as const,
  textDirection: 'rtl' as const,
};

// Configuration des icônes directionnelles
export const RTLIcons = {
  back: 'chevron-forward',
  forward: 'chevron-back',
  next: 'arrow-back',
  previous: 'arrow-forward',
};

// Configuration des animations
export const RTLAnimations = {
  translateX: (value: number) => -value,
  scaleX: -1,
};

export default {
  RTLStyles,
  RTLIcons,
  RTLAnimations,
}; 