import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import users from '../../assets/data/users';

const MatchScreen = () => {
    return (
        <SafeAreaView style={styles.root}>
            <View style = {styles.container}>
                <Text style={{ fontWeight: 'bold', fontSize: 24, color: '#189B0F' }}>
                    New Matches
                </Text>
                <View style={styles.users}>
                    {users.map(user => (
                        <View style={styles.user} key={user.id}>
                            <Image source={{uri: user.image}} style={styles.image}/>
                        </View>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: {
        width: '100%',
        flex: 1,
        padding: 10,
    },
    container : {
        padding: 10,
    },
    users:{
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    user:{
        width: 96,
        height: 96,
        margin: 10,
        borderRadius: 50,
        borderWidth: 4,
        padding: 3,
        borderColor: '#189B0F',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
    },
});

export default MatchScreen;