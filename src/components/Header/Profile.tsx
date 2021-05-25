import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile() {
  return (
    <Flex
      align="center"
    >
      <Box
        mr="4"
        textAlign="right"
      >
        <Text>Nelson Carvalho</Text>
        <Text
          color="gray.300"
          fontSize="small"
        >
          nelson.oak.13@gmail.com
        </Text>
      </Box>

      <Avatar
        size="md"
        name="Nelson Carvalho"
        src="https://github.com/nelson-oak.png"
      />
    </Flex>
  )
}