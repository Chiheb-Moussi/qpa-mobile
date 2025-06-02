import { Platform } from 'react-native'

export const Fonts = {
  regular: Platform.OS === 'ios' ? 'System' : 'Cairo-Regular',
  medium: Platform.OS === 'ios' ? 'System' : 'Cairo-SemiBold',
  bold: Platform.OS === 'ios' ? 'System' : 'Cairo-Bold',
} 