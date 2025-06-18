"use client"

import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native"
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native"
// @ts-ignore
import { Ionicons } from "@expo/vector-icons"
import type { RootStackParamList } from "../navigation/AppNavigator"
import Colors from "../constants/Colors"

type CourseDetailScreenRouteProp = RouteProp<RootStackParamList, "CourseDetail">

const CourseDetailScreen = () => {
  const navigation = useNavigation()
  const route = useRoute<CourseDetailScreenRouteProp>()
  const { course } = route.params

  return (
    <Modal visible={true} transparent={true} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>إسم الدورة</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
              <Ionicons name="close-circle" size={28} color="#333" />
            </TouchableOpacity>
          </View>

          <View style={styles.courseCard}>
            <Text style={styles.courseName}>{course.name}</Text>

            <View style={styles.dateContainer}>
              <View style={styles.dateColumn}>
                <Text style={styles.dateLabel}>نهاية التاريخ البديل</Text>
                <Text style={styles.dateValue}>{course.alternativeEndDate}</Text>
              </View>
              <View style={styles.dateColumn}>
                <Text style={styles.dateLabel}>بداية التاريخ البديل</Text>
                <Text style={styles.dateValue}>{course.alternativeStartDate}</Text>
              </View>
            </View>
          </View>

        
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    height: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    position: "relative",
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Cairo-Bold",
    color: Colors.text,
  },
  closeButton: {
    position: "absolute",
    left: 15,
  },
  courseCard: {
    backgroundColor: Colors.primary,
    margin: 20,
    borderRadius: 15,
    padding: 20,
    marginTop: 40,
  },
  courseName: {
    fontSize: 22,
    fontFamily: "Cairo-Bold",
    color: "white",
    textAlign: "center",
    marginBottom: 30,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateColumn: {
    flex: 1,
    alignItems: "center",
  },
  dateLabel: {
    fontSize: 16,
    fontFamily: "Cairo-Bold",
    color: "white",
    marginBottom: 10,
  },
  dateValue: {
    fontSize: 18,
    fontFamily: "Cairo-Regular",
    color: "white",
  },
})

export default CourseDetailScreen
