import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { Colors } from '../../constants/Colors';
import { useNavigation } from 'expo-router';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { CreateTripContext } from '../../context/CreateTripContext';  // Import context

export default function SelectDates() {
    const navigation = useNavigation();
    const { tripData, setTripData } = useContext(CreateTripContext);  // Lấy dữ liệu từ context
    const [selectedDates, setSelectedDates] = useState({});
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
        });
    }, []);

    const handleDateChange = (day) => {
        const dateString = day.dateString;

        if (selectedDates[dateString]) {
            const updatedDates = { ...selectedDates };
            delete updatedDates[dateString];
            setSelectedDates(updatedDates);

            if (dateString === endDate) {
                setEndDate(null);
                return;
            }

            if (dateString === startDate) {
                setStartDate(null);
                setEndDate(null);
                return;
            }
        } else {
            if (!startDate) {
                setStartDate(dateString);
                setSelectedDates({
                    [dateString]: {
                        startingDay: true,
                        color: Colors.PRIMARY,
                        textColor: Colors.WHITE,
                    },
                });
            } else if (!endDate) {
                setEndDate(dateString);

                const periodDates = {};
                const start = moment(startDate);
                const end = moment(dateString);

                for (let m = start; m.isSameOrBefore(end); m.add(1, 'days')) {
                    const formattedDate = m.format('YYYY-MM-DD');
                    periodDates[formattedDate] = {
                        color: Colors.PRIMARY,
                        textColor: Colors.WHITE,
                        ...(formattedDate === startDate && { startingDay: true }),
                        ...(formattedDate === dateString && { endingDay: true }),
                    };
                }

                setSelectedDates(periodDates);
            } else {
                setStartDate(dateString);
                setEndDate(null);
                setSelectedDates({
                    [dateString]: {
                        startingDay: true,
                        color: Colors.PRIMARY,
                        textColor: Colors.WHITE,
                    },
                });
            }
        }
    };

    const handleContinue = () => {
        if (!startDate || !endDate) {
            Alert.alert('Thông báo', 'Vui lòng chọn ngày bắt đầu và ngày kết thúc.');
        } else {
            // Lưu thông tin ngày đã chọn vào context
            setTripData((prevTripData) => ({
                ...prevTripData,
                dates: {
                    startDate: startDate,
                    endDate: endDate
                }
            }));

            // Điều hướng tới trang tiếp theo
            navigation.navigate('create-trip/select-budget');
        }
    };

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
            }}>Travel Dates</Text>

            <View style={{ marginTop: 30 }}>
                <Calendar
                    onDayPress={handleDateChange}
                    markedDates={selectedDates}
                    markingType={'period'}
                    theme={{
                        selectedDayBackgroundColor: Colors.PRIMARY,
                        selectedDayTextColor: Colors.WHITE,
                        todayTextColor: Colors.PRIMARY,
                        arrowColor: Colors.PRIMARY,
                        monthTextColor: Colors.PRIMARY,
                    }}
                />
            </View>

            <View style={{
                borderBottomWidth: 1,
                borderBottomColor: Colors.GRAY,
                marginVertical: 10
            }} />

            <TouchableOpacity
                onPress={handleContinue}
                style={{
                    padding: 15,
                    backgroundColor: Colors.PRIMARY,
                    borderRadius: 15,
                    marginTop: 20
                }}
            >
                <Text style={{
                    textAlign: 'center',
                    color: Colors.WHITE,
                    fontFamily: 'outfit-medium',
                    fontSize: 20
                }}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
}
