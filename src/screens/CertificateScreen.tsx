import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';
import NavigationButtons from '../components/NavigationButtons';

const { width } = Dimensions.get('window');

interface CertificateScreenProps {
  navigation: any;
  route?: {
    params?: {
      score?: number;
      total?: number;
      userName?: string;
    };
  };
}

const CertificateScreen: React.FC<CertificateScreenProps> = ({ navigation, route }) => {
  const { score = 8, total = 10, userName = 'کاربر گرامی' } = route?.params || {};
  const percentage = Math.round((score / total) * 100);
  const certificateId = `FOUAD-${Date.now()}-${score}`;

  // تعریف ترتیب صفحات برای ناوبری
  const pageOrder = ['Home', 'Courses', 'Quiz', 'Certificate'];
  const currentPageIndex = 3; // CertificateScreen در ایندکس 3 است

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
  
  // تولید متن QR Code
  const qrData = JSON.stringify({
    certificateId,
    score,
    total,
    percentage,
    userName,
    date: new Date().toISOString(),
    app: 'فُؤاد'
  });

  const getGrade = () => {
    if (percentage >= 90) return 'عالی';
    if (percentage >= 80) return 'خیلی خوب';
    if (percentage >= 70) return 'خوب';
    if (percentage >= 60) return 'قابل قبول';
    return 'نیاز به تلاش بیشتر';
  };

  const getGradeColor = () => {
    if (percentage >= 90) return '#27ae60';
    if (percentage >= 80) return '#2ecc71';
    if (percentage >= 70) return '#f39c12';
    if (percentage >= 60) return '#e67e22';
    return '#e74c3c';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>گواهینامه</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.certificateContainer}>
          {/* هدر گواهینامه */}
          <View style={styles.certificateHeader}>
            <Text style={styles.certificateTitle}>گواهینامه تکمیل آزمون</Text>
            <Text style={styles.appName}>برنامه فُؤاد</Text>
            <View style={styles.decorativeLine} />
          </View>

          {/* محتوای اصلی */}
          <View style={styles.certificateBody}>
            <Text style={styles.congratulationsText}>
              تبریک! شما با موفقیت آزمون را تکمیل کردید
            </Text>

            <View style={styles.userInfo}>
              <Text style={styles.userLabel}>نام:</Text>
              <Text style={styles.userName}>{userName}</Text>
            </View>

            <View style={styles.scoreContainer}>
              <View style={styles.scoreItem}>
                <Text style={styles.scoreLabel}>امتیاز کسب شده:</Text>
                <Text style={styles.scoreValue}>{score} از {total}</Text>
              </View>
              
              <View style={styles.scoreItem}>
                <Text style={styles.scoreLabel}>درصد موفقیت:</Text>
                <Text style={[styles.scoreValue, { color: getGradeColor() }]}>
                  {percentage}%
                </Text>
              </View>
              
              <View style={styles.scoreItem}>
                <Text style={styles.scoreLabel}>نمره:</Text>
                <Text style={[styles.scoreValue, { color: getGradeColor() }]}>
                  {getGrade()}
                </Text>
              </View>
            </View>

            <View style={styles.dateContainer}>
              <Text style={styles.dateLabel}>تاریخ صدور:</Text>
              <Text style={styles.dateValue}>
                {new Date().toLocaleDateString('fa-IR')}
              </Text>
            </View>

            {/* QR Code */}
            <View style={styles.qrContainer}>
              <Text style={styles.qrLabel}>کد تأیید گواهینامه:</Text>
              <View style={styles.qrCodeContainer}>
                <QRCode
                  value={qrData}
                  size={width * 0.4}
                  color="#2c3e50"
                  backgroundColor="#fff"
                />
              </View>
              <Text style={styles.certificateId}>شناسه: {certificateId}</Text>
            </View>

            {/* امضا */}
            <View style={styles.signatureContainer}>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureText}>امضای دیجیتال برنامه فُؤاد</Text>
            </View>
          </View>

          {/* فوتر */}
          <View style={styles.certificateFooter}>
            <Text style={styles.footerText}>
              این گواهینامه به صورت دیجیتال صادر شده و قابل تأیید است
            </Text>
            <Text style={styles.footerSubText}>
              برنامه فُؤاد - آموزش قرآن و تفسیر مطهری
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* دکمه‌های ناوبری کلی */}
      <NavigationButtons
        onPrevious={goToPreviousPage}
        onNext={goToNextPage}
        previousDisabled={currentPageIndex === 0}
        nextDisabled={currentPageIndex === pageOrder.length - 1}
        previousText="آزمون"
        nextText="خانه"
        showNext={false} // در صفحه آخر، دکمه بعدی نمایش داده نمی‌شود
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  certificateContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    borderWidth: 3,
    borderColor: '#e74c3c',
  },
  certificateHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  certificateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 10,
  },
  appName: {
    fontSize: 18,
    color: '#e74c3c',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  decorativeLine: {
    width: 100,
    height: 3,
    backgroundColor: '#e74c3c',
    borderRadius: 2,
  },
  certificateBody: {
    alignItems: 'center',
  },
  congratulationsText: {
    fontSize: 18,
    color: '#27ae60',
    textAlign: 'center',
    marginBottom: 25,
    fontWeight: 'bold',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    width: '100%',
  },
  userLabel: {
    fontSize: 16,
    color: '#7f8c8d',
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    color: '#2c3e50',
    fontWeight: 'bold',
  },
  scoreContainer: {
    width: '100%',
    marginBottom: 25,
  },
  scoreItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  scoreLabel: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  scoreValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    width: '100%',
  },
  dateLabel: {
    fontSize: 16,
    color: '#7f8c8d',
    marginRight: 10,
  },
  dateValue: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: 'bold',
  },
  qrContainer: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 15,
    width: '100%',
  },
  qrLabel: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 15,
    textAlign: 'center',
  },
  qrCodeContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: 15,
  },
  certificateId: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  signatureContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  signatureLine: {
    width: 150,
    height: 2,
    backgroundColor: '#2c3e50',
    marginBottom: 10,
  },
  signatureText: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  certificateFooter: {
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
    paddingTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 10,
  },
  footerSubText: {
    fontSize: 12,
    color: '#95a5a6',
    textAlign: 'center',
  },
});

export default CertificateScreen;
