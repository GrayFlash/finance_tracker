import React from 'react';
import { View , Text, StyleSheet } from 'react-native';

export default function Home() {

    return (
        <View>
            <View>
                <Text>
                    Bruce Wayne
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainAddSection : {
        marginTop: 20, 
        marginHorizontal: 24,
    },
});
