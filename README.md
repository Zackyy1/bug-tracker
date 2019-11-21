
# Bug tracker

Track bugs, submit issues, categorize by projects and stay in touch with your working process.
Adding new issues is easy and they are always within reach to edit, delete, flag.

## Features

 - Authorization - developers manage, users comment, visitors only create new issues
 - Multiple project issue catigorization - helps you keep track of different projects
 - Full issue editor - post pictures, lists, create markup for developers to see!
 - Intuitive design, allowing any user to quickly submit a new issue and developers can easily view and flag them accordingly
 - UIX is meant to be simple - one click and you're where you need to be
 - Create a new project if the developers haven't had any issues posted yet
 

## Todo

 - Commenting!
 - Sort by status
 - Issue on multiple pages (because we want to keep the traffic low)


## Get started
Only follow these instructions if you plan to use this app in your own environment.

> This project does not contain environment or environment.prod files. You have to create them yourself with your own Firebase credentials and developers' emails

environment.prod.ts

    export  const  environment  = {
	    production:  true, // false in other file
	    devs:  ['devsemail123@gmail.com', 'anotherdevsemail321@gmail.com],
	    firebase: {
		    apiKey:  "#########################",
		    authDomain:  "##############.firebaseapp.com",
		    databaseURL:  "https://###############.firebaseio.com",
		    projectId:  "#############",
		    storageBucket:  "############",
		    messagingSenderId:  "###########",
		    appId:  "###################################",
		    measurementId:  "########"
		   },
    };

Open up your console, navigate to a suitable directory and enter the following:

    $ git clone https://github.com/Zackyy1/bug-tracker.git bug-tracker-app
    $ cd bug-tracker-app
    $ npm i
    $ ng serve

 When you're done, try adding a new project and adding a new issue and see if your database has received it. If it did, you'll see a new issue popup.

## Martin Goncharov
## Nov 2019
