import { db } from '@/app/firebase/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import { NextResponse } from 'next/server'

// export a function that returns an array of users' ages.
/*  
        get all documents in the users collection
        access the age for each
        push the data into an array called usersAges.
         e.g usersAges:number = [45,23,67,34,12,34,76,34]
        return usersAges

 - Note numOfSurveys = usersAges.length 
*/

export const GET = async (req: Request) => {
  let userBirthYears: string[] = []
  try {
    const querySnapshot = await getDocs(collection(db, 'users'))
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', { ...doc.data() })
      userBirthYears.push(doc.data().birthDate)
    })
    console.error('User birth years fetched successfully')
    return NextResponse.json({ years: userBirthYears })
  } catch (error) {
    console.error('Error fetching users: ', error)
    throw error
  }
}

// export a function that returns an array of users' preferred food.
/*
        get all documents in the allFoodPreferences collection. Each element is an of strings
        deconstruct the array
        push the data into an array called usersFoodPreferences.
         e.g usersFoodPreferences:string = ['pizza','pasta', 'pasta','papAndWors','other','other']
        return usersFoodPreferences
*/

// export a function that returns an array of users' activity ratings.
/*
        get all documents in the allActivityRatings collection. Each element is an object of ActivityData

        Create an array for each activity,  e.g tvCount

        if data[i].activity = 'tv' => push data[i].count into tvCount array

        create an object to store activity specific count and label 
            e.g tvData:UserActivityData = {label:"pizza", activityCounts:tvCount}
            where UserActivityData ={label: string activityCounts: number[]}

        return {tvData, radioData, moviesData, eatOutData}
*/
