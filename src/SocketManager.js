class SocketManager {
  constructor(url) {
    this.url = url; // The WebSocket server URL
    this.socket = null;
  }

  // Connect to the WebSocket server
  connect() {
    this.socket = new WebSocket(this.url);

    // Handle open connection
    this.socket.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    // Handle incoming messages
    this.socket.onmessage = (event) => {
      const trainData = JSON.parse(event.data); // Parse the incoming data
      console.log("Received Train Data:", trainData);
      this.onDataReceived(trainData); // Call the function to handle the data
    };

    // Handle close connection
    this.socket.onclose = () => {
      console.log("Disconnected from WebSocket server");
      this.reconnect(); // Attempt to reconnect
    };

    // Handle connection errors
    this.socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };
  }

  // Function to handle incoming data (can be customized)
  onDataReceived(trainData) {
    // Process or display the train data here
    console.log("Train Data Processed:", trainData);
  }

  // Reconnect the WebSocket if disconnected
  reconnect() {
    console.log("Reconnecting in 2 seconds...");
    setTimeout(() => this.connect(), 2000); // Reconnect after 2 seconds
  }

  // Close the WebSocket connection manually
  close() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

export default SocketManager;
