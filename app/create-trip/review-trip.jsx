import { View, Text, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import moment from 'moment'; // Import moment để tính số ngày
import { CreateTripContext } from '../../context/CreateTripContext';

export default function ReviewTrip() {
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });
  }, []);

  const startDate = tripData?.dates?.startDate;
  const endDate = tripData?.dates?.endDate;
  let numberOfDays = 0;
  let numberOfNights = 0;

  if (startDate && endDate) {
    const start = moment(startDate);
    const end = moment(endDate);
    numberOfDays = end.diff(start, 'days') + 1; // Tính số ngày và thêm 1
    numberOfNights = numberOfDays - 1; // Số đêm là số ngày trừ đi 1
  }

  // Lưu lại số ngày và số đêm vào tripData
  useEffect(() => {
    if (startDate && endDate) {
      setTripData(prev => ({
        ...prev,
        totalDays: numberOfDays,
        totalNights: numberOfNights,
      }));
    }
  }, [startDate, endDate]);

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
        marginTop: 20
      }}>Review Your Trip</Text>

      <View style={{ marginTop: 20 }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 20
        }}>Before generating your trip, please review your selection</Text>

        {/* Destination Info */}
        <View style={{ 
            marginTop: 40,
            display: 'flex',
            flexDirection: 'row',
            gap: 20
        }}>
          <Text style={{ fontSize: 45 }}>📍</Text>
          <View>
            <Text style={{ fontFamily: 'outfit', fontSize: 25, color: Colors.GRAY }}>
              Destination
            </Text>
            <Text style={{ fontFamily: 'outfit-medium', fontSize: 23 }}>
              {tripData?.locationInfo?.name || 'No destination selected'}
            </Text>
          </View>
        </View>

        {/* Dates selected Info */}
        <View style={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'row',
          gap: 20
        }}>
          <Text style={{ fontSize: 45 }}>🗓️</Text>
          <View>
            <Text style={{
              fontFamily: 'outfit',
              fontSize: 25,
              color: Colors.GRAY
            }}>Travel date</Text>

            {startDate && endDate ? (
              <Text style={{ fontFamily: 'outfit-medium', fontSize: 20 }}>
                {`${moment(startDate).format('DD MMM')} To ${moment(endDate).format('DD MMM')} (${numberOfDays} days, ${numberOfNights} nights)`}
              </Text>
            ) : (
              <Text style={{ fontFamily: 'outfit-medium', fontSize: 14 }}>No dates selected</Text>
            )}
          </View>
        </View>

         {/* Travel Info */}
         <View style={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'row',
          gap: 20
        }}>
          <Text style={{ fontSize: 45 }}>🚌</Text>
          <View>
            <Text style={{
              fontFamily: 'outfit',
              fontSize: 25,
              color: Colors.GRAY
            }}>Who is traveling</Text>
            <Text style ={{
                fontFamily:'outfit-medium',
                fontSize:23
            }}>
                {tripData?.traveler?.title || 'No traveler info'}
            </Text>
            
          </View>
        </View>

        {/* Budget Info */}
        <View style={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'row',
          gap: 20
        }}>
          <Text style={{ fontSize: 45 }}>💵</Text>
          <View>
            <Text style={{
              fontFamily: 'outfit',
              fontSize: 25,
              color: Colors.GRAY
            }}>Budget</Text>
            <Text style ={{
                fontFamily:'outfit-medium',
                fontSize:23
            }}>
                {tripData?.budget || 'No budget set'}
            </Text>
            
          </View>
        </View>

      </View>
      <TouchableOpacity 
      onPress={() => router.replace('/create-trip/generate-trip')}
      style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          marginTop: 80
        }}>
           
          <Text style={{
            textAlign: 'center',
            color: Colors.WHITE,
            fontFamily: 'outfit-medium',
            fontSize: 20
          }}>Build My Trip</Text>
           
        </TouchableOpacity>
    </View>
  );
}
