import type React from "react"
import { TouchableOpacity, Text, StyleSheet, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Colors from "../constants/Colors"

interface SpecializationItemProps {
  title: string
  onPress: () => void
}

const SpecializationItem: React.FC<SpecializationItemProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.iconContainer}>
        <Ionicons name="chevron-forward" size={24} color="white" />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 8,
    width: "100%",
  },
  title: {
    fontSize: 18,
    color: "white",
    fontFamily: "Cairo-SemiBold",
    textAlign: "right",
    flex: 1,
  },
  iconContainer: {
    marginLeft: 10,
  },
})

export default SpecializationItem
