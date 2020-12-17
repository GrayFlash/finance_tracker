import React, { useRef, useState, useEffect } from 'react';
import { View, Animated, FlatList, ScrollView, LogBox, Alert } from 'react-native';
import AddSection from '../components/AddPage';
import Expenses from '../components/Expenses';
import EditProduct from '../components/ExpensesPageComponents/EditProduct';
import NavigationBar from '../components/NavigationBar';
import ChartPage from '../components/PieChart';
import * as myConstClass from './HttpLink';

export default function Home () {

    const categoryListHeightAnimationValue = useRef(new Animated.Value(172.5)).current;
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [viewMode, setViewMode] = useState("expenses");
    const [editProductProps, setEditProductProps] = React.useState(null);
    const [expenses, setExpenses] = useState([])
    const [categoriesData, setCategoriesData] = useState([])
    const [people, setPeople] = useState([])
    const [loading, setLoading] = useState(true);

    // UPDATE links
    
    // FETCHES - expense, categories, profile

    const fetchExpense = () =>{
        fetch(`${myConstClass.HTTP_LINK}/fetchExpense`)
        .then(res=>res.json())
        .then(results=>{
            console.log("Expenses data received.")
            setExpenses(results)
            setLoading(false)
        })
        return 1;
    }


    const fetchData = () => {
        //let y = fetchExpense();
        fetch(`${myConstClass.HTTP_LINK}/personDetails`)
        .then(res=>res.json())
        .then(results=>{
            console.log("People data received inside Home Page.")
            setPeople(results[0])
        })
    }
    const fetchCategory = () => {
        let x = fetchData();
        fetch(`${myConstClass.HTTP_LINK}/fetchCategoryData`)
        .then(res=>res.json())
        .then(results=>{
            console.log("categoriesData received.");
            //console.log(results)
            setCategoriesData(results)
            //setLoading(false)
        }).catch(err=>{
            console.log("Yo Bitch, got Error while receiving categoriesData in Home.js\n"+err)
        })
    }

    useEffect(()=>{
        fetchCategory(),
        fetchData(),
        fetchExpense(),
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    },[])

    // END of fetch


    const NavbarButtonHandler = (mode) => {
        console.log(`NavBar ${mode} Button is pressed!!`);
        setViewMode(mode);
    }

    const categoryButtonHandler = (item) => {
        console.log(`${item.name} category button is pressed....`);
        setSelectedCategory(item);
    }

    const editProductOpenButtonHandler = (mode, item) => {
        console.log("Edit Product Page is called.");
        console.log(item.title+" is Selected for Edit Product section.");
        setEditProductProps(item);
        setViewMode(mode);
    }

    const editProductSaveButtonHandler = (item) => {
        console.log(`Saving ${item.title} product ...`);
        fetch(`${myConstClass.HTTP_LINK}/updateExpense`,{
            method:"post",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(item)
        })
        .then(res=>res.json())
        .then(data=>{
            Alert.alert(`Details of ${item.title} has been updated`)
        })
        .then(() => {
            NavbarButtonHandler("expenses");
            setLoading(true);
            fetchExpense();
            setLoading(false);
        })
        .catch(err=>{
            Alert.alert("Some Error on Saving product in Edit Product Page.")
            console.log(err)
        });
    }

    const editProductDeleteButtonHandler = (_id, productName) => {
        fetch(`${myConstClass.HTTP_LINK}/deleteExpense`,{
            method:"post",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:_id
            })
        })
        .then(res=>res.json())
        .then(data=>{
            Alert.alert(`Details of ${productName} has been deleted`)
        })
        .then(() => {
            NavbarButtonHandler("expenses");
            setLoading(true);
            fetchExpense();
            setLoading(false);
        })
        .catch(err=>{
            Alert.alert("Some Error while Deleting a product inside Edit Product Page.")
            console.log(err)
        });
    }

    return (  
        <ScrollView>
            {<NavigationBar viewMode={viewMode} NavbarButtonHandler={NavbarButtonHandler}/>}

            {
                viewMode == "expenses" &&
                <View style={{marginBottom: 20}}>
                    <Expenses   clhav={categoryListHeightAnimationValue} 
                                selectedCategory={selectedCategory}
                                setSelectedCategory={categoryButtonHandler}
                                totalExpenses={people.totalExpenses}
                                categoriesData={categoriesData}
                                allExpenses={expenses}
                                editProductHandler={editProductOpenButtonHandler}
                    /> 
                </View>
            }
            {
                viewMode == "editProduct" &&
                <EditProduct    item={editProductProps} 
                                categoriesData={categoriesData} 
                                NavbarButtonHandler={NavbarButtonHandler} 
                                editProductSaveButtonHandler={editProductSaveButtonHandler}
                                editProductDeleteButtonHandler={editProductDeleteButtonHandler}
                 />
            }
            {
                viewMode == "chart" &&
                <ChartPage catData={categoriesData} ppl={people} />
            }
            {
                viewMode == "add" &&
                <AddSection  categoriesData={categoriesData} people={people}/>
            }
            
        </ScrollView>
    );
}