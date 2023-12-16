import React from "react";
import CreatePost from "./pages/CreatePost";
import { Box } from "@chakra-ui/react";

export const Home = () => {
  return (
    <Box >
      {/* Not decide till now but thinking for defferent from other social media app  */}
      <Box border="1px solid red">
        not decide
      </Box>

      <Box border="5px solid green">
        {/* Create post for posting images */}
        <CreatePost />
      </Box>

      {/* rest of this all active users of reach me */}
      <Box border={"1px solid red"}>
        sad
      </Box>

    </Box>
  );
};
