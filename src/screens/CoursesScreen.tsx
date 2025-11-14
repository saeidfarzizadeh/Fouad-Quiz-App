import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Course, getCourses, getCoursesByCategory } from '../data/courseData';
import NavigationButtons from '../components/NavigationButtons';

const { width } = Dimensions.get('window');

interface CoursesScreenProps {
  navigation: any;
  route: any;
}

const CoursesScreen: React.FC<CoursesScreenProps> = ({ navigation, route }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'quran' | 'mottahari' | 'general'>('all');
  const [courses] = useState<Course[]>(getCourses());

  // تعریف ترتیب صفحات برای ناوبری
  const pageOrder = ['Home', 'Quran', 'Courses', 'Quiz', 'Certificate', 'SoulCalculation', 'Motahari', 'MasterSafaei'];
  const currentPageIndex: number = 2; // CoursesScreen در ایندکس 2 است

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

  // فیلتر دوره‌ها بر اساس دسته‌بندی
  const filteredCourses = getCoursesByCategory(selectedCategory);

  // رندر کارت دوره
  const renderCourseCard = useCallback((course: Course) => (
    <TouchableOpacity
      key={course.id}
      style={styles.courseCard}
      onPress={() => {
        // در آینده می‌توان به صفحه جزئیات دوره رفت
        console.log('انتخاب دوره:', course.title);
      }}
    >
      <Image
        source={{ uri: course.thumbnail }}
        style={styles.courseThumbnail}
        resizeMode="cover"
      />
      
      <View style={styles.courseContent}>
        <View style={styles.courseHeader}>
          <Text style={styles.courseTitle} numberOfLines={2}>
            {course.title}
          </Text>
          <View style={styles.courseBadges}>
            <View style={[styles.badge, { backgroundColor: getCategoryColor(course.category) }]}>
              <Text style={styles.badgeText}>
                {course.category === 'quran' ? 'قرآن' : 
                 course.category === 'mottahari' ? 'مطهری' : 'عمومی'}
              </Text>
            </View>
            <View style={[styles.badge, { backgroundColor: getLevelColor(course.level) }]}>
              <Text style={styles.badgeText}>
                {course.level === 'beginner' ? 'مقدماتی' :
                 course.level === 'intermediate' ? 'متوسط' : 'پیشرفته'}
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.courseDescription} numberOfLines={3}>
          {course.description}
        </Text>

        <View style={styles.courseStats}>
          <View style={styles.statItem}>
            <Icon name="schedule" size={16} color="#7f8c8d" />
            <Text style={styles.statText}>{course.duration} دقیقه</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="video-library" size={16} color="#e74c3c" />
            <Text style={styles.statText}>{course.videos.length} ویدیو</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="book" size={16} color="#9b59b6" />
            <Text style={styles.statText}>{course.books.length} کتاب</Text>
          </View>
        </View>

        <View style={styles.courseActions}>
          <TouchableOpacity style={styles.startButton}>
            <Icon name="play-arrow" size={20} color="#fff" />
            <Text style={styles.startButtonText}>شروع یادگیری</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.infoButton}>
            <Icon name="info" size={20} color="#3498db" />
            <Text style={styles.infoButtonText}>جزئیات</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  ), []);

  // رنگ دسته‌بندی
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'quran': return '#27ae60';
      case 'mottahari': return '#8e44ad';
      case 'general': return '#3498db';
      default: return '#7f8c8d';
    }
  };

  // رنگ سطح
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return '#27ae60';
      case 'intermediate': return '#f39c12';
      case 'advanced': return '#e74c3c';
      default: return '#7f8c8d';
    }
  };

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
        
        <Text style={styles.headerTitle}>دوره‌های آموزشی</Text>
        
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* فیلتر دسته‌بندی */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filterButtons}>
            <TouchableOpacity
              style={[styles.filterButton, selectedCategory === 'all' && styles.activeFilterButton]}
              onPress={() => setSelectedCategory('all')}
            >
              <Text style={[styles.filterButtonText, selectedCategory === 'all' && styles.activeFilterButtonText]}>
                همه
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.filterButton, selectedCategory === 'quran' && styles.activeFilterButton]}
              onPress={() => setSelectedCategory('quran')}
            >
              <Text style={[styles.filterButtonText, selectedCategory === 'quran' && styles.activeFilterButtonText]}>
                قرآن
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.filterButton, selectedCategory === 'mottahari' && styles.activeFilterButton]}
              onPress={() => setSelectedCategory('mottahari')}
            >
              <Text style={[styles.filterButtonText, selectedCategory === 'mottahari' && styles.activeFilterButtonText]}>
                مطهری
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.filterButton, selectedCategory === 'general' && styles.activeFilterButton]}
              onPress={() => setSelectedCategory('general')}
            >
              <Text style={[styles.filterButtonText, selectedCategory === 'general' && styles.activeFilterButtonText]}>
                عمومی
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* لیست دوره‌ها */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.coursesContainer}>
          {filteredCourses.length === 0 ? (
            <View style={styles.emptyState}>
              <Icon name="school" size={60} color="#bdc3c7" />
              <Text style={styles.emptyStateText}>هیچ دوره‌ای یافت نشد</Text>
              <Text style={styles.emptyStateSubtext}>
                در این دسته‌بندی هنوز دوره‌ای اضافه نشده است
              </Text>
            </View>
          ) : (
            filteredCourses.map(renderCourseCard)
          )}
        </View>
      </ScrollView>

      {/* دکمه‌های ناوبری */}
            <NavigationButtons
                onPrevious={goToPreviousPage}
                onNext={goToNextPage}
                previousDisabled={currentPageIndex === 0}
                nextDisabled={currentPageIndex === pageOrder.length - 1}
                previousText="قرآن کریم"
                nextText="آزمون"
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
  searchButton: {
    padding: 8,
  },
  filterContainer: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  filterButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#ecf0f1',
  },
  activeFilterButton: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: 'bold',
  },
  activeFilterButtonText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  coursesContainer: {
    gap: 20,
  },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  courseThumbnail: {
    width: '100%',
    height: 200,
  },
  courseContent: {
    padding: 20,
  },
  courseHeader: {
    marginBottom: 15,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    lineHeight: 24,
  },
  courseBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  courseDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
    marginBottom: 15,
  },
  courseStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingVertical: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: '#7f8c8d',
    marginLeft: 5,
  },
  courseActions: {
    flexDirection: 'row',
    gap: 10,
  },
  startButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#27ae60',
    paddingVertical: 12,
    borderRadius: 10,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  infoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ebf3fd',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3498db',
  },
  infoButtonText: {
    color: '#3498db',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
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
});

export default CoursesScreen;
