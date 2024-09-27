import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
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
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc muốn xóa người dùng này không?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Xóa",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'users', id));
              Alert.alert('Thành công', 'Người dùng đã được xóa.');
              fetchUsers(); // Làm mới danh sách sau khi xóa
            } catch (error) {
              console.error("Error deleting user: ", error);
              Alert.alert('Lỗi', 'Có lỗi xảy ra khi xóa người dùng.');
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  useEffect(() => {
    fetchUsers();
  }, [refresh]);

  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <Text style={styles.userText}><Text style={styles.boldText}>Tên:</Text> {item.name}</Text>
      <Text style={styles.userText}><Text style={styles.boldText}>Email:</Text> {item.email}</Text>
      <Text style={styles.userText}><Text style={styles.boldText}>Tuổi:</Text> {item.age}</Text>
      <Text style={styles.userText}><Text style={styles.boldText}>Số điện thoại:</Text> {item.phone}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.editButton} onPress={() => onEdit(item.id)}>
          <Text style={styles.buttonText}>Sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteUser(item.id)}>
          <Text style={styles.buttonText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff7f50" />
        <Text>Đang tải...</Text>
      </View>
    );
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
    padding: 20,
    backgroundColor: '#e0f7fa',
  },
  userItem: {
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  userText: {
    fontSize: 16,
    marginBottom: 8,
  },
  boldText: {
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#00796b', // Updated to match previous components
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: '#00796b', // You can adjust this if needed
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserList;
