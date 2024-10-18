import { View, Text, Image } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import { CreateTripContext } from '../../context/CreateTripContext';
import moment from 'moment';
import { chatSession } from '../../configs/AIModal';
import { useRouter } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';
import {auth,db} from './../../configs/FirebaseConfig'

export default function GenerateTrip() {
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [loading,setLoading]=useState(false);
  const router=useRouter();
  const user=auth.currentUser;
  useEffect(() => {
    GenerateAiTrip();
  }, []);


const GenerateAiTrip =async() => {
    setLoading(true);
    const AI_PROMPT = 'Generate Travel Plan for Location: {location}, for {totalDays} Days and {totalNight} Night for {traveler} with a {budget} budget with a Flight details, Flight Price with Booking url, Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and Places to visit nearby with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time t travel each of the location for {totalDays} days and {totalNight} night with each day plan with best time to visit in JSON format.';

    const FINAL_PROMPT = AI_PROMPT
        .replace('{location}', tripData?.locationInfo?.name || 'unknown')
        .replace('{totalDays}', calculateDays(tripData?.dates?.startDate, tripData?.dates?.endDate))
        .replace('{totalNight}', calculateNights(tripData?.dates?.startDate, tripData?.dates?.endDate))
        .replace('{traveler}', tripData?.traveler?.title || 'unknown')
        .replace('{budget}', tripData?.budget || 'unknown')
        .replace('{totalDays}', calculateDays(tripData?.dates?.startDate, tripData?.dates?.endDate))
        .replace('{totalNight}', calculateNights(tripData?.dates?.startDate, tripData?.dates?.endDate));

    console.log(FINAL_PROMPT);  // In ra kết quả chuỗi đã thay thế
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result.response.text());
    const tripResp=JSON.parse(result.response.text());

    const travelPlan = {
        budget: tripData?.budget || 'unknown',
        duration: `${calculateDays(tripData?.dates?.startDate, tripData?.dates?.endDate)} Days & ${calculateNights(tripData?.dates?.startDate, tripData?.dates?.endDate)} Night`,
        flight: tripResp?.flight || {},  // Dữ liệu từ AI
        hotel: tripResp?.hotel || [],  // Dữ liệu từ AI
        itinerary: tripResp?.itinerary || {},  // Dữ liệu từ AI
        location: tripData?.locationInfo?.name || 'unknown',  // Dữ liệu từ người dùng
        travelers: tripData?.traveler?.title || 'unknown'  // Dữ liệu từ người dùng
    };


    setLoading(false);
    const docId=(Date.now()).toString();
    const result_=await setDoc(doc(db,"UserTrips",docId),{
        userEmail:user.email,
        tripPlan: {
            travelPlan: travelPlan  // Cấu trúc travelPlan bên trong tripPlan
        },// AI result
        tripData:JSON.stringify(tripData), // User Selection Data
        docId:docId
    })

   
          router.push('(tabs)/mytrip')
    
  

};
    const calculateDays = (startDate, endDate) => {
        if (!startDate || !endDate) return '0';
        const start = moment(startDate);
        const end = moment(endDate);
        return end.diff(start, 'days') + 1;  // Thêm 1 để bao gồm cả ngày bắt đầu
    };
    
    const calculateNights = (startDate, endDate) => {
        if (!startDate || !endDate) return '0';
        const start = moment(startDate);
        const end = moment(endDate);
        return end.diff(start, 'days');  // Không cộng 1 vì tính đêm
    }

  return (
    <View style={{
      padding: 25,
      paddingTop: 75,
      backgroundColor: Colors.WHITE,
      height: '100%'
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 35,
        textAlign: 'center'
      }}>Please wait...</Text>
      <Text style={{
        fontFamily: 'outfit-medium',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 40
      }}>We are working to generate your dream trip</Text>
      <Image source={require('./../../assets/images/plane.gif')}
        style={{
          width: '100%',
          height: 200,
          objectFit: 'contain'
        }}
      />
      <Text style={{
        fontFamily: 'outfit',
        color: Colors.GRAY,
        fontSize: 20,
        textAlign: 'center'
      }}>Do not go back</Text>
    </View>
  );
}
