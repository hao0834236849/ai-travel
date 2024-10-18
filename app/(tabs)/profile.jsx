import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { auth } from './../../configs/FirebaseConfig'; // Đường dẫn tới file cấu hình Firebase của bạn
import { Colors } from '@/constants/Colors';

export default function Profile() {
  const router = useRouter();

  // Hàm đăng xuất
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        router.replace('auth/sign-in'); // Chuyển hướng về trang đăng nhập sau khi đăng xuất
      })
      .catch((error) => {
        console.log('Error signing out: ', error);
      });
  };

  return (
    <View style={styles.container}>
      {/* Avatar */}
      <Image 
        source={require('./../../assets/images/placeholder.jpg')} // Thay bằng ảnh avatar người dùng hoặc ảnh mặc định
        style={styles.avatar}
      />

      {/* Thông tin người dùng */}
      <Text style={styles.username}>User Name</Text>

      {/* Nút đăng xuất */}
      <TouchableOpacity onPress={handleSignOut} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75, // Bo góc tròn
    borderWidth: 2,
    borderColor: Colors.GRAY,
  },
  username: {
    fontSize: 24,
    fontFamily: 'outfit-bold',
    marginTop: 20,
    color: Colors.BLACK,
  },
  logoutButton: {
    marginTop: 30,
    padding: 15,
    backgroundColor: Colors.RED, // Màu đỏ để thể hiện hành động đăng xuất
    borderRadius: 15,
  },
  logoutText: {
    color: Colors.WHITE,
    fontFamily: 'outfit-medium',
    fontSize: 16,
    textAlign: 'center',
  },
});
