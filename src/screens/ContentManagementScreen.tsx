import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Dimensions,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Course, Video, Book, addCourse, getCourses, deleteCourse } from '../data/courseData';
import NavigationButtons from '../components/NavigationButtons';

const { width } = Dimensions.get('window');

interface ContentManagementScreenProps {
  navigation: any;
}

interface CourseForm {
  title: string;
  description: string;
  category: 'quran' | 'mottahari' | 'general';
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  thumbnail: string;
}

const ContentManagementScreen: React.FC<ContentManagementScreenProps> = ({ navigation }) => {
  const [courses, setCourses] = useState<Course[]>(getCourses());
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState<'courses' | 'videos' | 'books'>('courses');

  // تعریف ترتیب صفحات برای ناوبری (صفحه مدیریت خارج از ترتیب اصلی است)
  const pageOrder = ['Home', 'Courses', 'Quiz', 'Certificate'];
  const currentPageIndex = 0; // مدیریت محتوا به خانه برمی‌گردد

  // ناوبری به صفحه بعدی
  const goToNextPage = () => {
    navigation.navigate('Home');
  };

  // ناوبری به صفحه قبلی
  const goToPreviousPage = () => {
    navigation.navigate('Home');
  };

  const [formData, setFormData] = useState<CourseForm>({
    title: '',
    description: '',
    category: 'quran',
    level: 'beginner',
    duration: '',
    thumbnail: '',
  });

  // به‌روزرسانی فیلد فرم
  const updateFormField = useCallback((field: keyof CourseForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  // اعتبارسنجی فرم
  const validateForm = useCallback(() => {
    if (!formData.title.trim()) {
      Alert.alert('خطا', 'عنوان دوره الزامی است');
      return false;
    }
    if (!formData.description.trim()) {
      Alert.alert('خطا', 'توضیحات دوره الزامی است');
      return false;
    }
    if (!formData.duration.trim() || isNaN(Number(formData.duration))) {
      Alert.alert('خطا', 'مدت زمان دوره باید عدد باشد');
      return false;
    }
    return true;
  }, [formData]);

  // افزودن دوره جدید
  const handleAddCourse = useCallback(async () => {
    if (!validateForm()) return;

    Alert.alert(
      'تأیید افزودن',
      'آیا می‌خواهید این دوره جدید را اضافه کنید؟',
      [
        {
          text: 'تأیید',
          onPress: () => {
            try {
              const newCourse = addCourse({
                title: formData.title,
                description: formData.description,
                category: formData.category,
                level: formData.level,
                duration: Number(formData.duration),
                thumbnail: formData.thumbnail || 'https://via.placeholder.com/300x200/3498db/ffffff?text=دوره+جدید',
                videos: [],
                books: [],
              });

              setCourses(getCourses());
              setShowAddModal(false);
              
              // پاک کردن فرم
              setFormData({
                title: '',
                description: '',
                category: 'quran',
                level: 'beginner',
                duration: '',
                thumbnail: '',
              });

              Alert.alert('موفقیت', 'دوره جدید با موفقیت اضافه شد!');
            } catch (error) {
              console.error('خطا در افزودن دوره:', error);
              Alert.alert('خطا', 'خطا در افزودن دوره. لطفاً دوباره تلاش کنید.');
            }
          }
        },
        {
          text: 'انصراف',
          style: 'cancel'
        }
      ]
    );
  }, [validateForm, formData]);

  // حذف دوره
  const handleDeleteCourse = useCallback((courseId: number) => {
    Alert.alert(
      'تأیید حذف',
      'آیا مطمئن هستید که می‌خواهید این دوره را حذف کنید؟',
      [
        {
          text: 'حذف',
          style: 'destructive',
          onPress: () => {
            const success = deleteCourse(courseId);
            if (success) {
              setCourses(getCourses());
              Alert.alert('موفقیت', 'دوره با موفقیت حذف شد!');
            } else {
              Alert.alert('خطا', 'خطا در حذف دوره.');
            }
          }
        },
        {
          text: 'انصراف',
          style: 'cancel'
        }
      ]
    );
  }, []);

  // ویرایش دوره
  const handleEditCourse = useCallback((course: Course) => {
    setSelectedCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      category: course.category,
      level: course.level,
      duration: course.duration.toString(),
      thumbnail: course.thumbnail,
    });
    setShowEditModal(true);
  }, []);

  // رندر کارت دوره
  const renderCourseCard = useCallback((course: Course) => (
    <View key={course.id} style={styles.courseCard}>
      <View style={styles.courseHeader}>
        <View style={styles.courseInfo}>
          <Text style={styles.courseTitle}>{course.title}</Text>
          <Text style={styles.courseCategory}>
            {course.category === 'quran' ? 'قرآن' : 
             course.category === 'mottahari' ? 'مطهری' : 'عمومی'}
          </Text>
          <Text style={styles.courseLevel}>
            سطح: {course.level === 'beginner' ? 'مقدماتی' :
                   course.level === 'intermediate' ? 'متوسط' : 'پیشرفته'}
          </Text>
        </View>
        <View style={styles.courseStats}>
          <Text style={styles.durationText}>{course.duration} دقیقه</Text>
          <Text style={styles.videosCount}>{course.videos.length} ویدیو</Text>
          <Text style={styles.booksCount}>{course.books.length} کتاب</Text>
        </View>
      </View>
      
      <Text style={styles.courseDescription} numberOfLines={2}>
        {course.description}
      </Text>

      <View style={styles.courseActions}>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => handleEditCourse(course)}
        >
          <Icon name="edit" size={16} color="#3498db" />
          <Text style={styles.editButtonText}>ویرایش</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => handleDeleteCourse(course.id)}
        >
          <Icon name="delete" size={16} color="#e74c3c" />
          <Text style={styles.deleteButtonText}>حذف</Text>
        </TouchableOpacity>
      </View>
    </View>
  ), [handleEditCourse, handleDeleteCourse]);

  // رندر فرم افزودن/ویرایش
  const renderFormModal = useCallback((isEdit: boolean = false) => (
    <Modal
      visible={isEdit ? showEditModal : showAddModal}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => {
              setShowAddModal(false);
              setShowEditModal(false);
            }}
          >
            <Icon name="close" size={24} color="#e74c3c" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>
            {isEdit ? 'ویرایش دوره' : 'افزودن دوره جدید'}
          </Text>
          <TouchableOpacity
            style={styles.modalSaveButton}
            onPress={handleAddCourse}
          >
            <Text style={styles.modalSaveText}>ذخیره</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
          {/* عنوان دوره */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>عنوان دوره *</Text>
            <TextInput
              style={styles.textInput}
              value={formData.title}
              onChangeText={(text) => updateFormField('title', text)}
              placeholder="عنوان دوره را وارد کنید"
              multiline
            />
          </View>

          {/* توضیحات */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>توضیحات دوره *</Text>
            <TextInput
              style={[styles.textInput, styles.multilineInput]}
              value={formData.description}
              onChangeText={(text) => updateFormField('description', text)}
              placeholder="توضیحات دوره را وارد کنید"
              multiline
              numberOfLines={4}
            />
          </View>

          {/* دسته‌بندی */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>دسته‌بندی</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.category}
                onValueChange={(value) => updateFormField('category', value)}
                style={styles.picker}
              >
                <Picker.Item label="قرآن" value="quran" />
                <Picker.Item label="مطهری" value="mottahari" />
                <Picker.Item label="عمومی" value="general" />
              </Picker>
            </View>
          </View>

          {/* سطح */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>سطح</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.level}
                onValueChange={(value) => updateFormField('level', value)}
                style={styles.picker}
              >
                <Picker.Item label="مقدماتی" value="beginner" />
                <Picker.Item label="متوسط" value="intermediate" />
                <Picker.Item label="پیشرفته" value="advanced" />
              </Picker>
            </View>
          </View>

          {/* مدت زمان */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>مدت زمان (دقیقه) *</Text>
            <TextInput
              style={styles.textInput}
              value={formData.duration}
              onChangeText={(text) => updateFormField('duration', text)}
              placeholder="مدت زمان دوره به دقیقه"
              keyboardType="numeric"
            />
          </View>

          {/* تصویر شاخص */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>آدرس تصویر شاخص</Text>
            <TextInput
              style={styles.textInput}
              value={formData.thumbnail}
              onChangeText={(text) => updateFormField('thumbnail', text)}
              placeholder="آدرس URL تصویر شاخص"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  ), [showAddModal, showEditModal, formData, updateFormField, handleAddCourse]);

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
        
        <Text style={styles.headerTitle}>مدیریت محتوا</Text>
        
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <Icon name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* تب‌های مدیریت */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'courses' && styles.activeTab]}
          onPress={() => setActiveTab('courses')}
        >
          <Icon name="school" size={20} color={activeTab === 'courses' ? '#fff' : '#7f8c8d'} />
          <Text style={[styles.tabText, activeTab === 'courses' && styles.activeTabText]}>
            دوره‌ها
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'videos' && styles.activeTab]}
          onPress={() => setActiveTab('videos')}
        >
          <Icon name="video-library" size={20} color={activeTab === 'videos' ? '#fff' : '#7f8c8d'} />
          <Text style={[styles.tabText, activeTab === 'videos' && styles.activeTabText]}>
            ویدیوها
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'books' && styles.activeTab]}
          onPress={() => setActiveTab('books')}
        >
          <Icon name="book" size={20} color={activeTab === 'books' ? '#fff' : '#7f8c8d'} />
          <Text style={[styles.tabText, activeTab === 'books' && styles.activeTabText]}>
            کتاب‌ها
          </Text>
        </TouchableOpacity>
      </View>

      {/* محتوای اصلی */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'courses' && (
          <View style={styles.coursesContainer}>
            {courses.length === 0 ? (
              <View style={styles.emptyState}>
                <Icon name="school" size={60} color="#bdc3c7" />
                <Text style={styles.emptyStateText}>هیچ دوره‌ای وجود ندارد</Text>
                <Text style={styles.emptyStateSubtext}>
                  برای شروع، اولین دوره خود را اضافه کنید
                </Text>
              </View>
            ) : (
              courses.map(renderCourseCard)
            )}
          </View>
        )}

        {activeTab === 'videos' && (
          <View style={styles.emptyState}>
            <Icon name="video-library" size={60} color="#bdc3c7" />
            <Text style={styles.emptyStateText}>مدیریت ویدیوها</Text>
            <Text style={styles.emptyStateSubtext}>
              این بخش به زودی اضافه خواهد شد
            </Text>
          </View>
        )}

        {activeTab === 'books' && (
          <View style={styles.emptyState}>
            <Icon name="book" size={60} color="#bdc3c7" />
            <Text style={styles.emptyStateText}>مدیریت کتاب‌ها</Text>
            <Text style={styles.emptyStateSubtext}>
              این بخش به زودی اضافه خواهد شد
            </Text>
          </View>
        )}
      </ScrollView>

      {/* مودال‌ها */}
      {renderFormModal(false)}
      {renderFormModal(true)}

      {/* دکمه‌های ناوبری کلی */}
      <NavigationButtons
        onPrevious={goToPreviousPage}
        onNext={goToNextPage}
        previousText="خانه"
        nextText="خانه"
        showNext={false} // فقط دکمه خانه نمایش داده می‌شود
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
  addButton: {
    padding: 8,
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
    color: '#7f8c8d',
    marginLeft: 8,
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  coursesContainer: {
    gap: 15,
  },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  courseCategory: {
    fontSize: 14,
    color: '#3498db',
    marginBottom: 3,
  },
  courseLevel: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  courseStats: {
    alignItems: 'flex-end',
  },
  durationText: {
    fontSize: 14,
    color: '#27ae60',
    fontWeight: 'bold',
    marginBottom: 3,
  },
  videosCount: {
    fontSize: 12,
    color: '#e74c3c',
    marginBottom: 3,
  },
  booksCount: {
    fontSize: 12,
    color: '#9b59b6',
  },
  courseDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
    marginBottom: 15,
  },
  courseActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ebf3fd',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  editButtonText: {
    fontSize: 14,
    color: '#3498db',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fdf2f2',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  deleteButtonText: {
    fontSize: 14,
    color: '#e74c3c',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#7f8c8d',
    marginTop: 15,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#bdc3c7',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#2c3e50',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalCloseButton: {
    padding: 8,
  },
  modalTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalSaveButton: {
    padding: 8,
  },
  modalSaveText: {
    color: '#27ae60',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'right',
  },
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#2c3e50',
    textAlign: 'right',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  picker: {
    height: 50,
  },
});

export default ContentManagementScreen;
