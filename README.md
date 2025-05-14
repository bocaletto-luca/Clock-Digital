# Clock-Digital-JS

**Author:** Bocaletto Luca  
**License:** GPL v3

## Overview

This project is a responsive digital clock web application built with HTML5, JavaScript (ES6), and Bootstrap for styling. The clock displays the current time based on your server’s time by fetching a server time value from a configurable endpoint. If the server time cannot be retrieved, the clock gracefully falls back to using the client’s time.

## Features

- **Responsive Design:** Uses Bootstrap to ensure the clock looks great on all devices.
- **Server Time Synchronization:** Fetches the current server time and calculates an offset, so the displayed time is synchronized with the server.
- **Reusable Code:** The digital clock is implemented using a reusable ES6 class (`DigitalClock`) that can be easily extended or integrated into other projects.
- **Fallback Mechanism:** If the server time cannot be fetched, the clock uses the client time.
