import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Button, TextInput, List, Title, FAB, Portal, Dialog, Paragraph } from 'react-native-paper';

const CRUDScreen = ({ title, fetchItems, createItem, updateItem, deleteItem, fields }) => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const response = await fetchItems();
      setItems(response.data);
    } catch (error) {
      console.error(`Failed to fetch ${title}:`, error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await updateItem(formData._id, formData);
      } else {
        await createItem(formData);
      }
      loadItems();
      setFormData({});
      setIsEditing(false);
    } catch (error) {
      console.error(`Failed to ${isEditing ? 'update' : 'create'} ${title}:`, error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteItem(selectedItem._id);
      loadItems();
      setDialogVisible(false);
    } catch (error) {
      console.error(`Failed to delete ${title}:`, error);
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setIsEditing(true);
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>{title}</Title>
      {fields.map((field) => (
        <TextInput
          key={field}
          label={field}
          value={formData[field] || ''}
          onChangeText={(text) => setFormData({ ...formData, [field]: text })}
          mode="outlined"
          style={styles.input}
        />
      ))}
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        {isEditing ? 'Update' : 'Create'}
      </Button>
      <FlatList
        data={items}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <List.Item
            title={item[fields[0]]}
            description={fields.slice(1).map(field => `${field}: ${item[field]}`).join(', ')}
            right={() => (
              <View style={styles.itemButtons}>
                <Button onPress={() => handleEdit(item)}>Edit</Button>
                <Button onPress={() => {
                  setSelectedItem(item);
                  setDialogVisible(true);
                }}>Delete</Button>
              </View>
            )}
          />
        )}
      />
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title>Confirm Deletion</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure you want to delete this item?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>Cancel</Button>
            <Button onPress={handleDelete}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {
          setFormData({});
          setIsEditing(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    marginBottom: 20,
  },
  itemButtons: {
    flexDirection: 'row',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default CRUDScreen;