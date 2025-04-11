import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Switch, 
  SafeAreaView,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Bell, Tag, Truck, Megaphone, Gift } from 'lucide-react-native';
import { useIsDarkMode } from '@/store/theme-store';
import colors from '@/constants/colors';
import { spacing, borderRadius } from '@/constants/theme';
import Button from '@/components/ui/Button';

export default function NotificationsScreen() {
  const router = useRouter();
  const isDarkMode = useIsDarkMode();
  const theme = isDarkMode ? colors.dark : colors.light;
  
  const [notificationSettings, setNotificationSettings] = useState({
    orderUpdates: true,
    promotions: true,
    newArrivals: false,
    deliveryUpdates: true,
    discounts: true,
  });
  
  const handleBack = () => {
    router.back();
  };
  
  const handleToggle = (key: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key]
    });
  };
  
  const handleSaveSettings = () => {
    // In a real app, you would save these settings to your API
    router.back();
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <ArrowLeft size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>
          Notifications
        </Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Notification Preferences
        </Text>
        
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={[styles.iconContainer, { backgroundColor: `${theme.primary}20` }]}>
                <Bell size={20} color={theme.primary} />
              </View>
              <View>
                <Text style={[styles.settingTitle, { color: theme.text }]}>
                  Order Updates
                </Text>
                <Text style={[styles.settingDescription, { color: theme.textSecondary }]}>
                  Get notified about your order status
                </Text>
              </View>
            </View>
            <Switch
              value={notificationSettings.orderUpdates}
              onValueChange={() => handleToggle('orderUpdates')}
              trackColor={{ false: '#767577', true: `${theme.primary}80` }}
              thumbColor={notificationSettings.orderUpdates ? theme.primary : '#f4f3f4'}
            />
          </View>
          
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={[styles.iconContainer, { backgroundColor: `${theme.secondary}20` }]}>
                <Megaphone size={20} color={theme.secondary} />
              </View>
              <View>
                <Text style={[styles.settingTitle, { color: theme.text }]}>
                  Promotions
                </Text>
                <Text style={[styles.settingDescription, { color: theme.textSecondary }]}>
                  Receive promotional offers and campaigns
                </Text>
              </View>
            </View>
            <Switch
              value={notificationSettings.promotions}
              onValueChange={() => handleToggle('promotions')}
              trackColor={{ false: '#767577', true: `${theme.primary}80` }}
              thumbColor={notificationSettings.promotions ? theme.primary : '#f4f3f4'}
            />
          </View>
          
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={[styles.iconContainer, { backgroundColor: `${theme.info}20` }]}>
                <Tag size={20} color={theme.info} />
              </View>
              <View>
                <Text style={[styles.settingTitle, { color: theme.text }]}>
                  New Arrivals
                </Text>
                <Text style={[styles.settingDescription, { color: theme.textSecondary }]}>
                  Get updates when new products arrive
                </Text>
              </View>
            </View>
            <Switch
              value={notificationSettings.newArrivals}
              onValueChange={() => handleToggle('newArrivals')}
              trackColor={{ false: '#767577', true: `${theme.primary}80` }}
              thumbColor={notificationSettings.newArrivals ? theme.primary : '#f4f3f4'}
            />
          </View>
          
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={[styles.iconContainer, { backgroundColor: `${theme.success}20` }]}>
                <Truck size={20} color={theme.success} />
              </View>
              <View>
                <Text style={[styles.settingTitle, { color: theme.text }]}>
                  Delivery Updates
                </Text>
                <Text style={[styles.settingDescription, { color: theme.textSecondary }]}>
                  Track your package with real-time updates
                </Text>
              </View>
            </View>
            <Switch
              value={notificationSettings.deliveryUpdates}
              onValueChange={() => handleToggle('deliveryUpdates')}
              trackColor={{ false: '#767577', true: `${theme.primary}80` }}
              thumbColor={notificationSettings.deliveryUpdates ? theme.primary : '#f4f3f4'}
            />
          </View>
          
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={[styles.iconContainer, { backgroundColor: `${theme.warning}20` }]}>
                <Gift size={20} color={theme.warning} />
              </View>
              <View>
                <Text style={[styles.settingTitle, { color: theme.text }]}>
                  Discounts & Offers
                </Text>
                <Text style={[styles.settingDescription, { color: theme.textSecondary }]}>
                  Special discounts and limited-time offers
                </Text>
              </View>
            </View>
            <Switch
              value={notificationSettings.discounts}
              onValueChange={() => handleToggle('discounts')}
              trackColor={{ false: '#767577', true: `${theme.primary}80` }}
              thumbColor={notificationSettings.discounts ? theme.primary : '#f4f3f4'}
            />
          </View>
        </View>
        
        <Text style={[styles.note, { color: theme.textSecondary }]}>
          You can change these settings at any time. We'll never send you notifications you don't want.
        </Text>
      </ScrollView>
      
      <View style={[styles.footer, { backgroundColor: theme.background, borderTopColor: theme.border }]}>
        <Button
          title="Save Settings"
          onPress={handleSaveSettings}
          fullWidth
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
  content: {
    padding: spacing.md,
    paddingBottom: 80, // Space for the footer button
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  card: {
    borderRadius: borderRadius.md,
    borderWidth: 1,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: spacing.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
  },
  divider: {
    height: 1,
  },
  note: {
    fontSize: 12,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
    borderTopWidth: 1,
  },
});