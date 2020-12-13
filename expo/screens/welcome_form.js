import React, {useState} from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, RadioButton } from 'react-native-paper';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as myConstClass from './HttpLink';

const WelcomeForm = () => {

    const [Name, setName] = useState("");
    const [Salary, setSalary ] = useState("");
    const [modal, setmodal] = useState(false);
    const [checked, setChecked] = useState('yes');
    const submitData = ()=>{

        // Update the link below everytime you run the app unless you employ Heroku
        
        console.log(Name);
        console.log(Salary);
        console.log(checked);
        fetch(`${myConstClass.HTTP_LINK}/send-data`,{
            method:"post",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                    name: Name,
                    salary: Salary,
                    fixedExpenses: checked
                })
            })
            .then(res=>res.json())
            .then(data=>{
                Alert.alert(`Details of ${data.name} have been saved succesfully`)
            })
            .catch(err=>{
                Alert.alert("Some Error")
                console.log(err)
            })
        }


    return (
        <View style = {styles.root}>
            <View style={styles.text}>
                <Text style={styles.head}>
                    Welcome Form
                </Text>
                
                <Text>
                    Please fill up your personal details.
                </Text>
            </View>
            <TextInput
                label='Name'
                theme = {theme}
                mode = 'outlined'
                value= {Name}
                onChangeText={text => {setName(text)}}
            />

            <TextInput
                label='Salary'
                theme = {theme}
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
                    value="yes"
                    status={ checked === 'yes' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('yes')}
                />
                <Text>
                    No
                </Text>
                <RadioButton
                    value="no"
                    status={ checked === 'no' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('no')}
                />
            </View>
            <Button theme={theme} 
            icon="content-save" 
            mode="contained" 
            onPress={()=> submitData() }>
                Save
            </Button>
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
    },
    head:{
        fontSize: 25,
        paddingBottom: 10,
        paddingTop: 10
    }
})
export default WelcomeForm;