import { View, Text, FlatList, Image } from 'react-native';
import React from 'react';

// Import các hình ảnh đã lưu sẵn
const hotelImages = [
    require('./../../assets/images/h1.jpg'),
    require('./../../assets/images/h2.jpg'),
    require('./../../assets/images/h3.jpg')
];

export default function HotelList({ hotelList }) {
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 20
      }}>🏢 Hotel Recommendation</Text>
      
      <FlatList
        data={hotelList}
        style={{ marginTop: 8 }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({ item, index }) => (
          <View style={{
            marginRight: 20,
            width: 180,
          }}>
            {/* Chọn hình ảnh dựa trên chỉ số index (luân phiên 3 hình ảnh) */}
            <Image
              source={hotelImages[index % 3]} // Luân phiên chọn giữa 3 hình ảnh
              style={{
                width: 180,
                height: 130,
                borderRadius: 15
              }}
            />

            <View style={{ padding: 5 }}>
              <Text style={{
                fontFamily: 'outfit-medium',
                fontSize: 17
              }}>{item.name}</Text>

              <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
                <Text style={{ fontFamily: 'outfit' }}>⭐ {item.rating}</Text>
                <Text style={{ fontFamily: 'outfit' }}>💰 {item.price}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}
