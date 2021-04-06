import { Flex, Box, Text, Avatar } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}
export function Profile({ showProfileData = true }) {
  return (
    <Flex aling="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Josué Heringer</Text>
          <Text color="gray.300" fontSize="small">
            josuedelgadoheringer98@gmail.com
          </Text>
        </Box>
      )}
      <Avatar
        size="md"
        name="Josué Heringer"
        src="https://github.com/josueodh.png"
      />
    </Flex>
  );
}
