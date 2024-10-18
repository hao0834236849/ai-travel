import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import moment from 'moment';
import { Colors } from '../../constants/Colors';
import UserTripCard from './UserTripCard';
import { useRouter } from 'expo-router';

export default function UserTripList({ userTrips }) {
    const LatestTrip = JSON.parse(userTrips[0].tripData);
    const router = useRouter();

    return userTrips && (
        <View style={{ flex: 1, padding: 15 }}>
            <View style={{ marginTop: 20 }}>
                {/* Hiển thị ảnh của địa điểm đã chọn */}
                <Image
                    source={
                        LatestTrip?.locationInfo?.photoRef
                            ? LatestTrip.locationInfo.photoRef
                            : require('./../../assets/images/placeholder.jpg')
                    }
                    style={{
                        width: '100%',
                        height: 250,
                        borderRadius: 15,
                    }}
                />

                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontFamily: 'outfit-medium', fontSize: 22 }}>
                        {userTrips[0]?.tripPlan?.travelPlan?.location}
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                        <Text style={{ fontFamily: 'outfit', fontSize: 18, color: Colors.GRAY }}>
                        {moment(LatestTrip.startDate).add(1, 'days').format('DD MMM yyyy')} {/* Thêm 1 ngày */}
                        </Text>
                        <Text style={{ fontFamily: 'outfit', fontSize: 18, color: Colors.GRAY }}>
                            🚌 {LatestTrip.traveler.title}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => router.push({
                            pathname: '/trip-details',
                            params: {
                                trip: JSON.stringify(userTrips[0]),
                            },
                        })}
                        style={{
                            backgroundColor: Colors.PRIMARY,
                            padding: 15,
                            borderRadius: 15,
                            marginTop: 10,
                        }}>
                        <Text style={{
                            color: Colors.WHITE,
                            fontFamily: 'outfit-medium',
                            textAlign: 'center',
                            fontSize: 15,
                        }}>See your plan</Text>
                    </TouchableOpacity>
                </View>

                {userTrips.map((trip, index) => (
                    <UserTripCard trip={trip} key={index} />
                ))}
            </View>
            {/* <TouchableOpacity
                onPress={() => router.push('/create-trip/search-place')}
        style={{
        position: 'absolute',
        bottom: 35,
        right: 20,
        width: 60,
        height: 60,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    }}>
    <Text style={{ color: Colors.WHITE, fontSize: 24 }}>+</Text>
</TouchableOpacity>
 */}
            
        </View>
    );
}
