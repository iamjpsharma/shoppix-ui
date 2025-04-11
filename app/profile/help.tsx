import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  FileText, 
  ShieldCheck, 
  ChevronRight 
} from 'lucide-react-native';
import { useIsDarkMode } from '@/store/theme-store';
import colors from '@/constants/colors';
import { spacing, borderRadius } from '@/constants/theme';

export default function HelpScreen() {
  const router = useRouter();
  const isDarkMode = useIsDarkMode();
  const theme = isDarkMode ? colors.dark : colors.light;
  
  const handleBack = () => {
    router.back();
  };
  
  const handleContactSupport = () => {
    // In a real app, you would navigate to a contact form or open email/phone
    alert('This would open a contact form in a real app');
  };
  
  const handleFAQ = (category: string) => {
    // In a real app, you would navigate to the FAQ category
    alert(`This would show FAQs for ${category} in a real app`);
  };
  
  const renderHelpItem = (
    icon: React.ReactNode,
    title: string,
    description: string,
    onPress: () => void
  ) => (
    <TouchableOpacity 
      style={[styles.helpItem, { backgroundColor: theme.card, borderColor: theme.border }]}
      onPress={onPress}
    >
      <View style={styles.helpItemContent}>
        <View style={[styles.iconContainer, { backgroundColor: `${theme.primary}10` }]}>
          {icon}
        </View>
        <View style={styles.helpItemText}>
          <Text style={[styles.helpItemTitle, { color: theme.text }]}>
            {title}
          </Text>
          <Text style={[styles.helpItemDescription, { color: theme.textSecondary }]}>
            {description}
          </Text>
        </View>
      </View>
      <ChevronRight size={20} color={theme.textSecondary} />
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <ArrowLeft size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>
          Help & Support
        </Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Contact Us
        </Text>
        
        <View style={styles.contactOptions}>
          {renderHelpItem(
            <MessageCircle size={24} color={theme.primary} />,
            "Chat with Us",
            "Get instant help from our support team",
            handleContactSupport
          )}
          
          {renderHelpItem(
            <Phone size={24} color={theme.primary} />,
            "Call Support",
            "Speak directly with a customer service representative",
            handleContactSupport
          )}
          
          {renderHelpItem(
            <Mail size={24} color={theme.primary} />,
            "Email Us",
            "Send us an email and we'll get back to you",
            handleContactSupport
          )}
        </View>
        
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Frequently Asked Questions
        </Text>
        
        <View style={styles.faqCategories}>
          {renderHelpItem(
            <ShoppingBag size={24} color={theme.primary} />,
            "Orders & Shipping",
            "Track orders, shipping info, and returns",
            () => handleFAQ("Orders & Shipping")
          )}
          
          {renderHelpItem(
            <CreditCard size={24} color={theme.primary} />,
            "Payments & Refunds",
            "Payment methods, refund process, and billing",
            () => handleFAQ("Payments & Refunds")
          )}
          
          {renderHelpItem(
            <ShieldCheck size={24} color={theme.primary} />,
            "Account & Security",
            "Account settings, password reset, and privacy",
            () => handleFAQ("Account & Security")
          )}
          
          {renderHelpItem(
            <FileText size={24} color={theme.primary} />,
            "Policies",
            "Return policy, terms of service, and privacy policy",
            () => handleFAQ("Policies")
          )}
        </View>
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  contactOptions: {
    marginBottom: spacing.lg,
  },
  faqCategories: {
  },
  helpItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    marginBottom: spacing.md,
  },
  helpItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  helpItemText: {
    flex: 1,
  },
  helpItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  helpItemDescription: {
    fontSize: 12,
  },
});