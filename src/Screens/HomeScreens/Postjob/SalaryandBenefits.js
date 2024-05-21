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
import {useNavigation} from '@react-navigation/native';
import {Gilmer} from '../../../Global/FontFamily';

const SalaryandBenefits = () => {
  const navigation = useNavigation();
  const [salaryRange, setSalaryRange] = useState('');
  const [salaryType, setSalaryType] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
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
    separatorStrokeWidth: 4,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#309CD2',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#309CD2',
    stepStrokeUnFinishedColor: '#EAEAEF',
    separatorFinishedColor: '#309CD2',
    separatorUnFinishedColor: '#EAEAEF',
    stepIndicatorFinishedColor: '#309CD2',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 10,
    currentStepIndicatorLabelFontSize: 15,
    stepIndicatorLabelCurrentColor: '#309CD2',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#EAEAEF',
    labelColor: '#EAEAEF',
    labelSize: 13,
    currentStepLabelColor: Color.black,
  };

  const salaryTypes = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
    {label: 'Item 4', value: '4'},
  ];

  const handleBenefits = tag => {
    if (selectedTags.includes(tag)) {
      const updatedTags = selectedTags.filter(item => item !== tag);
      setSelectedTags(updatedTags);
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <View style={{flex: 1, padding: 10, backgroundColor: Color.white}}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={1}
        stepCount={3}
        labels={labels}
      />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
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
              {/* <View style={styles.salaryInputView2}> */}
              <TextInput
                style={styles.salaryInput}
                placeholder="₹ Minimum Salary"
                placeholderTextColor={Color.cloudyGrey}
                keyboardType="numeric"
              />
              {/* </View> */}
            </View>
            <View>
              <Text style={styles.h2}>Maximum Salary</Text>
              <View style={styles.salaryInputView2}>
                <TextInput
                  style={styles.salaryInput}
                  placeholder="₹ Maximum Salary"
                  placeholderTextColor={Color.cloudyGrey}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>

          <>
            <Text style={styles.h2}>
              Salary Type <Text style={styles.star}>*</Text>
            </Text>
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
    </View>
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
    // paddingHorizontal: 20,
    gap: 15,
  },
  h1: {
    color: Color.black,
    fontSize: 20,
    fontFamily: Gilmer.Medium,
  },
  h2: {
    color: Color.black,
    fontSize: 16,
    fontFamily: Gilmer.Medium,
  },
  p: {
    color: Color.black,
    fontSize: 14,
    fontFamily: Gilmer.Medium,
  },
  p2: {
    color: Color.white,
    fontFamily: Gilmer.Medium,
  },
  star: {
    color: Color.red,
    fontFamily: Gilmer.Medium,
  },
  input: {
    backgroundColor: Color.Fantasy,
    fontSize: 16,
    fontFamily: Gilmer.Medium,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Color.lightgrey,
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
    color: Color.black,
    fontFamily: Gilmer.Medium,
    borderRadius: 20,
  },
  salaryInputView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  salaryInputView2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 10,
    // borderWidth: 1,
    // borderColor: Color.lightgrey,
  },
  salaryInput: {
    color: Color.black,
    fontFamily: Gilmer.Medium,
    borderWidth: 1,
    borderColor: Color.lightgrey,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
    // paddingVertical: 5,
    padding: 10,
  },
  ///dropdown
  dropDownContainer: {
    // paddingHorizontal: 15,
    gap: 15,
  },
  dropdown: {
    // margin: height * 0.008,
    // height: height * 0.06,
    // width: width * 0.88,
    height: 45,
    backgroundColor: Color.Fantasy,
    borderColor: Color.lightgrey,
    borderWidth: 1,
    borderRadius: 5,
  },
  dropContainer: {
    color: Color.black,
    fontFamily: Gilmer.Medium,
  },
  placeholderStyle: {
    color: Color.smokeyGrey,
    fontFamily: Gilmer.Medium,
    fontSize: 16,
    marginLeft: width * 0.04,
  },
  dropTextStyle: {
    color: Color.black,
    fontFamily: Gilmer.Medium,
  },
  selectedTextStyle: {
    color: Color.black,
    fontFamily: Gilmer.Medium,
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
    fontSize: 18,
    fontFamily: Gilmer.Medium,
    textAlign: 'center',
    backgroundColor: Color.primary,
    padding: 10,
    marginTop: 30,
    // marginBottom: 40,
    borderRadius: 5,
  },
});
