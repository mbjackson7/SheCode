import { Text, Button, Box, Flex, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/shecodeWhiteGlow.png";
import { getRegistrationCount } from "../../data/firestoreOps";
import { CAPACITY, DEADLINE } from "../../config";

const Home = () => {
  const [capacityMet, setCapacityMet] = useState(true);
  const [loading, setLoading] = useState(true);
  // deadline must be set to CST or CDT according to daylight savings time
  useEffect(() => {
    getRegistrationCount().then((count) => {
      console.log(count)
      if (count >= CAPACITY) {
        setCapacityMet(true);
      } else {
        setCapacityMet(false);
      }
      setLoading(false);
    });
  }, []);

  // renders the register button based on the deadline and capacity
  const RegisterButton = () => {
    if (DEADLINE > new Date()) {
      if (loading) {
        return (
          <Button colorScheme="Black" variant="outline">
            Loading...
          </Button>
        );
      } else {
        if (capacityMet) {
          return (
            <Button colorScheme="Black" variant="outline">
              Capacity Met
            </Button>
          );
        } else {
          return (
            <Link to="/register">
              <Button colorScheme="Black" variant="outline">
                Register to Participate
              </Button>
            </Link>
          );
        }
      }
    } else {
      return (
        <Button colorScheme="Black" variant="outline">
          Deadline Passed
        </Button>
      );
    }
  };

  return (
    <Box
      height="100vh"
      justifyContent="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Image src={logo} alt="SheCode Logo" maxW="80%" />
        <Text mt="0px" mb="3vh" fontSize="xl" fontFamily="monospace">
          April 22, 2023
        </Text>
        <Text mt="-22px" mb="3vh" fontSize="xl" fontFamily="monospace">
          Southern Illinois University Edwardsville
          <br />
          Edwardsville, IL
        </Text>
      </Box>
      <RegisterButton/>
      <Box>
        <Text
          mt="10px"
          mb="3vh"
          maxW="70vw"
          fontSize="xl"
          fontFamily="monospace"
        >
          <Text as={DEADLINE > new Date() ? "" : "s"}>
            Registration Deadline: {DEADLINE.toLocaleString()}
          </Text>
          <Text as={capacityMet ? "s" : ""}>
            Max Capacity: {CAPACITY} Participants
          </Text>
        </Text>
      </Box>
    </Box>
  );
};

export default Home;
