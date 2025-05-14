/*
 * clock.js - Digital Clock Application
 * Author: Bocaletto Luca
 * License: GPL v3
 * Description: This script implements a responsive digital clock that displays the current
 *              server time. The clock fetches the current server time from a configurable 
 *              endpoint and calculates an offset relative to the client. The time is updated
 *              every second.
 */

// The URL endpoint that returns the current server time as JSON.
// Example response: { "serverTime": "2025-05-14T15:30:00Z" }
// You must create this endpoint on your server (e.g., a servertime.php file) if you wish to 
// display server time; otherwise, the clock will default to client time.
const SERVER_TIME_URL = 'servertime.php';

/**
 * DigitalClock class encapsulates all functionalities necessary to display an updating clock.
 */
class DigitalClock {
  /**
   * Constructor for the DigitalClock.
   * @param {string} elementId - The ID of the DOM element where the clock time will be displayed.
   * @param {number} offset - Time offset (in milliseconds) to adjust the displayed time from client time.
   */
  constructor(elementId, offset = 0) {
    this.clockElement = document.getElementById(elementId);
    this.offset = offset;
    if (!this.clockElement) {
      throw new Error(`Element with id "${elementId}" not found.`);
    }
  }

  /**
   * Starts the digital clock by updating the time immediately and then every second.
   */
  start() {
    this.updateTime(); // Update time immediately
    // Update the displayed time every 1 second (1000ms)
    setInterval(() => this.updateTime(), 1000);
  }

  /**
   * Updates the displayed time using the (client time + offset) to reflect server time.
   */
  updateTime() {
    const clientNow = new Date().getTime(); 
    // Adjust the client time using the offset to simulate the server time
    const adjustedTime = new Date(clientNow + this.offset);
    const hours = this.padZero(adjustedTime.getHours());
    const minutes = this.padZero(adjustedTime.getMinutes());
    const seconds = this.padZero(adjustedTime.getSeconds());
    const timeString = `${hours}:${minutes}:${seconds}`;
    this.clockElement.textContent = timeString;
  }

  /**
   * Pads a number with a leading zero if it is less than 10.
   * @param {number} num - The number to pad.
   * @returns {string} - The padded number as a string.
   */
  padZero(num) {
    return num < 10 ? '0' + num : num.toString();
  }
}

// Wait for the DOM to fully load before starting the clock.
document.addEventListener('DOMContentLoaded', async () => {
  let offset = 0; // Default offset: 0 (client time)
  
  try {
    // Attempt to fetch the server time from the configured endpoint.
    const response = await fetch(SERVER_TIME_URL);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const data = await response.json();
    // Assume data.serverTime is an ISO string (e.g., "2025-05-14T15:30:00Z")
    const serverTime = new Date(data.serverTime).getTime();
    const clientTime = new Date().getTime();
    offset = serverTime - clientTime;
    console.log(`Server time offset: ${offset} milliseconds.`);
  } catch (error) {
    console.error("Error fetching server time, using client time instead:", error);
    // If there is an error, offset remains 0 (display client time)
  }
  
  // Create and start the digital clock using the calculated offset.
  try {
    const clock = new DigitalClock('digitalClock', offset);
    clock.start();
  } catch (error) {
    console.error("Error initializing the digital clock:", error);
  }
});
