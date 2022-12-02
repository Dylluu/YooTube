<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Dylluu/YooTube">
    <img width="280" alt="YooTube" src="https://www.google.com/url?sa=i&url=https%3A%2F%2Ftoppng.com%2Fyoutube-logo-full-color-button-icon-PNG-free-PNG-Images_474250&psig=AOvVaw34Zob9YrDSm6KTZRhfRpW8&ust=1670027163015000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCKiV-pTW2fsCFQAAAAAdAAAAABAD.png">
  </a>

<h3 align="center">YooTube</h3>

  <p align="center">
    YouTube clone
    <br />
  </p>
</div>


<!-- ABOUT THE PROJECT -->
## About The Project

YooTube is a video streaming application based on YouTube. All users can view videos posted on the website, and upon signing up, can also leave comments on videos, as well as post their own videos for others to see. Comments and videos can be edited and deleted.  

### Built With

Frameworks, Platforms, and Libraries

[![JavaScript][JavaScript.js]][JavaScript-url]
[![React][React.js]][React-url]
[![Redux][Redux.js]][Redux-url]
[![Python][Python.py]][Python-url]
[![Flask][Flask.py]][Flask-url]
![HTML5][HTML.html]
![CSS3][CSS.css]
![AWS-url]

Database

[![SQLite][SQLite.sq]][SQLite-url]

Cloud Application Hosting

[![Render][Render.render]][Render-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>


Upon first entering our site, you can navigate to either the Sign Up or Log In pages using the button in the top right-hand corner to be able to post their own comments or videos.  You may either create your own account, or utilize the Demo User's account with the Demo User Button.

<img width="946" alt="yootube-splash" src="https://yootubetest.s3.amazonaws.com/Screen+Shot+2022-12-01+at+7.20.49+PM.png">

After logging in, you can upload videos, and navigate to the Your Channel page to modify or delete your uploaded videos.

<img width="945" alt="yootube-channel" src="https://yootubetest.s3.amazonaws.com/Screen+Shot+2022-12-01+at+7.21.12+PM.png">

Users can click on any of the video cards on either the splash page or the Your Channel page to access the video. There, users can watch videos, and comment on them if they are logged in.

<img width="949" alt="yootube-video" src="https://yootubetest.s3.amazonaws.com/Screen+Shot+2022-12-01+at+7.22.38+PM.png">

<img width="949" alt="yootube-comments" src="https://yootubetest.s3.amazonaws.com/Screen+Shot+2022-12-01+at+7.22.54+PM.png">


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


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[JavaScript.js]: https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E
[JavaScript-url]: https://www.javascript.com/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Redux.js]: https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white
[Redux-url]: https://redux.js.org/
[Python.py]: https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54
[Python-url]: https://www.python.org/
[Flask.py]: https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white
[Flask-url]: https://flask.palletsprojects.com/en/2.2.x/
[SQLite.sq]: https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white
[SQLite-url]: https://www.sqlite.org/index.html
[HTML.html]: https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white
[CSS.css]: https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white
[Render.render]: https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white
[Render-url]: https://render.com/
[AWS-url]: https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white
