import axios from "axios";

let id = JSON.parse(localStorage.getItem("Reach_me")).userId || "1";

export let getId = async () => {
    try {
      const res = await axios(
        `${process.env.REACT_APP_SERVER_REACH_ME}/user/${id}`
      );
      return res
    } catch (error) {
      console.log(error);
    }
  };



const getUser = async () => {
    try {
      const res = await axios(
        `${process.env.REACT_APP_SERVER_REACH_ME}/user/${id}`
      );
      console.log(res, "ssssssss")
    //   setuserdata(res.data);
    } catch (error) {
      console.log(error,"lllllll");

    }   
 }

