import type React from "react"
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, type ViewStyle, type TextStyle } from "react-native"
import Colors from "../constants/Colors"

interface ButtonProps {
  title: string
  onPress: () => void
  style?: ViewStyle
  textStyle?: TextStyle
  isLoading?: boolean
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ title, onPress, style, textStyle, isLoading = false, disabled = false }) => {
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && styles.disabled]}
      onPress={onPress}
      disabled={isLoading || disabled}
    >
      {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={[styles.text, textStyle]}>{title}</Text>}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 150,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontFamily: "Cairo-Bold",
    textAlign: "center",
  },
  disabled: {
    opacity: 0.7,
  },
})

export default Button
