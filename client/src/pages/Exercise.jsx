import { useState, useEffect } from 'react'
import axios from 'axios'

const Exercise = () => {
  
  const [students, setStudents] = useState([])

  // use .then or
    
    const getStudents = (stud) =>{
        axios.get('http://localhost:5000/students')
            .then(({data}) =>{
                console.log(data)
                setStudents(data)
            })
            .catch((err)=>{
              console.log(err)
            })
    }

    useEffect(()=>{
      getStudents();
  
    },[])

    // or use async await

    const getStudents2 = async () =>{
      const {data} = await axios.get('http://localhost:5000/students');
      console.log(data);
      setStudents(data);
    }

  return (
    <>
     {
          students.map((student)=>{
          return(

            <div >
              <p key={student.name}>Name:{student.name}|Grade:{student.grade}</p> 
            </div>
            
          )
        })
      } 
    
      <div>
        <button onClick={getStudents}>Fetch</button>
        <button onClick={getStudents2}>Fetch2</button>
      </div>
      
    </>
  )
}

export default Exercise
