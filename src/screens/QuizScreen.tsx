import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { mockQuestions, Question, getQuestionsByCategory } from '../data/mockData';
import NavigationButtons from '../components/NavigationButtons';

const { width } = Dimensions.get('window');

interface QuizScreenProps {
  navigation: any;
  route: any;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ navigation, route }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(string | number | null)[]>([]);
  const [quizProgress, setQuizProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  // تعریف ترتیب صفحات برای ناوبری
  const pageOrder = ['Home', 'Quran', 'Courses', 'Quiz', 'Certificate', 'SoulCalculation', 'Motahari', 'MasterSafaei'];
  const currentPageIndex: number = 3; // QuizScreen در ایندکس 3 است

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

  // دریافت سوالات بر اساس دسته‌بندی
  useEffect(() => {
    const category = route.params?.category || 'all';
    const selectedQuestions = getQuestionsByCategory(category);
    const limitedQuestions = selectedQuestions.slice(0, 10);

    setQuestions(limitedQuestions);
    setUserAnswers(new Array(limitedQuestions.length).fill(null));
  }, [route.params?.category]);

  // محاسبه پیشرفت
  useEffect(() => {
    const answeredCount = userAnswers.filter(answer => answer !== null).length;
    const progress = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;
    setQuizProgress(progress);
  }, [userAnswers, questions.length]);

  // رفتن به سوال بعدی
  const goToNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // پایان آزمون
      calculateScore();
      setShowResults(true);
    }
  }, [currentQuestionIndex, questions.length]);

  // رفتن به سوال قبلی
  const goToPreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }, [currentQuestionIndex]);

  // انتخاب پاسخ
  const selectAnswer = useCallback((answer: string | number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);
  }, [userAnswers, currentQuestionIndex]);

  // محاسبه نمره
  const calculateScore = useCallback(() => {
    let correctCount = 0;
    questions.forEach((question, index) => {
      const userAnswer = userAnswers[index];
      if (userAnswer === question.correctAnswer) {
        correctCount++;
      }
    });
    const percentage = questions.length > 0 ? (correctCount / questions.length) * 100 : 0;
    setScore(percentage);
  }, [questions, userAnswers]);

  // شروع آزمون جدید
  const startNewQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setUserAnswers(new Array(questions.length).fill(null));
    setShowResults(false);
    setScore(0);
  }, [questions.length]);

  // بازگشت به خانه
  const goHome = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  if (questions.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>در حال بارگذاری سوالات...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (showResults) {
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
          <Text style={styles.headerTitle}>نتیجه آزمون</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* کارت نتیجه */}
          <View style={styles.resultCard}>
            <View style={styles.resultIcon}>
              <Icon 
                name={score >= 70 ? "check-circle" : "error"} 
                size={60} 
                color={score >= 70 ? "#27ae60" : "#e74c3c"} 
              />
            </View>
            <Text style={styles.resultTitle}>
              {score >= 70 ? "تبریک! قبول شدید" : "نیاز به تلاش بیشتر"}
            </Text>
            <Text style={styles.scoreText}>{score.toFixed(1)}%</Text>
            <Text style={styles.scoreSubtext}>
              {Math.round((score / 100) * questions.length)} از {questions.length} سوال صحیح
            </Text>
          </View>

          {/* دکمه‌های عملیات */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.primaryButton} onPress={startNewQuiz}>
              <Icon name="refresh" size={20} color="#fff" />
              <Text style={styles.primaryButtonText}>آزمون جدید</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.secondaryButton} onPress={goHome}>
              <Icon name="home" size={20} color="#3498db" />
              <Text style={styles.secondaryButtonText}>بازگشت به خانه</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

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
        <Text style={styles.headerTitle}>آزمون</Text>
        <TouchableOpacity style={styles.homeButton} onPress={goHome}>
          <Icon name="home" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* نوار پیشرفت */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${quizProgress}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {currentQuestionIndex + 1} از {questions.length}
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* سوال */}
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
          <Text style={styles.questionCategory}>
            {currentQuestion.category === 'quran' ? 'قرآن' : 'تفسیر مطهری'}
          </Text>
        </View>

        {/* گزینه‌ها */}
        <View style={styles.optionsContainer}>
          {currentQuestion.type === 'multiple' ? (
            currentQuestion.options?.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  userAnswers[currentQuestionIndex] === index && styles.selectedOption
                ]}
                onPress={() => selectAnswer(index)}
              >
                <Text style={[
                  styles.optionText,
                  userAnswers[currentQuestionIndex] === index && styles.selectedOptionText
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.textAnswerContainer}>
              <Text style={styles.textAnswerLabel}>پاسخ خود را بنویسید:</Text>
              {/* اینجا می‌توانید TextInput اضافه کنید */}
            </View>
          )}
        </View>

        {/* دکمه‌های ناوبری */}
        <View style={styles.navigationButtons}>
          <TouchableOpacity
            style={[
              styles.navButton,
              currentQuestionIndex === 0 && styles.disabledButton
            ]}
            onPress={goToPreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            <Icon name="chevron-right" size={20} color="#fff" />
            <Text style={styles.navButtonText}>قبلی</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={goToNextQuestion}
          >
            <Text style={styles.navButtonText}>
              {currentQuestionIndex === questions.length - 1 ? 'پایان' : 'بعدی'}
            </Text>
            <Icon name="chevron-left" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* دکمه‌های ناوبری کلی */}
      <NavigationButtons
        onPrevious={goToPreviousPage}
        onNext={goToNextPage}
        previousDisabled={currentPageIndex === 0}
        nextDisabled={currentPageIndex === pageOrder.length - 1}
        previousText="دوره‌ها"
        nextText="گواهینامه"
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
  homeButton: {
    padding: 8,
  },
  headerSpacer: {
    width: 40,
  },
  progressContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#ecf0f1',
    borderRadius: 4,
    marginRight: 15,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3498db',
    borderRadius: 4,
  },
  progressText: {
    color: '#7f8c8d',
    fontSize: 14,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  questionCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    marginBottom: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    lineHeight: 28,
    marginBottom: 15,
    textAlign: 'right',
  },
  questionCategory: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'right',
  },
  optionsContainer: {
    marginBottom: 25,
  },
  optionButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    borderColor: '#3498db',
    backgroundColor: '#ebf3fd',
  },
  optionText: {
    fontSize: 16,
    color: '#2c3e50',
    textAlign: 'right',
    lineHeight: 24,
  },
  selectedOptionText: {
    color: '#3498db',
    fontWeight: 'bold',
  },
  textAnswerContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  textAnswerLabel: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'right',
    marginBottom: 10,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  navButton: {
    backgroundColor: '#3498db',
    borderRadius: 12,
    paddingHorizontal: 25,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  disabledButton: {
    backgroundColor: '#bdc3c7',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 8,
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
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginBottom: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  resultIcon: {
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    textAlign: 'center',
  },
  scoreText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 10,
  },
  scoreSubtext: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  actionButtons: {
    gap: 15,
  },
  primaryButton: {
    backgroundColor: '#27ae60',
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#3498db',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  secondaryButtonText: {
    color: '#3498db',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default QuizScreen;