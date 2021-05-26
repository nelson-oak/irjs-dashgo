import { Flex, Input, Icon } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { RiSearchLine } from "react-icons/ri";

export function SearchBox() {
  // const [search, setSearch] = useState('')

  // Pegar Ref a partir de searchRef.current.value (pode trocar value por qualquer propriedade do input)
  const searchInputRef = useRef<HTMLInputElement>(null)

  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="6"
      maxW="400"
      alignSelf="center"
      color="gray.200"
      position="relative"
      bg="gray.800"
      borderRadius="full"
    >
      <Input
        color="gray.50"
        variant="unstyled"
        placeholder="Buscar na plataforma"
        px="4"
        mr="4"
        _placeholder={{ color: 'gray.400' }}
        // value={search}
        // onChange={event => setSearch(event.target.value)}
        ref={searchInputRef}
      />

      <Icon
        as={RiSearchLine}
        fontSize="20"
      />
    </Flex>
  )
}