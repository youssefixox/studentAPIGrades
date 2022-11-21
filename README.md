# studentAPIGrades
The goal for this project was to create a REST API which exposes grades of high school students in maths , physics,  arabic and english topics . And a simple web application that's going to use the web service.

## Technologies Used :
 - Node js 
 - Express
 - SQLITE
 - HTML
 - Javascript
 - Bootstrap

## Tools Used While Developing Application :
- vim
- tmux
- curl
- Google Chrom

## Plateform Used :
- Linux (Centos7)

## Run The Application Locally : 

1- Get the app :

```
git clone https://github.com/youssefixox/studentAPIGrades.git
```
2- cd into the project folder then :

```
$ npm install
$ npm start
```
 note : if you are using centos 7 make sure to open the port 8000 for external access
 
 ```
 firewall-cmd --add-port=8000/tcp
 ```
 
 3- The Application should be accessible at http://ip:8000
 
 ## Rest Api Endpoints :
 
 #### List Students:
 
 ```
  curl http://<ip>:8000/api/users
 ```
 
 #### List Stuent Based On Id:
 ```
 curl http://<ip>:8000/api/user/1
 ```
 
 #### List Student Based on his/her CIN:
 ```
 curl http://<ip>:8000/api/user/cin/x1234
 ```
 
 #### Add A Student :
 
 ```
 curl http://<ip>:8000/api/user -X POST -d "cin=a123&math=11&physique=17&arab=8&anglais=8"
 ```
 #### Delete A Student : 
 
 ```
 curl http://<ip>:8000/api/user/5 -X DELETE 
 ```
 
 #### Update A Student :
 
 ```
 curl -X PATCH -d "math=18.5" http://<ip>:8000/api/user/1
 ```
 
 ## Application Demonstration :
 
 ![alt text](https://raw.githubusercontent.com/youssefixox/studentAPIGrades/main/images/etudiant%20admis.png)
 
 ![alt text](https://raw.githubusercontent.com/youssefixox/studentAPIGrades/main/images/etudiant%20nexiste%20pas.png)
 
 ![alt text](https://raw.githubusercontent.com/youssefixox/studentAPIGrades/main/images/etudiant%20non%20admis.png)
