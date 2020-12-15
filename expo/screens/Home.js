import React, { useRef, useState, useEffect } from 'react';
import { View, Animated, FlatList, ScrollView, LogBox } from 'react-native';
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
    const [loading, setLoading] = useState(true)

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
            console.log("People data received.")
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

    const editProductHandler = (mode, item) => {
        console.log("Edit Product Button is pressed.");
        console.log(item.title+" is Selected for Edit Product section.");
        setEditProductProps(item);
        setViewMode(mode);
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
                                editProductHandler={editProductHandler}
                                totalExpenses={people.totalExpenses}
                                categoriesData={categoriesData}
                                allExpenses={expenses}
                    /> 
                </View>
            }
            {
                viewMode == "editProduct" &&
                <EditProduct item={editProductProps} categoriesData={categoriesData} NavbarButtonHandler={NavbarButtonHandler} />
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