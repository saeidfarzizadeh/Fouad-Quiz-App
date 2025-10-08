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
import { MASTER_SAFAEI_INFO } from '../data/appConfig';
import NavigationButtons from '../components/NavigationButtons';

const { width, height } = Dimensions.get('window');

interface MasterSafaeiScreenProps {
  navigation: any;
}

const MasterSafaeiScreen: React.FC<MasterSafaeiScreenProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<'biography' | 'thought' | 'legacy'>('biography');
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState('');

  // تعریف ترتیب صفحات برای ناوبری
  const pageOrder = ['Home', 'Courses', 'Quiz', 'Certificate', 'SoulCalculation', 'Motahari', 'MasterSafaei'];
  const currentPageIndex = 6; // MasterSafaeiScreen در ایندکس 6 است

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

  // نمایش نقل‌قول
  const showQuote = useCallback((quote: string) => {
    setSelectedQuote(quote);
    setShowQuoteModal(true);
  }, []);

  // نقل‌قول‌های استاد
  const quotes = [
    'قرآن کتاب زندگی است، نه کتاب مرگ.',
    'تدبر در قرآن یعنی زندگی کردن با قرآن.',
    'هر آیه قرآن دری است به سوی خدا.',
    'قرآن راهنمای زندگی است، نه فقط کتاب عبادت.',
    'در قرآن هر کلمه معنا دارد و هر معنا راهی است.',
    'قرآن کتاب هدایت است برای همه زمان‌ها.',
    'تدبر در قرآن یعنی فهمیدن زندگی.',
    'قرآن کتاب عمل است، نه فقط کتاب خواندن.'
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
        
        <Text style={styles.headerTitle}>استاد علی صفایی حائری</Text>
        
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
          style={[styles.tab, activeTab === 'thought' && styles.activeTab]}
          onPress={() => setActiveTab('thought')}
        >
          <Icon name="psychology" size={20} color={activeTab === 'thought' ? '#fff' : '#7f8c8d'} />
          <Text style={[styles.tabText, activeTab === 'thought' && styles.activeTabText]}>
            اندیشه
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'legacy' && styles.activeTab]}
          onPress={() => setActiveTab('legacy')}
        >
          <Icon name="school" size={20} color={activeTab === 'legacy' ? '#fff' : '#7f8c8d'} />
          <Text style={[styles.tabText, activeTab === 'legacy' && styles.activeTabText]}>
            میراث
          </Text>
        </TouchableOpacity>
      </View>

      {/* محتوای تب‌ها */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'biography' && (
          <View style={styles.biographyContent}>
            {/* تصویر و اطلاعات کلی */}
            <View style={styles.biographyHeader}>
              <Image 
                source={{ uri: 'https://via.placeholder.com/200x250/20B2AA/ffffff?text=استاد+صفایی+حائری' }} 
                style={styles.biographyImage} 
              />
              <View style={styles.biographyInfo}>
                <Text style={styles.biographyName}>{MASTER_SAFAEI_INFO.name}</Text>
                <Text style={styles.biographyDates}>
                  {MASTER_SAFAEI_INFO.birthYear} - {MASTER_SAFAEI_INFO.deathYear}
                </Text>
                <Text style={styles.biographyLifespan}>{MASTER_SAFAEI_INFO.lifespan}</Text>
                <Text style={styles.biographyExpertise}>{MASTER_SAFAEI_INFO.expertise}</Text>
              </View>
            </View>

            {/* توضیحات کلی */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>درباره استاد</Text>
              <Text style={styles.sectionText}>{MASTER_SAFAEI_INFO.description}</Text>
              <Text style={styles.sectionText}>{MASTER_SAFAEI_INFO.style}</Text>
            </View>

            {/* ویژگی‌های خاص */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>ویژگی‌های خاص</Text>
              {MASTER_SAFAEI_INFO.characteristics.map((characteristic, index) => (
                <View key={index} style={styles.listItem}>
                  <Icon name="check-circle" size={16} color="#20B2AA" />
                  <Text style={styles.listText}>{characteristic}</Text>
                </View>
              ))}
            </View>

            {/* میراث و تأثیرات */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>میراث و تأثیرات</Text>
              {MASTER_SAFAEI_INFO.impact.map((impact, index) => (
                <View key={index} style={styles.listItem}>
                  <Icon name="star" size={16} color="#FFD700" />
                  <Text style={styles.listText}>{impact}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {activeTab === 'thought' && (
          <View style={styles.thoughtContent}>
            <Text style={styles.sectionTitle}>نظام فکری استاد</Text>
            
            <View style={styles.thoughtCard}>
              <Icon name="psychology" size={40} color="#20B2AA" />
              <Text style={styles.thoughtTitle}>تفسیر قرآن با سبک خاص</Text>
              <Text style={styles.thoughtDescription}>
                استاد علی صفایی حائری در تفسیر قرآن صاحب سبک بود و روش خاصی در تدبر آیات قرآن داشت. 
                ایشان معتقد بود که قرآن کتاب زندگی است و باید در زندگی جاری شود.
              </Text>
            </View>

            <View style={styles.thoughtCard}>
              <Icon name="book" size={40} color="#20B2AA" />
              <Text style={styles.thoughtTitle}>دین‌شناسی واقعی</Text>
              <Text style={styles.thoughtDescription}>
                استاد صفایی حائری دین‌شناس واقعی بود که دین را نه به عنوان مجموعه‌ای از قوانین، 
                بلکه به عنوان راهنمای زندگی می‌دانست. ایشان بر عمل و زندگی قرآنی تأکید داشت.
              </Text>
            </View>

            <View style={styles.thoughtCard}>
              <Icon name="lightbulb" size={40} color="#20B2AA" />
              <Text style={styles.thoughtTitle}>تدبر در قرآن</Text>
              <Text style={styles.thoughtDescription}>
                استاد معتقد بود که تدبر در قرآن یعنی زندگی کردن با قرآن. 
                هر آیه قرآن دری است به سوی خدا و هر کلمه معنا دارد و هر معنا راهی است.
              </Text>
            </View>

            {/* نقل‌قول‌ها */}
            <View style={styles.quotesSection}>
              <Text style={styles.sectionTitle}>نقل‌قول‌های مهم</Text>
              <View style={styles.quotesGrid}>
                {quotes.map((quote, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.quoteCard}
                    onPress={() => showQuote(quote)}
                  >
                    <Icon name="format-quote" size={20} color="#20B2AA" />
                    <Text style={styles.quoteText} numberOfLines={3}>{quote}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}

        {activeTab === 'legacy' && (
          <View style={styles.legacyContent}>
            <Text style={styles.sectionTitle}>میراث استاد</Text>
            
            <View style={styles.legacyCard}>
              <Icon name="school" size={40} color="#20B2AA" />
              <Text style={styles.legacyTitle}>شاگردان و تدریس</Text>
              <Text style={styles.legacyDescription}>
                {MASTER_SAFAEI_INFO.students}
              </Text>
            </View>

            <View style={styles.legacyCard}>
              <Icon name="rocket-launch" size={40} color="#20B2AA" />
              <Text style={styles.legacyTitle}>طرح قرآنی فؤاد</Text>
              <Text style={styles.legacyDescription}>
                {MASTER_SAFAEI_INFO.project}
              </Text>
            </View>

            <View style={styles.legacyCard}>
              <Icon name="trending-up" size={40} color="#20B2AA" />
              <Text style={styles.legacyTitle}>تأثیر بر نسل جوان</Text>
              <Text style={styles.legacyDescription}>
                اندیشه‌های استاد صفایی حائری تأثیر عمیقی بر نسل جوان داشته و همچنان الهام‌بخش 
                طرح‌های قرآنی و دینی است. نظام فکری ایشان راهنمای بسیاری از محققان و دانشجویان است.
              </Text>
            </View>

            <View style={styles.legacyCard}>
              <Icon name="auto-awesome" size={40} color="#20B2AA" />
              <Text style={styles.legacyTitle}>نظام فکری منسجم</Text>
              <Text style={styles.legacyDescription}>
                استاد صفایی حائری نظام فکری منسجمی در دین‌شناسی ارائه داد که بر اساس قرآن 
                و سنت استوار است. این نظام فکری همچنان مورد استفاده و تدریس قرار می‌گیرد.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* مودال نقل‌قول */}
      <Modal
        visible={showQuoteModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowQuoteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>نقل‌قول استاد</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowQuoteModal(false)}
              >
                <Icon name="close" size={24} color="#7f8c8d" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <Icon name="format-quote" size={40} color="#20B2AA" />
              <Text style={styles.modalQuote}>{selectedQuote}</Text>
              <Text style={styles.modalAuthor}>- استاد علی صفایی حائری</Text>
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
    backgroundColor: '#F0F8FF',
  },
  header: {
    backgroundColor: '#20B2AA',
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
    fontSize: 18,
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
    backgroundColor: '#20B2AA',
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#20B2AA',
    marginBottom: 5,
  },
  biographyDates: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  biographyLifespan: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  biographyExpertise: {
    fontSize: 14,
    color: '#20B2AA',
    fontWeight: 'bold',
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
    color: '#20B2AA',
    marginBottom: 15,
  },
  sectionText: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 22,
    textAlign: 'justify',
    marginBottom: 10,
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
  thoughtContent: {
    flex: 1,
  },
  thoughtCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  thoughtTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#20B2AA',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  thoughtDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 22,
    textAlign: 'justify',
  },
  quotesSection: {
    marginTop: 20,
  },
  quotesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quoteCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    width: (width - 60) / 2,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  quoteText: {
    fontSize: 12,
    color: '#7f8c8d',
    lineHeight: 18,
    marginTop: 10,
    fontStyle: 'italic',
  },
  legacyContent: {
    flex: 1,
  },
  legacyCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  legacyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#20B2AA',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  legacyDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 22,
    textAlign: 'justify',
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
    color: '#20B2AA',
  },
  closeButton: {
    padding: 5,
  },
  modalBody: {
    alignItems: 'center',
  },
  modalQuote: {
    fontSize: 16,
    color: '#2c3e50',
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 15,
    fontStyle: 'italic',
  },
  modalAuthor: {
    fontSize: 14,
    color: '#20B2AA',
    fontWeight: 'bold',
  },
});

export default MasterSafaeiScreen;
