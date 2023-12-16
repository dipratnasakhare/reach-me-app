
import { useEffect, useRef, useState } from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Input, useToast, Image } from "@chakra-ui/react";
import axios from "axios";

import moment from "moment";

// api call 
// import { getId } from "./Apicall"

let id = JSON.parse(localStorage.getItem("Reach_me")).userId || "1";

const initState = {
  postTime: moment().format("MMMM Do YYYY, h:mm:ss a"),
  userId: id,
  desc: "",
  img: "",
  likes:[],
  comments:[]
};

export default function CreatePost() {
  const desc = useRef();
  const [image, setimage] = useState("");
  const [formData, setFormData] = useState(initState);
  const [userdata, setuserdata] = useState();
  const toast = useToast();

  let time = moment().format("MMMM Do YYYY, h:mm:ss a");

  // useEffect(async () => {
  
  // }, []);



  // cloudinaty && post https://ik.imagekit.io/fnqfsnnmf/path/to/myimage.jpg


  // post here for post data

  const submit = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "reach_me");
    data.append("cloud_name", "dk4ubgaiw");

    fetch("https://api.cloudinary.com/v1_1/dk4ubgaiw/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setFormData({ ...formData, img: data.url });
        add(data)
      })
      .catch((err) => {
        console.log(err);
      });
  };



  // to add popduct here for post 

  const add = async (data1) => {
    let data = formData
    data.img = data1.url
    try {
      let res = await axios.post(
        `${process.env.REACT_APP_SERVER_REACH_ME}/post`,
          formData
      );


      console.log(res,"res")
      
       if (res.data) {
        toast({
          position: "top",
          title: "You are successfully created post",
          status: "success",
          duration: 4000,
          isClosable: false,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  

  // to get user for post in server

  const getUser = async () => {
    try {
      const res = await axios(
        `${process.env.REACT_APP_SERVER_REACH_ME}/user/${id}`
      );
      console.log(res, "ssssssss")
      setuserdata(res.data);
    } catch (error) {
      console.log(error,"lllllll");
    }

    if (formData.img !== "" && id !== "") {
      add();
    }


  };

  return (
    <Box className="share">
      <Box className="shareWrapper">
        <Box className="shareTop">
          <Image
            className="shareProfileImg"
            src={userdata?.profilePicture}
            alt=""
          />

          <Box className="shareBottom">
            <Box className="shareOptions">
                <AddIcon mr={2} className="shareIcon" />
                <span className="shareOptionText">Photo</span>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setimage(e.target.files[0])}
                />
                
              {image && (
                <Box b="1px solid" className="shareImgContainer">
                  <img
                    src={URL.createObjectURL(image)}
                    alt=""
                    style={{
                      width: "50px",
                    }}
                  />
                  <CloseIcon
                    className="shareCancelImg"
                    onClick={() => setimage("")}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        <hr className="shareHr" />
        <Box className="des">
          <Input
            placeholder={"What's in your mind " + "?"}
            className="shareInput"
            type="text"
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
            required
            ref={desc}
          />
          <Button className="shareButton" onClick={submit}>
            Post
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

// 4444444


