import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  Modal,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  MotahariBook,
  MotahariBiography,
  motahariBiography,
  getMotahariBooks,
  getMotahariBooksByCategory,
  getRecommendedBooks,
  getBookById,
  getTopRatedBooks,
  searchBooks,
} from '../data/motahariData';
import NavigationButtons from '../components/NavigationButtons';

const { width, height } = Dimensions.get('window');

interface MotahariScreenProps {
  navigation: any;
}

const MotahariScreen: React.FC<MotahariScreenProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<'biography' | 'books' | 'recommended'>('biography');
  const [selectedBook, setSelectedBook] = useState<MotahariBook | null>(null);
  const [showBookModal, setShowBookModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState<MotahariBook[]>(getMotahariBooks());

  // تعریف ترتیب صفحات برای ناوبری
  const pageOrder = ['Home', 'Courses', 'Quiz', 'Certificate', 'SoulCalculation', 'Motahari'];
  const currentPageIndex = 5; // MotahariScreen در ایندکس 5 است

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

  // نمایش جزئیات کتاب
  const showBookDetails = useCallback((book: MotahariBook) => {
    setSelectedBook(book);
    setShowBookModal(true);
  }, []);

  // ورود به کتابخوان
  const openBookReader = useCallback((book: MotahariBook) => {
    navigation.navigate('BookReader', { bookId: book.id });
  }, [navigation]);

  // جستجو در کتاب‌ها
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredBooks(getMotahariBooks());
    } else {
      setFilteredBooks(searchBooks(query));
    }
  }, []);

  // فیلتر کتاب‌ها بر اساس دسته‌بندی
  const filterBooksByCategory = useCallback((category: string) => {
    if (category === 'all') {
      setFilteredBooks(getMotahariBooks());
    } else {
      setFilteredBooks(getMotahariBooksByCategory(category));
    }
  }, []);

  // رندر ستاره‌های امتیاز
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name={index < rating ? 'star' : 'star-border'}
        size={16}
        color="#f39c12"
      />
    ));
  };

  // رندر کارت کتاب
  const renderBookCard = (book: MotahariBook) => (
    <TouchableOpacity
      key={book.id}
      style={styles.bookCard}
      onPress={() => showBookDetails(book)}
    >
      <Image source={{ uri: book.coverImage }} style={styles.bookCover} />
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{book.title}</Text>
        {book.subtitle && <Text style={styles.bookSubtitle}>{book.subtitle}</Text>}
        <Text style={styles.bookDescription} numberOfLines={3}>
          {book.description}
        </Text>
        <View style={styles.bookMeta}>
          <View style={styles.ratingContainer}>
            {renderStars(book.rating)}
            <Text style={styles.ratingText}>({book.rating})</Text>
          </View>
          <Text style={styles.bookPages}>{book.pages} صفحه</Text>
        </View>
        <View style={styles.bookTags}>
          <View style={[styles.tag, { backgroundColor: getCategoryColor(book.category) }]}>
            <Text style={styles.tagText}>{getCategoryName(book.category)}</Text>
          </View>
          <View style={[styles.tag, { backgroundColor: getDifficultyColor(book.difficulty) }]}>
            <Text style={styles.tagText}>{getDifficultyName(book.difficulty)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  // رنگ دسته‌بندی
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      philosophy: '#8e44ad',
      theology: '#3498db',
      ethics: '#27ae60',
      history: '#e74c3c',
      society: '#f39c12',
      education: '#1abc9c',
    };
    return colors[category] || '#95a5a6';
  };

  // نام دسته‌بندی
  const getCategoryName = (category: string) => {
    const names: { [key: string]: string } = {
      philosophy: 'فلسفه',
      theology: 'کلام',
      ethics: 'اخلاق',
      history: 'تاریخ',
      society: 'اجتماعی',
      education: 'آموزشی',
    };
    return names[category] || category;
  };

  // رنگ سطح دشواری
  const getDifficultyColor = (difficulty: string) => {
    const colors: { [key: string]: string } = {
      beginner: '#27ae60',
      intermediate: '#f39c12',
      advanced: '#e74c3c',
    };
    return colors[difficulty] || '#95a5a6';
  };

  // نام سطح دشواری
  const getDifficultyName = (difficulty: string) => {
    const names: { [key: string]: string } = {
      beginner: 'مبتدی',
      intermediate: 'متوسط',
      advanced: 'پیشرفته',
    };
    return names[difficulty] || difficulty;
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
        
        <Text style={styles.headerTitle}>استاد مطهری</Text>
        
        <View style={styles.headerSpacer} />
      </View>

      {/* تب‌های ناوبری */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'biography' && styles.activeTab]}
          onPress={() => setActiveTab('biography')}
        >
          <Icon name="person" size={20} color={activeTab === 'biography' ? '#fff' : '#7f8c8d'} />
          <Text style={[styles.tabText, activeTab === 'biography' && styles.activeTabText]}>
            زندگینامه
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'books' && styles.activeTab]}
          onPress={() => setActiveTab('books')}
        >
          <Icon name="library-books" size={20} color={activeTab === 'books' ? '#fff' : '#7f8c8d'} />
          <Text style={[styles.tabText, activeTab === 'books' && styles.activeTabText]}>
            کتاب‌ها
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'recommended' && styles.activeTab]}
          onPress={() => setActiveTab('recommended')}
        >
          <Icon name="star" size={20} color={activeTab === 'recommended' ? '#fff' : '#7f8c8d'} />
          <Text style={[styles.tabText, activeTab === 'recommended' && styles.activeTabText]}>
            پیشنهادی
          </Text>
        </TouchableOpacity>
      </View>

      {/* محتوای تب‌ها */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'biography' && (
          <View style={styles.biographyContent}>
            {/* تصویر و اطلاعات کلی */}
            <View style={styles.biographyHeader}>
              <Image source={{ uri: motahariBiography.image }} style={styles.biographyImage} />
              <View style={styles.biographyInfo}>
                <Text style={styles.biographyName}>{motahariBiography.fullName}</Text>
                <Text style={styles.biographyDates}>
                  {motahariBiography.birthDate} - {motahariBiography.deathDate}
                </Text>
                <Text style={styles.biographyPlace}>متولد {motahariBiography.birthPlace}</Text>
              </View>
            </View>

            {/* تحصیلات */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>تحصیلات</Text>
              {motahariBiography.education.map((edu, index) => (
                <View key={index} style={styles.listItem}>
                  <Icon name="school" size={16} color="#3498db" />
                  <Text style={styles.listText}>{edu}</Text>
                </View>
              ))}
            </View>

            {/* دستاوردها */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>دستاوردها</Text>
              {motahariBiography.achievements.map((achievement, index) => (
                <View key={index} style={styles.listItem}>
                  <Icon name="check-circle" size={16} color="#27ae60" />
                  <Text style={styles.listText}>{achievement}</Text>
                </View>
              ))}
            </View>

            {/* فلسفه */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>فلسفه و اندیشه</Text>
              <Text style={styles.sectionText}>{motahariBiography.philosophy}</Text>
            </View>

            {/* میراث */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>میراث و تأثیر</Text>
              <Text style={styles.sectionText}>{motahariBiography.legacy}</Text>
            </View>
          </View>
        )}

        {activeTab === 'books' && (
          <View style={styles.booksContent}>
            {/* جستجو */}
            <View style={styles.searchContainer}>
              <Icon name="search" size={20} color="#7f8c8d" />
              <TextInput
                style={styles.searchInput}
                placeholder="جستجو در کتاب‌ها..."
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </View>

            {/* فیلتر دسته‌بندی */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
              <TouchableOpacity
                style={[styles.filterButton, { backgroundColor: '#3498db' }]}
                onPress={() => filterBooksByCategory('all')}
              >
                <Text style={styles.filterButtonText}>همه</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterButton, { backgroundColor: '#8e44ad' }]}
                onPress={() => filterBooksByCategory('philosophy')}
              >
                <Text style={styles.filterButtonText}>فلسفه</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterButton, { backgroundColor: '#3498db' }]}
                onPress={() => filterBooksByCategory('theology')}
              >
                <Text style={styles.filterButtonText}>کلام</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterButton, { backgroundColor: '#27ae60' }]}
                onPress={() => filterBooksByCategory('ethics')}
              >
                <Text style={styles.filterButtonText}>اخلاق</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterButton, { backgroundColor: '#e74c3c' }]}
                onPress={() => filterBooksByCategory('history')}
              >
                <Text style={styles.filterButtonText}>تاریخ</Text>
              </TouchableOpacity>
            </ScrollView>

            {/* لیست کتاب‌ها */}
            <View style={styles.booksList}>
              {filteredBooks.map(renderBookCard)}
            </View>
          </View>
        )}

        {activeTab === 'recommended' && (
          <View style={styles.recommendedContent}>
            <Text style={styles.sectionTitle}>کتاب‌های پیشنهادی</Text>
            <Text style={styles.sectionSubtitle}>
              بهترین کتاب‌های استاد مطهری برای شروع مطالعه
            </Text>
            
            <View style={styles.booksList}>
              {getRecommendedBooks().map(renderBookCard)}
            </View>
          </View>
        )}
      </ScrollView>

      {/* مودال جزئیات کتاب */}
      <Modal
        visible={showBookModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowBookModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedBook && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedBook.title}</Text>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setShowBookModal(false)}
                  >
                    <Icon name="close" size={24} color="#7f8c8d" />
                  </TouchableOpacity>
                </View>

                <ScrollView style={styles.modalBody}>
                  <Image source={{ uri: selectedBook.coverImage }} style={styles.modalBookCover} />
                  
                  {selectedBook.subtitle && (
                    <Text style={styles.modalSubtitle}>{selectedBook.subtitle}</Text>
                  )}
                  
                  <Text style={styles.modalDescription}>{selectedBook.description}</Text>
                  
                  <Text style={styles.modalSummaryTitle}>خلاصه کتاب:</Text>
                  <Text style={styles.modalSummary}>{selectedBook.summary}</Text>
                  
                  <View style={styles.modalMeta}>
                    <View style={styles.metaItem}>
                      <Icon name="pages" size={16} color="#7f8c8d" />
                      <Text style={styles.metaText}>{selectedBook.pages} صفحه</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Icon name="schedule" size={16} color="#7f8c8d" />
                      <Text style={styles.metaText}>{selectedBook.readingTime} دقیقه</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Icon name="star" size={16} color="#f39c12" />
                      <Text style={styles.metaText}>{selectedBook.rating}/5</Text>
                    </View>
                  </View>

                  <Text style={styles.modalTopicsTitle}>موضوعات کلیدی:</Text>
                  <View style={styles.topicsContainer}>
                    {selectedBook.keyTopics.map((topic, index) => (
                      <View key={index} style={styles.topicTag}>
                        <Text style={styles.topicText}>{topic}</Text>
                      </View>
                    ))}
                  </View>

                  <Text style={styles.modalQuotesTitle}>نقل‌قول‌های مهم:</Text>
                  {selectedBook.quotes.map((quote, index) => (
                    <View key={index} style={styles.quoteContainer}>
                      <Icon name="format-quote" size={20} color="#3498db" />
                      <Text style={styles.quoteText}>{quote}</Text>
                    </View>
                  ))}

                  {/* دکمه ورود به کتابخوان */}
                  <TouchableOpacity
                    style={styles.readBookButton}
                    onPress={() => {
                      setShowBookModal(false);
                      openBookReader(selectedBook);
                    }}
                  >
                    <Icon name="book-open" size={24} color="#fff" />
                    <Text style={styles.readBookButtonText}>خواندن کتاب</Text>
                  </TouchableOpacity>
                </ScrollView>
              </>
            )}
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
  headerSpacer: {
    width: 40,
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
  biographyContent: {
    flex: 1,
  },
  biographyHeader: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  biographyImage: {
    width: 100,
    height: 120,
    borderRadius: 10,
    marginRight: 15,
  },
  biographyInfo: {
    flex: 1,
  },
  biographyName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  biographyDates: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  biographyPlace: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionText: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 22,
    textAlign: 'justify',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  listText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginLeft: 10,
    flex: 1,
  },
  booksContent: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: '#2c3e50',
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  booksList: {
    flex: 1,
  },
  bookCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  bookCover: {
    width: 80,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  bookSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  bookDescription: {
    fontSize: 12,
    color: '#7f8c8d',
    lineHeight: 18,
    marginBottom: 10,
  },
  bookMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#7f8c8d',
    marginLeft: 5,
  },
  bookPages: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  bookTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 5,
  },
  tagText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  recommendedContent: {
    flex: 1,
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
    width: width * 0.95,
    maxHeight: height * 0.9,
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
    flex: 1,
  },
  closeButton: {
    padding: 5,
  },
  modalBody: {
    flex: 1,
  },
  modalBookCover: {
    width: 120,
    height: 150,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 15,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    color: '#2c3e50',
    lineHeight: 22,
    marginBottom: 15,
    textAlign: 'justify',
  },
  modalSummaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  modalSummary: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 22,
    marginBottom: 15,
    textAlign: 'justify',
  },
  modalMeta: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#7f8c8d',
    marginLeft: 5,
  },
  modalTopicsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  topicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  topicTag: {
    backgroundColor: '#3498db',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  topicText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalQuotesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  quoteContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
  },
  quoteText: {
    fontSize: 14,
    color: '#2c3e50',
    lineHeight: 22,
    flex: 1,
    marginLeft: 10,
    fontStyle: 'italic',
  },
  readBookButton: {
    backgroundColor: '#27ae60',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  readBookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default MotahariScreen;
