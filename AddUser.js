import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const AddUser = ({ refreshUsers }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');

  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleAddUser = async () => {
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
      await addDoc(collection(db, 'users'), { name, email, age, phone });
      Alert.alert('Thành công', 'Người dùng đã được thêm.');
      refreshUsers(); // Gọi refreshUsers sau khi thêm người dùng
    } catch (error) {
      console.error("Error adding user: ", error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi thêm người dùng.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên</Text>
      <TextInput
        placeholder="Nhập tên"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Nhập email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <Text style={styles.label}>Tuổi</Text>
      <TextInput
        placeholder="Nhập tuổi"
        value={age}
        onChangeText={setAge}
        style={styles.input}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Số điện thoại</Text>
      <TextInput
        placeholder="Nhập số điện thoại"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        keyboardType="phone-pad"
      />
      <Button title="Thêm người dùng" onPress={handleAddUser} color="#00796b" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#00796b', // Label color to match your theme
  },
  input: {
    borderColor: '#00796b',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});

export default AddUser;
