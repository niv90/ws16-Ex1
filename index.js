var studGrade = require('./md_StudentsGrad');
var express = require('express');
var url = require('url');

var mongoose = require('mongoose');
var student = require('./student');

var app = express();
var port = process.env.PORT || 3000;
var studentGrade;

//connect to db in Mlab
mongoose.connect('mongodb://db_usr:db_pass@ds015902.mlab.com:15902/ex1_db');

mongoose.connection.once('open',function(){
    //get all the users
    student.find({},function(err,user){
        if (err) throw err;
        //set all the data from mLab in the studentGrade module
        studGrade.setData(user);
        console.log(user);
        mongoose.disconnect();         
    });    
});

//get all student from json
app.get('/getAllStudent',function(req,res){
    res.status(200).json(studGrade.getAllStudents());
});


//callback for user_id param, check if the id param is exist in the list
app.param('user_id',function(req,res,next,value){
    studentGrade = studGrade.getStudGradeById(value);
    //the id is not exist if studentGrade is negative 
    if(studentGrade == -1){
        res.set('header-getStudGradeById',"The ID does not exist in the database please try another ID");
        res.status(400).json({status:false,message:"The ID does not exist in the database please try another ID"});
    }
    next();
});

//get student grad by id
app.get('/getStudGradeById/:user_id',function(req,res){
     res.status(200).json({ gradeById : studentGrade });
});


//get 2 queryString param: 
//betweenGrade?from=80&to=90
app.get('/betweenGrade',function(req,res){
    var urlPart = url.parse(req.url,true);
    var query = urlPart.query;
    var studentsGrade = [];
    
    studentsGrade = studGrade.getRangeGrade(query.from,query.to);
    //the range of the grade is not valid if studentGrade is negative 
    if(studentsGrade == -1 ){
        res.set('header-betweenGrade',"there isn't grades in the range that you specified");
        res.status(400).json({status:false,message:"The range of grades is not correctly"});
    }
    else{
        res.status(200).json({ gradeByRange : studentsGrade });
    }
    
});  

//Catches the rest
app.get('*',function(req,res){
     res.set('header-worngRoute',"entered incorrect path");
     res.status(400).json({status:false,message:"You entered incorrect path"});
});

app.listen(port);
console.log('listening' + port);