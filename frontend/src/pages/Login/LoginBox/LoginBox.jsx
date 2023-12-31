import {
  Flex,
  Box,
  FormLabel,
  Input,
  InputGroup,
  Image,
  InputRightElement,
  Stack,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth, provider } from "../FireBase/FireBase";
import { signInWithPopup } from "firebase/auth";

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const [serverLoading, SetServerLoading] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const SignInImageText = [
    {
      img: "https://cdn-icons-png.flaticon.com/512/2504/2504739.png",
      text: "Sign In with Goole",
    },
  ];

  const HandelGoogleSignup = () => {
    signInWithPopup(auth, provider).then((ele) => {
      setEmail(ele.user.email);
      HandelLogin();
    }).catch((error)=>console.log(error));
  };

  const HandelLogin = async () => {
    let data = { email };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_REACH_ME}/user/google`,
        data
      );
      if (res.data.user) {
        navigate("/");
        localStorage.setItem("Reach_me", JSON.stringify(res.data));
      } else {
        toast({
          position: "top",
          description: "User not found",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const HandelLoginButton = async () => {
    const data = { email, password };
    try {
      SetServerLoading(true);
      let x = await axios.post(
        `${process.env.REACT_APP_MAIN_SERVER_URL}/user/login`,
        data
      );

      if (x.data.msg === "User not found") {
        toast({
          position: "top",
          description: x.data.msg,
          status: x.data.status,
          duration: 2000,
          isClosable: true,
        });
        SetServerLoading(false);
        return;
      }
      localStorage.setItem("Reach_me", JSON.stringify(x.data));
      SetServerLoading(false);
      toast({
        position: "top",
        description: x.data.msg,
        status: x.data.status,
        duration: 2000,
        isClosable: true,
      });
      if (x.data.msg !== "Wrong password") {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      SetServerLoading(false);
      toast({
        position: "top",
        title: "Something is wrong please try later",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      backgroundSize={"cover"}
      backgroundRepeat={"none"}
      backgroundImage={
        "https://images.pexels.com/photos/7130473/pexels-photo-7130473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      }
      h="100vh"
    >
      <Flex
        justify={"center"}
        m="auto"
        // backgroundSize={"cover"}
        // backgroundRepeat={"none"}
        // backgroundImage={
        //   "https://images.pexels.com/photos/7130473/pexels-photo-7130473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        // }
      >
        <Stack
          borderRadius="3%"
          spacing={4}
          w={["85%", "65%", "55%", "30%"]}
          m="auto"
          bg={"white"}
          boxShadow={"lg"}
          mt="1rem"
          mb="3rem"
        >
          <Flex p={6} flexDirection="column" gap={5}>
            <Stack>
              <Stack align={"center"}>
                <Text
                  mb="15px"
                  fontSize="2xl"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  Login to Reach me
                </Text>
              </Stack>
              <Box>
                <Stack>
                  <FormLabel>
                    {" "}
                    <Text>Email address</Text>
                  </FormLabel>
                  <Input
                    type="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <FormLabel>
                    <Text>Password</Text>
                  </FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "Password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>

                  <Box>
                    <Text
                      onClick={() => navigate("/Forgot_Password")}
                      color="blue"
                    >
                      Forgot Password
                    </Text>
                  </Box>

                  <Stack spacing={10} pt={2}>
                    <Button
                      isLoading={serverLoading}
                      loadingText="Submitting"
                      size="lg"
                      bg={"blue.500"}
                      _hover="none"
                      color={"white"}
                      onClick={() => HandelLoginButton}
                    >
                      <Text>Login</Text>
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Stack>

            {SignInImageText.map(({ img, text }, i) => {
              return (
                <Box key={i / Math.random()} onClick={HandelGoogleSignup}>
                  <Button loadingText="Submitting" size="lg" _hover="none">
                    <Box display={"flex"} width={"50%"} m="auto" gap="10px">
                      <Image w="10%" src={img} />
                      <Text>{text}</Text>
                    </Box>
                  </Button>
                </Box>

                // <Box>
                //   <Box>
                //     {" "}
                //     <Image m="auto" w="50%" src={img} onClick={HandelGoogleSignup} />
                //   </Box>
                //   <Box textAlign={"center"}>
                //     <Text>{text}</Text>
                //   </Box>
                // </Box>
              );
            })}

            <Flex gap="5">
              <Box alignContent={"center"} display="grid">
                {" "}
                <Text color="gray.500">Create Account </Text>
              </Box>
              <Box>
                <Button
                  _hover="none"
                  onClick={() => navigate("/signup")}
                  colour="blue"
                >
                  <Text>SignUp</Text>
                </Button>
              </Box>
            </Flex>
          </Flex>
        </Stack>
      </Flex>
    </Box>
  );
};
