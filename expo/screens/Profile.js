import { useNavigation } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import { KeyboardAvoidingView, View , Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert, FlatList, ScrollView, ImageBackground } from 'react-native';
import * as myConstClass from './HttpLink';

export default function Profile() {

    const [viewMode, setViewMode] = React.useState("expense");

    const [person, setPerson] = useState();
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const [name, setName] = useState("")
    const [income, setIncome] = useState(0)
    const [savings, setSavings] = useState(0)
    const [targetToSave, setTargetToSave] = useState(0)
    const [totalExpenses, setTotalExpenses] = useState(0)
    const [thisMonthStatus, setThisMonthStatus] = useState(income - totalExpenses - targetToSave)
    const [_id, set_id] = useState("");

    // UPDATE links -2
    const fetchData = () => {
        fetch(`${myConstClass.HTTP_LINK}/personDetails`)
        .then(res=>res.json())
        .then(results=>{
            
            setData(results[0])
            setName(results[0].name)
            setIncome(results[0].income)
            setSavings(results[0].savings)
            setTargetToSave(results[0].targetToSave)
            setTotalExpenses(results[0].totalExpenses)
            setThisMonthStatus(income - totalExpenses - targetToSave);
            set_id(results[0]._id)
            
            setLoading(false)
        })
    }

    const updateData = () =>{
        fetch(`${myConstClass.HTTP_LINK}/updatePerson`,{
            method:"post",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    id:_id,
                    name: name,
                    income: income,
                    savings: savings,
                    targetToSave: targetToSave,
                    thisMonthStatus: income - totalExpenses - targetToSave,
                    totalExpenses: totalExpenses
                })
        })
        .then(res=>res.json())
        .then(data=>{
            Alert.alert(`Details of ${name} has been updated`)
            setViewMode("expense")
        })
        .catch(err=>{
            Alert.alert("Some Error")
            console.log(err)
        })
    }

    useEffect(()=>{
        fetchData()
    },[])

    const LineDivider = () => {
        return (
            <View style={{ width: 0, paddingVertical: 20 }}>
                <View style={{ flex: 1, borderLeftColor: "gray", borderLeftWidth: 1 }}></View>
            </View>
        )
    }

    function renderExpense() {
        const property = [ "Monthly Income", "Expenses", "Target to save", "This month's status"];
        let vals = [ `₹ ${income}`, `₹ ${totalExpenses}`, `₹ ${targetToSave}`, `Over Spent (${income - totalExpenses - targetToSave})`];
        return (
            <View style={{ marginTop: 6 }} >
                {property.map((p) => {
                    return (
                        <View
                            key={property.indexOf(p)}
                            style={{
                                flexDirection: 'row',
                                height: 55,
                                paddingHorizontal: 12,
                                marginTop: 14,
                                marginHorizontal: 14,
                                borderRadius: 10,
                                backgroundColor: "white",
                            }}
                        >
                            {/* Name/Category */}
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ marginLeft: 8, color: "#194868", fontFamily: 'GothamMedium'}}>{p}</Text>
                            </View>

                            {/* Expenses */}
                            <View style={{ justifyContent: 'center' }}>                             
                                <Text style={ (p==="This month's status") ? ((income - totalExpenses - targetToSave>=0)?{ color: "#00CC00", fontFamily: 'GothamLight'}:{ color: "red", fontFamily: 'GothamLight'}): { color: "#194868", fontFamily: 'GothamLight' }}>{vals[property.indexOf(p)]}</Text>                               
                            </View>
                        </View>
                    );
                })}
                <TouchableOpacity
                    //key={property.indexOf(p)}
                    style={{
                        flexDirection: 'row',
                        height: 55,
                        paddingHorizontal: 12,
                        marginTop: 14,
                        marginHorizontal: 14,
                        borderRadius: 10,
                        backgroundColor: "white",
                        marginBottom: 14,
                    }}
                    onPress={() => {
                        setViewMode("edit"); 
                        console.log("Edit is pressed!");
                    }}
                >
                    {/* Name/Category */}
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ marginLeft: 8, color: "#194868", fontFamily: 'GothamMedium'}}>Edit Values</Text>
                    </View>

                    {/* Expenses */}
                    <View style={{ justifyContent: 'center' }}>
                        <Image style={{width: 20, height:20}}source={require('../assets/icons/right-arrow.png')} />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    function renderEdit() {
        return (
            <View>
            
            <View style={styles.container} >
            <KeyboardAvoidingView behavior="position">
            <Text style={styles.Text}>My Name</Text>
            <TextInput 
                style={styles.inputField}
                value={name}
                onChangeText={text => setName(text)}
            />

            <Text style={styles.Text}>Monthly Income</Text>
            <TextInput 
                style={styles.inputField}
                value={income.toString()}
                onChangeText={text => setIncome(parseInt(text))}
            />

            <Text style={styles.Text}>Target to save</Text>
            <TextInput 
                style={styles.inputField}
                value={targetToSave.toString()}
                onChangeText={text => setTargetToSave(parseInt(text))}
            />
            </KeyboardAvoidingView>
            {/* <Text style={styles.Text}>Extra expense this month</Text>
            <TextInput 
                style={styles.inputField}
            /> */}
            
            <TouchableOpacity 
                style={{marginTop: 5}}
                onPress={() => updateData()}
            >
                <View style={styles.button}>
                    <Text style={{color: "white", textAlign: "center", fontFamily: 'GothamMedium'}}>Save Changes</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity 
                style={{marginTop: 5}}
                onPress={() => setViewMode("expense")}
            >
                <View style={{
                        backgroundColor: "white",
                        padding: 12,
                        borderRadius: 6,
                        marginTop: 20,
                        marginBottom: 10,
                        marginHorizontal: 10,
                    }}>
                    <Text style={{color: "black", textAlign: "center", fontFamily: 'GothamMedium'}}>Cancel</Text>
                </View>
            </TouchableOpacity>
            </View>
        </View>
        )
    }

    const navigation = useNavigation();

    return (

        <ScrollView>
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: "white",}}>
                <View style={{ flexDirection: 'row', marginTop: 40 , marginBottom: 10}}>
                    <TouchableOpacity style={{ flex: 1,}} onPress={() => navigation.goBack()} >
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{marginLeft: 0, width: 27, height: 27, marginRight: 60 }} source={require('../assets/icons/back_arrow_icon.png')} />
                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 1,}}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{  marginLeft: 0, fontSize: 18,fontFamily: 'GothamMedium', color: "black"}}>Profile</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1,}}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} />
                    </View>
                </View>
            </View>
            <FlatList
            data={data[0]}
            keyExtractor={item=>item._id}
            onRefresh={()=>fetchData()}
            refreshing={loading}
            />
            <KeyboardAvoidingView behavior="position">
            <ImageBackground source={require('../assets/images/profile_background.jpeg')} style={styles.image}>
                <View style={styles.header}>
                    <Image 
                        source={require('../assets/images/profile.jpeg')} 
                        style={{width: 100, height: 100, borderRadius: 1000}}
                    />
                    <Text style={{paddingTop: 10, fontFamily: 'GothamMedium', fontSize: 18, lineHeight: 22, color: "white"}}>
                        {name}
                    </Text>
                </View>
            </ImageBackground>
            
            <View style={{ flexDirection: 'row', height: 40, backgroundColor: "#F5F7F9" }}>
                
                <TouchableOpacity
                    style={{ 
                        flex: 1,
                        margin: 5,
                        backgroundColor: viewMode == "expense" ? "#BEC1D2" : "#F5F7F9",
                        borderRadius: 5,
                    }}
                    onPress={() => {
                        fetchData();
                        setViewMode("expense");
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        
                        {/* <Image style={{width: 40, height:40}} source={require('../assets/icons/salary.png')} /> */}
                        <Text style={{fontFamily: 'GothamMedium', color: viewMode == "expense" ? "white" : "black",}}>Info</Text>
                    </View>
                </TouchableOpacity>

                {/* <LineDivider /> */}

                <TouchableOpacity
                    style={{ 
                        flex: 1,
                        margin: 5,
                        backgroundColor: viewMode == "edit" ? "#BEC1D2" : "#F5F7F9",
                        borderRadius: 5,
                    }}

                    // OVER HERE
                    onPress={() => setViewMode("edit")}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >    
                        {/* <Image style={{width: 40, height:40}} source={require('../assets/icons/pages.png')} /> */}
                        <Text style={{fontFamily: 'GothamMedium', color: viewMode == "edit" ? "white" : "black",}}>Edit</Text>
                    </View>
                </TouchableOpacity>
                </View>
                {
                    viewMode == "expense" &&
                    <View>
                        {renderExpense()}
                    </View>
                }
                {
                    viewMode == "edit" && 
                    <View>
                        {renderEdit()}
                    </View>
                }
                </KeyboardAvoidingView>
        </ScrollView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
    }, 
    header : {
       padding : 50,
       alignItems: 'center', 
       justifyContent: 'center',
    },
    inputField : {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#D1D1D1",
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 10,
        fontFamily: 'GothamLight'
    },

    Text : {
        color: "black",
        paddingTop: 20,
        paddingBottom: 8,
        marginHorizontal: 15,
        fontSize: 14,
        fontFamily: 'GothamMedium'
    },

    button : {
        backgroundColor: "black",
        padding: 12,
        borderRadius: 6,
        marginTop: 20,
        marginHorizontal: 10,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
});


