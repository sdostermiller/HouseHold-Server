
1. `nodemon` or `npx nodemon` to start server

# HouseHold (Server)
_A collaborative list sharing app_
---
---
HouseHold is a group list-sharing app designed to provide real-time updates to ongoing group lists.  Each user has access to the group's lists and can update them so that all members can see the changes.  This facilitates better access to information relevant to the group and allows better decision making without needing to collect information every time a task is completed.

The HouseHold server app is built on Node.js using Sequelize/PostgreSQL.

### Installation

To install, run 'git clone https://github.com/sdostermiller/HouseHold-Server' from your terminal in your target folder.  You will need to run 'npm update' to retrieve the included packages and dependencies.  

If you do not have node installed, you can find instructions and downloads here: [Node.js] (https://nodejs.org/ "Node.js")

After cloning and installation, you will need to create a .env file in the main directory with the following data included:

```
PORT={your port here}
DATABASE_URL={your database address/credentials here}
JWT_SECRET={your secret code here}
```

### Use

The prototype is a simple design meant for easy access.  Users can add items, assign them to lists, and edit lists.  All users in a group (Household) can see and collaborate on the group lists. There are three levels of user: Guest (read only), Member (can edit lists and items), and Head (can remove members from the house and edit userRoles).

Database interactions are detailed in the model index.

The Client build can be found on Github [HouseHold client repository](https://github.com/sdostermiller/HouseHold-Client.git "Github Repository")

### Planned improvements

Version 2.0 will include:
* support for items being utilized in multiple lists
* addition of aisles/categories within lists
* color coding of categories/groups for easy access
* search and sorting functions

------
_This prototype was developed as a Web Development project for Eleven Fifty Academy_
&copy Shanna Ostermiller 2021




https://github.com/sdostermiller/HouseHold-Client