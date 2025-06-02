"use client"

import { useRoute, type RouteProp } from "@react-navigation/native"
import type { RootStackParamList } from "../navigation/AppNavigator"
import TrainersList from "@/components/TrainersList"


type TrainersListScreenRouteProp = RouteProp<RootStackParamList, "TrainersList">

const TrainersListScreen = () => {
  const route = useRoute<TrainersListScreenRouteProp>()
  const { trainerTypeCode, trainerTypeName } = route.params

  return (
    <TrainersList trainerTypeCode={trainerTypeCode} trainerTypeName={trainerTypeName} />
  )
}

export default TrainersListScreen
