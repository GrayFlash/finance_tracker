import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useEffect } from 'react';
import { View, Animated, FlatList } from 'react-native';
import AddSection from '../components/AddPage';
import Expenses from '../components/Expenses';
import NavigationBar from '../components/NavigationBar';
import ChartPage from '../components/PieChart';
import { person } from '../data/dummyPerson';

export default function Home (props) {

    const categoryListHeightAnimationValue = useRef(new Animated.Value(172.5)).current;
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [viewMode, setViewMode] = useState("expenses");
    const [expenses, setExpenses] = useState([])
    const [categoriesData, setCategoriesData] = useState([])
    const [people, setPeople] = useState([])
    const [loading, setLoading] = useState(true)

    // UPDATE links
    
    // FETCHES - expense, categories, profile

    const fetchExpense = () =>{
        fetch('http://9776686554bd.ngrok.io/fetchExpense')
        .then(res=>res.json())
        .then(results=>{
            console.log("Expenses")
            setExpenses(results)
            setLoading(false)
        })
        return 1;
    }


    const fetchData = () => {
        //let y = fetchExpense();
        fetch('http://9776686554bd.ngrok.io/personDetails')
        .then(res=>res.json())
        .then(results=>{
            console.log("People")
            setPeople(results[0])
        })
    }
    const fetchCategory = () => {
        let x = fetchData();
        fetch('http://9776686554bd.ngrok.io/fetchCategoryData')
        .then(res=>res.json())
        .then(results=>{
            console.log("Category");
            //console.log(results)
            setCategoriesData(results)
            //setLoading(false)
        }).catch(err=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        fetchCategory(),
        fetchData(),
        fetchExpense()
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

    const viewModeHandler = (mode) => {
        console.log("ViewMode change Button is pressed.");
        setViewMode(mode);
    }

    return (
        <View>
            <FlatList
                data = {categoriesData}
                keyExtractor={item=>item._id}
                onRefresh={()=>fetchCategory()}
                refreshing={loading}
            />

            {<NavigationBar viewMode={viewMode} NavbarButtonHandler={NavbarButtonHandler}/>}

            {
                viewMode == "expenses" &&
                <Expenses   clhav={categoryListHeightAnimationValue} 
                            selectedCategory={selectedCategory}
                            setSelectedCategory={categoryButtonHandler} 
                            setViewMode={viewModeHandler}
                            totalExpenses={people.totalExpenses}
                            categoriesData={categoriesData}
                            allExpenses={expenses}
                /> 
            }
            {
                viewMode == "chart" &&
                <ChartPage />
            }
            {
                viewMode == "add" &&
                <AddSection />
            }
            
        </View>
    );
}