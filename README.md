# ENTERFACE

![logo](https://raw.githubusercontent.com/junqiwu02/ub-hacking-2020/master/images/logo.jpg)
<br>
This is part of my team's submission to the UB Hacking 2020 hackathon.
<br>
### View our devpost submition at https://devpost.com/software/enterface
<br><br>
The other component of EnterFace, the iOS app can be found at https://github.com/Kwang8/EnterFace

### What is it

The EnterFace ecosystem has three main components: the central database, a web-hosted map, and an iOS app with image classification model.
<br><br>
The database is using Google's Firebase platform. The database contains entries for each room in our building, keeping track of their current and max occupancies. Our web-hosted map and iOS app both interface with Firebase to update their client-side data in real-time.
<br><br>
The web-hosted app uses Google Maps' Javascript API to display the floorplan of the building. A marker is placed at each room, displaying the room name, its current capacity, and a picture of the room. The occupancy of each room is updated in real-time by pulling data from Firebase.

### This repository

This repository is the project for the web-hosted floorplan.
<br>
Files for the website are found in the root directory, with index.html as the main page.
The website is hosted on Firebase at https://enterface-aebfa.web.app/
<br>All images used were found under the Creative Commons license.
<br>This project is not intended for commerical use.
