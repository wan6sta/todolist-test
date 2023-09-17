import { Flex } from '@radix-ui/themes'
import { Header } from './components/Header/Header.tsx'
import { TodolistCreator } from './components/TodolistCreator/TodolistCreator.tsx'
import { Todolists } from './components/Todolists/Todolists.tsx'

export const App = () => {
  return (
    <Flex direction="column" gap="4" p="2">
      <Header />
      <Flex gap="3" wrap="wrap">
        <Todolists />
        <TodolistCreator />
      </Flex>
    </Flex>
  )
}
