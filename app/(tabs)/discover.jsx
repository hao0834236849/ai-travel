import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Colors } from '../../constants/Colors';
import { CreateTripContext } from './../../context/CreateTripContext';
import { useRouter } from 'expo-router';

// Hàm giả lập để lấy tin tức
const fetchNews = async (locationName, photoRef, activity) => {
  const mockNews = [
    { id: '1', title: `Top 10 thứ nên làm ở ${locationName}`, description: `Khám phá những nơi tốt nhất để trải nghiệm và tận hưởng. ${activity.details}`, imageUrl: photoRef },
    { id: '2', title: `Tại sao bạn nên đến ${locationName} Now`, description: `Hướng dẫn đầy đủ để lên kế hoạch cho chuyến đi của bạn đến một trong những điểm đến phổ biến nhất. ${activity.details}`, imageUrl: photoRef },
    // Thêm nhiều bài viết giả lập nếu cần
  ];
  return new Promise((resolve) => setTimeout(() => resolve(mockNews), 1000)); // Giả lập độ trễ
};

export default function Discover() {
  const { tripData } = useContext(CreateTripContext);  // Lấy dữ liệu tripData
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedItems, setExpandedItems] = useState({}); // Theo dõi trạng thái mở rộng cho từng mục tin tức
  const router = useRouter();

  const selectedLocation = tripData?.locationInfo?.name;     // Lấy tên địa điểm đã chọn
  const selectedPhoto = tripData?.locationInfo?.photoRef;    // Lấy ảnh địa điểm đã chọn

  // Giả lập chi tiết hoạt động
  const activity = {
    details: "Địa điểm này cung cấp những cảnh quan tuyệt đẹp, trải nghiệm văn hóa độc đáo và nhiều điều thú vị khác."
  };

  useEffect(() => {
    if (selectedLocation) {
      const loadNews = async () => {
        const articles = await fetchNews(selectedLocation, selectedPhoto, activity); // Truyền photoRef và chi tiết hoạt động vào hàm giả lập
        setNews(articles);
        setLoading(false);
      };
      loadNews();
    }
  }, [selectedLocation]);

  // Hàm thay đổi trạng thái mở rộng
  const toggleExpand = (id) => {
    setExpandedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Đảo ngược trạng thái mở rộng cho mục này
    }));
  };

  // Hàm hiển thị mô tả tin tức với chức năng thu gọn
  const renderDescription = (description, isExpanded, id) => {
    const maxLength = 100;
    if (description.length > maxLength && !isExpanded) {
      return (
        <>
          <Text style={{ fontFamily: 'outfit', color: Colors.GRAY }}>
            {description.slice(0, maxLength)}...{' '}
          </Text>
          <Text
            style={{ fontFamily: 'outfit-bold', color: Colors.PRIMARY }}
            onPress={() => toggleExpand(id)} // Sử dụng id để thay đổi trạng thái
          >
            Xem thêm
          </Text>
        </>
      );
    }
    return (
      <>
        <Text style={{ fontFamily: 'outfit', color: Colors.GRAY }}>
          {description}{' '}
        </Text>
        {description.length > maxLength && (
          <Text
            style={{ fontFamily: 'outfit-bold', color: Colors.PRIMARY }}
            onPress={() => toggleExpand(id)} // Sử dụng id để thu gọn lại
          >
            Thu gọn
          </Text>
        )}
      </>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.PRIMARY} />;
  }

  return (
    <View style={{ padding: 20, paddingTop: 55, backgroundColor: Colors.WHITE, height: '100%' }}>
      <Text style={{ fontFamily: 'outfit-bold', fontSize: 30 }}>📰 Travel News {selectedLocation}</Text>
      
      {/* Hiển thị ảnh địa điểm đã chọn */}
      {selectedPhoto && (
        <Image 
          source={selectedPhoto}
          style={{ width: '100%', height: 200, borderRadius: 10, marginVertical: 10 }}
        />
      )}
      
      <FlatList
        data={news}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isExpanded = expandedItems[item.id] || false; // Kiểm tra xem mục này có mở rộng không
          return (
            <TouchableOpacity
              style={{
                marginVertical: 15,
                borderWidth: 1,
                borderColor: Colors.GRAY,
                borderRadius: 10,
                padding: 15,
                backgroundColor: Colors.LIGHT_GRAY,
              }}
              //onPress={() => router.push(`/news-details/${item.id}`)}
            >
              <Image 
                source={item.imageUrl}
                style={{ width: '100%', height: 150, borderRadius: 10 }} 
              />
              <Text style={{ fontFamily: 'outfit-bold', fontSize: 20, marginVertical: 10 }}>{item.title}</Text>
              
              {/* Gọi hàm để hiển thị mô tả đã thu gọn hoặc đầy đủ */}
              {renderDescription(item.description, isExpanded, item.id)}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
