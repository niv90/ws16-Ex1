var studentsGrade = null;

//set the data from mlab in studentsGrade variable 
exports.setData = function(json){
    if (studentsGrade==null)
         studentsGrade=json;
};

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
