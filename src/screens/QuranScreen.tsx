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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { quranSurahs, quranReciters, haeriTafsir } from '../data/quranData';
import NavigationButtons from '../components/NavigationButtons';

const { width, height } = Dimensions.get('window');

interface QuranScreenProps {
  navigation: any;
}

const QuranScreen: React.FC<QuranScreenProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<'surahs' | 'reciters' | 'tafsir'>('surahs');
  const [selectedSurah, setSelectedSurah] = useState<any>(null);
  const [selectedReciter, setSelectedReciter] = useState<any>(null);
  const [showSurahModal, setShowSurahModal] = useState(false);
  const [showReciterModal, setShowReciterModal] = useState(false);
  const [showTafsirModal, setShowTafsirModal] = useState(false);
  const [selectedTafsir, setSelectedTafsir] = useState<any>(null);

  // تعریف ترتیب صفحات برای ناوبری
  const pageOrder = ['Home', 'Quran', 'Courses', 'Quiz', 'Certificate', 'SoulCalculation', 'Motahari', 'MasterSafaei'];
  const currentPageIndex = 1; // QuranScreen در ایندکس 1 است

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

  // نمایش جزئیات سوره
  const showSurahDetails = useCallback((surah: any) => {
    setSelectedSurah(surah);
    setShowSurahModal(true);
  }, []);

  // نمایش جزئیات قاری
  const showReciterDetails = useCallback((reciter: any) => {
    setSelectedReciter(reciter);
    setShowReciterModal(true);
  }, []);

  // نمایش تفسیر
  const showTafsir = useCallback((surahName: string) => {
    const tafsir = haeriTafsir[surahName as keyof typeof haeriTafsir];
    if (tafsir) {
      setSelectedTafsir(tafsir);
      setShowTafsirModal(true);
    }
  }, []);

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
        
        <Text style={styles.headerTitle}>قرآن کریم</Text>
        
        <View style={styles.headerSpacer} />
      </View>

      {/* تب‌های ناوبری */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'surahs' && styles.activeTab]}
          onPress={() => setActiveTab('surahs')}
        >
          <Icon name="book" size={20} color={activeTab === 'surahs' ? '#fff' : '#6B8E23'} />
          <Text style={[styles.tabText, activeTab === 'surahs' && styles.activeTabText]}>
            سوره‌ها
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'reciters' && styles.activeTab]}
          onPress={() => setActiveTab('reciters')}
        >
          <Icon name="mic" size={20} color={activeTab === 'reciters' ? '#fff' : '#6B8E23'} />
          <Text style={[styles.tabText, activeTab === 'reciters' && styles.activeTabText]}>
            قاریان
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'tafsir' && styles.activeTab]}
          onPress={() => setActiveTab('tafsir')}
        >
          <Icon name="school" size={20} color={activeTab === 'tafsir' ? '#fff' : '#6B8E23'} />
          <Text style={[styles.tabText, activeTab === 'tafsir' && styles.activeTabText]}>
            تفسیر
          </Text>
        </TouchableOpacity>
      </View>

      {/* محتوای تب‌ها */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'surahs' && (
          <View style={styles.surahsContent}>
            <Text style={styles.sectionTitle}>سوره‌های قرآن کریم</Text>
            
            {quranSurahs.map((surah, index) => (
              <TouchableOpacity
                key={surah.id}
                style={styles.surahCard}
                onPress={() => showSurahDetails(surah)}
              >
                <View style={styles.surahHeader}>
                  <View style={styles.surahNumber}>
                    <Text style={styles.surahNumberText}>{surah.id}</Text>
                  </View>
                  <View style={styles.surahInfo}>
                    <Text style={styles.surahName}>{surah.name}</Text>
                    <Text style={styles.surahArabicName}>{surah.arabicName}</Text>
                    <Text style={styles.surahDetails}>
                      {surah.verses} آیه • {surah.revelationPlace === 'makkah' ? 'مکی' : 'مدنی'}
                    </Text>
                  </View>
                  <View style={styles.surahActions}>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => showSurahDetails(surah)}
                    >
                      <Icon name="play-arrow" size={24} color="#2E7D32" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => showTafsir(surah.name.toLowerCase())}
                    >
                      <Icon name="book-open" size={24} color="#8B4513" />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={styles.surahDescription}>{surah.description}</Text>
                <View style={styles.surahTopics}>
                  {surah.keyTopics.map((topic, topicIndex) => (
                    <View key={topicIndex} style={styles.topicTag}>
                      <Text style={styles.topicText}>{topic}</Text>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {activeTab === 'reciters' && (
          <View style={styles.recitersContent}>
            <Text style={styles.sectionTitle}>قاریان قرآن کریم</Text>
            
            {quranReciters.map((reciter, index) => (
              <TouchableOpacity
                key={reciter.id}
                style={styles.reciterCard}
                onPress={() => showReciterDetails(reciter)}
              >
                <Image source={{ uri: reciter.image }} style={styles.reciterImage} />
                <View style={styles.reciterInfo}>
                  <Text style={styles.reciterName}>{reciter.name}</Text>
                  <Text style={styles.reciterArabicName}>{reciter.arabicName}</Text>
                  <Text style={styles.reciterDescription}>{reciter.description}</Text>
                  <View style={styles.reciterStyle}>
                    <Text style={styles.styleText}>
                      سبک: {reciter.style === 'traditional' ? 'سنتی' : 
                            reciter.style === 'modern' ? 'مدرن' : 'ملودی‌دار'}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.playButton}
                  onPress={() => showReciterDetails(reciter)}
                >
                  <Icon name="play-arrow" size={30} color="#fff" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {activeTab === 'tafsir' && (
          <View style={styles.tafsirContent}>
            <Text style={styles.sectionTitle}>تفسیر استاد علی صفایی حائری</Text>
            
            <View style={styles.tafsirIntro}>
              <Icon name="school" size={40} color="#8B4513" />
              <Text style={styles.tafsirIntroTitle}>تفسیر قرآن بر اساس اندیشه استاد حائری</Text>
              <Text style={styles.tafsirIntroText}>
                استاد علی صفایی حائری در تفسیر قرآن روش خاصی داشت که بر اساس تدبر و تفکر عمیق در آیات استوار بود.
                تفسیر ایشان بر اساس نظام فکری منسجم و دین‌شناسی واقعی ارائه شده است.
              </Text>
            </View>

            <View style={styles.availableTafsir}>
              <Text style={styles.availableTafsirTitle}>تفسیرهای موجود:</Text>
              
              <TouchableOpacity
                style={styles.tafsirItem}
                onPress={() => showTafsir('fatiha')}
              >
                <Icon name="book-open" size={24} color="#2E7D32" />
                <View style={styles.tafsirItemInfo}>
                  <Text style={styles.tafsirItemTitle}>تفسیر سوره فاتحه</Text>
                  <Text style={styles.tafsirItemAuthor}>استاد علی صفایی حائری</Text>
                </View>
                <Icon name="chevron-left" size={20} color="#6B8E23" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.tafsirItem}
                onPress={() => showTafsir('baqarah')}
              >
                <Icon name="book-open" size={24} color="#2E7D32" />
                <View style={styles.tafsirItemInfo}>
                  <Text style={styles.tafsirItemTitle}>تفسیر سوره بقره</Text>
                  <Text style={styles.tafsirItemAuthor}>استاد علی صفایی حائری</Text>
                </View>
                <Icon name="chevron-left" size={20} color="#6B8E23" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {/* مودال جزئیات سوره */}
      <Modal
        visible={showSurahModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowSurahModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedSurah?.name}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowSurahModal(false)}
              >
                <Icon name="close" size={24} color="#6B8E23" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <Text style={styles.modalSubtitle}>{selectedSurah?.arabicName}</Text>
              <Text style={styles.modalDetails}>
                {selectedSurah?.verses} آیه • {selectedSurah?.revelationPlace === 'makkah' ? 'مکی' : 'مدنی'}
              </Text>
              <Text style={styles.modalDescription}>{selectedSurah?.description}</Text>
              
              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.modalActionButton}>
                  <Icon name="play-arrow" size={20} color="#fff" />
                  <Text style={styles.modalActionText}>پخش قرآن</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.modalActionButton, styles.tafsirButton]}
                  onPress={() => {
                    setShowSurahModal(false);
                    showTafsir(selectedSurah?.name.toLowerCase());
                  }}
                >
                  <Icon name="book-open" size={20} color="#fff" />
                  <Text style={styles.modalActionText}>تفسیر</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* مودال جزئیات قاری */}
      <Modal
        visible={showReciterModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowReciterModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedReciter?.name}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowReciterModal(false)}
              >
                <Icon name="close" size={24} color="#6B8E23" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <Image source={{ uri: selectedReciter?.image }} style={styles.modalReciterImage} />
              <Text style={styles.modalSubtitle}>{selectedReciter?.arabicName}</Text>
              <Text style={styles.modalDescription}>{selectedReciter?.description}</Text>
              
              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.modalActionButton}>
                  <Icon name="play-arrow" size={20} color="#fff" />
                  <Text style={styles.modalActionText}>پخش نمونه</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* مودال تفسیر */}
      <Modal
        visible={showTafsirModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowTafsirModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedTafsir?.title}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowTafsirModal(false)}
              >
                <Icon name="close" size={24} color="#6B8E23" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <Text style={styles.modalSubtitle}>{selectedTafsir?.author}</Text>
              <Text style={styles.tafsirContent}>{selectedTafsir?.content}</Text>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* دکمه‌های ناوبری */}
      <NavigationButtons
        onPrevious={goToPreviousPage}
        onNext={goToNextPage}
        previousDisabled={false}
        nextDisabled={false}
        previousText="خانه"
        nextText="دوره‌ها"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
  },
  header: {
    backgroundColor: '#2E7D32',
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
    backgroundColor: '#2E7D32',
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6B8E23',
    marginLeft: 5,
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 20,
    textAlign: 'center',
  },
  surahsContent: {
    flex: 1,
  },
  surahCard: {
    backgroundColor: '#FFF8DC',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#8B4513',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  surahHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  surahNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  surahNumberText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  surahInfo: {
    flex: 1,
  },
  surahName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 5,
  },
  surahArabicName: {
    fontSize: 16,
    color: '#2E7D32',
    marginBottom: 5,
    textAlign: 'right',
  },
  surahDetails: {
    fontSize: 14,
    color: '#6B8E23',
  },
  surahActions: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#C8E6C9',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  surahDescription: {
    fontSize: 14,
    color: '#6B8E23',
    lineHeight: 22,
    marginBottom: 15,
    textAlign: 'justify',
  },
  surahTopics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  topicTag: {
    backgroundColor: '#C8E6C9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 5,
  },
  topicText: {
    fontSize: 12,
    color: '#1B5E20',
    fontWeight: 'bold',
  },
  recitersContent: {
    flex: 1,
  },
  reciterCard: {
    backgroundColor: '#FFF8DC',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#8B4513',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  reciterImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  reciterInfo: {
    flex: 1,
  },
  reciterName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 5,
  },
  reciterArabicName: {
    fontSize: 16,
    color: '#2E7D32',
    marginBottom: 5,
    textAlign: 'right',
  },
  reciterDescription: {
    fontSize: 14,
    color: '#6B8E23',
    lineHeight: 20,
    marginBottom: 10,
  },
  reciterStyle: {
    backgroundColor: '#C8E6C9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  styleText: {
    fontSize: 12,
    color: '#1B5E20',
    fontWeight: 'bold',
  },
  playButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tafsirContent: {
    flex: 1,
  },
  tafsirIntro: {
    backgroundColor: '#FFF8DC',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#8B4513',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tafsirIntroTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginTop: 15,
    marginBottom: 15,
    textAlign: 'center',
  },
  tafsirIntroText: {
    fontSize: 14,
    color: '#6B8E23',
    lineHeight: 22,
    textAlign: 'justify',
  },
  availableTafsir: {
    backgroundColor: '#FFF8DC',
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: '#8B4513',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  availableTafsirTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 15,
  },
  tafsirItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#C8E6C9',
    borderRadius: 10,
  },
  tafsirItemInfo: {
    flex: 1,
    marginLeft: 15,
  },
  tafsirItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 5,
  },
  tafsirItemAuthor: {
    fontSize: 14,
    color: '#6B8E23',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF8DC',
    borderRadius: 20,
    padding: 20,
    width: width * 0.9,
    maxHeight: height * 0.8,
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
    color: '#1B5E20',
  },
  closeButton: {
    padding: 5,
  },
  modalBody: {
    flex: 1,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#2E7D32',
    marginBottom: 10,
    textAlign: 'right',
  },
  modalDetails: {
    fontSize: 14,
    color: '#6B8E23',
    marginBottom: 15,
  },
  modalDescription: {
    fontSize: 14,
    color: '#6B8E23',
    lineHeight: 22,
    textAlign: 'justify',
    marginBottom: 20,
  },
  modalReciterImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 15,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  modalActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2E7D32',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  tafsirButton: {
    backgroundColor: '#8B4513',
  },
  modalActionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default QuranScreen;
