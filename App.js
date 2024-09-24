import React, { useState } from 'react';
import { SafeAreaView, Modal, Button, View, StyleSheet } from 'react-native';
import AddUser from './AddUser';
import UserList from './UserList';
import UpdateUser from './UpdateUser';

const App = () => {
  const [refresh, setRefresh] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isAddUserModalVisible, setIsAddUserModalVisible] = useState(false);

  const refreshUsers = () => {
    setRefresh(prev => !prev);
  };

  const openUpdateModal = (id) => {
    setSelectedUserId(id);
    setIsUpdateModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Thêm người dùng" onPress={() => setIsAddUserModalVisible(true)} color="#ff7f50" />
      
      <UserList refresh={refresh} onEdit={openUpdateModal} />

      <Modal
        visible={isAddUserModalVisible}
        animationType="slide"
        transparent={false}
      >
        <View style={styles.modalContent}>
          <AddUser refreshUsers={refreshUsers} />
          <Button title="Đóng" onPress={() => setIsAddUserModalVisible(false)} color="#ff7f50" />
        </View>
      </Modal>

      <Modal
        visible={isUpdateModalVisible}
        animationType="slide"
        transparent={false}
      >
        <View style={styles.modalContent}>
          <UpdateUser userId={selectedUserId} refreshUsers={refreshUsers} onClose={() => setIsUpdateModalVisible(false)} />
          <Button title="Đóng" onPress={() => setIsUpdateModalVisible(false)} color="#ff7f50" />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
