"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Animated, KeyboardAvoidingView, Platform } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRoute, type RouteProp } from "@react-navigation/native"
// @ts-ignore
import { Ionicons } from "@expo/vector-icons"
import Header from "../components/Header"
import type { RootStackParamList } from "../navigation/AppNavigator"
import Colors from "../constants/Colors"
import { LayoutChangeEvent } from "react-native"

type TrainerDetailsScreenRouteProp = RouteProp<RootStackParamList, "TrainerDetails">

interface SectionProps {
  title: string
  children: React.ReactNode
  initiallyExpanded?: boolean
}

const Section: React.FC<SectionProps> = ({ title, children, initiallyExpanded = false }) => {
  const [expanded, setExpanded] = useState(initiallyExpanded)
  const [contentHeight, setContentHeight] = useState(0)
  const animationHeight = useRef(new Animated.Value(initiallyExpanded ? 1 : 0)).current
  const fadeAnim = useRef(new Animated.Value(0)).current
  const contentRef = useRef<View>(null)

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
    outputRange: [0, contentHeight],
  })

  const onContentLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout
    if (height > 0) {
      setContentHeight(height)
    }
  }

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
        <View ref={contentRef} onLayout={onContentLayout} style={styles.contentWrapper}>
          {children}
        </View>
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
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
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
              <Text style={styles.specialization} numberOfLines={2}>{trainerData.specialization}</Text>
            </View>
            <View style={styles.profileInfo}>
              <View style={styles.infoRow}>
                <View style={[styles.infoContent, { flex: 1 }]}>
                  <Text style={styles.infoValue}>{trainerData.name}</Text>
                  <Text style={styles.infoLabel}>الإسم:</Text>
                </View>
              </View>
              <View style={styles.infoRow}>
                <View style={[styles.infoContent, { flex: 1 }]}>
                  <Text style={styles.infoValue}>{trainerData.nationality}</Text>
                  <Text style={styles.infoLabel}>الجنسية:</Text>
                </View>
              </View>
              <View style={styles.infoRow}>
                <View style={[styles.infoContent, { flex: 1 }]}>
                  <Text style={styles.infoValue}>{trainerData.position}</Text>
                  <Text style={styles.infoLabel}>المسمى الوظيفي:</Text>
                </View>
              </View>
              <View style={styles.infoRow}>
                <View style={[styles.infoContent, { flex: 1 }]}>
                  <Text style={styles.infoValue}>{trainerData.militaryId}</Text>
                  <Text style={styles.infoLabel}>الرقم العسكري:</Text>
                </View>
              </View>
              <View style={styles.infoRow}>
                <View style={[styles.infoContent, { flex: 1 }]}>
                  <Text style={styles.infoValue}>{trainerData.birthDate}</Text>
                  <Text style={styles.infoLabel}>تاريخ الميلاد:</Text>
                </View>
              </View>
              <View style={styles.infoRow}>
                <View style={[styles.infoContent, { marginRight: 20 }]}>
                  <Text style={styles.infoValue}>{trainerData.experience.split(" ")[0]} سنة</Text>
                  <Text style={styles.infoLabel}>سنوات الخبرة :</Text>
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoValue}>{trainerData.appointmentDate}</Text>
                  <Text style={styles.infoLabel}>تاريخ التعيين:</Text>
                </View>
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
                <Text style={styles.educationLabel}>المستوى العلمي:</Text>
              </View>
              <View style={styles.educationRow}>
                <Text style={styles.educationValue}>{trainerData.education.specialization}</Text>
                <Text style={styles.educationLabel}>الإختصاص:</Text>
              </View>

              <View style={styles.coursesContainer}>
                <View style={styles.coursesHeader}>
                  <Text style={styles.courseItem}>- {trainerData.courses[0]}</Text>
                  <Text style={styles.coursesLabel}>الدورات:</Text>
                </View>
                <View style={styles.coursesList}>
                  {trainerData.courses.slice(1).map((course, index) => (
                    <Text key={index} style={[styles.courseItem, { paddingRight: 50 }]}>
                      - {course}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          </Section>

 
<Section title="العبئ الوظيفي">
  <View style={{ padding: 16 }}>
    <View style={{ flexDirection: 'row' }}>
      {/* Scrollable Columns */}
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        <View>
          {/* Header */}
          <View style={{
            flexDirection: 'row',
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
            paddingVertical: 8
          }}>
            <Text style={[styles.headerCell, { width: 80, textAlign: 'center' }]}>التقييم</Text>
            <Text style={[styles.headerCell, { width: 80, textAlign: 'center' }]}>حالات</Text>
            <Text style={[styles.headerCell, { width: 120, textAlign: 'center' }]}>الساعات المنجزة</Text>
            <Text style={[styles.headerCell, { width: 80, textAlign: 'center' }]}>المهام</Text>
            <Text style={[styles.headerCell, { width: 100, textAlign: 'center' }]}>ساعات الدورة</Text>
          </View>

          {/* Rows */}
          {trainerData.workload.map((item, idx) => (
            <View key={idx} style={{
              flexDirection: 'row',
              backgroundColor: idx % 2 === 0 ? '#f7f7f7' : 'white',
              paddingVertical: 8,
              borderBottomWidth: 1,
              borderBottomColor: '#eee'
            }}>
              <Text style={[styles.cell, { width: 80, color: Colors.text, textAlign: 'center' }]}>{item.evaluation}</Text>
              <Text style={[styles.cell, { width: 80, color: Colors.text, textAlign: 'center' }]}>{item.cases}</Text>
              <Text style={[styles.cell, { width: 120, color: Colors.text, textAlign: 'center' }]}>{item.supervised}</Text>
              <Text style={[styles.cell, { width: 80, color: Colors.text, textAlign: 'center' }]}>{item.role}</Text>
              <Text style={[styles.cell, { width: 100, color: Colors.text, textAlign: 'center' }]}>{item.hours}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Fixed Column */}
      <View style={{
        width: 140,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        zIndex: 1
      }}>
        <View style={{ paddingVertical: 8 }}>
          <Text style={[styles.headerCell, { color: Colors.primary, textAlign: 'right' }]}>الدورة</Text>
        </View>
        {trainerData.workload.map((item, idx) => (
          <View key={idx} style={{
            backgroundColor: idx % 2 === 0 ? '#f7f7f7' : 'white',
            paddingVertical: 8,
            borderBottomWidth: 1,
            borderBottomColor: '#eee'
          }}>
            <Text style={[styles.cell, { color: Colors.text, textAlign: 'right' }]} numberOfLines={1} ellipsizeMode="tail">
              {item.course}
            </Text>
          </View>
        ))}
      </View>
    </View>

    {/* Totals under the table */}
    <View style={{
      marginTop: 16,
      padding: 12,
      backgroundColor: '#e6f0ff',
      borderRadius: 8,
      flexDirection: 'column',
      gap: 8
    }}>
      {/* Supervision Total */}
      <View style={{
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: 12
}}>
 

  {/* Badge à droite */}
  <View style={{
    backgroundColor: '#007bff',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    
    }}>
    <Text style={{ color: 'white', fontWeight: 'bold' ,width:60}}>
      {trainerData.workload.reduce((sum, item) => sum + (Number(item.supervised) || 0), 0)} ساعة
    </Text>
  </View>
   {/* Texte à gauche */}
   <Text style={{ color: Colors.text, fontWeight: 'bold'}}>
    عدد ساعات الإشراف
  </Text>
</View>


{/* Training Total */}
<View style={{
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: 8
}}>


  {/* Badge à droite */}
  <View style={{
    backgroundColor: '#007bff',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  }}>
    <Text style={{ color: 'white', fontWeight: 'bold' ,width:60}}>
      {trainerData.workload.reduce((sum, item) => sum + (Number(item.hours) || 0), 0)} ساعة
    </Text>
  </View>
    {/* Texte à gauche */}
    <Text style={{ color: Colors.text, fontWeight: 'bold' }}>
    عدد الساعات التدريبية
  </Text>
</View>

    </View>
  </View>
</Section>



          <Section title="الإختبارات و الوزن الشهري">
            <View style={{ padding: 16 }}>
              <View style={{ flexDirection: 'row' }}>
                {/* Scrollable Columns */}
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={true}
                  contentContainerStyle={{ flexDirection: 'row-reverse' }}
                >
                  <View>
                    {/* Header */}
                    <View style={{ 
                      flexDirection: 'row', 
                      borderTopLeftRadius: 8, 
                      borderBottomLeftRadius: 8,
                      paddingVertical: 8
                    }}>
                    
                     
                      
                     
                      <Text style={[styles.headerCell, { width: 60, textAlign: 'center' }]}>الملاحظة</Text>
                      <Text style={[styles.headerCell, { width: 80, textAlign: 'center' }]}>الوزن الزائد</Text>
                      <Text style={[styles.headerCell, { width: 60, textAlign: 'center' }]}>الوزن</Text>
                      <Text style={[styles.headerCell, { width: 60, textAlign: 'center' }]}>التقييم</Text>
                      <Text style={[styles.headerCell, { width: 60, textAlign: 'center' }]}>النتيجة</Text>






                    </View>
                    {/* Rows */}
                    {trainerData.evaluations.map((item, idx) => (
                      <View key={idx} style={{ 
                        flexDirection: 'row', 
                        backgroundColor: idx % 2 === 0 ? '#f7f7f7' : 'white',
                        paddingVertical: 8,
                        borderBottomWidth: 1,
                        borderBottomColor: '#eee'
                      }}>
                        
                        <Text style={[styles.cell, { width: 60, color: Colors.text, textAlign: 'center' }]}>{item.note}</Text>
                        <Text style={[styles.cell, { width: 80, color: Colors.text, textAlign: 'center' }]}>{item.weightChange}</Text>
                        <Text style={[styles.cell, { width: 60, color: Colors.text, textAlign: 'center' }]}>{item.weight}</Text>
                        <Text style={[styles.cell, { width: 60, color: Colors.text, textAlign: 'center' }]}>{item.evaluation}</Text>
                        <Text style={[styles.cell, { width: 60, color: Colors.text, textAlign: 'center' }]}>{item.result}</Text>
                        
                     
                       
                        

                      </View>
                    ))}
                  </View>
                </ScrollView>

                {/* Fixed Column */}
                <View style={{ 
                  width: 100, 
                  borderTopRightRadius: 8, 
                  borderBottomRightRadius: 8,
                  zIndex: 1,
                  backgroundColor: 'white'
                }}>
                  <View style={{ paddingVertical: 8,marginLeft:-40}}>
                    <Text style={[styles.headerCell, { color: Colors.primary, textAlign: 'right' }]}>الشهر</Text>
                  </View>
                  {trainerData.evaluations.map((item, idx) => (
                    <View key={idx} style={{ 
                      backgroundColor: idx % 2 === 0 ? '#f7f7f7' : 'white',
                      paddingVertical: 8,
                      borderBottomWidth: 1,
                      borderBottomColor: '#eee'
                    }}>
                      <Text style={[styles.cell, { color: Colors.text, textAlign: 'right' ,marginLeft:-40}]}>
                        شهر {item.month}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </Section>
        </ScrollView>

      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  infoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  scrollView: {
    flex: 1,
  },
  profileCard: {
    flexDirection: "row",
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 8,
    marginHorizontal: 30,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#000',
  },
  profileInfo: {
    flex: 2,
    paddingRight: 5,
    width: '100%',
  },
  infoLabel: {
    fontFamily: "Cairo-Bold",
    fontSize: 12,
    color: Colors.text,
    marginLeft: 5,
  },
  infoValue: {
    fontFamily: "Cairo-Regular",
    fontSize: 13,
    color: Colors.textSecondary,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    marginRight: 8,
  },
  trainerImage: {
    width: 80,
    height: 80,
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
    fontWeight: "bold",
    lineHeight: 20,
  },
  experienceContainer: {
    marginRight:40
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
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: "Cairo-Bold",
    fontSize: 16,
    color: "white",
    flex: 1,
    textAlign: "right",
  },
  sectionContent: {
    overflow: "hidden",
  },
  contentWrapper: {
    position: "absolute",
    width: "100%",
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
  coursesContainer: {
    marginTop: 10,
  },
  coursesHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 8,
  },
  coursesLabel: {
    fontFamily: "Cairo-Bold",
    fontSize: 14,
    color: Colors.text,
    marginLeft: 10,
  },
  coursesList: {
    paddingRight: 0,
    marginTop:-7
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
  tableContainer: {
    flexDirection: "row",
  },
  fixedColumn: {
    width: 150,
    borderRightWidth: 1,
    borderRightColor: "rgba(255, 255, 255, 0.3)",
  },
  fixedHeaderCell: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.3)",
    paddingBottom: 10,
    textAlign: 'right',
    writingDirection: 'rtl',
    color: "white",
    fontFamily: "Cairo-Bold",
    fontSize: 14,
    textDecorationLine: "underline",
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
    color: Colors.primary,
    fontFamily: "Cairo-Bold",
    fontSize: 14,
    textAlign: "center",
    textDecorationLine: "underline",
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
    color: "white",
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
