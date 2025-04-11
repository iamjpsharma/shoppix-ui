import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  Image,
  Switch
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  CreditCard, 
  Bell, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Moon,
  Sun
} from 'lucide-react-native';
import { useThemeStore, useIsDarkMode } from '@/store/theme-store';
import { useAuthStore } from '@/store/auth-store';
import colors from '@/constants/colors';
import { spacing, borderRadius } from '@/constants/theme';
import { orders } from '@/mocks/user';

export default function ProfileScreen() {
  const router = useRouter();
  const isDarkMode = useIsDarkMode();
  const setTheme = useThemeStore(state => state.setTheme);
  const { user, logout } = useAuthStore();
  const theme = isDarkMode ? colors.dark : colors.light;
  
  const handleToggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };
  
  const handleLogout = () => {
    logout();
    router.replace('/(auth)');
  };
  
  const handleEditProfile = () => {
    router.push('/profile/edit');
  };
  
  const handleOrders = () => {
    router.push('/profile/orders');
  };
  
  const handleWishlist = () => {
    router.push('/wishlist');
  };
  
  const handleAddresses = () => {
    router.push('/profile/addresses');
  };
  
  const handlePaymentMethods = () => {
    router.push('/profile/payment-methods');
  };
  
  const handleNotifications = () => {
    router.push('/profile/notifications');
  };
  
  const handleHelp = () => {
    router.push('/profile/help');
  };
  
  const renderMenuItem = (
    icon: React.ReactNode,
    title: string,
    onPress: () => void,
    rightElement?: React.ReactNode
  ) => (
    <TouchableOpacity 
      style={[styles.menuItem, { borderBottomColor: theme.border }]}
      onPress={onPress}
    >
      <View style={styles.menuItemLeft}>
        {icon}
        <Text style={[styles.menuItemText, { color: theme.text }]}>
          {title}
        </Text>
      </View>
      
      {rightElement || <ChevronRight size={20} color={theme.textSecondary} />}
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.profileInfo}>
            <Image 
              source={{ uri: user?.avatar || 'https://images.unsplash.com/photo-1599566150163-29194dcaad36' }} 
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <Text style={[styles.userName, { color: theme.text }]}>
                {user?.name || 'Guest User'}
              </Text>
              <Text style={[styles.userEmail, { color: theme.textSecondary }]}>
                {user?.email || 'guest@example.com'}
              </Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={[styles.editButton, { backgroundColor: theme.primary }]}
            onPress={handleEditProfile}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={[styles.statItem, { backgroundColor: theme.card }]}>
            <Text style={[styles.statValue, { color: theme.text }]}>
              {orders.length}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Orders
            </Text>
          </View>
          
          <View style={[styles.statItem, { backgroundColor: theme.card }]}>
            <Text style={[styles.statValue, { color: theme.text }]}>
              3
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Wishlist
            </Text>
          </View>
          
          <View style={[styles.statItem, { backgroundColor: theme.card }]}>
            <Text style={[styles.statValue, { color: theme.text }]}>
              2
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Reviews
            </Text>
          </View>
        </View>
        
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            My Account
          </Text>
          
          {renderMenuItem(
            <ShoppingBag size={20} color={theme.primary} />,
            'My Orders',
            handleOrders
          )}
          
          {renderMenuItem(
            <Heart size={20} color={theme.primary} />,
            'My Wishlist',
            handleWishlist
          )}
          
          {renderMenuItem(
            <MapPin size={20} color={theme.primary} />,
            'My Addresses',
            handleAddresses
          )}
          
          {renderMenuItem(
            <CreditCard size={20} color={theme.primary} />,
            'Payment Methods',
            handlePaymentMethods
          )}
        </View>
        
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Preferences
          </Text>
          
          {renderMenuItem(
            isDarkMode ? 
              <Moon size={20} color={theme.primary} /> : 
              <Sun size={20} color={theme.primary} />,
            'Dark Mode',
            handleToggleTheme,
            <Switch
              value={isDarkMode}
              onValueChange={handleToggleTheme}
              trackColor={{ false: '#767577', true: `${theme.primary}80` }}
              thumbColor={isDarkMode ? theme.primary : '#f4f3f4'}
            />
          )}
          
          {renderMenuItem(
            <Bell size={20} color={theme.primary} />,
            'Notifications',
            handleNotifications
          )}
          
          {renderMenuItem(
            <HelpCircle size={20} color={theme.primary} />,
            'Help & Support',
            handleHelp
          )}
        </View>
        
        <TouchableOpacity 
          style={[styles.logoutButton, { backgroundColor: `${theme.error}10` }]}
          onPress={handleLogout}
        >
          <LogOut size={20} color={theme.error} />
          <Text style={[styles.logoutText, { color: theme.error }]}>
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
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
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  userInfo: {
    marginLeft: spacing.md,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
  },
  editButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginHorizontal: spacing.xs,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  section: {
    marginBottom: spacing.md,
    borderRadius: borderRadius.md,
    marginHorizontal: spacing.md,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    padding: spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: spacing.md,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginBottom: spacing.xl,
    borderRadius: borderRadius.md,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: spacing.sm,
  },
});