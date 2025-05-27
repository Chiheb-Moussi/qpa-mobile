"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import DropDownPicker from "react-native-dropdown-picker"
import Colors from "../constants/Colors"

interface YearPickerProps {
  onYearChange: (year: string) => void
}

const YearPicker: React.FC<YearPickerProps> = ({ onYearChange }) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("2025")
  const [items, setItems] = useState([
    { label: "2023", value: "2023" },
    { label: "2024", value: "2024" },
    { label: "2025", value: "2025" },
    { label: "2026", value: "2026" },
  ])

  return (
    <View style={styles.container}>
      <Text style={styles.label}>الرجاء تحديد السنة</Text>
      <View style={styles.pickerContainer}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={(val) => {
            setValue(val)
            if (typeof val === "function") {
              const newVal = val(value)
              onYearChange(newVal)
            } else {
              onYearChange(val)
            }
          }}
          setItems={setItems}
          style={styles.picker}
          textStyle={styles.pickerText}
          dropDownContainerStyle={styles.dropDownContainer}
          placeholder="اختر السنة"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginVertical: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: "Cairo-Bold",
    color: "white",
    textAlign: "center",
  },
  pickerContainer: {
    width: "50%",
    zIndex: 1000,
  },
  picker: {
    backgroundColor: "transparent",
    borderWidth: 0,
    borderBottomWidth: 2,
    borderBottomColor: "white",
  },
  pickerText: {
    fontSize: 24,
    fontFamily: "Cairo-Bold",
    color: "white",
    textAlign: "center",
  },
  dropDownContainer: {
    backgroundColor: Colors.primary,
    borderWidth: 0,
  },
})

export default YearPicker
