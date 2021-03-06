import { Link as ChakraLink, Checkbox, Box, Button, Flex, Heading, Icon, Table, Th, Thead, Tr, Tbody, Td, Text, useBreakpointValue, Spinner } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";
import { getUsers, useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";

// Removendo as tipagens que não funcionou....
// type User ={
//   id: string
//   name: string
//   email: string
//   createdAt: string
// }

// type GetUsersData = {
//   totalCount: number
//   users: User[]
// }

// type ServerSideReturn = {
//   props: GetUsersData
// }

// Removendo as props que não funcionou...
// export default function UserList({ users, totalCount }: GetUsersData) {
  export default function UserList() {
  const [page, setPage] = useState(1)
  // Essa forma não funcionou...
  // const { data, isLoading, isFetching, error } = useUsers(page, {
  //   initialData: {
  //     users,
  //     totalCount
  //   }
  // })
  const { data, isLoading, isFetching, error } = useUsers(page)

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`users/${userId}`)

      return response.data
    }, {
      staleTime: 1000 * 60 * 10 // 10 minutes
    })
  }

  useEffect(() => {
    })

  return (
    <Box>
      <Header />

      <Flex
        width="100%"
        my="6"
        maxW={1480}
        mx="auto"
        px="6"
      >
        <Sidebar />

        <Box
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p="8"
        >
          <Flex
            mb="8"
            justify="space-between"
            align="center"
          >
            <Heading
              size="lg"
              fontWeight="normal"
            >
              Usuários

              {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
            </Heading>

            <Link href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar Novo
              </Button>
            </Link>
          </Flex>

          
          {isLoading ? (
            <Flex
              justify="center"
            >
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex
              justify="center"
            >
              <Text>Falha ao obter dados dos usuários.</Text>
            </Flex>
          ) : (
            <>
              <Table
                colorScheme="whiteAlpha"
              >
                <Thead>
                  <Tr>
                    <Th
                      px={['4', '4', '6']}
                      color="gray.300"
                      w="8"
                    >
                      <Checkbox
                        colorScheme="pink"
                      />
                    </Th>
                    <Th>Usuário</Th>
                    { isWideVersion && <Th>Data de cadastro</Th>}
                  </Tr>
                </Thead>

                <Tbody>
                  {data.users.map(user => (
                    <Tr key={user.id}>
                      <Td
                        px={['4', '4',]}
                      >
                        <Checkbox
                          colorScheme="pink"
                        />
                      </Td>
                      <Td>
                        <Box>
                          <ChakraLink
                            color="purple.400"
                            onMouseEnter={() => handlePrefetchUser(user.id)}
                          >
                            <Text
                              fontWeight="bold"
                            >
                              {user.name}
                            </Text>
                          </ChakraLink>
                          <Text
                            fontSize="small"
                            color="gray.300"
                          >
                            {user.email}
                          </Text>
                        </Box>
                      </Td>
                      {isWideVersion && <Td>{user.createdAt}</Td>}
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              <Pagination
                totalCountOfRegisters={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

// Isso não funcionou...
// export const getServerSideProps: GetServerSideProps = async (): Promise<ServerSideReturn> => {
//   const { users, totalCount } = await getUsers(1)

//   return {
//     props: {
//       users,
//       totalCount
//     }
//   }
// }