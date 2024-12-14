import { getDatabase, ref, onValue, push, set, remove } from "firebase/database";
import app from "./firebaseConfig";


const db = getDatabase(app);

export const getFireBaseData = (tableName) => {
const starCountRef = ref(db, tableName);

return new Promise((resolve, reject) => {
  try {
    onValue(starCountRef, (snapshot) => {
      const upDateCategory = []
      snapshot.forEach((item)=>{
        upDateCategory.push({
          id: item.key,
          ...item.val()
        })
      })
      resolve( upDateCategory);
      // return data
    // console.log(data);
});
  } catch (error) {
    reject(error);

  }
})

}
export const getFromFireBaseData = (tableName) => {
const starCountRef = ref(db, tableName);

return new Promise((resolve, reject) => {
  try {
    onValue(starCountRef, (snapshot) => {

      resolve( snapshot.val());
      // return data
    // console.log(data);
});
  } catch (error) {
    reject(error);

  }
})

}

export const getFromData = (tableName ,data)=> {
        push(ref(db, tableName), data);
}
export const updateDataFromFirebase = (tableName, data) => {
  set(ref(db, tableName), data);
};
export const onRemoveFromFirebase = (tableName) => {
  return new Promise ((resolve, reject) => {
    try {
      resolve(remove(ref(db, tableName)));
    } catch (error) {
      reject(error)
    }
  })

};
