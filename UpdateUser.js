import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { db } from './firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const UpdateUser = ({ userId, refreshUsers, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState(''); // Thêm state cho số điện thoại

  useEffect(() => {
    const fetchUser = async () => {
      const userDoc = doc(db, 'users', userId);
      const userData = await getDoc(userDoc);
      if (userData.exists()) {
        setName(userData.data().name);
        setEmail(userData.data().email);
        setAge(userData.data().age);
        setPhone(userData.data().phone); // Lấy số điện thoại từ Firestore
      } else {
        Alert.alert('Lỗi', 'Người dùng không tồn tại.');
      }
    };

    fetchUser();
  }, [userId]);

  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleUpdateUser = async () => {
    if (!name) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên.');
      return;
    }

    if (!email) {
      Alert.alert('Lỗi', 'Vui lòng nhập email.');
      return;
    } else if (!isEmailValid(email)) {
      Alert.alert('Lỗi', 'Email không hợp lệ. Vui lòng nhập đúng định dạng (vd: abc@gmail.com).');
      return;
    }

    if (!age) {
      Alert.alert('Lỗi', 'Vui lòng nhập tuổi.');
      return;
    } else if (age <= 0 || age > 120) {
      Alert.alert('Lỗi', 'Tuổi phải từ 1 đến 120.');
      return;
    }

    if (!phone) {
      Alert.alert('Lỗi', 'Vui lòng nhập số điện thoại.');
      return;
    }

    try {
      const userDoc = doc(db, 'users', userId);
      await updateDoc(userDoc, { name, email, age, phone });
      Alert.alert('Thành công', 'Người dùng đã được cập nhật.');
      refreshUsers();
      onClose(); // Đóng modal sau khi cập nhật thành công
    } catch (error) {
      console.error("Error updating user: ", error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi cập nhật người dùng.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Tên"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Tuổi"
        value={age}
        onChangeText={setAge}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Số điện thoại"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        keyboardType="phone-pad"
      />
      <Button title="Cập nhật người dùng" onPress={handleUpdateUser} color="#ff7f50" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderColor: '#ff7f50',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
});

export default UpdateUser;
