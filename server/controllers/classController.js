export const hello = (req, res)=>{
    const str = 'Hello World!!!'
     res.send(str)
 }

 export const getStudents =  (req, res)=>{
    const students = [
        {name: 'Jane Doe', grade: 10},
        {name: 'Sally Doe', grade: 9},
        {name: 'Peter Doe', grade: 8},
        {name: 'David Doe', grade: 7},
        {name: 'Ruth Doe', grade: 6},
    ]
    // const users =[
    //     {name:'John Doe', email:'johndoe@gmail.com'}
    // ]
    res.send(students)
    // res.send({
    //     students: students,
    //     users: users
    // })
}