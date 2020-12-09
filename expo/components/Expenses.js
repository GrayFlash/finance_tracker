import React from 'react';
import { View } from 'react-native';
import CategoryHeader from './ExpensesPageComponents/CategoryHeader';
import CategoryList from './ExpensesPageComponents/CategoryList';
import PreviousExpenses from './ExpensesPageComponents/PreviousExpenses';

export default function Expenses({ clhav, categories, selectedCategory, setSelectedCategory, setViewMode }) {

    return (
        <View>
            <CategoryHeader setViewMode={setViewMode} />

            <CategoryList   setSelectedCategory={setSelectedCategory}
                            categories={categories}
                            clhav={clhav} />

            <PreviousExpenses selectedCategory={selectedCategory}  />      
        </View>
    );
}
