import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  MotahariBook,
  BookChapter,
  getMotahariBooks,
  getBookById,
} from '../data/motahariData';
import NavigationButtons from '../components/NavigationButtons';

const { width, height } = Dimensions.get('window');

interface BookReaderScreenProps {
  navigation: any;
  route: any;
}

const BookReaderScreen: React.FC<BookReaderScreenProps> = ({ navigation, route }) => {
  const { bookId } = route.params;
  const [book, setBook] = useState<MotahariBook | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<BookChapter | null>(null);
  const [showChapterModal, setShowChapterModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);

  // تعریف ترتیب صفحات برای ناوبری
  const pageOrder = ['Home', 'Courses', 'Quiz', 'Certificate', 'SoulCalculation', 'Motahari', 'BookReader'];
  const currentPageIndex = 6; // BookReaderScreen در ایندکس 6 است

  // ناوبری به صفحه بعدی
  const goToNextPage = () => {
    const nextIndex = currentPageIndex + 1;
    if (nextIndex < pageOrder.length) {
      navigation.navigate(pageOrder[nextIndex]);
    }
  };

  // ناوبری به صفحه قبلی
  const goToPreviousPage = () => {
    navigation.goBack();
  };

  // بارگذاری کتاب
  useEffect(() => {
    const selectedBook = getBookById(bookId);
    if (selectedBook) {
      setBook(selectedBook);
      if (selectedBook.chapters.length > 0) {
        setSelectedChapter(selectedBook.chapters[0]);
      }
    }
  }, [bookId]);

  // نمایش فصل
  const showChapter = useCallback((chapter: BookChapter) => {
    setSelectedChapter(chapter);
    setShowChapterModal(true);
  }, []);

  // پخش صوتی
  const toggleAudio = useCallback(() => {
    if (!selectedChapter?.audioUrl) {
      Alert.alert('خطا', 'فایل صوتی برای این فصل موجود نیست!');
      return;
    }

    setIsPlaying(!isPlaying);
    setShowAudioPlayer(true);
    
    if (!isPlaying) {
      Alert.alert('پخش صوتی', 'فایل صوتی با صدای استاد مطهری شروع شد! 🎧');
    } else {
      Alert.alert('توقف', 'پخش صوتی متوقف شد!');
    }
  }, [isPlaying, selectedChapter]);

  // تبدیل ثانیه به فرمت زمان
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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

  if (!book) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>در حال بارگذاری...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* هدر */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle} numberOfLines={1}>{book.title}</Text>
        
        <TouchableOpacity
          style={styles.audioButton}
          onPress={() => setShowAudioPlayer(!showAudioPlayer)}
        >
          <Icon name="headset" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* اطلاعات کتاب */}
        <View style={styles.bookInfoCard}>
          <Image source={{ uri: book.coverImage }} style={styles.bookCover} />
          <View style={styles.bookDetails}>
            <Text style={styles.bookTitle}>{book.title}</Text>
            {book.subtitle && <Text style={styles.bookSubtitle}>{book.subtitle}</Text>}
            
            <View style={styles.bookMeta}>
              <View style={styles.ratingContainer}>
                {renderStars(book.rating)}
                <Text style={styles.ratingText}>({book.rating})</Text>
              </View>
              <Text style={styles.bookPages}>{book.pages} صفحه</Text>
              <Text style={styles.bookYear}>{book.year}</Text>
            </View>

            <Text style={styles.bookDescription}>{book.description}</Text>

            {/* دکمه پخش صوتی کلی کتاب */}
            {book.hasAudio && (
              <TouchableOpacity style={styles.playAllButton} onPress={toggleAudio}>
                <Icon name="play-circle-filled" size={30} color="#27ae60" />
                <Text style={styles.playAllText}>پخش کامل کتاب</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* فصول کتاب */}
        <View style={styles.chaptersSection}>
          <Text style={styles.sectionTitle}>فصول کتاب</Text>
          {book.chapters.map((chapter, index) => (
            <TouchableOpacity
              key={chapter.id}
              style={styles.chapterCard}
              onPress={() => showChapter(chapter)}
            >
              <View style={styles.chapterInfo}>
                <Text style={styles.chapterNumber}>فصل {index + 1}</Text>
                <Text style={styles.chapterTitle}>{chapter.title}</Text>
                <Text style={styles.chapterPage}>صفحه {chapter.pageNumber}</Text>
              </View>
              
              <View style={styles.chapterActions}>
                {chapter.audioUrl && (
                  <TouchableOpacity
                    style={styles.audioChapterButton}
                    onPress={() => {
                      setSelectedChapter(chapter);
                      toggleAudio();
                    }}
                  >
                    <Icon name="play-arrow" size={20} color="#27ae60" />
                  </TouchableOpacity>
                )}
                <Icon name="chevron-left" size={20} color="#7f8c8d" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* موضوعات کلیدی */}
        <View style={styles.topicsSection}>
          <Text style={styles.sectionTitle}>موضوعات کلیدی</Text>
          <View style={styles.topicsContainer}>
            {book.keyTopics.map((topic, index) => (
              <View key={index} style={styles.topicTag}>
                <Text style={styles.topicText}>{topic}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* نقل‌قول‌های مهم */}
        <View style={styles.quotesSection}>
          <Text style={styles.sectionTitle}>نقل‌قول‌های مهم</Text>
          {book.quotes.map((quote, index) => (
            <View key={index} style={styles.quoteCard}>
              <Icon name="format-quote" size={24} color="#3498db" />
              <Text style={styles.quoteText}>{quote}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* مودال فصل */}
      <Modal
        visible={showChapterModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowChapterModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedChapter?.title}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowChapterModal(false)}
              >
                <Icon name="close" size={24} color="#7f8c8d" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <Text style={styles.chapterContent}>{selectedChapter?.content}</Text>
              
              {selectedChapter?.audioUrl && (
                <TouchableOpacity style={styles.playChapterButton} onPress={toggleAudio}>
                  <Icon name="play-circle-filled" size={40} color="#27ae60" />
                  <Text style={styles.playChapterText}>پخش این فصل</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* پخش‌کننده صوتی */}
      {showAudioPlayer && (
        <View style={styles.audioPlayer}>
          <View style={styles.audioPlayerHeader}>
            <Text style={styles.audioPlayerTitle}>
              {isPlaying ? 'در حال پخش' : 'متوقف شده'}
            </Text>
            <TouchableOpacity
              style={styles.closeAudioButton}
              onPress={() => setShowAudioPlayer(false)}
            >
              <Icon name="close" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.audioPlayerBody}>
            <Text style={styles.audioPlayerBook}>{book.title}</Text>
            {selectedChapter && (
              <Text style={styles.audioPlayerChapter}>{selectedChapter.title}</Text>
            )}
            
            <View style={styles.progressContainer}>
              <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${(currentTime / duration) * 100}%` }]} />
              </View>
              <Text style={styles.timeText}>{formatTime(duration)}</Text>
            </View>
            
            <View style={styles.audioControls}>
              <TouchableOpacity style={styles.controlButton}>
                <Icon name="skip-previous" size={24} color="#fff" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.playButton} onPress={toggleAudio}>
                <Icon name={isPlaying ? 'pause' : 'play-arrow'} size={32} color="#fff" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.controlButton}>
                <Icon name="skip-next" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* دکمه‌های ناوبری */}
      <NavigationButtons
        onPrevious={goToPreviousPage}
        onNext={goToNextPage}
        previousDisabled={false}
        nextDisabled={true}
        previousText="استاد مطهری"
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#7f8c8d',
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
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  audioButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  bookInfoCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  bookCover: {
    width: 120,
    height: 150,
    borderRadius: 10,
    marginRight: 15,
  },
  bookDetails: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  bookSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  bookMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  ratingText: {
    fontSize: 12,
    color: '#7f8c8d',
    marginLeft: 5,
  },
  bookPages: {
    fontSize: 12,
    color: '#7f8c8d',
    marginRight: 15,
  },
  bookYear: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  bookDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 22,
    marginBottom: 15,
  },
  playAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  playAllText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27ae60',
    marginLeft: 10,
  },
  chaptersSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  chapterCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  chapterInfo: {
    flex: 1,
  },
  chapterNumber: {
    fontSize: 12,
    color: '#3498db',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  chapterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  chapterPage: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  chapterActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  audioChapterButton: {
    padding: 8,
    marginRight: 10,
  },
  topicsSection: {
    marginBottom: 20,
  },
  topicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  topicTag: {
    backgroundColor: '#3498db',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  topicText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  quotesSection: {
    marginBottom: 20,
  },
  quoteCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  quoteText: {
    fontSize: 14,
    color: '#2c3e50',
    lineHeight: 22,
    flex: 1,
    marginLeft: 10,
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
  chapterContent: {
    fontSize: 16,
    color: '#2c3e50',
    lineHeight: 26,
    textAlign: 'justify',
    marginBottom: 20,
  },
  playChapterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    paddingVertical: 15,
    borderRadius: 10,
  },
  playChapterText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27ae60',
    marginLeft: 10,
  },
  audioPlayer: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    backgroundColor: '#2c3e50',
    borderRadius: 15,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  audioPlayerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#34495e',
  },
  audioPlayerTitle: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  closeAudioButton: {
    padding: 5,
  },
  audioPlayerBody: {
    padding: 15,
  },
  audioPlayerBook: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  audioPlayerChapter: {
    fontSize: 14,
    color: '#bdc3c7',
    marginBottom: 15,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  timeText: {
    fontSize: 12,
    color: '#bdc3c7',
    width: 40,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#34495e',
    borderRadius: 2,
    marginHorizontal: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#27ae60',
    borderRadius: 2,
  },
  audioControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButton: {
    padding: 10,
    marginHorizontal: 20,
  },
  playButton: {
    backgroundColor: '#27ae60',
    borderRadius: 30,
    padding: 15,
    marginHorizontal: 20,
  },
});

export default BookReaderScreen;
