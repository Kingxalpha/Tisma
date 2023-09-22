const Message = require('../model/Message')


// Create a new message
const createMessage = async (req, res) => {
    try {
      const { fullname, email, purposeofmessage, message } = req.body;
  
      // Create a new Message object
      const newMessage = new Message({
        fullname,
        email,
        purposeofmessage,
        message,
      });
  
      // Save the new message to the database
      await newMessage.save();
  
      res.json({ msg: 'Message sent', newMessage });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creating message' });
    }
};

// Define a route to get all messages
const getMessage = async (req, res) => {
    try {
      const messages = await Message.find();
      res.json(messages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching messages' });
    }
};

// Mark a message as read
const msgRead = async (req, res) => {
    try {
      const messageId = req.params.messageId;
      const message = await Message.findById(messageId);
  
      if (!message) {
        return res.status(404).json({ error: 'Message not found' });
      }
  
      // Update the message's read status to true
      message.Read= true;
      await message.save();
  
      res.json(message);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error marking message as read' });
    }
};
  
  

  



module.exports = {
    createMessage,
    getMessage,
    msgRead
};