import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';
import { View, Animated } from 'react-native';
import AddSection from '../components/AddPage';
import Expenses from '../components/Expenses';
import NavigationBar from '../components/NavigationBar';
import ChartPage from '../components/PieChart';
import { person } from '../data/dummyPerson';

export default function Home (props) {

    const categoryListHeightAnimationValue = useRef(new Animated.Value(172.5)).current;
    const [selectedCategory, setSelectedCategory] = React.useState(null);
    const [viewMode, setViewMode] = React.useState("expenses");

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

            {<NavigationBar viewMode={viewMode} NavbarButtonHandler={NavbarButtonHandler}/>}

            {
                viewMode == "expenses" &&
                <Expenses   clhav={categoryListHeightAnimationValue} 
                            selectedCategory={selectedCategory}
                            setSelectedCategory={categoryButtonHandler} 
                            setViewMode={viewModeHandler}
                            totalExpenses={person.totalExpenses}
                            categoriesData={person.categoriesData}
                            allExpenses={person.expenses}
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