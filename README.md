<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Dylluu/YooTube">
    <img width="280" alt="YooTube" src="https://www.google.com/url?sa=i&url=https%3A%2F%2Ftoppng.com%2Fyoutube-logo-full-color-button-icon-PNG-free-PNG-Images_474250&psig=AOvVaw34Zob9YrDSm6KTZRhfRpW8&ust=1670027163015000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCKiV-pTW2fsCFQAAAAAdAAAAABAD">
  </a>

<h3 align="center">YooTube</h3>

  <p align="center">
    YouTube clone
    <br />
    <a href="https://github.com/Dylluu/YooTube"><strong>Explore the docs »</strong></a>
    <br />
  </p>
</div>


<!-- ABOUT THE PROJECT -->
## About The Project

YooTube is a video streaming application based on YouTube. All users can view videos posted on the website, and upon signing up, can also leave comments on videos, as well as post their own videos for others to see. Comments and videos can be edited and deleted.  

Upon first entering our site, you can navigate to either the Sign Up or Log In pages using the button in the top right-hand corner to be able to post their own comments or videos.  You may either create your own account, or utilize the Demo User's account with the Demo User Button.

<img width="946" alt="yootube-splash" src="https://yootubetest.s3.amazonaws.com/Screen+Shot+2022-12-01+at+7.20.49+PM.png">

After logging in, you can upload videos, and navigate to the Your Channel page to modify or delete your uploaded videos.

<img width="945" alt="yootube-channel" src="https://yootubetest.s3.amazonaws.com/Screen+Shot+2022-12-01+at+7.21.12+PM.png">

Users can click on any of the video cards on either the splash page or the Your Channel page to access the video. There, users can watch videos, and comment on them if they are logged in.

<img width="949" alt="yootube-video" src="https://yootubetest.s3.amazonaws.com/Screen+Shot+2022-12-01+at+7.22.38+PM.png">

<img width="949" alt="yootube-comments" src="https://yootubetest.s3.amazonaws.com/Screen+Shot+2022-12-01+at+7.22.54+PM.png">


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

Frameworks, Platforms, and Libraries

[![JavaScript][JavaScript.js]][JavaScript-url]
[![React][React.js]][React-url]
[![Redux][Redux.js]][Redux-url]
[![Python][Python.py]][Python-url]
[![Flask][Flask.py]][Flask-url]
![HTML5][HTML.html]
![CSS3][CSS.css]

Database

[![SQLite][SQLite.sq]][SQLite-url]

Cloud Application Hosting

[![Render][Render.render]][Render-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.
