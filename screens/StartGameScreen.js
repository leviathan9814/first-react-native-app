import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import Colors from '../constants/colors';


const StartGameScreen = (props) => {

  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectNumber, setSelectNumber] = useState()

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  }

  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  }

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (chosenNumber === NaN || chosenNumber < 0 || chosenNumber > 99) {
      return;
    }
    setConfirmed(true);
    setSelectNumber(chosenNumber);
    setEnteredValue("");
    
  }

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = <Text>Chosen Number: {selectNumber}</Text>
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <View style={styles.screen}>
        <Text style={styles.title}>Start a new Game!</Text>
        <Card style={styles.inputContainer}>
            <Text>Select a Number!</Text>
            <Input style={styles.input} 
              blurOnSubmit 
              autoCapitalize="none" 
              autoCorrect={false}
              keyBoardType="numeric"
              maxLength={2}
              onChangeText={numberInputHandler}
              value={enteredValue}
              />
            <View style={styles.buttonContainer}>
                <Button style={styles.button} title="Reset" onPress={resetInputHandler} color={Colors.accent}/>
                <Button style={styles.button} title="Confirm" onPress={confirmInputHandler} color={Colors.primary}/>
            </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
   screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
   },
   title: {
    fontSize: 20,
    marginVertical: 10
   },
   inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
   },
   buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15
   },
   button: {
     width: 100
   },
   input: {
     width: 50,
     textAlign: "center"
   }
});


export default StartGameScreen;