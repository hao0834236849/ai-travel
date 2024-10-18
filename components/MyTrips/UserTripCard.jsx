import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import moment from 'moment';
import { Colors } from '../../constants/Colors';

export default function UserTripCard({ trip }) {
    const formatData = (data) => {
        return JSON.parse(data);
    };

    // Lấy thông tin ảnh từ tripData
    const tripData = formatData(trip.tripData);
    const locationPhoto = tripData?.locationInfo?.photoRef;

    return (
        <View style={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center'
        }}>
            {/* Hiển thị ảnh của địa điểm */}
            <Image
  source={
    locationPhoto 
      ? locationPhoto // Nếu là URI
      : require('./../../assets/images/placeholder.jpg') // Nếu không có ảnh
  }
  style={{
    width: 100,
    height: 100,
    borderRadius: 15,
  }}
/>

            <View>
                <Text style={{
                    fontFamily: 'outfit-medium',
                    fontSize: 20
                }}>{trip.tripPlan?.travelPlan?.location}</Text>
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 14,
                    color: Colors.GRAY
                }}> {moment(tripData.startDate).add(1, 'days').format('DD MMM yyyy')}</Text>
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 14,
                    color: Colors.GRAY
                }}>Travelling: {tripData.traveler.title}</Text>
            </View>
           
        </View>
    );
}
