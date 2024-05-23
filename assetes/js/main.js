import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI('AIzaSyCdO8IsvVQW6KyB44MlNr4yoW-G8LnvUv0');

const getQuestion =document.getElementById('question');
const btnSent = document.getElementById('btn-sent');
const btnUploadImg = document.getElementById('btn-upload-img');


let question;
// khi ân vào button sent thì lấy giá trị của input gán cho biến question
btnSent.addEventListener('click',()=>{
    question = getQuestion.value;
    // singleQuestion(question);
    historyQuestion(question);
})

async function singleQuestion(cauhoi) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
    const prompt = cauhoi;
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
  }

async function historyQuestion(cauhoi) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const chat = model.startChat({
    history: [
    //   {
    //     role: "user",
    //     parts: [{ text: "Hello, I have 2 dogs in my house." }],
    //   },
    //   {
    //     role: "model",
    //     parts: [{ text: "Great to meet you. What would you like to know?" }],
    //   },
    ],
    // generationConfig: {
    //   maxOutputTokens: 10000000,
    // },
  });

  const msg = cauhoi;

  const result = await chat.sendMessage(msg);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}


