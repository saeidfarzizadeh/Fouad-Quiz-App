import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { 
  Martyr, 
  getRandomMartyr, 
  getGardenState, 
  addGoodDeedToGarden, 
  addBadDeedToGarden,
  getGoodDeeds,
  getBadDeeds,
  addGoodDeed,
  addBadDeed,
  GardenState,
  GoodDeed,
  BadDeed
} from '../data/soulData';
import NavigationButtons from '../components/NavigationButtons';

const { width, height } = Dimensions.get('window');

interface SoulCalculationScreenProps {
  navigation: any;
}

const SoulCalculationScreen: React.FC<SoulCalculationScreenProps> = ({ navigation }) => {
  const [selectedMartyr, setSelectedMartyr] = useState<Martyr>(getRandomMartyr());
  const [showGarden, setShowGarden] = useState(false);
  const [gardenState, setGardenState] = useState<GardenState>(getGardenState());
  const [showAddDeedModal, setShowAddDeedModal] = useState(false);
  const [deedType, setDeedType] = useState<'good' | 'bad'>('good');
  const [deedTitle, setDeedTitle] = useState('');
  const [deedDescription, setDeedDescription] = useState('');

  // تعریف ترتیب صفحات برای ناوبری
  const pageOrder = ['Home', 'Courses', 'Quiz', 'Certificate', 'SoulCalculation'];
  const currentPageIndex = 4; // SoulCalculationScreen در ایندکس 4 است

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

  // ورود به باغ معنوی
  const enterGarden = useCallback(() => {
    Alert.alert(
      'ورود به باغ معنوی',
      'آیا می‌خواهید وارد باغ معنوی شوید؟\nدر این باغ می‌توانید کارهای خوب و بد خود را ثبت کنید.',
      [
        {
          text: 'ورود',
          onPress: () => setShowGarden(true)
        },
        {
          text: 'انصراف',
          style: 'cancel'
        }
      ]
    );
  }, []);

  // تغییر شهید
  const changeMartyr = useCallback(() => {
    const newMartyr = getRandomMartyr();
    setSelectedMartyr(newMartyr);
  }, []);

  // افزودن کار خوب
  const addGoodDeedHandler = useCallback(() => {
    if (deedTitle.trim() && deedDescription.trim()) {
      const newDeed = addGoodDeed({
        title: deedTitle.trim(),
        description: deedDescription.trim(),
        points: 10,
        category: 'other',
      });
      
      addGoodDeedToGarden(newDeed);
      setGardenState(getGardenState());
      
      setDeedTitle('');
      setDeedDescription('');
      setShowAddDeedModal(false);
      
      Alert.alert('موفقیت', 'کار خوب شما ثبت شد و باغ شما زیباتر شد! 🌱');
    }
  }, [deedTitle, deedDescription]);

  // افزودن کار بد
  const addBadDeedHandler = useCallback(() => {
    if (deedTitle.trim() && deedDescription.trim()) {
      const newDeed = addBadDeed({
        title: deedTitle.trim(),
        description: deedDescription.trim(),
        points: -10,
        category: 'other',
      });
      
      addBadDeedToGarden(newDeed);
      setGardenState(getGardenState());
      
      setDeedTitle('');
      setDeedDescription('');
      setShowAddDeedModal(false);
      
      Alert.alert('هشدار', 'کار بد شما ثبت شد و باغ شما آسیب دید! ⚠️');
    }
  }, [deedTitle, deedDescription]);

  // نمایش مودال افزودن کار
  const showAddDeedModalHandler = useCallback((type: 'good' | 'bad') => {
    setDeedType(type);
    setShowAddDeedModal(true);
  }, []);

  if (showGarden) {
    return (
      <SafeAreaView style={styles.container}>
        {/* هدر باغ */}
        <View style={styles.gardenHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setShowGarden(false)}
          >
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.gardenTitle}>باغ معنوی</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* محتوای باغ */}
        <ScrollView style={styles.gardenContent} showsVerticalScrollIndicator={false}>
          {/* کارت شهید در باغ */}
          <View style={styles.martyrCardInGarden}>
            <Image source={{ uri: selectedMartyr.image }} style={styles.martyrImageInGarden} />
            <View style={styles.martyrInfoInGarden}>
              <Text style={styles.martyrNameInGarden}>{selectedMartyr.name}</Text>
              <Text style={styles.martyrDescriptionInGarden}>{selectedMartyr.description}</Text>
            </View>
          </View>

          {/* بخش کارهای خوب */}
          <View style={styles.goodDeedsSection}>
            <View style={styles.sectionHeader}>
              <Icon name="eco" size={24} color="#27ae60" />
              <Text style={styles.sectionTitle}>کارهای خوب</Text>
            </View>
            <Text style={styles.sectionDescription}>
              هر کار خوبی که انجام می‌دهید، یک درخت سبز یا پرنده زیبا در باغ می‌روید
            </Text>
            
            <TouchableOpacity 
              style={styles.addDeedButton}
              onPress={() => showAddDeedModalHandler('good')}
            >
              <Icon name="add-circle" size={24} color="#27ae60" />
              <Text style={styles.addDeedButtonText}>افزودن کار خوب</Text>
            </TouchableOpacity>

            {/* نمایش موجودات باغ */}
            <View style={styles.gardenItems}>
              {gardenState.items.filter(item => item.isAlive).map((item, index) => (
                <View key={item.id} style={[styles.gardenItem, { left: item.position.x, top: item.position.y }]}>
                  {item.stage === 'seed' && <Icon name="eco" size={30} color={item.color} />}
                  {item.stage === 'tree' && <Icon name="park" size={40} color={item.color} />}
                  {item.stage === 'fruit' && <Icon name="local-florist" size={40} color={item.color} />}
                  {item.stage === 'bird' && <Icon name="pets" size={40} color={item.color} />}
                  <Text style={styles.gardenItemText}>
                    {item.stage === 'seed' && 'بذر'}
                    {item.stage === 'tree' && 'درخت'}
                    {item.stage === 'fruit' && 'میوه'}
                    {item.stage === 'bird' && 'پرنده'}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* بخش کارهای بد */}
          <View style={styles.badDeedsSection}>
            <View style={styles.sectionHeader}>
              <Icon name="warning" size={24} color="#e74c3c" />
              <Text style={styles.sectionTitle}>کارهای بد</Text>
            </View>
            <Text style={styles.sectionDescription}>
              هر کار بدی که انجام می‌دهید، درختی آتش می‌گیرد یا پرنده‌ای می‌میرد
            </Text>
            
            <TouchableOpacity 
              style={styles.addDeedButton}
              onPress={() => showAddDeedModalHandler('bad')}
            >
              <Icon name="add-circle" size={24} color="#e74c3c" />
              <Text style={styles.addDeedButtonText}>ثبت کار بد</Text>
            </TouchableOpacity>

            {/* نمایش موجودات آسیب دیده */}
            <View style={styles.gardenItems}>
              {gardenState.items.filter(item => !item.isAlive).map((item, index) => (
                <View key={item.id} style={[styles.gardenItem, { left: item.position.x, top: item.position.y }]}>
                  <Icon name="local-fire-department" size={40} color={item.color} />
                  <Text style={styles.gardenItemText}>سوخته</Text>
                </View>
              ))}
            </View>
          </View>

          {/* آمار کلی */}
          <View style={styles.gardenStats}>
            <Text style={styles.statsTitle}>آمار باغ شما</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Icon name="eco" size={20} color="#27ae60" />
                <Text style={styles.statText}>{gardenState.goodDeedsCount} کار خوب</Text>
              </View>
              <View style={styles.statItem}>
                <Icon name="warning" size={20} color="#e74c3c" />
                <Text style={styles.statText}>{gardenState.badDeedsCount} کار بد</Text>
              </View>
              <View style={styles.statItem}>
                <Icon name="analytics" size={20} color="#3498db" />
                <Text style={styles.statText}>{gardenState.totalPoints} امتیاز</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* دکمه‌های ناوبری */}
        <NavigationButtons
          onPrevious={goToPreviousPage}
          onNext={goToNextPage}
          previousDisabled={false}
          nextDisabled={true}
          previousText="گواهینامه"
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
        
        <Text style={styles.headerTitle}>محاسبه نفس</Text>
        
        <TouchableOpacity style={styles.changeMartyrButton} onPress={changeMartyr}>
          <Icon name="refresh" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* کارت شهید */}
        <View style={styles.martyrCard}>
          <Image source={{ uri: selectedMartyr.image }} style={styles.martyrImage} />
          <View style={styles.martyrInfo}>
            <Text style={styles.martyrName}>{selectedMartyr.name}</Text>
            <Text style={styles.martyrCity}>شهر: {selectedMartyr.city}</Text>
            <Text style={styles.martyrAge}>سن شهادت: {selectedMartyr.age} سال</Text>
            <Text style={styles.martyrDate}>تاریخ شهادت: {selectedMartyr.martyrdomDate}</Text>
            <Text style={styles.martyrDescription}>{selectedMartyr.description}</Text>
          </View>
        </View>

        {/* متن توضیحی */}
        <View style={styles.descriptionCard}>
          <Icon name="favorite" size={40} color="#e74c3c" />
          <Text style={styles.descriptionTitle}>یاد شهدای دفاع مقدس</Text>
          <Text style={styles.descriptionText}>
            این شهیدان عزیز با فداکاری و ایثار خود، از وطن و دین ما دفاع کردند. 
            حالا نوبت ماست که با محاسبه نفس و انجام کارهای نیک، 
            یاد آنان را گرامی بداریم و باغ معنوی خود را آباد کنیم.
          </Text>
        </View>

        {/* دکمه ورود به باغ */}
        <TouchableOpacity style={styles.enterGardenButton} onPress={enterGarden}>
          <Icon name="park" size={30} color="#fff" />
          <Text style={styles.enterGardenButtonText}>ورود به باغ معنوی</Text>
          <Text style={styles.enterGardenSubtext}>
            در این باغ می‌توانید کارهای خوب و بد خود را ثبت کنید
          </Text>
        </TouchableOpacity>

        {/* ویژگی‌های باغ */}
        <View style={styles.featuresCard}>
          <Text style={styles.featuresTitle}>ویژگی‌های باغ معنوی</Text>
          
          <View style={styles.featureItem}>
            <Icon name="eco" size={24} color="#27ae60" />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>کارهای خوب</Text>
              <Text style={styles.featureDescription}>
                هر کار نیکی که انجام می‌دهید، درختی سبز یا پرنده‌ای زیبا در باغ می‌روید
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Icon name="warning" size={24} color="#e74c3c" />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>کارهای بد</Text>
              <Text style={styles.featureDescription}>
                هر کار بدی که انجام می‌دهید، درختی آتش می‌گیرد یا پرنده‌ای می‌میرد
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Icon name="analytics" size={24} color="#3498db" />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>آمار و گزارش</Text>
              <Text style={styles.featureDescription}>
                آمار کامل از وضعیت باغ و کارهای انجام شده
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* دکمه‌های ناوبری */}
      <NavigationButtons
        onPrevious={goToPreviousPage}
        onNext={goToNextPage}
        previousDisabled={false}
        nextDisabled={true}
        previousText="گواهینامه"
        nextText="خانه"
        showNext={false}
      />

      {/* مودال افزودن کار */}
      <Modal
        visible={showAddDeedModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAddDeedModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {deedType === 'good' ? 'افزودن کار خوب' : 'ثبت کار بد'}
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowAddDeedModal(false)}
              >
                <Icon name="close" size={24} color="#7f8c8d" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <TextInput
                style={styles.input}
                placeholder="عنوان کار"
                value={deedTitle}
                onChangeText={setDeedTitle}
                multiline={false}
              />
              
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="توضیحات کار"
                value={deedDescription}
                onChangeText={setDeedDescription}
                multiline={true}
                numberOfLines={4}
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setShowAddDeedModal(false)}
                >
                  <Text style={styles.cancelButtonText}>انصراف</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.modalButton, deedType === 'good' ? styles.goodButton : styles.badButton]}
                  onPress={deedType === 'good' ? addGoodDeedHandler : addBadDeedHandler}
                >
                  <Text style={styles.saveButtonText}>ذخیره</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
  changeMartyrButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  martyrCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  martyrImage: {
    width: 200,
    height: 250,
    borderRadius: 15,
    marginBottom: 15,
  },
  martyrInfo: {
    alignItems: 'center',
  },
  martyrName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  martyrCity: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  martyrAge: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  martyrDate: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 15,
  },
  martyrDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 22,
  },
  descriptionCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    alignItems: 'center',
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginTop: 10,
    marginBottom: 15,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 22,
  },
  enterGardenButton: {
    backgroundColor: '#27ae60',
    borderRadius: 15,
    padding: 25,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  enterGardenButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  enterGardenSubtext: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
    textAlign: 'center',
  },
  featuresCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  featureContent: {
    flex: 1,
    marginLeft: 15,
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
  gardenHeader: {
    backgroundColor: '#27ae60',
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
  gardenTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  gardenContent: {
    flex: 1,
    padding: 20,
  },
  martyrCardInGarden: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    flexDirection: 'row',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  martyrImageInGarden: {
    width: 80,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  martyrInfoInGarden: {
    flex: 1,
  },
  martyrNameInGarden: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  martyrDescriptionInGarden: {
    fontSize: 12,
    color: '#7f8c8d',
    lineHeight: 18,
  },
  goodDeedsSection: {
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
  badDeedsSection: {
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginLeft: 10,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 15,
    lineHeight: 20,
  },
  addDeedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  addDeedButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  gardenItems: {
    position: 'relative',
    height: 300,
    marginTop: 15,
  },
  gardenItem: {
    position: 'absolute',
    alignItems: 'center',
    padding: 10,
  },
  gardenItemText: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 5,
    textAlign: 'center',
  },
  gardenStats: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 5,
    textAlign: 'center',
  },
  // استایل‌های مودال
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
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
  goodButton: {
    backgroundColor: '#27ae60',
  },
  badButton: {
    backgroundColor: '#e74c3c',
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

export default SoulCalculationScreen;
