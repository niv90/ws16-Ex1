var studGrade = require('./md_studentsGrad');
var express = require('express');
var url = require('url');
var app = express();
var port = process.env.PORT || 3000;
var studentGrade;

//get all student from json
app.get('/getAllStudent',function(req,res){
    res.status(200).json(studGrade.getAllStudents());
});


//callback for user_id call, check if the id param is exist in the list
app.param('user_id',function(req,res,next,value){
    studentGrade = studGrade.getStudGradeById(value);
    //the id is not exist if studentGrade is negative 
    if(studentGrade == -1){
        res.set('header-getStudGradeById',"the id isn't exist please try another ID");
        res.status(400).json({status:false,message:"bad ID"});
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
        res.set('header-betweenGrade',"there is not grade in that range you specified");
        res.status(400).json({status:false,message:"bad grade range"});
    }
    else{
        res.status(200).json({ gradeByRange : studentsGrade });
    }
    
});  

app.listen(port);
console.log('listening' + port);