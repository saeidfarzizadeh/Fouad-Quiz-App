import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import QuranScreen from './src/screens/QuranScreen';
import QuizScreen from './src/screens/QuizScreen';
import CertificateScreen from './src/screens/CertificateScreen';
import CoursesScreen from './src/screens/CoursesScreen';
import ContentManagementScreen from './src/screens/ContentManagementScreen';
import SoulCalculationScreen from './src/screens/SoulCalculationScreen';
import MotahariScreen from './src/screens/MotahariScreen';
import BookReaderScreen from './src/screens/BookReaderScreen';
import MasterSafaeiScreen from './src/screens/MasterSafaeiScreen';
import AdminPanelScreen from './src/screens/AdminPanelScreen';

// Components
import CustomDrawerContent from './src/components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#2c3e50" />
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            width: 280,
          },
          drawerType: 'slide',
          overlayColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
                    <Drawer.Screen
                      name="Home"
                      component={HomeScreen}
                      options={{
                        title: 'خانه',
                      }}
                    />
                    <Drawer.Screen
                      name="Quran"
                      component={QuranScreen}
                      options={{
                        title: 'قرآن کریم',
                      }}
                    />
                    <Drawer.Screen
                      name="Quiz"
                      component={QuizScreen}
                      options={{
                        title: 'آزمون',
                      }}
                    />
        <Drawer.Screen 
          name="Certificate" 
          component={CertificateScreen}
          options={{
            title: 'گواهینامه',
          }}
          initialParams={{ score: 8, total: 10, userName: 'کاربر گرامی' }}
        />
        <Drawer.Screen 
          name="Courses" 
          component={CoursesScreen}
          options={{
            title: 'دوره‌های آموزشی',
          }}
        />
        <Drawer.Screen 
          name="ContentManagement" 
          component={ContentManagementScreen}
          options={{
            title: 'مدیریت محتوا',
          }}
        />
                    <Drawer.Screen
                      name="SoulCalculation"
                      component={SoulCalculationScreen}
                      options={{
                        title: 'محاسبه نفس',
                      }}
                    />
                    <Drawer.Screen
                      name="Motahari"
                      component={MotahariScreen}
                      options={{
                        title: 'استاد مطهری',
                      }}
                    />
                    <Drawer.Screen
                      name="BookReader"
                      component={BookReaderScreen}
                      options={{
                        title: 'کتابخوان',
                      }}
                    />
                    <Drawer.Screen
                      name="MasterSafaei"
                      component={MasterSafaeiScreen}
                      options={{
                        title: 'استاد صفایی حائری',
                      }}
                    />
                    <Drawer.Screen
                      name="AdminPanel"
                      component={AdminPanelScreen}
                      options={{
                        title: 'پنل مربی',
                      }}
                    />
                  </Drawer.Navigator>
    </NavigationContainer>
  );
}