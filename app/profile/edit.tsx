import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { User, Mail, Phone, Camera, ArrowLeft } from 'lucide-react-native';
import { useIsDarkMode } from '@/store/theme-store';
import { useAuthStore } from '@/store/auth-store';
import colors from '@/constants/colors';
import { spacing, borderRadius } from '@/constants/theme';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function EditProfileScreen() {
  const router = useRouter();
  const isDarkMode = useIsDarkMode();
  const { user, updateUser } = useAuthStore();
  const theme = isDarkMode ? colors.dark : colors.light;
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleBack = () => {
    router.back();
  };
  
  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    updateUser({
      name,
      email,
      phone
    });
    
    setIsLoading(false);
    router.back();
  };
  
  const handleChangePhoto = () => {
    // In a real app, you would use expo-image-picker here
    alert('This would open the image picker in a real app');
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
            Edit Profile
          </Text>
          <View style={{ width: 24 }} />
        </View>
        
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: user?.avatar || 'https://images.unsplash.com/photo-1599566150163-29194dcaad36' }} 
              style={styles.avatar}
            />
            <TouchableOpacity 
              style={[styles.cameraButton, { backgroundColor: theme.primary }]}
              onPress={handleChangePhoto}
            >
              <Camera size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.form}>
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
              leftIcon={<User size={20} color={theme.textSecondary} />}
            />
            
            <Input
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon={<Mail size={20} color={theme.textSecondary} />}
            />
            
            <Input
              label="Phone Number"
              placeholder="Enter your phone number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              leftIcon={<Phone size={20} color={theme.textSecondary} />}
            />
            
            <Button
              title="Save Changes"
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
  avatarContainer: {
    alignItems: 'center',
    marginVertical: spacing.xl,
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    marginBottom: spacing.xl,
  },
  saveButton: {
    marginTop: spacing.lg,
  },
});