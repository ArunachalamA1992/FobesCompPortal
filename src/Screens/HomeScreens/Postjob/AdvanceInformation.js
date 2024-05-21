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
import {useNavigation} from '@react-navigation/native';
import StepIndicator from 'react-native-step-indicator';
import Color from '../../../Global/Color';
import {Dropdown} from 'react-native-element-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import {Gilmer} from '../../../Global/FontFamily';

const AdvanceInformation = () => {
  const navigation = useNavigation();
  const [Education, setEducation] = useState('');
  const [Experience, setExperience] = useState('');
  const labels = ['JobDetails', 'Salary & Benefits', 'Advance Information'];
  const [totalVacancies, setTotalVacancies] = useState('');
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [remotePosition, setRemotePosition] = useState(false);
  const [screeningQues, setScreeningQues] = useState('');
  const [applyJobOn, setApplyJobOn] = useState('');
  const tags = [
    'Full Time',
    'Part Time',
    'Contractual',
    'Internship',
    'Freelance',
  ];

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

  const EducationType = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
    {label: 'Item 4', value: '4'},
  ];

  const ExperienceYears = [
    {label: '0 - 1 years', value: '1'},
    {label: '1 - 2 years', value: '2'},
    {label: '2 - 4 years', value: '3'},
    {label: '4 - 9 years', value: '4'},
  ];

  const Vacancies = [
    {label: '1 - 5', value: '1'},
    {label: '5 - 10', value: '2'},
    {label: '10 - 20', value: '3'},
    {label: '20+', value: '4'},
  ];

  const applyJobOnList = [
    {label: '1 - 5', value: '1'},
    {label: '5 - 10', value: '2'},
    {label: '10 - 20', value: '3'},
  ];

  const handleJobType = tag => {
    if (selectedJobs.includes(tag)) {
      const updatedTags = selectedJobs.filter(item => item !== tag);
      setSelectedJobs(updatedTags);
    } else {
      setSelectedJobs([...selectedJobs, tag]);
    }
  };

  return (
    <View style={{flex: 1, padding: 10, backgroundColor: Color.white}}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={2}
        stepCount={3}
        labels={labels}
      />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <View style={styles.inputContainer}>
          <Text style={styles.h1}>
            Education <Text style={styles.star}>*</Text>
          </Text>
          <Dropdown
            style={styles.dropdown}
            containerStyle={styles.dropContainer}
            itemTextStyle={styles.dropTextStyle}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            iconColor={Color.smokeyGrey}
            data={EducationType}
            maxHeight={200}
            labelField="label"
            valueField="label"
            placeholder="Required Education"
            value={Education}
            onChange={item => {
              setEducation(item.label);
            }}
          />

          <Text style={styles.h1}>
            Experience <Text style={styles.star}>*</Text>
          </Text>
          <Dropdown
            style={styles.dropdown}
            containerStyle={styles.dropContainer}
            itemTextStyle={styles.dropTextStyle}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            iconColor={Color.smokeyGrey}
            data={ExperienceYears}
            maxHeight={200}
            labelField="label"
            valueField="label"
            placeholder="Required Experience"
            value={Experience}
            onChange={item => {
              setExperience(item.label);
            }}
          />

          <Text style={styles.h1}>
            Job Type <Text style={styles.star}>*</Text>
          </Text>
          <View style={styles.tagsContainer}>
            {tags.map((tag, index) => (
              <TouchableOpacity
                style={[
                  styles.tagList,
                  selectedJobs.includes(tag.toLowerCase()) == true
                    ? {backgroundColor: Color.lightSky}
                    : null,
                ]}
                key={index}
                onPress={() => handleJobType(tag.toLowerCase())}>
                <Text style={styles.p1}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.h1}>
            Total Vacancies <Text style={styles.star}>*</Text>
          </Text>
          <Dropdown
            style={styles.dropdown}
            containerStyle={styles.dropContainer}
            itemTextStyle={styles.dropTextStyle}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            iconColor={Color.smokeyGrey}
            data={Vacancies}
            maxHeight={200}
            labelField="label"
            valueField="label"
            placeholder="Number of Vacancies"
            value={totalVacancies}
            onChange={item => {
              setTotalVacancies(item.label);
            }}
          />
          <Text style={styles.h1}>
            Deadline Expired <Text style={styles.star}>*</Text>
          </Text>
          <View style={styles.dataView}>
            <TextInput
              style={styles.date}
              placeholder="DD/MM/YYYY"
              maxLength={10}
            />
            <FontAwesome name="calendar" size={20} color={Color.smokeyGrey} />
          </View>
          <Text style={styles.h1}>
            Location <Text style={styles.star}>*</Text>
          </Text>
          <TextInput style={styles.input} placeholder="Enter Company Address" />
          <View style={styles.remotePositionView}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.checkBox}
              onPress={() => setRemotePosition(!remotePosition)}>
              {remotePosition && (
                <FontAwesome name="check" size={15} color={Color.green} />
              )}
            </TouchableOpacity>
            <Text style={styles.p}>Fully Remote Position-Worldwide</Text>
          </View>
          <Text style={styles.h1}>Add Screening Questions</Text>
          <TextInput
            style={styles.input}
            placeholder="New screening question"
          />
          <View style={styles.radioView}>
            <TouchableOpacity onPress={() => setScreeningQues('saveForLater')}>
              {screeningQues === 'saveForLater' ? (
                <Fontisto
                  name="radio-btn-active"
                  size={20}
                  color={Color.blue}
                />
              ) : (
                <Fontisto
                  name="radio-btn-passive"
                  size={20}
                  color={Color.smokeyGrey}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.p}>Save For Later</Text>
          </View>
          <View style={styles.radioView}>
            <TouchableOpacity onPress={() => setScreeningQues('Required')}>
              {screeningQues === 'Required' ? (
                <Fontisto
                  name="radio-btn-active"
                  size={20}
                  color={Color.blue}
                />
              ) : (
                <Fontisto
                  name="radio-btn-passive"
                  size={20}
                  color={Color.smokeyGrey}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.p}>Required ( Candidate must answer )</Text>
          </View>

          <View style={styles.applyJobOnView}>
            <Text style={styles.h1}>Apply for Job On</Text>
            <Dropdown
              style={styles.dropdown}
              containerStyle={styles.dropContainer}
              itemTextStyle={styles.dropTextStyle}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              iconColor={Color.smokeyGrey}
              data={applyJobOnList}
              maxHeight={200}
              labelField="label"
              valueField="label"
              placeholder="External Platform"
              value={applyJobOn}
              onChange={item => {
                setApplyJobOn(item.label);
              }}
            />
            <Text style={styles.p2}>
              Candidate apply for a job on your website, all applications on
              your own website
            </Text>
          </View>
          <Text style={styles.h1}>Apply for Job On</Text>
          <View style={styles.urlView}>
            <Feather name="link-2" size={20} color={Color.smokeyGrey} />
            <TextInput style={styles.urlInput} placeholder="Website" />
          </View>
        </View>
        <TouchableOpacity
          style={styles.nextView}
          onPress={() => navigation.navigate('Congratulations')}>
          <Text style={styles.next}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AdvanceInformation;

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
    fontSize: 16,
    fontFamily: Gilmer.Medium,
  },
  h2: {
    color: Color.black,
    fontSize: 20,
    fontFamily: Gilmer.Medium,
  },
  p: {
    color: Color.black,
    fontSize: 14,
    fontFamily: Gilmer.Medium,
  },
  p2: {
    color: Color.lightBlack,
    fontSize: 12,
    fontFamily: Gilmer.Medium,
  },
  star: {
    color: Color.red,
    fontSize: 14,
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
  /////dropdown
  dropDownContainer: {
    // paddingHorizontal: 10,
    gap: 15,
  },
  dropdown: {
    // margin: height * 0.005,
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
    fontSize: 16,
    fontFamily: Gilmer.Medium,
    marginLeft: width * 0.04,
  },
  dropTextStyle: {
    color: Color.black,
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
    fontSize: 20,
    fontFamily: Gilmer.Medium,
    textAlign: 'center',
    backgroundColor: Color.primary,
    paddingVertical: 10,
    marginHorizontal: 18,
    borderRadius: 8,
  },
  ////Date
  dataView: {
    backgroundColor: Color.Fantasy,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: Color.lightgrey,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    width: 250,
    fontSize: 16,
    fontFamily: Gilmer.Medium,
    color: Color.black,
  },
  remotePositionView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  checkBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: Color.lightgrey,
    padding: 1,
    borderRadius: 2,
  },
  radioView: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 5,
  },
  applyJobOnView: {
    gap: 10,
  },
  urlView: {
    backgroundColor: Color.Fantasy,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: Color.lightgrey,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
  urlInput: {
    width: 250,
    fontSize: 16,
    fontFamily: Gilmer.Medium,
    color: Color.black,
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
