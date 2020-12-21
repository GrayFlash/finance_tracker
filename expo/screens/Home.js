import React, { useRef, useState, useEffect } from 'react';
import { View, Animated, ScrollView, LogBox, Alert } from 'react-native';
import ScanBill from '../components/AddPageComponents/ScanBill';
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
    
    // FETCHES - expense, categories, profile

    const fetchExpense = () =>{
        fetch(`${myConstClass.HTTP_LINK}/fetchExpense`)
        .then(res=>res.json())
        .then(results=>{
            console.log("Expenses data received.")
            //console.log(results);
            setExpenses(results)
        })
        return 1;
    }

    const fetchData = () => {
        fetch(`${myConstClass.HTTP_LINK}/personDetails`)
        .then(res=>res.json())
        .then(results=>{
            console.log("People data received inside Home Page.")
            setPeople(results[0]);
            //console.log(people);
        })
    }

    const fetchCategory = () => {
        fetch(`${myConstClass.HTTP_LINK}/fetchCategoryData`)
        .then(res=>res.json())
        .then(results=>{
            console.log("categoriesData received.");
            //console.log(results)
            setCategoriesData(results)
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
        //console.log(categoriesData);
    }

    const categoryButtonHandler = (item) => {
        console.log(`${item.name} category button is pressed....`);
        setSelectedCategory(item);
    }

    /** Edit Product Handlers Start */

    const editProductOpenButtonHandler = (mode, item) => {
        console.log("Edit Product Page is called.");
        console.log(item.title+" is Selected for Edit Product section.");
        setEditProductProps(item);
        setViewMode(mode);
    }

    const editProductSaveButtonHandler = (item, prevTotal) => {

        let index = 0, isDone = true;
        for(let i=0 ; i<categoriesData.length ; i++) {
            if(categoriesData[i].name === item.category) {
                index = i;
                break;
            }
        }

        fetch(`${myConstClass.HTTP_LINK}/updatePerson`,{
            method:"post",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:people._id,
                name: people.name,
                income: people.income,
                totalExpenses: people.totalExpenses - prevTotal + item.total,
                targetToSave: people.targetToSave,
                thisMonthStatus: people.thisMonthStatus,
                savings: people.savings
            })
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(`total expense of ${people.name} is updated.`);
        })
        .catch(err=>{
            Alert.alert(`Some Error while reducing total expense of ${people.name} inside Add product page`);
            isDone = false;
            console.log(err);
        })

        if(isDone) {
            fetch(`${myConstClass.HTTP_LINK}/updateCategory`,{
                method:"post",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    id:categoriesData[index]._id,
                    name: categoriesData[index].name,
                    icon: categoriesData[index].icon,
                    color: categoriesData[index].color,
                    totalExpenseInThis: categoriesData[index].totalExpenseInThis - prevTotal + item.total
                })
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(`total expense of ${item.category} category is updated.`);
            })
            .catch(err=>{
                Alert.alert(`Some Error while subtracting total expense of ${item.category} category on deleting product inside Edit product page`);
                isDone = false;
                console.log(err);
            })
        }

        if(isDone) {
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
                fetchCategory();
                fetchData();
                setLoading(false);
            })
            .catch(err=>{
                Alert.alert("Some Error on Saving product in Edit Product Page.")
                console.log(err)
            });
        } else {
            
        }
    }

    const editProductDeleteButtonHandler = (item) => {

        let index = 0, isDone = true;
        for(let i=0 ; i<categoriesData.length ; i++) {
            if(categoriesData[i].name === item.category) {
                index = i;
                break;
            }
        }

        fetch(`${myConstClass.HTTP_LINK}/updatePerson`,{
            method:"post",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:people._id,
                name: people.name,
                income: people.income,
                totalExpenses: people.totalExpenses - item.total,
                targetToSave: people.targetToSave,
                thisMonthStatus: people.thisMonthStatus,
                savings: people.savings
            })
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(`total expense of ${people.name} is updated.`);
        })
        .catch(err=>{
            Alert.alert(`Some Error while reducing total expense of ${people.name} inside Add product page`);
            isDone = false;
            console.log(err);
        })

        if(isDone) {
            fetch(`${myConstClass.HTTP_LINK}/updateCategory`,{
                method:"post",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    id:categoriesData[index]._id,
                    name: categoriesData[index].name,
                    icon: categoriesData[index].icon,
                    color: categoriesData[index].color,
                    totalExpenseInThis: categoriesData[index].totalExpenseInThis - item.total
                })
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(`total expense of ${item.category} category is updated.`);
            })
            .catch(err=>{
                Alert.alert(`Some Error while subtracting total expense of ${item.category} category on deleting product inside Edit product page`);
                isDone = false;
                console.log(err);
            })
        }

        if(isDone) {
            fetch(`${myConstClass.HTTP_LINK}/deleteExpense`,{
                method:"post",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    id:item.id
                })
            })
            .then(res=>res.json())
            .then(data=>{
                Alert.alert(`Details of ${item.title} has been deleted`)
            })
            .then(() => {
                NavbarButtonHandler("expenses");
                setLoading(true);
                fetchExpense();
                fetchCategory();
                fetchData();
                setLoading(false);
            })
            .catch(err=>{
                Alert.alert("Some Error while Deleting a product inside Edit Product Page.")
                console.log(err)
            });
        } else {
            console.log("Delete action aborted.")
        }
    }

    const editProductCancelButtonHandler = () => {
        console.log("Cancel Button is pressed, back to Expenses Page.")
        setViewMode("expenses");
    }

    /** Edit Product END */


    /** Add Product Handlers Start */

    const AddProductSaveButtonHandler = (item) => {
        console.log("Add Product Button is pressed inside Add Product Page.");

        let index = 0, isDone = true;
        for(let i=0 ; i<categoriesData.length ; i++) {
            if(categoriesData[i].name === item.category) {
                index = i;
                break;
            }
        }

        fetch(`${myConstClass.HTTP_LINK}/updatePerson`,{
            method:"post",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:people._id,
                name: people.name,
                income: people.income,
                totalExpenses: people.totalExpenses + item.total,
                targetToSave: people.targetToSave,
                thisMonthStatus: people.thisMonthStatus,
                savings: people.savings
            })
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(`total expense of ${people.name} is updated.`);
        })
        .catch(err=>{
            Alert.alert(`Some Error while updating total expense of ${people.name} inside Add product page`);
            isDone = false;
            console.log(err);
        })
        
        if(isDone) {
            fetch(`${myConstClass.HTTP_LINK}/updateCategory`,{
                method:"post",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    id:categoriesData[index]._id,
                    name: categoriesData[index].name,
                    icon: categoriesData[index].icon,
                    color: categoriesData[index].color,
                    totalExpenseInThis: categoriesData[index].totalExpenseInThis + item.total
                })
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(`total expense of ${item.category} category is updated.`);
            })
            .catch(err=>{
                Alert.alert(`Some Error while updating total expense of ${item.category} category inside Add product page`);
                isDone = false;
                console.log(err);
            })
        }

        if(isDone) {
            fetch(`${myConstClass.HTTP_LINK}/addExpense`,{
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
                fetchCategory();
                fetchData();
                setLoading(false);
            })
            .catch(err=>{
                Alert.alert("Some Error while Adding product in Add Product Page.")
                console.log(err);
            });
        } else {
            console.log("Product is not added due to error.");
        }
    }

    /** Add Product END */

    const ScanBillDoneButtonHandler = (productList, totalExpenseForUser) => {
        console.log("Done Button is Pressed!!");
        console.log(productList);

        let n = productList.length, isDone = true;
        const totalExpenseForCategory = {
            Food: 0,
            Clothes: 0,
            Home: 0,
            Stationery: 0,
            Hygiene: 0,
            Others: 0
        }

        for(let k=0 ; k<n ; k++) {
            totalExpenseForCategory[productList[k].category] += productList[k].total;
        }

        console.log("This is totalExpenseForCategory list : ");
        console.log(totalExpenseForCategory);

        fetch(`${myConstClass.HTTP_LINK}/updatePerson`,{
            method:"post",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:people._id,
                name: people.name,
                income: people.income,
                totalExpenses: people.totalExpenses + totalExpenseForUser,
                targetToSave: people.targetToSave,
                thisMonthStatus: people.thisMonthStatus,
                savings: people.savings
            })
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(`total expense of ${people.name} is updated.`);
        })
        .catch(err=>{
            Alert.alert(`Some Error while updating total expense of ${people.name} inside Add product page`);
            console.log(err);
            isDone = false;
        })

        for(let k=0 ; k<categoriesData.length ; k++) {
            if(totalExpenseForCategory[categoriesData[k].name] === 0) {
                continue;
            }
            setTimeout(function() {
                fetch(`${myConstClass.HTTP_LINK}/updateCategory`,{
                    method:"post",
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        id:categoriesData[k]._id,
                        name: categoriesData[k].name,
                        icon: categoriesData[k].icon,
                        color: categoriesData[k].color,
                        totalExpenseInThis: categoriesData[k].totalExpenseInThis + totalExpenseForCategory[categoriesData[k].name]
                    })
                })
                .then(res=>res.json())
                .then(data=>{
                    console.log(`total expense of ${categoriesData[k].name} category is updated.`);
                })
                .catch(err=>{
                    Alert.alert(`Some Error while updating total expense of ${categoriesData[k].name} category inside Add product page`);
                    isDone = false;
                    console.log(err);
                })
            }, 500);

            if(!isDone) {
                break;
            }
        }

        
        for(let i=0 ; i<n ; i++) {
            const item = productList[i];

            setTimeout(function() {
                if(isDone) {
                    fetch(`${myConstClass.HTTP_LINK}/addExpense`,{
                        method:"post",
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify(item)
                    })
                    .then(res=>res.json())
                    .then(data=>{
                        console.log(`\n #${i+1} ${item.title} is Added inside ${item.category} Category.`)
                        if(i==(n-1)) {
                            Alert.alert(`Details of All products has been updated`);
                            setTimeout(() => {
                                NavbarButtonHandler("expenses");
                                setLoading(true);
                                fetchExpense();
                                fetchCategory();
                                fetchData();
                                setLoading(false);
                            }, 1000);
                        }
                    })
                    .catch(err=>{
                        Alert.alert("Some Error while Adding product in Add Product Page.")
                        console.log(err);
                    });
                } else {
                    console.log(`\n${item.title} product is not added due to error.`);
                    isDone = false;
                }
            }, 1000);

            if(!isDone) {
                break;
            }

        }   // end-main-for
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
                                editProductCancelButtonHandler={editProductCancelButtonHandler}
                 />
            }
            {
                viewMode == "chart" &&
                <ChartPage catData={categoriesData} ppl={people} />
            }
            {
                viewMode == "add" &&
                <ScrollView style={{ marginTop: 10, marginHorizontal: 18 }} >
                    <ScanBill   categoriesData={categoriesData} 
                                people={people} 
                                AddProductSaveButtonHandler={AddProductSaveButtonHandler}
                                ScanBillDoneButtonHandler={ScanBillDoneButtonHandler} 
                    />
                </ScrollView>
            }
            
        </ScrollView>
    );
}