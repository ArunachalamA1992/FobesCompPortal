import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import StepIndicator from 'react-native-step-indicator';
import Color from '../../../Global/Color';
import {Dropdown} from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';

const SalaryandBenefits = () => {
  const navigation = useNavigation();
  const [salaryRange, setSalaryRange] = useState('');
  const [salaryType, setSalaryType] = useState('');
  const [selectedTags, setSelectedTags] = useState([])
  const tags = [
    'Provident Fund',
    'Paid Sick time',
    'Leave enhancement',
    'Work from home',
    'Health Insurance',
    'Cell Phone reimbursement',
  ];

  const labels = ['JobDetails', 'Salary & Benefits', 'Advance Information'];

  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 3,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#309CD2',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#309CD2',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#309CD2',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#309CD2',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 10,
    currentStepIndicatorLabelFontSize: 15,
    stepIndicatorLabelCurrentColor: '#309CD2',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#309CD2',
  };

  const salaryTypes = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
    {label: 'Item 4', value: '4'},
  ];

  const handleBenefits = tag => {
    if(selectedTags.includes(tag)) {
      const updatedTags = selectedTags.filter(item => item !== tag);
      setSelectedTags(updatedTags)
    } else {
      setSelectedTags([...selectedTags,tag])
    }
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={1}
        stepCount={3}
        labels={labels}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.h2}>Salary</Text>
        <View style={styles.salaryView}>
          <TouchableOpacity onPress={() => setSalaryRange('salaryRange')}>
            <Text
              style={[
                styles.salaryType,
                salaryRange == 'salaryRange'
                  ? {backgroundColor: Color.lightSky}
                  : null,
              ]}>
              Salary Range
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSalaryRange('customSalary')}>
            <Text
              style={[
                styles.salaryType,
                salaryRange == 'customSalary'
                  ? {backgroundColor: Color.lightSky}
                  : null,
              ]}>
              Custom Salary
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.salaryInputView}>
          <View>
            <Text style={styles.h2}>Minimum Salary</Text>
            <View style={styles.salaryInputView2}>
              <TextInput style={styles.salaryInput} keyboardType="numeric" />
              <Text>₹</Text>
            </View>
          </View>
          <View>
            <Text style={styles.h2}>Minimum Salary</Text>
            <View style={styles.salaryInputView2}>
              <TextInput style={styles.salaryInput} keyboardType="numeric"/>
              <Text>₹</Text>
            </View>
          </View>
        </View>

        <>
          <Text style={styles.h2}>Salary Type <Text style={styles.star}>*</Text></Text>
          <Dropdown
            style={styles.dropdown}
            containerStyle={styles.dropContainer}
            itemTextStyle={styles.dropTextStyle}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            iconColor={Color.smokeyGrey}
            data={salaryTypes}
            maxHeight={200}
            labelField="label"
            valueField="label"
            placeholder="Design/Creative"
            value={salaryType}
            onChange={item => {
              setSalaryType(item.label);
            }}
          />
        </>

        <>
          <Text style={styles.h2}>Benefits</Text>
          <View style={styles.tagsContainer}>
            {tags.map((tag, index) => (
              <TouchableOpacity
                style={[
                  styles.tagList,
                  selectedTags.includes(tag.toLowerCase()) == true
                    ? {backgroundColor: Color.lightSky}
                    : null,
                ]}
                key={index}
                onPress={() => handleBenefits(tag.toLowerCase())}>
                <Text style={styles.p1}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      </View>
      <TouchableOpacity
        style={styles.nextView}
        onPress={() => navigation.navigate('AdvanceInformation')}>
        <Text style={styles.next}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SalaryandBenefits;

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    backgroundColor: '#ffff',
    gap: 15,
  },
  inputContainer: {
    paddingHorizontal: 20,
    gap: 15,
  },
  h1: {
    color: Color.black,
    fontSize: 20,
  },
  h2: {
    color: Color.black,
    fontSize: 16,
  },
  p: {
    color: Color.black,
    fontSize: 14,
  },
  p2: {
    color: Color.white,
  },
  star: {
    color: Color.red,
  },
  input: {
    backgroundColor: Color.softGrey,
    fontSize: 16,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: Color.smokeyGrey,
    borderRadius: 5,
  },
  salaryView: {
    flexDirection: 'row',
  },
  salaryType: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: Color.blue,
    borderRadius: 20,
  },
  salaryInputView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  salaryInputView2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 10,
    borderWidth: 0.5,
    borderWidthColor: Color.smokeyGrey,
    borderRadius: 2,
  },
  salaryInput: {
    width: 120,
    color: Color.black,
    paddingVertical: 5,
  },
  ///dropdown
  dropDownContainer: {
    paddingHorizontal: 15,
    gap: 15,
  },
  dropdown: {
    margin: height * 0.008,
    height: height * 0.06,
    width: width * 0.88,
    backgroundColor: Color.softGrey,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 5,
  },
  dropContainer: {
    color: Color.black,
  },
  placeholderStyle: {
    color: Color.smokeyGrey,
    fontSize: 16,
    marginLeft: width * 0.04,
  },
  dropTextStyle: {
    color: Color.black,
  },
  selectedTextStyle: {
    color: Color.black,
    fontSize: 16,
    marginLeft: width * 0.04,
  },
  iconStyle: {
    width: 25,
    height: 25,
    marginRight: 10,
    backgroundColor: Color.primaryColor,
    borderRadius: 10,
  },

  tagList: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: Color.blue,
    borderRadius: 20,
  },
  tagsContainer: {
    flexWrap: 'wrap',
    width: width * 0.9,
    Height: height * 0.5,
    resizeMode: 'stretch',
    flexDirection: 'row',
  },
  next: {
    color: Color.white,
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: Color.primary,
    paddingVertical: 10,
    marginHorizontal: 18,
    marginTop: 30,
    marginBottom: 40,
    borderRadius: 8,
  },
});
