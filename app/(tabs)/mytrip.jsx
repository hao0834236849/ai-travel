import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import StartNewTripCard from '../../components/MyTrips/StartNewTripCard';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../configs/FirebaseConfig';
import UserTripList from '../../components/MyTrips/UserTripList';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
export default function MyTrip() {
    const [userTrips, setUserTrips]=useState([]);
    const user=auth.currentUser;
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
      user&&GetMyTrips();
    },[user])
    const GetMyTrips=async()=>{
      setLoading(true);
      setUserTrips([]);
      const q=query(collection(db,'UserTrips'),where('userEmail','==',user?.email));
      const querySnapshot=await getDocs(q);
      //const trips = [];
      querySnapshot.forEach((doc) => {

        console.log(doc.id, " => ", doc.data());
        setUserTrips(prev=>[...prev,doc.data()])
      });
      setLoading(false);
      setUserTrips(trips);  // Gán dữ liệu từ Firebase vào state
    }
  return ( 
    <ScrollView style={{
        padding:25,
        paddingTop:55,
        backgroundColor:Colors.WHITE,
        height:'100%'
    }}>
      {loading&&<ActivityIndicator size={'large'} color={Colors.PRIMARY}/>}
        <View style={{
            display: 'flex',
            flexDirection:'row',
            alignContent: 'center',
            justifyContent: 'space-between'
        }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:35
      }}>My Trip</Text>
      <MaterialIcons name="travel-explore" size={50} color="black" />
    </View>
    {loading&&<ActivityIndicator size={'large'} color={Colors.PRIMARY}/>}

      {userTrips?.length==0?
        <StartNewTripCard/>
        :
        <UserTripList userTrips={userTrips}/>
      }

    </ScrollView>
  )
}