

/*
 SGBDR = MS SQL .... 

 NO SQL = FIREBASE ,MONGODB (no relationnel type json )....
*/






const list = document.querySelector('ul');
const form = document.querySelector('form');



form.addEventListener('submit', e =>{
     //la semission dela formulaire 
    e.preventDefault()
      const now = new Date();
      const course = {

        title: form.course.value,
        created_at: firebase.firestore.Timestamp.fromDate(now)
      }
   //le retour promes
      data.collection("c_data").add(course)
      .then( form.reset())
      .catch(err=>console.error(err))
})



//Methode ajoute
addCourse= (course,id) =>{

    const html = `
     <li class="list-group-item" data-id="${id}">
     
     <h3> <span>${course.title} </span>   </h3> 
     <small>${course.created_at.toDate() } </small>
     <button class="btn btn-danger btn-sm  my-3 "> Delete </button>
     
     </li>
    
    `
    list.innerHTML+=html;
}


//button  Delete 
list.addEventListener('click',e=>{
    if(e.target.tagName==="BUTTON")
    {
         let id= e.target.parentElement.getAttribute('data-id')
          data.collection("c_data").doc(id).delete()
          .then(()=>console.log('course deleted'))
          .catch(err=>console.error(err))
    }
    
})

//get data from firebase 
// data.collection("c_data").get()
// .then(res=>res.docs.forEach(course => {
//  console.log(course.id);
//      addCourse(course.data(),course.id)}))
// .catch(err=>console.error(err)) 

/* realtime in javascript (Javascript + Firestore = RealTime)*/

//methode deletecourse

const deleteCourse= id =>{
     //confirmation to delete course 
    if(!confirm('Are you Sure to delete this course ? ')){return ; }
    const courses = document.querySelectorAll('li');
        courses.forEach(course => {
            if( course.getAttribute('data-id') === id ){
    
                  course.remove();
            }
        });

    
};

data.collection("c_data").onSnapshot(snap=>{
   

    console.log(snap.docChanges())
    snap.docChanges().forEach(course => {

        if(course.type === "added" )
        {
           addCourse(course.doc.data(), course.doc.id)
        }else{
            deleteCourse(course.doc.id)
        }
        
    });

})

/** Required Reset & Confirm */


