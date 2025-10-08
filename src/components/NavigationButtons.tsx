import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  previousDisabled?: boolean;
  nextDisabled?: boolean;
  previousText?: string;
  nextText?: string;
  showPrevious?: boolean;
  showNext?: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onPrevious,
  onNext,
  previousDisabled = false,
  nextDisabled = false,
  previousText = 'قبلی',
  nextText = 'بعدی',
  showPrevious = true,
  showNext = true,
}) => {
  return (
    <View style={styles.container}>
      {showPrevious && (
        <TouchableOpacity
          style={[
            styles.navButton,
            styles.previousButton,
            previousDisabled && styles.disabledButton
          ]}
          onPress={onPrevious}
          disabled={previousDisabled}
        >
          <Icon name="chevron-right" size={20} color={previousDisabled ? '#bdc3c7' : '#fff'} />
          <Text style={[
            styles.navButtonText,
            previousDisabled && styles.disabledButtonText
          ]}>
            {previousText}
          </Text>
        </TouchableOpacity>
      )}

      {showNext && (
        <TouchableOpacity
          style={[
            styles.navButton,
            styles.nextButton,
            nextDisabled && styles.disabledButton
          ]}
          onPress={onNext}
          disabled={nextDisabled}
        >
          <Text style={[
            styles.navButtonText,
            nextDisabled && styles.disabledButtonText
          ]}>
            {nextText}
          </Text>
          <Icon name="chevron-left" size={20} color={nextDisabled ? '#bdc3c7' : '#fff'} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  previousButton: {
    backgroundColor: '#7f8c8d',
  },
  nextButton: {
    backgroundColor: '#3498db',
  },
  disabledButton: {
    backgroundColor: '#ecf0f1',
    elevation: 0,
    shadowOpacity: 0,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  disabledButtonText: {
    color: '#bdc3c7',
  },
});

export default NavigationButtons;
