const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


//andmed
const users = [
    {
        id:0,
        firstName: 'Jenny',
        lastName: 'Smith',
        email: 'jenny.smith@gmail.com',
        password: 'jen'
    },
    {
        id:1,
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@gmail.com',
        password: 'johnny'
    }
];


//päring ja selle vastus
app.get('/api/ping', (req,res) => {
    /* res.status(200).json({
        message: 'Hello world!'
    }); */ 
    
    //pingimine
    res.status(200).json({success:true});
});


//GET endpoint: users
//Required:none
//Optional:none
app.get('/api/users', (req,res)=>{
    res.status(200).json({
        success: true,
        users: users
    });
});


//GET endpoint: users
//Required: id
//Optional: none
app.get('/api/users/:id', (req,res)=>{
    console.log(req.params.id);
    //req.params.id = arv, mis koos päringuga saadetakse
    res.status(200).json({
        success: true,
        users: users[req.params.id]['firstName']
    });
});

//POST
app.post('/api/users', (req,res)=>{
    //console.log(req.body);

    //turvakontroll
    const firstName = typeof(req.body.firstName) === 'string' && req.body.firstName.trim().length > 0 ? req.body.firstName : false ;
    const lastName = typeof(req.body.lastName) === 'string' && req.body.lastName.trim().length > 0 ? req.body.lastName : false ;
    const email = typeof(req.body.email) === 'string' && req.body.email.trim().length > 0 ? req.body.email : false ;
    const password = typeof(req.body.password) === 'string' && req.body.password.trim().length > 0 ? req.body.password : false ;

    if(firstName && lastName && email && password) {
        const newUser = {
            //võib kirjutada lihtsalt firstName
            id: users.length,
            firstName: firstName,
            lastName,
            email,
            password
        }

        users.push(newUser);
        delete newUser.password;

        res.status(201).json({
            success: true,
            user: newUser
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'Required fields missing/invalid'
        });
    }

    /* res.status(201).json({
        success: true,
        message: 'Required fields missing/invalid'
    }); */
});

//PUT
//Required: id
//Optional: firstName, lastName, email, password
app.put('/api/users', (req,res)=>{
    //console.log(req.body);

    const id = typeof(req.body.id) === 'number' ? req.body.id : false ;
    const firstName = typeof(req.body.firstName) === 'string' && req.body.firstName.trim().length > 0 ? req.body.firstName : false ;
    const lastName = typeof(req.body.lastName) === 'string' && req.body.lastName.trim().length > 0 ? req.body.lastName : false ;
    const email = typeof(req.body.email) === 'string' && req.body.email.trim().length > 0 ? req.body.email : false ;
    const password = typeof(req.body.password) === 'string' && req.body.password.trim().length > 0 ? req.body.password : false ;


    if(id || id === 0){
        if(firstName){
            users[id].firstName = firstName;
        }
        if(lastName){
            users[id].lastName = lastName;
        }
        if(email){
            users[id].email = email;
        }
        if(password){
            users[id].password = password;
        }
        res.status(200).json({
            success: true,
            message: users[id]
        });
    }else{
        res.status(400).json({
            success: false,
            message: 'Required fields missing/invalid'
        });
    }
});

//DELETE users
//Require: id
//Optional: none
app.delete('/api/users', (req,res)=>{
    console.log(req.body);
    const id = typeof(req.body.id) === 'number' ? req.body.id : false;
    if(id || id === 0){
        users.splice(id,1);
        res.status(200).json({
            success: true
        });
    }else{
        res.status(400).json({
            success: false,
            message: 'Required fields missing/invalid'
        });
    }
});


//käivitmaine, esimene parameeter: port, mille peal kuulab
app.listen(3000, ()=> {
    console.log('Server running');
});