//Initialize the Mistrali ai, and then you are going to prompt the user for a message and continue the conversation until the user ends the file.

import {Mistral} from '@mistralai/mistralai' //imports the Mistral data from Mistral package
import { createRequire } from 'module' //is a specific way to load the old CommonJS require() function inside a modern ES Module (ESM) file in Node.js.
const require = createRequire(import.meta.url); //Calls the previous function and passes in the current file's url. THis creates a specialized require function that can the be used within the file to import packages via common JS.
const prompt = require('prompt'); //Imports the promp package to file.
require('dotenv').config() //Default package import use. Allows you to access .env variables within your code.


const mistral = new Mistral({ //Creates a new client object of mistral AI and connects the apiKey with the Mistral AI service and gets permission from the API.
    apiKey: process.env.Mistral_SECRET_KEY 
}); 




async function getInitialSetup(){ //function generates a promise of chatPersona then returns an error or resolve.
  return new Promise((resolve,reject) => {
    const chatPersona = 'Enter AI chat Bot Personality and Overall Description: ';

  prompt.start();
  prompt.get([chatPersona], function(err,result){//runs the installed prompt package the returns an object with the prompt question and enetered user data.
   if(err){//If there is an error , function will end with a returned error
        return reject(err)
    }

    let chatPersonaValue =  Object.values(result)[0];
    return resolve(chatPersonaValue);

  })


  })
}


async function userQuestion(){ //function generates a promise of userData that then returns an error or resolve.
   return new Promise((resolve,reject) => {
    const chatQuestion = 'Ask your question'; //stores a variable that will be connected to the generated prompt.

  prompt.start();//runs the installed prompt package the returns an object with the prompt question and enetered user data.
  prompt.get([chatQuestion], function(err,result){
   if(err){ //If there is an error , function will end with a returned error
        return reject(err)
    }


    let userQuestionValue =  Object.values(result)[0];
    return resolve(userQuestionValue);

  })

})}


let chatPersonaData = await getInitialSetup(); //stores the ChatPersona Data from the InitialSetup fucntion


async function chatPersonaDefault(){  //A function to set a default System Personility if the user doesn't enter a string value.
  let defaultChatPerson = 'A Regualar chat AI';
  let inputChatPersona = `You are an ${chatPersonaData} `;
  if(chatPersonaData !== ''){
    return inputChatPersona
  }else{
    return defaultChatPerson
  }
}

  const chatPersonality = await chatPersonaDefault();

 let currentMessages = [{ //stores a nested object array that will be sent to MistralAi server representing the system personality
        "role":"system",
        "content": chatPersonality ,
    },
  
]



async function run() {

  try { //tries the following function

  let chatIsActive = true; //Stores a true boolean to signify MistralAI chat is active

  while(chatIsActive){ //While the chatIsActive variable is true continue on the loop
    const userQuestionData = await userQuestion();  //stores the entered user data from the userQuestion function


    if(userQuestionData.toLowerCase() === 'exit'){ //If the userdata is a string of exit. convert the chat from active to inactive and (after logging) continue code.
      console.log('You have ended the chat.') 
      chatIsActive = false;
      continue
    }

    let userQuestions = { //stores a nested object array that will be sent to MistralAi server representing the user's question
      "role": "user",
      "content": userQuestionData
    }

    currentMessages.push(userQuestions); //pushes the userQuestion data to the currentMessages object array that will later be sent to Mistralai server

    const result = await mistral.chat.complete({ //sends request to Mistral ai servers.
    model: "mistral-small-latest",//specifies which AI brain to use.
    messages: currentMessages //currentMessages array is passed as object value to the default key.
    });

    let assistantObj = { //stores a nested object array that will be sent to MistralAi server representing the assistant and the previous generated responses and finally pushes the responses to the currentMessages array and also is logged.
    "role": "assistant",
    "content": result.choices[0].message.content
  }

  currentMessages.push(assistantObj);
  console.log(currentMessages);

  }
}catch(error){ //If there's an error it is logged to the console
  console.log(`An error has occured during the chat ${error}`)
}
  
}


run();
