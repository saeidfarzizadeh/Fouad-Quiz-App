import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { APP_LOGO } from '../data/appConfig';

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const { navigation } = props;

  const menuItems = [
    {
      title: 'خانه',
      icon: 'home',
      emoji: APP_LOGO.sectionIcons.home,
      image: APP_LOGO.sectionImages.home,
      screen: 'Home',
      color: APP_LOGO.sectionColors.home,
    },
    {
      title: 'قرآن کریم',
      icon: 'book',
      emoji: '📖',
      image: 'https://via.placeholder.com/200x200/2E7D32/ffffff?text=قرآن+کریم',
      screen: 'Quran',
      color: '#2E7D32',
    },
    {
      title: 'دوره‌های آموزشی',
      icon: 'school',
      emoji: APP_LOGO.sectionIcons.courses,
      image: APP_LOGO.sectionImages.courses,
      screen: 'Courses',
      color: APP_LOGO.sectionColors.courses,
    },
    {
      title: 'آزمون قرآن',
      icon: 'quiz',
      emoji: APP_LOGO.sectionIcons.quiz,
      image: APP_LOGO.sectionImages.quiz,
      screen: 'Quiz',
      params: { category: 'quran' },
      color: APP_LOGO.sectionColors.quiz,
    },
    {
      title: 'آزمون مطهری',
      icon: 'school',
      emoji: APP_LOGO.sectionIcons.quiz,
      image: APP_LOGO.sectionImages.quiz,
      screen: 'Quiz',
      params: { category: 'mottahari' },
      color: APP_LOGO.sectionColors.quiz,
    },
    {
      title: 'آزمون ترکیبی',
      icon: 'quiz',
      emoji: APP_LOGO.sectionIcons.quiz,
      image: APP_LOGO.sectionImages.quiz,
      screen: 'Quiz',
      params: { category: 'all' },
      color: APP_LOGO.sectionColors.quiz,
    },
    {
      title: 'گواهینامه',
      icon: 'card-membership',
      emoji: APP_LOGO.sectionIcons.certificate,
      image: APP_LOGO.sectionImages.certificate,
      screen: 'Certificate',
      color: APP_LOGO.sectionColors.certificate,
    },
    {
      title: 'محاسبه نفس',
      icon: 'favorite',
      emoji: APP_LOGO.sectionIcons.soulCalculation,
      image: APP_LOGO.sectionImages.soulCalculation,
      screen: 'SoulCalculation',
      color: APP_LOGO.sectionColors.soulCalculation,
    },
    {
      title: 'استاد مطهری',
      icon: 'school',
      emoji: APP_LOGO.sectionIcons.motahari,
      image: APP_LOGO.sectionImages.motahari,
      screen: 'Motahari',
      color: APP_LOGO.sectionColors.motahari,
    },
    {
      title: 'استاد صفایی حائری',
      icon: 'psychology',
      emoji: APP_LOGO.sectionIcons.masterSafaei,
      image: APP_LOGO.sectionImages.masterSafaei,
      screen: 'MasterSafaei',
      color: APP_LOGO.sectionColors.masterSafaei,
    },
    {
      title: 'درباره برنامه',
      icon: 'info',
      emoji: 'ℹ️',
      image: 'https://via.placeholder.com/200x200/f39c12/ffffff?text=درباره',
      screen: 'About',
      color: '#f39c12',
    },
  ];

  const adminMenuItems = [
    {
      title: 'پنل مربی',
      icon: 'admin-panel-settings',
      emoji: APP_LOGO.sectionIcons.adminPanel,
      image: APP_LOGO.sectionImages.adminPanel,
      screen: 'AdminPanel',
      color: APP_LOGO.sectionColors.adminPanel,
    },
    {
      title: 'مدیریت محتوا',
      icon: 'library-books',
      emoji: '📚',
      image: 'https://via.placeholder.com/200x200/27ae60/ffffff?text=مدیریت+محتوا',
      screen: 'ContentManagement',
      color: '#27ae60',
    },
  ];

  const handleNavigation = (screen: string, params?: any) => {
    navigation.navigate(screen, params);
    navigation.closeDrawer();
  };

  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollContainer}>
        {/* هدر */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoIcon}>📖</Text>
              <Text style={styles.appName}>فُؤاد</Text>
            </View>
            <Text style={styles.appSubtitle}>طرح قرآنی فؤاد</Text>
            <Text style={styles.appDescription}>بر اساس اندیشه استاد علی صفایی حائری</Text>
          </View>
        </View>

        {/* منوهای اصلی */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>منوی اصلی</Text>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => handleNavigation(item.screen, item.params)}
            >
              <View style={styles.menuItemContent}>
                <View style={styles.menuItemLeft}>
                  <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                    <Text style={styles.emojiIcon}>{item.emoji}</Text>
                  </View>
                  <View style={styles.menuItemInfo}>
                    <Text style={styles.menuText}>{item.title}</Text>
                    <Text style={styles.menuSubtext}>کلیک برای ورود</Text>
                  </View>
                </View>
                <Icon name="chevron-left" size={20} color="#7f8c8d" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* بخش مدیریت */}
        <View style={styles.adminSection}>
          <Text style={styles.adminSectionTitle}>پنل مدیریت</Text>
          {adminMenuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, styles.adminMenuItem]}
              onPress={() => handleNavigation(item.screen, item.params)}
            >
              <View style={styles.menuItemContent}>
                <View style={styles.menuItemLeft}>
                  <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                    <Text style={styles.emojiIcon}>{item.emoji}</Text>
                  </View>
                  <View style={styles.menuItemInfo}>
                    <Text style={styles.menuText}>{item.title}</Text>
                    <Text style={styles.menuSubtext}>پنل مدیریت</Text>
                  </View>
                </View>
                <Icon name="chevron-left" size={20} color="#7f8c8d" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* آمار کلی */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>آمار شما</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Icon name="quiz" size={20} color="#27ae60" />
              <Text style={styles.statText}>12 آزمون</Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="trending-up" size={20} color="#3498db" />
              <Text style={styles.statText}>85% میانگین</Text>
            </View>
          </View>
        </View>

        {/* فوتر */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>نسخه 1.0.0</Text>
          <Text style={styles.footerText}>© 2024 فُؤاد</Text>
        </View>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#2E7D32',
    padding: 20,
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoIcon: {
    fontSize: 30,
    marginRight: 10,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D4AF37',
    textShadowColor: '#8B4513',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  appSubtitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  appDescription: {
    fontSize: 12,
    color: '#bdc3c7',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  menuSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 15,
    textAlign: 'right',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 8,
    borderRadius: 15,
    backgroundColor: '#FFF8DC',
    elevation: 2,
    shadowColor: '#8B4513',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemInfo: {
    flex: 1,
    marginLeft: 15,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#8B4513',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  emojiIcon: {
    fontSize: 24,
  },
  menuText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 2,
  },
  menuSubtext: {
    fontSize: 12,
    color: '#6B8E23',
    fontStyle: 'italic',
  },
  statsSection: {
    padding: 20,
    backgroundColor: '#FFF8DC',
    margin: 20,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#8B4513',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    color: '#6B8E23',
    marginLeft: 8,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    marginTop: 'auto',
  },
  footerText: {
    fontSize: 12,
    color: '#6B8E23',
    marginBottom: 5,
  },
  adminSection: {
    backgroundColor: '#C8E6C9',
    margin: 20,
    padding: 15,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#2E7D32',
  },
  adminSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 10,
    textAlign: 'center',
  },
  adminMenuItem: {
    backgroundColor: '#FFF8DC',
    borderRadius: 10,
    marginBottom: 5,
    elevation: 1,
    shadowColor: '#8B4513',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});

export default CustomDrawerContent;