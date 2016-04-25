var studentsGrade = [
    {"ID":"1","firstName":"John", "lastName":"Doe" , "grade":92 , "year":2000}, 
    {"ID":"2","firstName":"Anna", "lastName":"Smith", "grade":80 , "year":2015}, 
    {"ID":"3","firstName":"Peter", "lastName":"Jones", "grade":85 , "year":2014},
    {"ID":"4","firstName":"Frank", "lastName":"Goldman", "grade":95 , "year":2013},
    {"ID":"5","firstName":"David", "lastName":"Davision", "grade":90 , "year":2012}
]


//get all student from json
exports.getAllStudents = function () {
    return studentsGrade;
};

//get student grade by ID. return -1 if the student isn't exist
exports.getStudGradeById = function (value) {
    for(index=0 ; index < studentsGrade.length ; index++){
        if(studentsGrade[index].ID == value){
            return studentsGrade[index].grade;
        }
    }
    return -1;
 };

//get grad student by range
exports.getRangeGrade = function (_from,_to) {
    tempStudentsGrade = [];
    var flag = 0;
    for(index=0 ; index < studentsGrade.length ; index++){
       if(studentsGrade[index].grade >= _from & studentsGrade[index].grade <= _to){
            console.log( studentsGrade[index].firstName);
            tempStudentsGrade.push(studentsGrade[index].firstName);
           flag=1;
        }
    }
    if(flag == 1 ){
       return tempStudentsGrade; 
    }
    else{
        return -1;
    }
};
