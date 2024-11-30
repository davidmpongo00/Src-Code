const axios = require("axios");
const { sendMessage } = require("../handles/sendMessage");

module.exports = {
  name: "removebg",
  description: "Remove The Background Of Your Pic",
  author: "developer",
  usage: "Send any picture first then reply removebg",

  async execute(senderId, args, pageAccessToken, imageUrl) {
    // Check if an image URL is provided
    if (!imageUrl) {
      return sendMessage(senderId, {
        text: `❌ 𝗣𝗹𝗲𝗮𝘀𝗲 𝘀𝗲𝗻𝗱 𝗮𝗻 𝗶𝗺𝗮𝗴𝗲 𝗳𝗶𝗿𝘀𝘁, 𝘁𝗵𝗲𝗻 𝘁𝘆𝗽𝗲 "𝗿𝗲𝗺𝗼𝘃𝗲𝗯𝗴" 𝘁𝗼 𝗲𝗻𝗵𝗮𝗻𝗰𝗲 𝗶𝘁.`
      }, pageAccessToken);
    }

    // Notify the user that enhancement is in progress
    sendMessage(senderId, { text: "⌛ 𝗥𝗲𝗺𝗼𝘃𝗶𝗻𝗴 𝗯𝗮𝗰𝗸𝗴𝗿𝗼𝘂𝗻𝗱 𝗽𝗹𝗲𝗮𝘀𝗲 𝘄𝗮𝗶𝘁...." }, pageAccessToken);

    try {
      // Fetch the enhanced image from the API
      const response = await axios.get(`https://api.kenliejugarap.com/bgremoved/?imgurl=${encodeURIComponent(imageUrl)}`);
      const processedImageURL = response.data.response;

      // Send the enhanced image URL back to the user
      await sendMessage(senderId, {
        attachment: {
          type: "image",
          payload: {
            url: processedImageURL
          }
        }
      }, pageAccessToken);

    } catch (error) {
      console.error("❌ Error processing image:", error);
      await sendMessage(senderId, {
        text: `❌ An error occurred while processing the image. Please try again later.`
      }, pageAccessToken);
    }
  }
};
