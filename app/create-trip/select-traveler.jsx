import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { Colors } from '../../constants/Colors'
import { Link, useNavigation } from 'expo-router'
import {SeclectTravelesList} from './../../constants/Options'
import OptionCard from '../../components/CreateTrip/OptionCard'
import { CreateTripContext } from './../../context/CreateTripContext';
export default function SelectTraveler() {

  const [selectedTraveler,setSelectedTraveler]=useState();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const navigation=useNavigation();
  useEffect(()=>{
    navigation.setOptions({
      headerShown:true,
      headerTranparent:true,
      headerTitle:''
    })
  },[])

  useEffect(()=>{
    setTripData({...tripData,
      traveler:selectedTraveler
    })
    
  },[selectedTraveler])
  useEffect(()=>{
    console.log(tripData);
  },[tripData])

  return (
    <View style={{
      padding:25,
      paddingTop:15,
      backgroundColor:Colors.WHITE,
      height:'100%'
    }}>
    <Text style={{
      fontFamily:'outfit-bold',
      fontSize:35,
      marginTop:20
    }}>Who's Travelling</Text>

    <View style={{
      paddingTop:20
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:22
      }}>Choose your traveles</Text>

      <FlatList
        data={SeclectTravelesList}
        renderItem={({item,index})=>(
          <TouchableOpacity 
          onPress={()=>setSelectedTraveler(item)}
          style={{
            marginVertical:10
          }}>
            <OptionCard option={item} selectedOption={selectedTraveler}/>
          </TouchableOpacity>
        )}
      />
    
    </View>
 
        <TouchableOpacity style={{
          padding:15,
          backgroundColor:Colors.PRIMARY,
          borderRadius:15,
          marginTop:20
        }}>
             <Link href={'/create-trip/select-dates'}
             style={{
              width:'100%',
              textAlign:'center'
             }}>
          <Text style={{
            textAlign:'center',
            color:Colors.WHITE,
            fontFamily:'outfit-medium',
            fontSize:20
          }}>Continue</Text>
           </Link>
        </TouchableOpacity>
       
    </View>
  )
}