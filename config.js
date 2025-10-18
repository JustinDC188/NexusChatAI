// const chatConfig = require('./index.js');

import {Mistral} from '@mistralai/mistralai' //imports the Mistral data from Mistral package
import { createRequire } from 'module' //is a specific way to load the old CommonJS require() function inside a modern ES Module (ESM) file in Node.js.
const require = createRequire(import.meta.url); //Calls the previous function and passes in the current file's url. THis creates a specialized require function that can the be used within the file to import packages via common JS.
const prompt = require('prompt'); //Imports the promp package to file.
require('dotenv').config() //Default package import use. Allows you to access .env variables within your code.

//Get all Of the Document Elements and Store to A variable

let userOutputContainer = document.getElementById('user-output');
let userInput = document.getElementById('user-input');
//Get text input submitted by user in the textbox. Settign the AI bot's personality and the question which would then be sent to Mistral AI server


let currentMessages = [{ //stores a nested object array that will be sent to MistralAi server representing the system personality
        "role":"system",
    },
  
]

function getInitialSetup(){
  let userInputValue = userInput.value;
  let defaultChatPersona = `A Regular Chat AI`;
   
  let chatPersona = {

  }


  return new Promise((resolve,reject) =>{
      try{
       if(userInputValue === ''){
       resolve(userInputValue = defaultChatPersona)
       currentMessages[0].chatPersona["content"] =  userInputValue;
      }else if(userInputValue !== ""){
       resolve(userInputValue);
       currentMessages[0].chatPersona["content"] =  userInputValue;
      }
    }
    catch(error){
      reject(`There was an error recieving your input: ${error}`);
    }
  });

}

console.log(getInitialSetup());


//Append AI chat response to user ouptut container

function chatOutput(){
  
}

//User recieves response
