import type React from "react"
import { TouchableOpacity, Text, StyleSheet, Image, View, type ImageSourcePropType } from "react-native"
import Colors from "../constants/Colors"

interface MenuIconProps {
  title: string
  icon: ImageSourcePropType
  onPress: () => void
  isSelected?: boolean
}

const MenuIcon: React.FC<MenuIconProps> = ({ title, icon, onPress, isSelected = false }) => {
  return (
    <TouchableOpacity style={[styles.container, isSelected && styles.selected]} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Image source={icon} style={styles.icon} resizeMode="contain" />
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: 10,
    width: 80,
  },
  selected: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 8,
  },
  iconContainer: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 40,
    height: 40,
  },
  title: {
    marginTop: 4,
    fontSize: 12,
    textAlign: "center",
    color: Colors.text,
    fontFamily: "Cairo-Regular",
  },
})

export default MenuIcon
