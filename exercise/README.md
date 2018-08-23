## Technologies 

### ฝั่ง Server (NodeJS)

**ExpressJS** ใช้เป็น Api framework

**MonkJS** ใช้จัดการ MongoDB เพราะ เป็น libary ที่ง่ายต่อการเรียนรู้

**Body-parser** ใช้จัดการข้อมูลที่ส่งเข้า api ให้เอาไปใช้ได้ง่าย

**Cors** ใช้สร้าง herder : Access-Control-Allow-Origin ให้ฝั่ง api เพื่อให้ react ดึงข้อมูล

**Joi** ใช้ validation ข้อมูล

**Multer** ใช้ upload file

### ฝั่ง Client
**React** ใช้เป็น  Frontend framework

**Axios** ใช้ส่งข้อมูลให้ Api (Ajax)

**Moment** ใช้แปลงค่าวันเวลา (ใช้ง่ายกว่า function ใน javascript)

**Semantic-ui-react** ใช้เป็น ui เพราะ ค่อยข้างจะมีตัวอย่างการใช้งานที่ครบถ้วน


## Architecture Design

![alt text](http://178.128.51.24:3001/image/thinkNet.jpg)

## Installation 
ต้องมี NodeJS, MongoDB และ Git ก่อน

1. git clone https://github.com/ftgs40/movie-ticket.git
2. cd movie-ticket/exercise/
3. npm install
4. npm run dev or npm start (port 3001)
5. cd movie-ticket/exercise/react-app/
6. npm install
7. npm start (port 3000)

OpenApp --> http://localhost:3000

## Deployment
ระบบจะแบ่งการทำงานออกเป็น 3 ส่วน คือ
1. Wep Api ( NodeJs )
2. Wep Frontent ( React)
3. Database ( MongoDB )
ทั้ง 3 ส่วนนี้ถูกติดตั้งไว้ที่ VPS ของ Digitalocean 
เหตุผลที่ใช้  : เพราะ Digital Ocean สามารถจัดการ web และค่า config ต่างๆเองได้ (เราคุม server เอง) 

URL :  http://178.128.51.24:3000/
##

