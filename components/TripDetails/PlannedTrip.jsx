import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

// Import các hình ảnh đã lưu sẵn
const activityImages = [
    require('./../../assets/images/placeholder.jpg'),
  require('./../../assets/images/p1.jpg'),
  require('./../../assets/images/p2.jpg'),
  
];

export default function PlannedTrip({ details }) {
  // Kiểm tra nếu details tồn tại và là một đối tượng
  if (!details || typeof details !== 'object') {
    return (
      <View style={{ marginTop: 20 }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 20
        }}>🏕️ Plan Details</Text>
        <Text>Không có thông tin chi tiết về kế hoạch.</Text>
      </View>
    );
  }

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 20
      }}>🏕️ Plan Details</Text>

      {/* Duyệt qua các ngày trong chuyến đi */}
      {details?.map((dayDetails, index) => (
        <View key={index} style={{ marginBottom: 30 }}>
          {/* Hiển thị tên ngày, ví dụ: "Day 1" */}
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}> {dayDetails.day}</Text>

          {/* Kiểm tra nếu activities tồn tại và là mảng */}
          {Array.isArray(dayDetails.activities) ? (
            dayDetails.activities.map((activity, activityIndex) => (
              <View key={activityIndex} style={{ 
                marginBottom: 20,
                borderWidth: 1,
                borderRadius: 15,
                padding: 10,
                marginTop: 20,
                borderColor: Colors.GRAY,
                backgroundColor: Colors.LIGHT_BLUE
              }}>
                {/* Chọn hình ảnh từ p1 đến p6 dựa trên chỉ số của hoạt động */}
                <Image 
                  source={activityImages[activityIndex % 3]} // Luân phiên chọn giữa 6 hình ảnh
                  style={{ 
                    width: '100%', 
                    height: 150, 
                    borderRadius: 10, 
                    marginVertical: 10,
                    resizeMode: 'cover' // Đảm bảo hình ảnh vừa khung
                  }}
                />

                {/* Hiển thị tên địa điểm */}
                <Text style={{ fontSize: 20, fontFamily: 'outfit-bold' }}>
                  {activity.place}
                </Text>
                {/* Hiển thị thời gian */}
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 17,
                    marginTop: 5
                }}>⌛ Time: {activity.time}</Text>
                {/* Hiển thị giá vé */}
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 17,
                    marginTop: 5
                }}>🎫 Pricing: {activity.ticket_pricing}</Text>
                {/* Hiển thị chi tiết */}
                <Text style={{
                    fontFamily: 'outfit',
                    color: Colors.GRAY,
                    marginTop: 5,
                    fontSize: 15
                }}>{activity.details}</Text>
                <TouchableOpacity style={{
                    backgroundColor: Colors.PRIMARY,
                    padding: 8,
                    borderRadius: 10,
                    marginTop: 10,
                    alignItems: 'center'
                }}>
                <Ionicons name="navigate" size={24} color="white" />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text>Không có thông tin chi tiết cho ngày này.</Text>
          )}
        </View>
      ))}
    </View>
  );
}
