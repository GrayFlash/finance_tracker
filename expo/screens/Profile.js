import React, {useState, useEffect} from 'react';
import { KeyboardAvoidingView, View , Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert, FlatList, ScrollView } from 'react-native';
import * as myConstClass from './HttpLink';

export default function Profile() {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const [name, setName] = useState("")
    const [income, setIncome] = useState(0)
    const [savings, setSavings] = useState(0)
    const [targetToSave, setTargetToSave] = useState(0)
    const [totalExpenses, setTotalExpenses] = useState(0)
    const [thisMonthStatus, setThisMonthStatus] = useState("")
    const [_id, set_id] = useState("")

    // UPDATE links -2
    const fetchData = () => {
        fetch(`${myConstClass.HTTP_LINK}/personDetails`)
        .then(res=>res.json())
        .then(results=>{
            
            setData(results)
            setName(results[0].name)
            setIncome(results[0].income)
            setSavings(results[0].savings)
            setTargetToSave(results[0].targetToSave)
            setTotalExpenses(results[0].totalExpenses)
            setThisMonthStatus(results[0].thisMonthStatus)
            set_id(results[0]._id)
            
            console.log(results[0].name)
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
                    thisMonthStatus: thisMonthStatus,
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

    const [viewMode, setViewMode] = React.useState("expense");

    function renderExpense() {

        const property = [ "Monthly Income", "Expenses", "Target to save", "This month's status"];
        const vals = [ `${income} USD`, `${totalExpenses} USD`, `${targetToSave} USD`, `Over Spent  (${thisMonthStatus})`];
        return (
            <View style={{ marginTop: 6 }} >
                {property.map((p) => {
                    return (
                        <View>
                        <View
                            key={property.indexOf(p)}
                            style={{
                                flexDirection: 'row',
                                height: 60,
                                paddingHorizontal: 12,
                                marginTop: 14,
                                marginHorizontal: 18,
                                borderRadius: 10,
                                backgroundColor: "white",
                            }}
                            onPress={() => {
                                console.log(p+" is pressed!");
                            }}
                        >
                            {/* Name/Category */}
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ marginLeft: 8, color: "#194868", fontFamily: 'GothamMedium'}}>{p}</Text>
                            </View>

                            {/* Expenses */}
                            <View style={{ justifyContent: 'center' }}>                             
                                <Text style={ (p==="This month's status") ? ((thisMonthStatus>=0)?{ color: "#00CC00", fontFamily: 'GothamLight'}:{ color: "red", fontFamily: 'GothamLight'}): { color: "#194868", fontFamily: 'GothamLight' }}>{vals[property.indexOf(p)]}</Text>                               
                            </View>
                        </View>
                    </View>
                    );
                })}
                <TouchableOpacity
                    // key={property.indexOf(p)}
                    style={{
                        flexDirection: 'row',
                        height: 60,
                        paddingHorizontal: 12,
                        marginTop: 14,
                        marginHorizontal: 18,
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
                        marginBottom: 10
                    }}>
                    <Text style={{color: "black", textAlign: "center", fontFamily: 'GothamMedium'}}>Cancel</Text>
                </View>
            </TouchableOpacity>
            </View>
        </View>
        )
    }

    return (

        <ScrollView>
            <FlatList
            data={data[0]}
            keyExtractor={item=>item._id}
            onRefresh={()=>fetchData()}
            refreshing={loading}
            />
            <KeyboardAvoidingView behavior="position">
            <View style={styles.header}>
                <Image 
                    source={require('../assets/icons/profile.jpg')} 
                    style={{width: 100, height: 100, borderRadius: 1000}}
                />
                <Text style={{paddingTop: 10, fontFamily: 'GothamMedium', lineHeight: 22}}>
                    {name}
                </Text>
            </View>
            <View style={{ flexDirection: 'row', height: 80, backgroundColor: "#F5F7F9" }}>

            <TouchableOpacity
                    style={{ 
                        flex: 1,
                        margin: 5,
                        borderBottomColor: viewMode == "expense" ? "#BEC1D2" : "#F5F7F9",
                        borderBottomWidth: 2,
                    }}
                    onPress={() => setViewMode("expense")}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        
                        <Image style={{width: 40, height:40}} source={require('../assets/icons/salary.png')} />
                    </View>
                </TouchableOpacity>

                <LineDivider />

                <TouchableOpacity
                    style={{ 
                        flex: 1,
                        margin: 5,
                        borderBottomColor: viewMode == "edit" ? "#BEC1D2" : "#F5F7F9",
                        borderBottomWidth: 2,
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
                        
                        <Image style={{width: 40, height:40}} source={require('../assets/icons/pages.png')} />
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
        paddingTop: 5,
    }, 
    header : {
       padding : 50,
       backgroundColor: '#d1d0cd',
       alignItems: 'center', 
       justifyContent: 'center',
    },
    inputField : {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#D1D1D1",
        borderRadius: 5,
        padding: 10,
        fontFamily: 'GothamLight'
    },

    Text : {
        color: "black",
        paddingTop: 8,
        paddingBottom: 8,
        fontFamily: 'GothamMedium'
    },

    button : {
        backgroundColor: "black",
        padding: 12,
        borderRadius: 6,
        marginTop: 20
    }
});


