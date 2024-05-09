import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, SafeAreaView, Pressable, TextInput, Alert } from "react-native";
import {signOut, fetchAuthSession} from 'aws-amplify/auth';
import {Picker} from '@react-native-picker/picker';
import {User} from '../models/';
import { DataStore } from 'aws-amplify/datastore'

const ProfileScreen = () => {

    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [gender, setGender] = useState(null);
    const [lookingFor, setLookingFor] = useState(null);

    useEffect(() => {
      const getCurrentUser = async () => {
          console.log('Fetching auth session...');
          const authSession = await fetchAuthSession();
          const userSub = authSession?.userSub;
  
          console.log('Auth session fetched, userSub:', userSub);
          if (!userSub) {
              console.log('No userSub found');
              return; // Exits if there is no userSub to avoid querying with undefined.
          }
  
          console.log('Querying DataStore for user...');
          const dbUsers = await DataStore.query(User, u => u.sub === userSub);
          console.log('Queried DataStore:', dbUsers); // This logs the array of users returned by the query
  
          if (dbUsers.length === 0) {
              console.log('No user found with this userSub:', userSub);
              return; // Exits if no user is found.
          }
  
          const dbUser = dbUsers[0]; // Assuming the first user is the correct one.
          console.log('Setting user:', dbUser); // Logs the user data being set to state.
          setUser(dbUser);
          setName(dbUser.name);
          setBio(dbUser.bio);
          setGender(dbUser.gender);
          setLookingFor(dbUser.lookingFor);
      };
      getCurrentUser();
  }, []);  

  useEffect(() => {
    if (user) {
        console.log('User state updated:', user);
        // Potentially move save logic here or ensure it's only triggered after user is set
    }
  }, [user]); // This will log and possibly act every time user state changes

  
    
    const isValid = () => {
    return name && bio && gender && lookingFor;
    };

    const save = async () => {
      console.log('Save triggered, checking validity...');
      if (!isValid()) {
          console.warn('Not valid');
          return;
      }
  
      console.log('Starting save operation...');
      if (user && user.id) {
          console.log('Existing user ID:', user.id);
  
          try {
            console.log('Querying DataStore for user...');
            const dbUsers = await DataStore.query(User, u => u.sub === userSub);
            console.log('Queried DataStore:', dbUsers);
            if (dbUsers.length === 0) {
                console.log('No user found with this userSub:', userSub);
                return;
            }
  
              if (!existingUser) {
                  console.log('No user found with this ID:', user.id);
                  return;
              }
  
              console.log('Updating user...');
              const updatedUser = User.copyOf(existingUser, updated => {
                  updated.name = name;
                  updated.bio = bio;
                  updated.gender = gender;
                  updated.lookingFor = lookingFor;
              });
  
              console.log('Saving updated user...');
              const savedUser = await DataStore.save(updatedUser);
              console.log('User updated:', savedUser);
          } catch (error) {
              console.error('Error during user update:', error);
          }
      } else {
          console.log('No existing user object or user ID provided, checking auth session...');
          const authUser = await fetchAuthSession();
          console.log('Auth session fetched, userSub:', authUser.userSub);
          if (!authUser.userSub) {
              console.log('No userSub available in auth session.');
              return;
          }
  
          console.log('Creating new user...');
          const newUser = new User({
              sub: authUser.userSub,
              name,
              bio,
              gender,
              lookingFor,
              image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png',
          });
  
          console.log('Saving new user...');
          const savedUser = await DataStore.save(newUser);
          console.log('New user saved:', savedUser);
      }
  
      Alert.alert('User saved successfully');
  };  
  


      return (
        <SafeAreaView style={styles.root}>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Name..."
              value={name}
              onChangeText={setName}
            />
    
            <TextInput
              style={styles.input}
              placeholder="bio..."
              multiline
              numberOfLines={3}
              value={bio}
              onChangeText={setBio}
            />
    
            <Text>Gender</Text>
            <Picker
              label="Gender"
              selectedValue={gender}
              onValueChange={itemValue => setGender(itemValue)}>
              <Picker.Item label="Male" value="MALE" />
              <Picker.Item label="Female" value="FEMALE" />
              <Picker.Item label="Other" value="OTHER" />
            </Picker>
    
            <Text>Looking for</Text>
            <Picker
              label="Looking for"
              selectedValue={lookingFor}
              onValueChange={itemValue => setLookingFor(itemValue)}>
              <Picker.Item label="Male" value="MALE" />
              <Picker.Item label="Female" value="FEMALE" />
              <Picker.Item label="Other" value="OTHER" />
            </Picker>
    
            <Pressable onPress={save} style={styles.button}>
              <Text>Save</Text>
            </Pressable>
    
            <Pressable onPress={() => signOut()} style={styles.button}>
              <Text>Sign out</Text>
            </Pressable>
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
      container: {
        padding: 10,
      },
      button: {
        backgroundColor: '#F63A6E',
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        margin: 10,
      },
      input: {
        margin: 10,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
      },
    });
    
    export default ProfileScreen;