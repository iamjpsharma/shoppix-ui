import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  SafeAreaView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Plus, MapPin } from 'lucide-react-native';
import { useIsDarkMode } from '@/store/theme-store';
import { useAuthStore } from '@/store/auth-store';
import colors from '@/constants/colors';
import { spacing } from '@/constants/theme';
import AddressCard from '@/components/ui/AddressCard';
import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';

export default function AddressesScreen() {
  const router = useRouter();
  const isDarkMode = useIsDarkMode();
  const { user, updateUser } = useAuthStore();
  const theme = isDarkMode ? colors.dark : colors.light;
  
  const [addresses, setAddresses] = useState(user?.addresses || []);
  
  const handleBack = () => {
    router.back();
  };
  
  const handleAddAddress = () => {
    router.push('/profile/address-form');
  };
  
  const handleEditAddress = (addressId: string) => {
    router.push(`/profile/address-form?id=${addressId}`);
  };
  
  const handleDeleteAddress = (addressId: string) => {
    Alert.alert(
      "Delete Address",
      "Are you sure you want to delete this address?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Delete", 
          onPress: () => {
            const updatedAddresses = addresses.filter(addr => addr.id !== addressId);
            setAddresses(updatedAddresses);
            updateUser({ addresses: updatedAddresses });
          },
          style: "destructive"
        }
      ]
    );
  };
  
  const handleSetDefaultAddress = (addressId: string) => {
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    }));
    
    setAddresses(updatedAddresses);
    updateUser({ addresses: updatedAddresses });
  };
  
  const renderAddressActions = (addressId: string) => (
    <View style={styles.addressActions}>
      <TouchableOpacity 
        style={[styles.actionButton, { backgroundColor: theme.primary }]}
        onPress={() => handleEditAddress(addressId)}
      >
        <Text style={styles.actionButtonText}>Edit</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.actionButton, { backgroundColor: theme.error }]}
        onPress={() => handleDeleteAddress(addressId)}
      >
        <Text style={styles.actionButtonText}>Delete</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.actionButton, { backgroundColor: theme.success }]}
        onPress={() => handleSetDefaultAddress(addressId)}
      >
        <Text style={styles.actionButtonText}>Set Default</Text>
      </TouchableOpacity>
    </View>
  );
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <ArrowLeft size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>
          My Addresses
        </Text>
        <TouchableOpacity onPress={handleAddAddress}>
          <Plus size={24} color={theme.primary} />
        </TouchableOpacity>
      </View>
      
      {addresses.length > 0 ? (
        <FlatList
          data={addresses}
          renderItem={({ item }) => (
            <View>
              <AddressCard address={item} />
              {renderAddressActions(item.id)}
            </View>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.addressesList}
        />
      ) : (
        <EmptyState
          icon={<MapPin size={32} color={theme.textSecondary} />}
          title="No Addresses Yet"
          description="You haven't added any addresses yet. Add an address to make checkout faster."
          buttonText="Add Address"
          onButtonPress={handleAddAddress}
        />
      )}
      
      <View style={styles.footer}>
        <Button
          title="Add New Address"
          onPress={handleAddAddress}
          fullWidth
          icon={<Plus size={18} color="#FFFFFF" />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addressesList: {
    padding: spacing.md,
    paddingBottom: 80, // Space for the footer button
  },
  addressActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: -spacing.md,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
  },
  actionButton: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 4,
    marginLeft: spacing.xs,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
});