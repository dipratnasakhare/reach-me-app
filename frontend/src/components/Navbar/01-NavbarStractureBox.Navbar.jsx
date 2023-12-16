import {
  IconButton,
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useToast,
  Image,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
// import { Debouncing } from "../../page/Debouncing/Debouncing";
// import logo from "../../Image/Logo.png"
// import { MyAccount } from "../../page/MyAccount/MyAccount";

function ColorMode() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <header>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
    </header>
  )
}
export const NavbarStractureBox = ({ onOpen }) => {
  const [UserLogin, setUserLogin] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [AdminUser, setAdminUser] = useState(false)

  const RoutesText = [
    { text: "page1", route: "page1" },
    { text: "page2", route: "page2" },
    { text: "page3", route: "page3" },
  ];

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("styleCapsuleToken")) || "null";

    if (user !== "null") {
      setUserLogin(true);
      setUserName(user.name);
    }

    if (user.msg === "Admin login successfully") {
      setAdminUser(true)
    }
  }, []);

  const HandelLogout = () => {
    localStorage.removeItem("styleCapsuleToken");
    setUserLogin(false);
    setAdminUser(false)

    toast({
      position: "top",
      description: "User Log out successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    navigate("/")
  };

  let Active = {
    textDecoration: "none",
    color: "blue"
  };

  let NotActive = {
    textDecoration: "none",
    color: "black"
  };

  return (
    <Flex
      pl="1rem"
      pr="1rem"
      height="20"
      alignItems="center"
      borderBottomWidth="1px"
    

      backgroundSize={"cover"}
      justifyContent="space-between"
      backgroundImage={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKoAAACqCAMAAAAKqCSwAAAAM1BMVEX///9pseomgf8YZKvo8fm61e4qhP+izPhyoMzS4/SNtdlAf7oqcLJakMOoxeBZpfE3i/99zudjAAAEGklEQVR4nO2b6ZabMAxGCciJd/L+T1tLNsaGLEwmLeo5uj96SgLy9eeFDDMZBkEQBEEQBEEQBEEQBEEQBEEQBEEQ+KGgPza3czzeoy6XztXcx8tZLq9Jpp0r3MfxytKVTBvXlCnC0LWYVlfIpld+uVbT4loyZZhrY0qujSmzXDvT5NqYMst1Y3q59KbX0ZxtuLA1na9jD5s7wTvTq5j+GDH9PixMYfvCow1nt0udYWoum1bm+96VRaYmNdy1M4/jzpWNaec6Y9MbVyajf+ld59x458oo08Z1XppvXJmZFtd5FaiurEa/us6tQnFlkSlsJG5zL0GuLEyH4bbVGHeuLEb/kOvuhNPu+/DGdWZjOrzJ9c5l9IlXubLKFHnqujU9N1PkWa7sMkUeuvLLFHmUK8tMkZ0rz0yRXa5cM0Veu3IyfZkrq0yR567cTJ/myi5T5LErR9OHubLMFNm7cjXd5WpvV6amwyZXC4PqXDmZdrlafO7WuLLKFLl1pq0rN9Oaq12eZRZXdpkit850ceVoSrna9vlwcmWZKXKz/ZNsxdZ0/8h994IgCIIgCIIgCJ9j7dkGh9FTPFvhKGHSZyscRU/ubIWj6Mn/s7Ygam3jT3/8rOfbafpXP7oqPyG+LmTQbvJBvbzIunpFUj30l7TmQNk3FbJpIuRwYjmsiyUG55xulzm4csU7VVBt+MQvtjZsNVirk7E3S0nSzwFAKG2sPotpbjfmMyF4R6eQnHXY8XSiL666lv34j5lVupgCA01B2hyvCSVW0nJa6zUPekkrFXKsWZUGh7y8S5fnboQ6OFhWN2U/QZdhRAVlljZIIBQtmhhx6gLC3oGnbYpUy4RPGoBvZsc8QHhJLWt/oRqWga6HXitjbKkdlp7oOs2g/s86NE7jEjFTh6cAvm0VaZdJjx10pezSyy+oqmkFQ0zHjrKEOr70WlshHeNEtyQUUdVRxPiv1VQ+NmU/v1+4TjXk6lSyrLG8CvS6KcR1yjTds0MZXchXlxcjpZjKxrbsN1Q9Tq20AS57ky6qtCrKppDmnW/nTKzblsHMSNWp0jNDnaAsm7Kf4dvJA5vAUDEA4FrPa8XHfIlvmox1auA7QKpGlaEGFDbbsh+rrksSps1NEur9IZZNypYR9zqWoQzrUkk9U3nVmbJLp1HzdPCFe6/rdg+37X9ZEI5GPO+x9VaMiz59dNDrUsHVP+QtzJVJErHz/hdbVOfSTHQ1dUVBxTB5H5bhhnIjAFvT9gBuXSo2XR37+7wNucN92R9/OiK7bqbj2nER0vaorHZ1C19bqb+3ssE/2Hu237kshF3Z33xsaYp2vBi51O7BFQ27st/4WlN0az0X7Le+KRX93yirdEho+2QwmZUVBEEQBEEQBEEQBEEQBEEQBEEQ/iP+ADziK/n0NmGpAAAAAElFTkSuQmCC"}
    >

      <Flex onClick={() => navigate("/")}
        display={{ base: "none", md: "flex" }}
        fontSize="2xl"
        gap="15px"
        fontFamily="monospace"
        fontWeight="bold">
        <Image w="35px" src={""} />
        <Text>
          Reach me
        </Text>
      </Flex>

      {RoutesText.map((ele, i) => (
      
      <Box key={i/Math.random()} display={{ base: "none", md: "flex" }}
      >
          <NavLink
        key={i}
        style={({ isActive }) => (isActive ? Active : NotActive)}
        to={ele.route}
        end
      >
        <Text>{ele.text}</Text>
      </NavLink>
      </Box>
      ))}

      {/* <Spacer /> */}

      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize={["xl", "2xl"]}
        onClick={() => navigate("/")}
        fontFamily="monospace"
        fontWeight="bold"
      >
        Reach me
      </Text>

      <Box border={"1px solid red"}>
         {/* <ColorMode /> */}
      </Box>

      {/* <Debouncing /> */}

      <HStack spacing={{ base: "0", md: "6" }}>
        {UserLogin ? (
          <>
            <Flex alignItems={"center"}>
              <Menu>
                <MenuButton>
                  <HStack>
                    {/* <Avatar src="" /> */}
                    <VStack
                      display={{ md: "flex" }}
                      alignItems="flex-start"
                      spacing="1px"
                      ml="2"
                    >
                      <Text fontSize="sm"> </Text>
                      <Text fontFamily={"cursive"} color="gray.600">
                        {userName}
                      </Text>
                    </VStack>
                    <Box display={{ md: "flex" }}>
                      <FiChevronDown />
                    </Box>
                  </HStack>
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <Text onClick={() => navigate("/Notification")}>Order</Text>
                  </MenuItem>
                  <MenuItem>
                    <Text onClick={() => navigate("/Wishlist")}> Wishlist </Text>
                  </MenuItem>
                  {!AdminUser ? <MenuItem>
                    {" "}
                    {/* <MyAccount /> */}
                  </MenuItem> : ""}
                  <MenuItem>
                    {" "}
                    <Text onClick={() => navigate("/Payment_Page")}> Cart </Text>
                  </MenuItem>


                  {AdminUser ? <MenuItem>
                    {" "}
                    <Text onClick={() => navigate("/AdminDashboard")}> Admin Dashboard </Text>
                  </MenuItem> : ""}
                  <MenuDivider />
                  <MenuItem onClick={HandelLogout}>
                    {" "}
                    <Text> Sign out </Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>

            <IconButton
              display={{ base: "none", md: "flex" }}
              size="lg"
              variant="ghost"
              aria-label="open menu"
              icon={<AiOutlineShoppingCart />}
              onClick={() => navigate("/Payment_Page")}
            />
          </>
        ) : (
          <Button onClick={() => navigate("/login")}>Login</Button>
        )}
      </HStack>
    </Flex>
  );
};