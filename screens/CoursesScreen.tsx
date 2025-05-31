"use client"

import { useRef, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import Header from "../components/Header"
import QatarFlag from "../components/QatarFlag"
import type { RootStackParamList } from "../navigation/AppNavigator"
import Colors from "../constants/Colors"
import Menu from "@/components/Menu"
import { useCourses } from "../contexts/CoursesContext"

type CoursesScreenNavigationProp = StackNavigationProp<RootStackParamList, "Courses">

const CoursesScreen = () => {
  const navigation = useNavigation<CoursesScreenNavigationProp>()
  const fadeAnim = useRef(new Animated.Value(0)).current
  const { courses, isLoading, error } = useCourses()

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start()
  }, [fadeAnim])

  const handleCoursePress = (course: any) => {
    if (course.status === "مأجلة") {
      navigation.navigate("CourseDetail", { course })
    }
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="الواجهة" showBackButton />
        <Menu />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </SafeAreaView>
    )
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="الواجهة" showBackButton />
        <Menu />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="الواجهة" showBackButton />

      <Menu />

      <ScrollView style={styles.scrollView}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <View style={styles.blueCard}>
            <Text style={styles.title}>رزنامة الدورات</Text>

            <View style={styles.tableContainer}>
              {/* Colonnes scrollables */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View>
                  <View style={styles.tableHeader}>
                    <Text style={styles.headerCell}>برنامج الدورة</Text>
                    <Text style={styles.headerCell}>مدة الدورة</Text>
                    <Text style={styles.headerCell}>حالة الدورة</Text>
                    <Text style={styles.headerCell}>تاريخ الدورة</Text>
                  </View>

                  {courses.map((course, index) => (
                    <TouchableOpacity
                      key={course.id}
                      style={[styles.tableRow, index % 2 === 0 ? styles.evenRow : {}]}
                      onPress={() => handleCoursePress(course)}
                    >
                      <Text style={styles.cell}>{course.program}</Text>
                      <Text style={styles.cell}>{course.duration}</Text>
                      <Text style={[styles.cell, styles.statusCell]}>{course.status}</Text>
                      <Text style={styles.cell}>{course.date}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
              {/* Colonne fixe */}
              <View style={styles.fixedColumn}>
                <Text style={[styles.headerCell, styles.fixedHeaderCell]}>اسم الدورة</Text>
                {courses.map((course, index) => (
                  <TouchableOpacity
                    key={course.id}
                    style={[styles.fixedCell, index % 2 === 0 ? styles.evenRow : {}]}
                    onPress={() => handleCoursePress(course)}
                  >
                    <Text style={styles.cell} numberOfLines={1} ellipsizeMode="tail">
                      {course.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      <QatarFlag size={50} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontFamily: 'Cairo-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginHorizontal: 10,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  blueCard: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 15,
    overflow: "hidden",
  },
  title: {
    fontSize: 24,
    fontFamily: "Cairo-Bold",
    color: "white",
    textAlign: "right",
    marginBottom: 15,
  },
  tableContainer: {
    flexDirection: "row",
  },
  fixedColumn: {
    width: 140,
    borderRightWidth: 0,
    borderRightColor: "rgba(255, 255, 255, 0.3)",
  },
  fixedHeaderCell: {
    borderBottomWidth: 1,
    width:140,
    borderBottomColor: "rgba(255, 255, 255, 0.3)",
    paddingBottom: 10,
    textAlign: 'right', 
    writingDirection: 'rtl' 
  },
  fixedCell: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.3)",
    paddingBottom: 10,
  },
  headerCell: {
    width: 120,
    color: "white",
    fontFamily: "Cairo-Bold",
    fontSize: 14,
    textDecorationLine: "underline",
    textAlign: "right",
    writingDirection: "rtl",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  evenRow: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  cell: {
    width: 120,
    height: 16,
    color: "white",
    fontFamily: "Cairo-Regular",
    fontSize: 12,
    textAlign: "right",
    writingDirection: "rtl",
  },
  statusCell: {
    fontFamily: "Cairo-Bold",
  },
})

export default CoursesScreen
