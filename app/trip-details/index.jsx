import { View, Text, Image, ScrollView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Colors } from '../../constants/Colors';
import moment from 'moment';
import FlightInfo from '../../components/TripDetails/FlightInfo';
import HotelList from '../../components/TripDetails/HotelList';
import PlannedTrip from '../../components/TripDetails/PlannedTrip';
import { CreateTripContext } from './../../context/CreateTripContext'; // Import context

export default function TripDetails() {
    const navigation = useNavigation();
    const { trip } = useLocalSearchParams();
    const [tripDetails, setTripDetails] = useState([]);
    
    // Để lấy thông tin từ context
    const { tripData } = useContext(CreateTripContext);

    // Hàm format dữ liệu
    const formatData = (data) => {
        try {
            return typeof data === 'string' ? JSON.parse(data) : data;
        } catch (error) {
            console.error('Lỗi khi parse dữ liệu:', error);
            return null;
        }
    };

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: ''
        });
        setTripDetails(formatData(trip));
    }, [trip]);

    return tripDetails && (
        <ScrollView>
            {/* Lấy ảnh địa điểm từ tripData */}
            <Image
                source={tripData?.locationInfo?.photoRef // Lấy ảnh từ tripData
                    ? tripData.locationInfo.photoRef 
                    : require('./../../assets/images/placeholder.jpg')}
                style={{
                    width: '100%',
                    height: 300,
                    objectFit: 'cover',
                    borderRadius: 15
                }}
            />
            <View style={{
                padding: 15,
                backgroundColor: Colors.WHITE,
                height: '100%',
                marginTop: -30,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30
            }}>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 28
                }}>{tripDetails?.tripPlan?.travelPlan?.location}</Text>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 5,
                    marginTop: 5
                }}>
                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 18,
                        color: Colors.GRAY
                    }}>{moment(formatData(tripDetails.tripData)?.dates?.startDate).format('DD MMM yyyy')}</Text>
                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 18,
                        color: Colors.GRAY
                    }}>- {moment(formatData(tripDetails.tripData)?.dates?.endDate).format('DD MMM yyyy')}</Text>
                </View>
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 18,
                    color: Colors.GRAY 
                }}>🚌 {formatData(tripDetails.tripData)?.traveler.title}</Text>

                {/* flight info */}
                <FlightInfo flightData={tripDetails?.tripPlan?.travelPlan?.flight}/>
                {/* hotels list */}
                <HotelList hotelList={tripDetails?.tripPlan?.travelPlan?.hotel}/>
                {/* trip day planner info */}
                <PlannedTrip details={tripDetails?.tripPlan?.travelPlan?.itinerary}/>
            </View>
        </ScrollView>
    );
}
