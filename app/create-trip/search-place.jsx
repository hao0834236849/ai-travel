import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { CreateTripContext } from './../../context/CreateTripContext';
import { useNavigation } from 'expo-router';

export default function SearchPlace() {
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();
  const navigation = useNavigation();
  
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: ''
    });
  }, []);

  // Danh sách các địa điểm du lịch ở Việt Nam
  const locations = [
    { id: '1', name: 'Vịnh Hạ Long', coordinates: { lat: 20.9101, lng: 107.1839 }, photoRef: require('./../../assets/images/vinhhalong.jpg') },
    { id: '2', name: 'Động Phong Nha', coordinates: { lat: 17.5938, lng: 106.2758 }, photoRef: require('./../../assets/images/dongphongnha.jpg') },
    { id: '3', name: 'Hội An', coordinates: { lat: 15.8801, lng: 108.3380 }, photoRef: require('./../../assets/images/hoian.jpg') },
    { id: '4', name: 'Nha Trang', coordinates: { lat: 12.2388, lng: 109.1967 }, photoRef: require('./../../assets/images/nhatrang.jpg') },
    { id: '5', name: 'Sapa', coordinates: { lat: 22.3355, lng: 103.8499 }, photoRef: require('./../../assets/images/sapa.jpg') },
    { id: '6', name: 'Đà Lạt', coordinates: { lat: 11.9404, lng: 108.4583 }, photoRef: require('./../../assets/images/dalat.jpg') },
    { id: '7', name: 'Phú Quốc', coordinates: { lat: 10.2899, lng: 103.9840 }, photoRef: require('./../../assets/images/phuquoc.jpg') },
  ];

  const handlePress = (location) => {
    setTripData({
      ...tripData, // giữ lại các dữ liệu khác trong tripData
      locationInfo: { // lưu thông tin địa điểm vào locationInfo (viết thường)
        name: location.name,
        coordinates: location.coordinates,
        photoRef: location.photoRef // Lưu ảnh vào photoRef
      },
    });
    // Điều hướng đến trang 'select-traveler'
    router.push('/create-trip/select-traveler');
  };

  return (
    <View style={{ 
      padding: 25, 
      paddingTop: 70,
      backgroundColor: Colors.WHITE,
      height: '100%' 
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 35,
        marginTop: 20
      }}>Places</Text>
      
      {/* Danh sách địa điểm */}
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 20, 
              paddingTop: 25,                
              backgroundColor: Colors.LIGHT_GRAY,
              marginBottom: 15,              
              borderRadius: 10,              
              borderColor: 'black',          
              borderWidth: 1,
              flexDirection: 'row',          // Hiển thị ảnh và văn bản theo hàng ngang
              justifyContent: 'space-between',
              alignItems: 'center',          // Căn giữa theo trục dọc
            }}
            onPress={() => handlePress(item)}
          >
            {/* Tên địa điểm */}
            <Text style={{ fontFamily: 'outfit-medium', fontSize: 24, color: Colors.BLACK }}>
              {item.name}
            </Text>

            {/* Ảnh của địa điểm */}
            <Image 
              source={item.photoRef}
              style={{
                width: 80,                   // Chiều rộng của ảnh
                height: 80,                  // Chiều cao của ảnh
                borderRadius: 10,            // Bo góc ảnh
                marginLeft: 10,              // Khoảng cách giữa văn bản và ảnh
                objectFit: 'cover',          // Đảm bảo ảnh không bị biến dạng
              }}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
