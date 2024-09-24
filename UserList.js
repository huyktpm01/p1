import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import { db } from './firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const UserList = ({ refresh, onEdit }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const userData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(userData);
    } catch (error) {
      console.error("Error fetching users: ", error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi lấy danh sách người dùng.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, 'users', id));
      Alert.alert('Thành công', 'Người dùng đã được xóa.');
      fetchUsers(); // Làm mới danh sách sau khi xóa
    } catch (error) {
      console.error("Error deleting user: ", error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi xóa người dùng.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refresh]); // Thêm refresh vào dependencies

  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <Text style={styles.userText}>Tên: {item.name}</Text>
      <Text style={styles.userText}>Email: {item.email}</Text>
      <Text style={styles.userText}>Tuổi: {item.age}</Text>
      <Text style={styles.userText}>Số điện thoại: {item.phone}</Text>
      <View style={styles.buttonsContainer}>
        <Button title="Sửa" onPress={() => onEdit(item.id)} color="#ff7f50" />
        <Button title="Xóa" onPress={() => handleDeleteUser(item.id)} color="#ff6347" />
      </View>
    </View>
  );

  if (loading) {
    return <Text>Đang tải...</Text>;
  }

  return (
    <FlatList
      data={users}
      renderItem={renderUserItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 20,
  },
  userItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default UserList;
