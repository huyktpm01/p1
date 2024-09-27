import React, { useState } from 'react';
import { SafeAreaView, Modal, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AddUser from './AddUser';
import UserList from './UserList';
import UpdateUser from './UpdateUser';

const App = () => {
  const [refresh, setRefresh] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isAddUserModalVisible, setIsAddUserModalVisible] = useState(false);

  const refreshUsers = () => {
    setRefresh((prev) => !prev);
  };

  const openUpdateModal = (id) => {
    setSelectedUserId(id);
    setIsUpdateModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsAddUserModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Thêm người dùng</Text>
      </TouchableOpacity>

      <UserList refresh={refresh} onEdit={openUpdateModal} />

      <Modal visible={isAddUserModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <AddUser refreshUsers={refreshUsers} />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsAddUserModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={isUpdateModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <UpdateUser userId={selectedUserId} refreshUsers={refreshUsers} onClose={() => setIsUpdateModalVisible(false)} />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsUpdateModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa', // Light cyan background
    padding: 20,
    justifyContent: 'flex-start',
  },
  addButton: {
    backgroundColor: '#00796b', // Teal color
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent black overlay for the modal
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#ffffff', // White background for the modal
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#00796b', // Same teal color for the close button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default App;
