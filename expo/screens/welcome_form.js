import React, {useState} from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, RadioButton } from 'react-native-paper';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

const WelcomeForm = () => {

    const [Name, setName] = useState("");
    const [Salary, setSalary ] = useState("");
    const [FixedExpense, setFixedExpense ] = useState(false);
    const [modal, setmodal] = useState(false);
    const [checked, setChecked] = React.useState('first');

    return (
        <View style = {styles.root}>
            <View style={styles.text}>
                <Text>
                    Welcome Form
                </Text>
                
                <Text>
                    Please fill up your personal details.
                </Text>
            </View>
            <TextInput
                label='Name'
                //theme = {theme}
                mode = 'outlined'
                value= {Name}
                onChangeText={text => {setName(text)}}
            />

            <TextInput
                label='Salary'
                //theme = {theme}
                mode = 'outlined'
                value= {Salary}
                onChangeText={text => {setSalary(text)}}
            />
            <Text>
                Do you have any fixed expenditures.
            </Text>
            <View>
                <Text>
                    Yes
                </Text>
                <RadioButton
                    value="first"
                    status={ checked === 'first' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('first')}
                />
                <Text>
                    No
                </Text>
                <RadioButton
                    value="second"
                    status={ checked === 'second' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('second')}
                />
            </View>
            
        </View>
    );
}
const theme = {
    colors:{
        primary:"skyblue",
    },
    //padding: 10,
}
const styles = StyleSheet.create({
    root:{
        margin: 20,
        padding:10,
    },
    text:{
        padding : 10,
        alignItems: 'center',
        fontSize: 50
    }
})
export default WelcomeForm;