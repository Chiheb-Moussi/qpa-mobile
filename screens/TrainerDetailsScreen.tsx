"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Animated } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRoute, type RouteProp } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import Header from "../components/Header"
import QatarFlag from "../components/QatarFlag"
import type { RootStackParamList } from "../navigation/AppNavigator"
import Colors from "../constants/Colors"

type TrainerDetailsScreenRouteProp = RouteProp<RootStackParamList, "TrainerDetails">

interface SectionProps {
  title: string
  children: React.ReactNode
  initiallyExpanded?: boolean
}

const Section: React.FC<SectionProps> = ({ title, children, initiallyExpanded = false }) => {
  const [expanded, setExpanded] = useState(initiallyExpanded)
  const animationHeight = useRef(new Animated.Value(initiallyExpanded ? 1 : 0)).current
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [])

  const toggleExpanded = () => {
    setExpanded(!expanded)
    Animated.timing(animationHeight, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start()
  }

  const bodyHeight = animationHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 500],
  })

  return (
    <Animated.View
      style={[
        styles.section,
        {
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        },
      ]}
    >
      <TouchableOpacity style={styles.sectionHeader} onPress={toggleExpanded} activeOpacity={0.7}>
        <Ionicons name={expanded ? "chevron-down" : "chevron-forward"} size={20} color="white" />
        <Text style={styles.sectionTitle}>{title}</Text>
      </TouchableOpacity>

      <Animated.View style={[styles.sectionContent, { height: bodyHeight }]}>
        <ScrollView nestedScrollEnabled={true} contentContainerStyle={{ paddingBottom: 10 }}>
          {children}
        </ScrollView>
      </Animated.View>
    </Animated.View>
  )
}

const TrainerDetailsScreen = () => {
  const route = useRoute<TrainerDetailsScreenRouteProp>()
  const { trainerId } = route.params
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start()
  }, [])

  // This would normally come from an API based on trainerId
  const trainerData = {
    id: "4",
    name: "محمد خالد الصدفي",
    nationality: "تونسي",
    position: "مدرب عملي ثالث",
    militaryId: "17208",
    birthDate: "17/08/1988",
    appointmentDate: "18-06-2013",
    experience: "11 سنة",
    specialization: "مدرب لياقة",
    email: "sadfikh1988@gmail.com",
    phone: "97466824019",
    image: require("../assets/images/trainer.png"),
    education: {
      level: "بكالوريوس",
      specialization: "سباحة+مصارعة",
    },
    courses: [
      "دورة إعداد مدربين اللياقة",
      "دورة إعداد مدربين الإشتباك و الدفاع عن النفس",
      "دورة غطس و إنقاذ",
      "دورة إسعافات أولية",
      "دورة إنشاء البرامج التدريبية",
      "دورة إعلامية",
    ],
    workload: [
      {
        course: "الدوريات الأمنية",
        hours: 20,
        role: "مشرف",
        supervised: 20,
        cases: 0,
        evaluation: "---",
      },
      {
        course: "دورة التدخل السريع",
        hours: 25,
        role: "مدرب",
        supervised: 20,
        cases: 5,
        evaluation: "---",
      },
      {
        course: 'دورة دبلوم "دفعة1"',
        hours: 60,
        role: "تعويض",
        supervised: 5,
        cases: 0,
        evaluation: "---",
      },
    ],
    trainingHours: 25,
    supervisionHours: 20,
    evaluations: [
      {
        month: "يناير",
        result: 99.7,
        evaluation: "ممتاز",
        weight: "كغ 71.3",
        weightChange: "كغ (0.7-)",
        note: "رشيق",
      },
      {
        month: "فبراير",
        result: 100,
        evaluation: "ممتاز",
        weight: "كغ 71.8",
        weightChange: "كغ (0.5+)",
        note: "رشيق",
      },
      {
        month: "مارس",
        result: 100,
        evaluation: "ممتاز",
        weight: "كغ 70",
        weightChange: "كغ (2-)",
        note: "رشيق",
      },
    ],
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="بطاقة تعريف المدرب" showBackButton />

      <ScrollView style={styles.scrollView}>
        <Animated.View
          style={[
            styles.profileCard,
            {
              opacity: fadeAnim,
              transform: [
                {
                  scale: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.95, 1],
                  }),
                },
              ],
            },
          ]}
        >
            <View style={styles.imageContainer}>
            <Image source={trainerData.image} style={styles.trainerImage} />
            <Text style={styles.specialization}>{trainerData.specialization}</Text>
            <View style={styles.experienceContainer}>
              <Text style={styles.experienceValue}>{trainerData.experience.split(" ")[0]}</Text>
              <Text style={styles.experienceLabel}>سنة الخبرة</Text>
            </View>
          </View>
          <View style={styles.profileInfo}>
          <View style={styles.infoRow}>
          <Text style={styles.infoValue}>{trainerData.name}</Text>
          <Text style={styles.infoLabel}> الإسم:</Text></View>
            <View style={styles.infoRow}>
              <Text style={styles.infoValue}>{trainerData.nationality}</Text>
              <Text style={styles.infoLabel}>الجنسية:</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoValue}>{trainerData.position}</Text>
              <Text style={styles.infoLabel}>المسمى الوظيفي:</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoValue}>{trainerData.militaryId}</Text>
              <Text style={styles.infoLabel}>الرقم العسكري:</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoValue}>{trainerData.birthDate}</Text>
              <Text style={styles.infoLabel}>تاريخ الميلاد:</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoValue}>{trainerData.appointmentDate}</Text>
              <Text style={styles.infoLabel}>تاريخ التعيين:</Text>
            </View>
          </View>

        



        
        </Animated.View>

        <View style={styles.contactRow}>
          <TouchableOpacity style={styles.contactButton}>
            <Ionicons name="mail" size={22} color={Colors.primary} />
            <Text style={styles.contactText}>{trainerData.email}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactButton}>
            <Ionicons name="call" size={22} color={Colors.primary} />
            <Text style={styles.contactText}>{trainerData.phone}</Text>
          </TouchableOpacity>
        </View>

        <Section title="المؤهل العلمي و الدورات" initiallyExpanded={true}>
          <View style={styles.educationContainer}>
            <View style={styles.educationRow}>
              <Text style={styles.educationValue}>{trainerData.education.level}</Text>
              <Text style={styles.educationLabel}>:المستوى العلمي</Text>
            </View>
            <View style={styles.educationRow}>
              <Text style={styles.educationValue}>{trainerData.education.specialization}</Text>
              <Text style={styles.educationLabel}>:الإختصاص</Text>
            </View>

            <Text style={styles.coursesLabel}>:الدورات</Text>
            {trainerData.courses.map((course, index) => (
              <Text key={index} style={styles.courseItem}>
                - {course}
              </Text>
            ))}
          </View>
        </Section>

        <Section title="العبء الوظيفي">
          <View style={styles.workloadContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View>
                <View style={styles.tableHeader}>
                  <Text style={[styles.tableHeaderCell, { width: 100 }]}>الدورات</Text>
                  <Text style={[styles.tableHeaderCell, { width: 80 }]}>عدد ساعات الدورة</Text>
                  <Text style={[styles.tableHeaderCell, { width: 80 }]}>المهام</Text>
                  <Text style={[styles.tableHeaderCell, { width: 80 }]}>عدد الساعات المنجزة</Text>
                  <Text style={[styles.tableHeaderCell, { width: 80 }]}>حالات</Text>
                  <Text style={[styles.tableHeaderCell, { width: 80 }]}>التقييم</Text>
                </View>

                {trainerData.workload.map((item, index) => (
                  <View key={index} style={[styles.tableRow, index % 2 === 0 ? styles.evenRow : {}]}>
                    <Text style={[styles.tableCell, { width: 100 }]}>{item.course}</Text>
                    <Text style={[styles.tableCell, { width: 80 }]}>{item.hours}</Text>
                    <Text style={[styles.tableCell, { width: 80 }]}>{item.role}</Text>
                    <Text style={[styles.tableCell, { width: 80 }]}>{item.supervised}</Text>
                    <Text style={[styles.tableCell, { width: 80 }]}>{item.cases}</Text>
                    <Text style={[styles.tableCell, { width: 80 }]}>{item.evaluation}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>

            <View style={styles.hoursContainer}>
              <View style={styles.hoursItem}>
                <Text style={styles.hoursValue}>{trainerData.trainingHours} ساعة</Text>
                <Text style={styles.hoursLabel}>عدد الساعات التدريبية</Text>
              </View>
              <View style={styles.hoursItem}>
                <Text style={styles.hoursValue}>{trainerData.supervisionHours} ساعة</Text>
                <Text style={styles.hoursLabel}>عدد ساعات الإشراف</Text>
              </View>
            </View>
          </View>
        </Section>

        <Section title="الإختبارات و الوزن الشهري">
          <View style={styles.evaluationsContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View>
                <View style={styles.tableHeader}>
                  <Text style={[styles.tableHeaderCell, { width: 80 }]}>الشهر</Text>
                  <Text style={[styles.tableHeaderCell, { width: 80 }]}>النتيجة</Text>
                  <Text style={[styles.tableHeaderCell, { width: 80 }]}>التقييم</Text>
                  <Text style={[styles.tableHeaderCell, { width: 80 }]}>الوزن</Text>
                  <Text style={[styles.tableHeaderCell, { width: 80 }]}>الوزن الزائد</Text>
                  <Text style={[styles.tableHeaderCell, { width: 100 }]}>الملاحظة</Text>
                </View>

                {trainerData.evaluations.map((item, index) => (
                  <View key={index} style={[styles.tableRow, index % 2 === 0 ? styles.evenRow : {}]}>
                    <Text style={[styles.tableCell, { width: 80 }]}>شهر {item.month}</Text>
                    <Text style={[styles.tableCell, { width: 80 }]}>{item.result}</Text>
                    <Text style={[styles.tableCell, { width: 80 }]}>{item.evaluation}</Text>
                    <Text style={[styles.tableCell, { width: 80 }]}>{item.weight}</Text>
                    <Text style={[styles.tableCell, { width: 80 }]}>{item.weightChange}</Text>
                    <Text style={[styles.tableCell, { width: 100 }]}>{item.note}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </Section>
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
  scrollView: {
    flex: 1,
  },
  profileCard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 15,
    margin: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  profileInfo: {
    flex: 2,
    paddingRight: 5,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 8,
  },
  infoLabel: {
    fontFamily: "Cairo-Bold",
    fontSize: 14,
    color: Colors.text,
    marginLeft: 5,
  },
  infoValue: {
    fontFamily: "Cairo-Regular",
    fontSize: 14,
    color: Colors.textSecondary,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
  },
  trainerImage: {
    width: 90,
    height: 90,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#eee",
  },
  specialization: {
    fontFamily: "Cairo-Bold",
    fontSize: 14,
    marginTop: 5,
    color: Colors.text,
    textAlign: "center",
  },
  experienceContainer: {
    alignItems: "center",
    marginTop: 5,
  },
  experienceValue: {
    fontFamily: "Cairo-Bold",
    fontSize: 16,
    color: Colors.primary,
  },
  experienceLabel: {
    fontFamily: "Cairo-Regular",
    fontSize: 12,
    color: Colors.textSecondary,
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.22,
    elevation: 2,
  },
  contactText: {
    fontFamily: "Cairo-Regular",
    fontSize: 12,
    color: Colors.text,
    marginLeft: 5,
  },
  section: {
    backgroundColor: "white",
    borderRadius: 15,
    marginHorizontal: 16,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: "Cairo-Bold",
    fontSize: 16,
    color: "white",
    marginRight: 8,
  },
  sectionContent: {
    overflow: "hidden",
  },
  educationContainer: {
    padding: 16,
  },
  educationRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 8,
  },
  educationLabel: {
    fontFamily: "Cairo-Bold",
    fontSize: 14,
    color: Colors.text,
    marginLeft: 5,
  },
  educationValue: {
    fontFamily: "Cairo-Regular",
    fontSize: 14,
    color: Colors.textSecondary,
  },
  coursesLabel: {
    fontFamily: "Cairo-Bold",
    fontSize: 14,
    color: Colors.text,
    textAlign: "right",
    marginTop: 10,
    marginBottom: 8,
  },
  courseItem: {
    fontFamily: "Cairo-Regular",
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "right",
    marginBottom: 5,
  },
  workloadContainer: {
    padding: 16,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  tableHeaderCell: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    color: "white",
    fontFamily: "Cairo-Bold",
    fontSize: 12,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  evenRow: {
    backgroundColor: "#f9f9f9",
  },
  tableCell: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    color: Colors.text,
    fontFamily: "Cairo-Regular",
    fontSize: 12,
    textAlign: "center",
  },
  hoursContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  hoursItem: {
    backgroundColor: Colors.primary,
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  hoursValue: {
    fontFamily: "Cairo-Bold",
    fontSize: 16,
    color: "white",
  },
  hoursLabel: {
    fontFamily: "Cairo-Regular",
    fontSize: 12,
    color: "white",
    marginTop: 2,
  },
  evaluationsContainer: {
    padding: 16,
  },
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
})

export default TrainerDetailsScreen
