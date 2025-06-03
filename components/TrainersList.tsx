"use client"

import { useState, useRef, useEffect } from "react"
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image, Animated, ActivityIndicator, I18nManager, Platform } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import { Ionicons } from "@expo/vector-icons"
import Header from "../components/Header"
import type { RootStackParamList } from "../navigation/AppNavigator"
import Colors from "../constants/Colors"
import { Fonts } from "../constants/Fonts"

// Force RTL layout
I18nManager.allowRTL(false)
I18nManager.forceRTL(false)

type TrainersListScreenNavigationProp = StackNavigationProp<RootStackParamList, "TrainersList">
type MilitaryTrainersListScreenNavigationProp = StackNavigationProp<RootStackParamList, "MilitaryTrainersList">


interface Trainer {
  id: string
  name: string
  photo: string | null
}

// Composant pour l'élément de la liste des formateurs
const TrainerItem = ({ item, index, onPress }: { item: Trainer; index: number; onPress: () => void }) => {
  const itemFadeAnim = useRef(new Animated.Value(0)).current
  const url = "https://qatar-police-academy.starlightwebsolutions.com"

  useEffect(() => {
    Animated.timing(itemFadeAnim, {
      toValue: 1,
      duration: 500,
      delay: index * 100,
      useNativeDriver: true,
    }).start()
  }, [itemFadeAnim, index])

  return (
    <Animated.View
      style={[
        styles.trainerItemContainer,
        {
          opacity: itemFadeAnim,
          transform: [
            {
              translateY: itemFadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        },
      ]}
    >
      <TouchableOpacity style={styles.trainerItem} onPress={onPress} activeOpacity={0.7}>
        <Image 
          source={item.photo ? { uri: `${url}${item.photo}` } : require("../assets/images/default-user.png")} 
          style={styles.trainerImage} 
        />
        <Text style={styles.trainerName}>{item.name}</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

const TrainersList = ({ trainerTypeCode, trainerTypeName }: { trainerTypeCode: string, trainerTypeName: string }) => {
  const navigation = useNavigation<TrainersListScreenNavigationProp|MilitaryTrainersListScreenNavigationProp>()
  const [searchText, setSearchText] = useState("")
  const fadeAnim = useRef(new Animated.Value(0)).current
  const [trainers, setTrainers] = useState<Trainer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)


  useEffect(() => {
    fetchTrainers()
  }, [trainerTypeCode])

  const fetchTrainers = async (pageNumber = 1) => {
    try {
      if (pageNumber === 1) {
        setLoading(true)
      }

      let searchParam = ''
      if (searchText) {
        if (/^\d+$/.test(searchText)) {
          searchParam = `&militaryNumber=${searchText}`
        } else {
          searchParam = `&fullName=${encodeURIComponent(searchText)}`
        }
      }

      const response = await fetch(
        `https://qpa-api.starlightwebsolutions.com/api/trainers?trainerType.code=${trainerTypeCode}&page=${pageNumber}${searchParam}`
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      
      if (data["member"] && Array.isArray(data["member"])) {
        const formattedTrainers = data["member"].map((trainer: any) => ({
          id: trainer.id.toString(),
          name: trainer.fullName || trainer.name || "Unknown Trainer",
          photo: trainer.photo || null
        }))
        
        if (pageNumber === 1) {
          setTrainers(formattedTrainers)
        } else {
          setTrainers(prev => [...prev, ...formattedTrainers])
        }
        
        setHasMore(formattedTrainers.length > 0)
      } else {
        if (pageNumber === 1) {
          setTrainers([])
        }
        setHasMore(false)
      }
    } catch (err) {
      setError("Failed to load trainers")
    } finally {
      setLoading(false)
      setIsLoadingMore(false)
    }
  }

  // Add effect to refetch when search text changes
  useEffect(() => {
    setPage(1)
    fetchTrainers(1)
  }, [searchText])

  const loadMore = () => {
    if (!hasMore || isLoadingMore || loading) return
    setIsLoadingMore(true)
    const nextPage = page + 1
    setPage(nextPage)
    fetchTrainers(nextPage)
  }

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [fadeAnim])

  const filteredTrainers = trainers

  const navigateToTrainerDetails = (trainerId: string) => {
    if (trainerTypeCode === "military_shows") {
        navigation.navigate("MilitaryTrainerDetail", { trainerId })
    } else {
        navigation.navigate("TrainerDetails", { trainerId })
    }
  }

  const renderTrainerItem = ({ item, index }: { item: Trainer; index: number }) => (
    <TrainerItem item={item} index={index} onPress={() => navigateToTrainerDetails(item.id)} />
  )

  if (loading) {
    return (
      <>
        {trainerTypeCode !== "military_shows" ? (
          <SafeAreaView style={styles.container}>
            <Header title={trainerTypeName} showBackButton />
            <View style={styles.searchContainer}>
              <View style={styles.searchInputContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="البحث"
                  value={searchText}
                  onChangeText={setSearchText}
                  placeholderTextColor="#999"
                  textAlign="right"
                />
                <Ionicons name="search" size={15} color="#999" />
              </View>
            </View>
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.primary} />
              <Text style={styles.loadingText}>جاري تحميل المدربين...</Text>
            </View>
          </SafeAreaView>
        ) : (
          <View style={styles.container}>
            <View style={styles.searchContainer}>
              <View style={styles.searchInputContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="البحث"
                  value={searchText}
                  onChangeText={setSearchText}
                  placeholderTextColor="#999"
                  textAlign="right"
                />
                <Ionicons name="search" size={15} color="#999"  />
              </View>
            </View>
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.primary} />
              <Text style={styles.loadingText}>جاري تحميل المدربين...</Text>
            </View>
          </View>
        )}
      </>
    )
  }

  if (error) {
    return (
      <>
        {trainerTypeCode !== "military_shows" ? (
          <SafeAreaView style={styles.container}>
            <Header title={trainerTypeName} showBackButton />
            <View style={styles.searchContainer}>
              <View style={styles.searchInputContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="البحث"
                  value={searchText}
                  onChangeText={setSearchText}
                  placeholderTextColor="#999"
                  textAlign="right"
                />
                <Ionicons name="search" size={15} color="#999"  />
              </View>
            </View>
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          </SafeAreaView>
        ) : (
          <View style={styles.container}>
            <View style={styles.searchContainer}>
              <View style={styles.searchInputContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="البحث"
                  value={searchText}
                  onChangeText={setSearchText}
                  placeholderTextColor="#999"
                  textAlign="right"
                />
                <Ionicons name="search" size={15} color="#999" />
              </View>
            </View>
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          </View>
        )}
      </>
    )
  }

  return (
    <>
      {trainerTypeCode !== "military_shows" ? (
        <SafeAreaView style={styles.container}>
          <Header title={trainerTypeName} showBackButton />
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="البحث"
                value={searchText}
                onChangeText={setSearchText}
                placeholderTextColor="#999"
                textAlign="right"
              />
              <Ionicons name="search" size={15} color="#999" />
            </View>
          </View>

          <FlatList
            data={filteredTrainers}
            keyExtractor={(item) => item.id}
            renderItem={renderTrainerItem}
            contentContainerStyle={styles.listContent}
            numColumns={3}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() => 
              isLoadingMore ? (
                <View style={styles.loadingMoreContainer}>
                  <ActivityIndicator size="small" color={Colors.primary} />
                  <Text style={styles.loadingMoreText}>جاري تحميل المزيد...</Text>
                </View>
              ) : null
            }
          />
        </SafeAreaView>
      ) : (
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="البحث"
                value={searchText}
                onChangeText={setSearchText}
                placeholderTextColor="#999"
                textAlign="right"
              />
              <Ionicons name="search" size={15} color="#999"  />
            </View>
          </View>

          <FlatList
            data={filteredTrainers}
            keyExtractor={(item) => item.id}
            renderItem={renderTrainerItem}
            contentContainerStyle={styles.listContent}
            numColumns={3}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() => 
              isLoadingMore ? (
                <View style={styles.loadingMoreContainer}>
                  <ActivityIndicator size="small" color={Colors.primary} />
                  <Text style={styles.loadingMoreText}>جاري تحميل المزيد...</Text>
                </View>
              ) : null
            }
          />
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 6,
    alignItems: "center",
    
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 20,
    paddingRight: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    paddingVertical: 6,
  },
  searchInput: {
    flex: 1,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Cairo-Regular',
    textAlign: "right",
   
  },

  filterButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
    borderWidth: 1,
    borderColor: "#eee",
  },
  listContent: {
    padding: 8,
  },
  trainerItemContainer: {
    flex: 1 / 3,
    padding: 8,
  },
  trainerItem: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    height: 140,
  },
  trainerImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  trainerName: {
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Cairo-SemiBold',
    fontSize: 12,
    textAlign: "center",
    color: Colors.text,
    height: 36,
    width: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.text,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Cairo-Regular',
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Cairo-Regular',
  },
  loadingMoreContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  loadingMoreText: {
    fontSize: 14,
    color: Colors.text,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Cairo-Regular',
  },
})

export default TrainersList
