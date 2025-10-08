import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigationButtons from '../components/NavigationButtons';

const { width } = Dimensions.get('window');

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  // تعریف ترتیب صفحات برای ناوبری
  const pageOrder = ['Home', 'Courses', 'SoulCalculation', 'Quiz', 'Certificate'];
  const currentPageIndex = 0; // HomeScreen در ایندکس 0 است

  // ناوبری به صفحه بعدی
  const goToNextPage = () => {
    const nextIndex = currentPageIndex + 1;
    if (nextIndex < pageOrder.length) {
      navigation.navigate(pageOrder[nextIndex]);
    }
  };

  // ناوبری به صفحه قبلی
  const goToPreviousPage = () => {
    const prevIndex = currentPageIndex - 1;
    if (prevIndex >= 0) {
      navigation.navigate(pageOrder[prevIndex]);
    }
  };
  const quickActions = [
    {
      title: 'دوره‌های آموزشی',
      subtitle: 'ویدیو و کتاب',
      icon: 'school',
      color: '#27ae60',
      onPress: () => navigation.navigate('Courses'),
    },
    {
      title: 'محاسبه نفس',
      subtitle: 'باغ معنوی',
      icon: 'favorite',
      color: '#e74c3c',
      onPress: () => navigation.navigate('SoulCalculation'),
    },
    {
      title: 'آزمون قرآن',
      subtitle: 'سوالات قرآنی',
      icon: 'book',
      color: '#27ae60',
      onPress: () => navigation.navigate('Quiz', { category: 'quran' }),
    },
    {
      title: 'آزمون مطهری',
      subtitle: 'تفسیر استاد مطهری',
      icon: 'school',
      color: '#e74c3c',
      onPress: () => navigation.navigate('Quiz', { category: 'mottahari' }),
    },
    {
      title: 'آزمون ترکیبی',
      subtitle: 'همه موضوعات',
      icon: 'quiz',
      color: '#3498db',
      onPress: () => navigation.navigate('Quiz', { category: 'all' }),
    },
    {
      title: 'گواهینامه‌ها',
      subtitle: 'مشاهده مدارک',
      icon: 'card-membership',
      color: '#9b59b6',
      onPress: () => navigation.navigate('Certificate'),
    },
  ];

  const features = [
    {
      icon: 'verified',
      title: 'سوالات تأیید شده',
      description: 'همه سوالات توسط متخصصان بررسی شده',
    },
    {
      icon: 'analytics',
      title: 'آمار دقیق',
      description: 'نمودار پیشرفت و تحلیل عملکرد',
    },
    {
      icon: 'security',
      title: 'گواهینامه امن',
      description: 'مدارک با QR Code قابل تأیید',
    },
    {
      icon: 'accessibility',
      title: 'دسترسی آسان',
      description: 'رابط کاربری ساده و زیبا',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* هدر */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.openDrawer()}
        >
          <Icon name="menu" size={24} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Text style={styles.welcomeText}>خوش آمدید</Text>
          <Text style={styles.appName}>فُؤاد</Text>
        </View>
        
        <TouchableOpacity style={styles.profileButton}>
          <Icon name="person" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* کارت خوشامدگویی */}
        <View style={styles.welcomeCard}>
          <View style={styles.welcomeContent}>
            <Text style={styles.welcomeTitle}>آماده یادگیری هستید؟</Text>
            <Text style={styles.welcomeSubtitle}>
              با آزمون‌های تعاملی قرآن و تفسیر مطهری، دانش خود را محک بزنید
            </Text>
          </View>
          <View style={styles.welcomeIcon}>
            <Icon name="lightbulb" size={40} color="#f39c12" />
          </View>
        </View>

        {/* اقدامات سریع */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>اقدامات سریع</Text>
          <View style={styles.quickActionsContainer}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.quickActionCard, { backgroundColor: action.color }]}
                onPress={action.onPress}
              >
                <Icon name={action.icon} size={32} color="#fff" />
                <Text style={styles.quickActionTitle}>{action.title}</Text>
                <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ویژگی‌های برنامه */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ویژگی‌های برنامه</Text>
          <View style={styles.featuresContainer}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <Icon name={feature.icon} size={24} color="#e74c3c" />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* آمار کلی */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>آمار کلی شما</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Icon name="quiz" size={32} color="#27ae60" />
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>آزمون تکمیل شده</Text>
            </View>
            <View style={styles.statCard}>
              <Icon name="trending-up" size={32} color="#3498db" />
              <Text style={styles.statNumber}>85%</Text>
              <Text style={styles.statLabel}>میانگین نمرات</Text>
            </View>
            <View style={styles.statCard}>
              <Icon name="schedule" size={32} color="#f39c12" />
              <Text style={styles.statNumber}>45</Text>
              <Text style={styles.statLabel}>دقیقه مطالعه</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* دکمه‌های ناوبری */}
      <NavigationButtons
        onPrevious={goToPreviousPage}
        onNext={goToNextPage}
        previousDisabled={currentPageIndex === 0}
        nextDisabled={currentPageIndex === pageOrder.length - 1}
        previousText="صفحه قبلی"
        nextText="دوره‌های آموزشی"
        showPrevious={false} // در صفحه اول، دکمه قبلی نمایش داده نمی‌شود
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#2c3e50',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menuButton: {
    padding: 8,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  welcomeText: {
    color: '#bdc3c7',
    fontSize: 14,
  },
  appName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  welcomeCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    marginBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  welcomeContent: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
  },
  welcomeIcon: {
    marginLeft: 15,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    textAlign: 'right',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: (width - 60) / 2,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  quickActionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  quickActionSubtitle: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
    opacity: 0.9,
  },
  featuresContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  featureIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#f8f9fa',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
  },
});

export default HomeScreen;
