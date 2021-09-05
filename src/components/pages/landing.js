import React,{useState,useEffect} from 'react'
import {
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useBreakpointValue,
  } from '@chakra-ui/react';
  import {
    Container,
    SimpleGrid,
    StackDivider,
    Icon,
    useColorModeValue,
  } from '@chakra-ui/react';
  import {
    IoAnalyticsSharp,
    IoLogoBitcoin,
    IoSearchSharp,
  } from 'react-icons/io5';
  import { ReactElement } from 'react';
  import { NavLink } from 'react-router-dom';


//propsには履歴が入る
export const Landing= (props) => {

    const Feature = ({ text, icon, iconBg }) => {
        return (
          <Stack direction={'row'} align={'center'}>
            <Flex
              w={8}
              h={8}
              align={'center'}
              justify={'center'}
              rounded={'full'}
              bg={iconBg}>
              {icon}
            </Flex>
            <Text fontWeight={600}>{text}</Text>
          </Stack>
        );
      };
    
   

    return (
        <>

                <Stack  direction={{ base: 'column', md: 'row' }}>
                    <Flex p={8} flex={1} align={'center'} justify={'center'}>
                    <Stack spacing={6} w={'full'} maxW={'lg'}>
                    <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                        <Text
                        as={'span'}
                        position={'relative'}
                        _after={{
                            content: "''",
                            width: 'full',
                            height: useBreakpointValue({ base: '20%', md: '30%' }),
                            position: 'absolute',
                            bottom: 1,
                            left: 0,
                            bg: 'blue.400',
                            zIndex: -1,
                        }}>
                        FolioTracker
                        </Text>
                        <br />{' '}
                        <Text color={'blue.400'} as={'span'}>
                        気になるユーザーの
                        </Text>
                        <br />{' '}
                        <Text color={'blue.400'} as={'span'}>
                        取引履歴や保有株
                        </Text>
                        <br />{' '}
                        <Text color={'blue.400'} as={'span'}>
                        を分析!
                        </Text>
                    </Heading>
                    <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
                        アカウント登録すると自分のポートフォリオを他ユーザーのポートフォリオと比較で来たりフォローしているユーザーの取引履歴をタイムラインで見ることができます。
                    </Text>
                    <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                        <NavLink exact to={`/login`} className={"flex items-center"}>

                        <Button
                        rounded={'full'}
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                            bg: 'blue.500',
                        }}>
                        アカウント作成(無料)
                        </Button>
                        </NavLink>
                        <NavLink exact to={`/otherportfolio`} className={"flex items-center"}>

                        <Button rounded={'full'}>
                        ユーザーのポートフォリオを見る
                        </Button>
                        </NavLink>
                    </Stack>
                    <Stack
                                spacing={4}
                                divider={
                                <StackDivider
                                    borderColor={useColorModeValue('gray.100', 'gray.700')}
                                />
                                }>
                                <Feature
                                icon={
                                    <Icon as={IoAnalyticsSharp} color={'yellow.500'} w={5} h={5} />
                                }
                                iconBg={useColorModeValue('yellow.100', 'yellow.900')}
                                text={'自分のポートフォリオのレポートを取得!'}
                                />
                                <Feature
                                icon={<Icon as={IoLogoBitcoin} color={'green.500'} w={5} h={5} />}
                                iconBg={useColorModeValue('green.100', 'green.900')}
                                text={'他のユーザーのポートフォリオを投資戦略から検索して理想のポートフォリオを見つけられます!'}
                                />
                                <Feature
                                icon={
                                    <Icon as={IoSearchSharp} color={'purple.500'} w={5} h={5} />
                                }
                                iconBg={useColorModeValue('purple.100', 'purple.900')}
                                text={'見つけたポートフォリオの構成銘柄をワンクリックで分析!'}
                                />
                            </Stack>
                    </Stack>
                </Flex>
               
                </Stack>
        </>
    )
}
