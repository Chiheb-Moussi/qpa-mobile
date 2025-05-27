import type React from "react"
import { View, TextInput, StyleSheet, Text, type ViewStyle, type TextInputProps, type TextStyle } from "react-native"
import Colors from "../constants/Colors"

interface InputProps extends TextInputProps {
  label?: string
  error?: string
  containerStyle?: ViewStyle
  labelStyle?: TextStyle
  secureTextEntry?: boolean
}

const Input: React.FC<InputProps> = ({ label, error, containerStyle, labelStyle, ...props }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <TextInput style={[styles.input, error ? styles.inputError : null]} placeholderTextColor="#999" {...props} />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    color: Colors.text,
    fontFamily: "Cairo-Regular",
    textAlign: "right",
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: Colors.text,
    backgroundColor: Colors.secondary,
    fontFamily: "Cairo-Regular",
    textAlign: "right",
  },
  inputError: {
    borderColor: Colors.error,
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginTop: 4,
    fontFamily: "Cairo-Regular",
    textAlign: "right",
  },
})

export default Input
