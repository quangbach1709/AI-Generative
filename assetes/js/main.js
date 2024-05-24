import {GoogleGenerativeAI} from "@google/generative-ai";

const genAI = new GoogleGenerativeAI('AIzaSyCdO8IsvVQW6KyB44MlNr4yoW-G8LnvUv0');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro"});

const getQuestion =document.getElementById('question');
const btnSent = document.getElementById('btn-sent');
const btnUploadImg = document.getElementById('btn-upload-img');


let question;
let modelChat;
// khi ân vào button sent thì lấy giá trị của input gán cho biến question

$(btnSent).click(function(){
    question = getQuestion.value;
    // lấy giá trị của input rồi sau đó đưa nó vào thẻ li thêm vào giao diện trong thẻ ul có id là Chat
    
    // singleQuestion(question);
    historyQuestion(question);
    
});
// sau khi them 1 thẻ li mới vào thì không làm mất thẻ li cũ
// khi ấn vào button thì thêm thẻ li mới vào giao diện



// async function singleQuestion(cauhoi) {
//     // For text-only input, use the gemini-pro model
//     const model = genAI.getGenerativeModel({ model: "gemini-pro"});
//
//     const prompt = cauhoi;
//
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();
//     console.log(text);
//   }

async function historyQuestion(cauhoi) {
    // const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro"});

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello" }],
      },
      {
        role: "model",
        parts: [{ text: "How can I help you today?" }],
      },
    ],
    // generationConfig: {
    //   maxOutputTokens: 10000000,
    // },
  });

  const msg = cauhoi;

  const result = await chat.sendMessage(msg);
  const response = await result.response;
    modelChat = response.text();
    modelChat = modelChat.replace(/\n/g, '<br>');
  // console.log(text);

    $('#Chat').append('<li class="user-chat">'+question+'</li>');

    $('#Chat').append('<div class="model-chat">'+modelChat+'</div>');
    // console.log(modelChat);
    // alert(modelChat)
    getQuestion.value = '';
}
//tao ham đưa nội dung vừa nhập trong input vào giao diện như dạng chat 



