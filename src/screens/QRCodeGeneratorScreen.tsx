import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import QRCode from 'react-native-qrcode-svg';

const { width } = Dimensions.get('window');

interface QRCodeGeneratorScreenProps {
  navigation: any;
}

const QRCodeGeneratorScreen: React.FC<QRCodeGeneratorScreenProps> = ({ navigation }) => {
  const [value, setValue] = useState('https://example.com');
  const [foregroundColor, setForegroundColor] = useState('#2c3e50');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');

  const paletteColors = ['#2c3e50', '#27ae60', '#8e44ad', '#d35400', '#e74c3c', '#1abc9c'];
  const backgroundPalette = ['#ffffff', '#f4f6f7', '#fef5e7', '#fce4ec', '#ebf5fb'];

  const qrSize = useMemo(() => {
    switch (size) {
      case 'small':
        return 160;
      case 'large':
        return 240;
      default:
        return 200;
    }
  }, [size]);

  const hasContent = value.trim().length > 0;

  const SizeOption = ({ label, option }: { label: string; option: typeof size }) => (
    <TouchableOpacity
      style={[styles.sizeButton, size === option && styles.sizeButtonActive]}
      onPress={() => setSize(option)}
    >
      <Text style={[styles.sizeButtonText, size === option && styles.sizeButtonTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
          <Icon name="menu" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>تولید QR Code</Text>

        <TouchableOpacity style={styles.infoButton}>
          <Icon name="qr-code-2" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>اطلاعات ورودی</Text>
          <Text style={styles.cardSubtitle}>متن، لینک یا هر پیامی را که باید به QR تبدیل شود وارد کنید.</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>متن یا لینک</Text>
            <TextInput
              style={styles.input}
              placeholder="مثال: https://fouad-app.ir"
              placeholderTextColor="#95a5a6"
              value={value}
              onChangeText={setValue}
              multiline
            />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>پیش‌نمایش QR</Text>
          <Text style={styles.cardSubtitle}>از رنگ و اندازه مناسب برای استفاده در گواهینامه‌ها و پوسترها استفاده کنید.</Text>

          <View style={styles.previewContainer}>
            {hasContent ? (
              <QRCode value={value.trim()} size={qrSize} color={foregroundColor} backgroundColor={backgroundColor} />
            ) : (
              <View style={styles.emptyState}>
                <Icon name="qr-code-2" size={48} color="#bdc3c7" />
                <Text style={styles.emptyStateText}>ابتدا متن یا لینک خود را وارد کنید.</Text>
              </View>
            )}
          </View>

          <View style={styles.sizeSelector}>
            <SizeOption label="کوچک" option="small" />
            <SizeOption label="متوسط" option="medium" />
            <SizeOption label="بزرگ" option="large" />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>رنگ QR Code</Text>
          <Text style={styles.cardSubtitle}>برای هماهنگی با هویت بصری مجموعه، از رنگ‌های پیشنهادی استفاده کنید.</Text>

          <View style={styles.paletteRow}>
            {paletteColors.map((color) => (
              <TouchableOpacity
                key={color}
                style={[styles.colorDot, { backgroundColor: color }, foregroundColor === color && styles.activeDot]}
                onPress={() => setForegroundColor(color)}
              />
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>رنگ پس‌زمینه</Text>
          <Text style={styles.cardSubtitle}>پس‌زمینه ملایم باعث می‌شود QR در گواهینامه‌ها بهتر دیده شود.</Text>

          <View style={styles.paletteRow}>
            {backgroundPalette.map((color) => (
              <TouchableOpacity
                key={color}
                style={[styles.colorDot, { backgroundColor: color, borderWidth: 1, borderColor: '#dcdcdc' }, backgroundColor === color && styles.activeDot]}
                onPress={() => setBackgroundColor(color)}
              />
            ))}
          </View>
        </View>

        <View style={styles.tipCard}>
          <Icon name="tips-and-updates" size={22} color="#f39c12" />
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>راهنما</Text>
            <Text style={styles.tipDescription}>
              برای چاپ و اشتراک‌گذاری، QR تولید شده را می‌توانید در صفحه گواهینامه‌ها استفاده کنید یا با اسکرین‌شات ذخیره نمایید.
            </Text>
          </View>
        </View>
      </ScrollView>
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
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  infoButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 20,
    paddingBottom: 60,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#7f8c8d',
    marginBottom: 16,
    lineHeight: 20,
  },
  inputContainer: {
    backgroundColor: '#f4f6f7',
    borderRadius: 16,
    padding: 16,
  },
  inputLabel: {
    fontSize: 13,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  input: {
    minHeight: 80,
    color: '#2c3e50',
    textAlign: 'right',
  },
  previewContainer: {
    backgroundColor: '#f4f6f7',
    borderRadius: 24,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 260,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    color: '#95a5a6',
    marginTop: 12,
  },
  sizeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  sizeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dcdde1',
    marginHorizontal: 6,
    alignItems: 'center',
  },
  sizeButtonActive: {
    backgroundColor: '#2c3e50',
    borderColor: '#2c3e50',
  },
  sizeButtonText: {
    color: '#2c3e50',
    fontWeight: '600',
  },
  sizeButtonTextActive: {
    color: '#fff',
  },
  paletteRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  colorDot: {
    width: (width - 120) / 5,
    height: (width - 120) / 5,
    borderRadius: 16,
    marginVertical: 8,
  },
  activeDot: {
    borderWidth: 2,
    borderColor: '#2c3e50',
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff3cd',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ffeeba',
  },
  tipContent: {
    flex: 1,
    marginLeft: 12,
  },
  tipTitle: {
    color: '#856404',
    fontWeight: '700',
    marginBottom: 6,
  },
  tipDescription: {
    color: '#856404',
    lineHeight: 20,
  },
});

export default QRCodeGeneratorScreen;
