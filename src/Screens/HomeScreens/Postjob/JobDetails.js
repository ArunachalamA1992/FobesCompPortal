import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import {Dropdown} from 'react-native-element-dropdown';
import Color from '../../../Global/Color';
import {useNavigation} from '@react-navigation/native';

const JobDetails = () => {
  const navigation = useNavigation();
  const [Category, setCategory] = useState(null);
  const [role, setRole] = useState(null);
  const [tagInput, setTagInput] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [tags, setTags] = useState([]);
  const [skills, setSkills] = useState([]);
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

  const categories = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
    {label: 'Item 4', value: '4'},
    {label: 'Item 5', value: '5'},
    {label: 'Item 6', value: '6'},
    {label: 'Item 7', value: '7'},
    {label: 'Item 8', value: '8'},
  ];

  const roles = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
    {label: 'Item 4', value: '4'},
    {label: 'Item 5', value: '5'},
    {label: 'Item 6', value: '6'},
    {label: 'Item 7', value: '7'},
    {label: 'Item 8', value: '8'},
  ];

  const TagList = ({item, index}) => (
    <View style={styles.tagList} key={index}>
      <Text style={styles.p1}>{item}</Text>
      <TouchableOpacity>
        <Text style={styles.p1}>x</Text>
      </TouchableOpacity>
    </View>
  );

  const createTags = () => {
    if(tags.length < 6 || setTagInput != ""){
      setTags([...tags,tagInput])
      setTagInput("")
    } else {
      null
    }
  }

  const createSkillTags = () => {
    if(skills.length < 6 || setSkillInput != ""){
      setSkills([...skills,skillInput])
      setSkillInput("")
    } else {
      null
    }
  }

  

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={0}
        stepCount={3}
        labels={labels}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.h1}>Job Title<Text style={styles.star}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholderTextColor={Color.smokeyGrey}
          placeholder="Enter Job Title"
        />
      </View>
      <View style={styles.dropDownContainer}>
        <Text style={styles.h1}>Job Category *</Text>
        <Dropdown
          style={styles.dropdown}
          containerStyle={styles.dropContainer}
          itemTextStyle={styles.dropTextStyle}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          iconColor={Color.smokeyGrey}
          data={categories}
          maxHeight={200}
          labelField="label"
          valueField="label"
          placeholder="Design/Creative"
          value={Category}
          onChange={item => {
            setCategory(item.label);
          }}
        />
        <Text style={styles.h1}>Job Role <Text style={styles.star}>*</Text></Text>
        <Dropdown
          style={styles.dropdown}
          containerStyle={styles.dropContainer}
          itemTextStyle={styles.dropTextStyle}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          iconColor={Color.smokeyGrey}
          data={roles}
          maxHeight={200}
          labelField="label"
          valueField="label"
          placeholder="Select item"
          value={role}
          onChange={item => {
            setRole(item.label);
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.h1}>Tags<Text style={styles.star}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholderTextColor={Color.smokeyGrey}
          placeholder="Enter Job Title"
          value={tagInput}
          onChangeText={text => setTagInput(text)}
          onEndEditing={() => createTags()}
        />
        <Text style={styles.p}>Search or write tag and hit enter</Text>
        <View style={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <TagList item={tag} index={index} key={index} />
          ))}
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.h1}>Required Skills <Text style={styles.star}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholderTextColor={Color.smokeyGrey}
          placeholder="Enter Job Title"
          value={skillInput}
          onChangeText={text => setSkillInput(text)}
          onEndEditing={() => createSkillTags()}
        />
        <Text style={styles.p}>Add 4 to 6 Skills to get best Candidates</Text>
        <View style={styles.tagsContainer}>
          {skills.map((tag, index) => (
            <TagList item={tag} index={index} key={index} />
          ))}
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.h1}>Required Skills <Text style={styles.star}>*</Text></Text>
        <TextInput
          style={styles.input}
          multiline={true}
          numberOfLines={4}
          placeholderTextColor={Color.smokeyGrey}
          textAlignVertical='top'
          placeholder="Enter Job Title"
        />
      </View>
      <TouchableOpacity
        style={styles.nextView}
        onPress={() => navigation.navigate('SalaryandBenefits')}>
        <Text style={styles.next}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

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
    fontSize: 16,
  },
  h2: {
    color: Color.black,
    fontSize: 20,
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
  ////
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
    backgroundColor: Color.lightSky,
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
    flexWrap: "wrap",
    width: width* 0.9,
    Height: height* 0.5,
    resizeMode: "stretch",
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

export default JobDetails;
