import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Switch
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, MapPin, Home, Building, Phone } from 'lucide-react-native';
import { useIsDarkMode } from '@/store/theme-store';
import { useAuthStore } from '@/store/auth-store';
import colors from '@/constants/colors';
import { spacing } from '@/constants/theme';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Address } from '@/types';

export default function AddressFormScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const isDarkMode = useIsDarkMode();
  const { user, updateUser } = useAuthStore();
  const theme = isDarkMode ? colors.dark : colors.light;
  
  const addressId = params.id as string;
  const isEditing = !!addressId;
  
  const [name, setName] = useState('');
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('United States');
  const [phone, setPhone] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (isEditing && user) {
      const address = user.addresses.find(addr => addr.id === addressId);
      if (address) {
        setName(address.name);
        setLine1(address.line1);
        setLine2(address.line2 || '');
        setCity(address.city);
        setState(address.state);
        setPostalCode(address.postalCode);
        setCountry(address.country);
        setPhone(address.phone || '');
        setIsDefault(!!address.isDefault);
      }
    }
  }, [isEditing, addressId, user]);
  
  const handleBack = () => {
    router.back();
  };
  
  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newAddress: Address = {
      id: isEditing ? addressId : `addr-${Date.now()}`,
      name,
      line1,
      line2: line2 || undefined,
      city,
      state,
      postalCode,
      country,
      phone: phone || undefined,
      isDefault
    };
    
    if (user) {
      let updatedAddresses;
      
      if (isEditing) {
        // Update existing address
        updatedAddresses = user.addresses.map(addr => 
          addr.id === addressId ? newAddress : 
          isDefault ? { ...addr, isDefault: false } : addr
        );
      } else {
        // Add new address
        updatedAddresses = isDefault 
          ? user.addresses.map(addr => ({ ...addr, isDefault: false })).concat(newAddress)
          : [...user.addresses, newAddress];
      }
      
      updateUser({ addresses: updatedAddresses });
    }
    
    setIsLoading(false);
    router.back();
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack}>
            <ArrowLeft size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: theme.text }]}>
            {isEditing ? 'Edit Address' : 'Add New Address'}
          </Text>
          <View style={{ width: 24 }} />
        </View>
        
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.form}>
            <Input
              label="Address Name"
              placeholder="Home, Work, etc."
              value={name}
              onChangeText={setName}
              leftIcon={<MapPin size={20} color={theme.textSecondary} />}
            />
            
            <Input
              label="Address Line 1"
              placeholder="Street address, P.O. box, etc."
              value={line1}
              onChangeText={setLine1}
              leftIcon={<Home size={20} color={theme.textSecondary} />}
            />
            
            <Input
              label="Address Line 2 (Optional)"
              placeholder="Apartment, suite, unit, building, floor, etc."
              value={line2}
              onChangeText={setLine2}
              leftIcon={<Building size={20} color={theme.textSecondary} />}
            />
            
            <Input
              label="City"
              placeholder="Enter city"
              value={city}
              onChangeText={setCity}
            />
            
            <View style={styles.row}>
              <View style={styles.halfInput}>
                <Input
                  label="State/Province"
                  placeholder="Enter state"
                  value={state}
                  onChangeText={setState}
                />
              </View>
              
              <View style={styles.halfInput}>
                <Input
                  label="Postal Code"
                  placeholder="Enter postal code"
                  value={postalCode}
                  onChangeText={setPostalCode}
                  keyboardType="numeric"
                />
              </View>
            </View>
            
            <Input
              label="Country"
              placeholder="Enter country"
              value={country}
              onChangeText={setCountry}
            />
            
            <Input
              label="Phone Number (Optional)"
              placeholder="Enter phone number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              leftIcon={<Phone size={20} color={theme.textSecondary} />}
            />
            
            <View style={styles.switchContainer}>
              <Text style={[styles.switchLabel, { color: theme.text }]}>
                Set as Default Address
              </Text>
              <Switch
                value={isDefault}
                onValueChange={setIsDefault}
                trackColor={{ false: '#767577', true: `${theme.primary}80` }}
                thumbColor={isDefault ? theme.primary : '#f4f3f4'}
              />
            </View>
            
            <Button
              title="Save Address"
              onPress={handleSave}
              loading={isLoading}
              fullWidth
              style={styles.saveButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
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
  scrollContent: {
    flexGrow: 1,
    padding: spacing.md,
  },
  form: {
    marginBottom: spacing.xl,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: spacing.md,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  saveButton: {
    marginTop: spacing.lg,
  },
});