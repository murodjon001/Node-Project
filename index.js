const express = require('express');
const app = express();
const user = require('./user/routes/user');
const dashboard = require('./dashboard/routes/dashboard')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//urls
app.use('/api/user', user);
app.use('/api/', dashboard);



const port_con = process.argv[2];
const port = 3000;
if(port_con){
    app.listen(port_con, ()=> {
        console.log(`${port_con}- tinglanmoqda`);
    });
}else{
    app.listen(port, ()=> {
        console.log(`${port}- tinglanmoqda`);
    });
}



