import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  TextInput,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  AdminUser,
  EducationalContent,
  Question,
  AdminStats,
  loginAdmin,
  getCurrentAdmin,
  logoutAdmin,
  isAdminLoggedIn,
  getAdminStats,
  getEducationalContent,
  getQuestions,
  addEducationalContent,
  addQuestion,
  updateEducationalContent,
  updateQuestion,
  deleteEducationalContent,
  deleteQuestion,
} from '../data/adminData';
import NavigationButtons from '../components/NavigationButtons';

const { width, height } = Dimensions.get('window');

interface AdminPanelScreenProps {
  navigation: any;
}

const AdminPanelScreen: React.FC<AdminPanelScreenProps> = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'questions' | 'content'>('dashboard');
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState<'question' | 'content'>('question');
  const [stats, setStats] = useState<AdminStats>({
    totalQuestions: 0,
    totalContent: 0,
    totalUsers: 0,
    activeContent: 0,
    pendingContent: 0,
  });

  // تعریف ترتیب صفحات برای ناوبری
  const pageOrder = ['Home', 'Courses', 'Quiz', 'Certificate', 'SoulCalculation', 'AdminPanel'];
  const currentPageIndex = 5; // AdminPanelScreen در ایندکس 5 است

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

  // بررسی وضعیت ورود
  useEffect(() => {
    const loggedIn = isAdminLoggedIn();
    setIsLoggedIn(loggedIn);
    if (loggedIn) {
      setCurrentAdmin(getCurrentAdmin());
      setStats(getAdminStats());
    }
  }, []);

  // ورود به سیستم
  const handleLogin = useCallback(() => {
    const user = loginAdmin(username, password);
    if (user) {
      setCurrentAdmin(user);
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setUsername('');
      setPassword('');
      setStats(getAdminStats());
      Alert.alert('موفقیت', 'با موفقیت وارد شدید!');
    } else {
      Alert.alert('خطا', 'نام کاربری یا رمز عبور اشتباه است!');
    }
  }, [username, password]);

  // خروج از سیستم
  const handleLogout = useCallback(() => {
    logoutAdmin();
    setIsLoggedIn(false);
    setCurrentAdmin(null);
    Alert.alert('خروج', 'با موفقیت خارج شدید!');
  }, []);

  // نمایش مودال افزودن
  const showAddModalHandler = useCallback((type: 'question' | 'content') => {
    setModalType(type);
    setShowAddModal(true);
  }, []);

  if (!isLoggedIn) {
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
          
          <Text style={styles.headerTitle}>پنل مربی</Text>
          
          <View style={styles.headerSpacer} />
        </View>

        {/* صفحه ورود */}
        <View style={styles.loginContainer}>
          <View style={styles.loginCard}>
            <Icon name="admin-panel-settings" size={60} color="#2c3e50" />
            <Text style={styles.loginTitle}>ورود به پنل مربی</Text>
            <Text style={styles.loginSubtitle}>
              برای دسترسی به پنل مدیریت، لطفاً وارد شوید
            </Text>
            
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => setShowLoginModal(true)}
            >
              <Icon name="login" size={24} color="#fff" />
              <Text style={styles.loginButtonText}>ورود</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* مودال ورود */}
        <Modal
          visible={showLoginModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowLoginModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>ورود به سیستم</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setShowLoginModal(false)}
                >
                  <Icon name="close" size={24} color="#7f8c8d" />
                </TouchableOpacity>
              </View>

              <View style={styles.modalBody}>
                <TextInput
                  style={styles.input}
                  placeholder="نام کاربری"
                  value={username}
                  onChangeText={setUsername}
                />
                
                <TextInput
                  style={styles.input}
                  placeholder="رمز عبور"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={true}
                />

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={() => setShowLoginModal(false)}
                  >
                    <Text style={styles.cancelButtonText}>انصراف</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[styles.modalButton, styles.loginModalButton]}
                    onPress={handleLogin}
                  >
                    <Text style={styles.saveButtonText}>ورود</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        {/* دکمه‌های ناوبری */}
        <NavigationButtons
          onPrevious={goToPreviousPage}
          onNext={goToNextPage}
          previousDisabled={false}
          nextDisabled={true}
          previousText="محاسبه نفس"
          nextText="خانه"
          showNext={false}
        />
      </SafeAreaView>
    );
  }

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
        
        <Text style={styles.headerTitle}>پنل مربی</Text>
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="logout" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* تب‌های ناوبری */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'dashboard' && styles.activeTab]}
          onPress={() => setActiveTab('dashboard')}
        >
          <Icon name="dashboard" size={20} color={activeTab === 'dashboard' ? '#fff' : '#7f8c8d'} />
          <Text style={[styles.tabText, activeTab === 'dashboard' && styles.activeTabText]}>
            داشبورد
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'questions' && styles.activeTab]}
          onPress={() => setActiveTab('questions')}
        >
          <Icon name="quiz" size={20} color={activeTab === 'questions' ? '#fff' : '#7f8c8d'} />
          <Text style={[styles.tabText, activeTab === 'questions' && styles.activeTabText]}>
            سوالات
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'content' && styles.activeTab]}
          onPress={() => setActiveTab('content')}
        >
          <Icon name="library-books" size={20} color={activeTab === 'content' ? '#fff' : '#7f8c8d'} />
          <Text style={[styles.tabText, activeTab === 'content' && styles.activeTabText]}>
            محتوا
          </Text>
        </TouchableOpacity>
      </View>

      {/* محتوای تب‌ها */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'dashboard' && (
          <View style={styles.dashboardContent}>
            <Text style={styles.sectionTitle}>آمار کلی</Text>
            
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Icon name="quiz" size={30} color="#3498db" />
                <Text style={styles.statNumber}>{stats.totalQuestions}</Text>
                <Text style={styles.statLabel}>سوالات</Text>
              </View>
              
              <View style={styles.statCard}>
                <Icon name="library-books" size={30} color="#27ae60" />
                <Text style={styles.statNumber}>{stats.totalContent}</Text>
                <Text style={styles.statLabel}>محتوای آموزشی</Text>
              </View>
              
              <View style={styles.statCard}>
                <Icon name="check-circle" size={30} color="#f39c12" />
                <Text style={styles.statNumber}>{stats.activeContent}</Text>
                <Text style={styles.statLabel}>محتوای فعال</Text>
              </View>
              
              <View style={styles.statCard}>
                <Icon name="person" size={30} color="#e74c3c" />
                <Text style={styles.statNumber}>{stats.totalUsers}</Text>
                <Text style={styles.statLabel}>کاربران</Text>
              </View>
            </View>

            <View style={styles.quickActions}>
              <Text style={styles.sectionTitle}>عملیات سریع</Text>
              
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => showAddModalHandler('question')}
              >
                <Icon name="add-circle" size={24} color="#3498db" />
                <Text style={styles.actionButtonText}>افزودن سوال جدید</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => showAddModalHandler('content')}
              >
                <Icon name="add-circle" size={24} color="#27ae60" />
                <Text style={styles.actionButtonText}>افزودن محتوای جدید</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {activeTab === 'questions' && (
          <View style={styles.questionsContent}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>مدیریت سوالات</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => showAddModalHandler('question')}
              >
                <Icon name="add" size={20} color="#fff" />
                <Text style={styles.addButtonText}>افزودن</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.comingSoon}>این بخش به زودی آماده خواهد شد...</Text>
          </View>
        )}

        {activeTab === 'content' && (
          <View style={styles.contentManagement}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>مدیریت محتوا</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => showAddModalHandler('content')}
              >
                <Icon name="add" size={20} color="#fff" />
                <Text style={styles.addButtonText}>افزودن</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.comingSoon}>این بخش به زودی آماده خواهد شد...</Text>
          </View>
        )}
      </ScrollView>

      {/* مودال افزودن */}
      <Modal
        visible={showAddModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {modalType === 'question' ? 'افزودن سوال جدید' : 'افزودن محتوای جدید'}
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowAddModal(false)}
              >
                <Icon name="close" size={24} color="#7f8c8d" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <Text style={styles.comingSoon}>
                فرم افزودن {modalType === 'question' ? 'سوال' : 'محتوا'} به زودی آماده خواهد شد...
              </Text>
            </View>
          </View>
        </View>
      </Modal>

      {/* دکمه‌های ناوبری */}
      <NavigationButtons
        onPrevious={goToPreviousPage}
        onNext={goToNextPage}
        previousDisabled={false}
        nextDisabled={true}
        previousText="محاسبه نفس"
        nextText="خانه"
        showNext={false}
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
  headerTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoutButton: {
    padding: 8,
  },
  headerSpacer: {
    width: 40,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: width * 0.9,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 20,
    marginBottom: 10,
  },
  loginSubtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  loginButton: {
    backgroundColor: '#3498db',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  activeTab: {
    backgroundColor: '#3498db',
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#7f8c8d',
    marginLeft: 5,
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  dashboardContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    width: (width - 60) / 2,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 10,
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  quickActions: {
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginLeft: 10,
  },
  questionsContent: {
    flex: 1,
  },
  contentManagement: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#3498db',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  comingSoon: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 50,
    fontStyle: 'italic',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: width * 0.9,
    maxHeight: height * 0.7,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  closeButton: {
    padding: 5,
  },
  modalBody: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#95a5a6',
  },
  loginModalButton: {
    backgroundColor: '#3498db',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AdminPanelScreen;
