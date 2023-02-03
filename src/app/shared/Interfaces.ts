import * as stream from "stream";

export interface User {
  email: string
  password: string
  returnSecureToken?: boolean //need for sending to FireBase for login

}

//I think this is not important
// export interface FireBaseAuthResponse {
//   idToken: string
//   expiresIn: string
// }


export interface Post {
  id?: string
  title: string
  text: string
  author: string
  date: Date
}

export interface FbCreateResponse {
  name: string
}
