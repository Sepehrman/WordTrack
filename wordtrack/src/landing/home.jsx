import React from 'react';

const home = () => {
  return (
    <div>
      <header>
        <h1>WordTrack</h1>
      </header>
      <div className="container">
        <input type="text" id="word-input" placeholder="Enter a word..." />
      </div>
      <button id="profile-button">Profile</button>
      <style>
        {`
          body {
            font-family: Arial, sans-serif;
            background-color: #f3f3f3;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
          }
          
          h1 {
            font-family: 'Cursive', cursive;
            font-size: 36px;
            color: #007BFF;
          }
          
          .container {
            max-width: 400px;
            text-align: center;
            background-color: #fff;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }
          
          #word-input {
            width: 100%;
            padding: 10px;
            font-size: 18px;
            border: 1px solid #ddd;
            border-radius: 4px;
            margin-top: 20px;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
          }
          
          #word-input:focus {
            outline: none;
            border-color: #007BFF;
          }
          
          #profile-button {
            background-color: #007BFF;
            color: #fff;
            border: none;
            border-radius: 4px;
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
          }
          
          #profile-button:hover {
            background-color: #0056b3;
          }
        `}
      </style>
    </div>
  );
};

export default home;