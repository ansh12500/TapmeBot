const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

const graphqlUrl = 'http://localhost:4000/graphql'; // Backend GraphQL API URL

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Welcome to TapMe Bot! Use /signup to register.');
});

bot.onText(/\/signup (.+)/, async (msg, match) => {
  const username = match[1];
  try {
    const response = await axios.post(graphqlUrl, {
      query: `
        mutation {
          signUp(username: "${username}", password: "password123") {
            username
          }
        }
      `,
    });
    bot.sendMessage(msg.chat.id, `User ${response.data.data.signUp.username} signed up successfully!`);
  } catch (error) {
    bot.sendMessage(msg.chat.id, 'Error signing up. Try again.');
  }
});

bot.onText(/\/tap/, async (msg) => {
  const username = msg.from.username;
  try {
    const response = await axios.post(graphqlUrl, {
      query: `
        mutation {
          tap(username: "${username}") {
            taps
          }
        }
      `,
    });
    bot.sendMessage(msg.chat.id, `You tapped! Current taps: ${response.data.data.tap.taps}`);
  } catch (error) {
    bot.sendMessage(msg.chat.id, 'Error tapping. Try again.');
  }
});
