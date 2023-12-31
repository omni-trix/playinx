"use client"
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  Box,
  Button,
  Center,
  Flex,
  Text,
  useDisclosure as JoinTournamentDisclosure,
  useDisclosure as DetailsDisclosure,
  useDisclosure as RulesDisclosure
} from '../../chakraExports';
import { GiSoccerField, GiSoccerKick, GiWhistle } from 'react-icons/gi';
import { IoFootballOutline, IoPeopleOutline, IoTimeOutline, IoLocationOutline, IoArrowBack } from 'react-icons/io5';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { Database } from '../../../database.types';
import Tournament from './components/Tournament';
import JoinTournamentModal from './components/JoinTournamentModal';
import DetailsModal from './components/DetailsModal';
import RulesModal from './components/RulesModal';

type Event = {
  banner_image_URL: string
  category: string
  created_at: string
  format: string
  id: string
  location: string
  name: string
  prize_money: string | null
  start_date: string
  type: string
  entry_fee: string
  status: string
  description: string
  teams: []
};

type TeamType = {
  teamAdmin: string
  paymentStatus: string
}

const Event = ({ user }) => {
  const searchParams = useSearchParams();
  const supabase = createClientComponentClient();
  const id = searchParams.get("id")
  const userId = user?.id
  const router = useRouter()
  const joinTournamentDisc = JoinTournamentDisclosure()
  const detailsDisc = DetailsDisclosure()
  const rulesDisc = RulesDisclosure()
  const [event, setEvent] = useState<Event>()
  const [teams, setTeams] = useState([]);

  const fetchEventDetails = async () => {
    let { data: event, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", `${id}`);

    console.log(event, "event");
    console.log(error, "err");
    if (!error) {
      setEvent(event[0]);
    }
  }

  const fetchMyTeams = async () => {
    let { data: teams, error } = await supabase
      .from("teams")
      .select("*")
      .eq("team_admin", `${user?.id}`)

    if (!error) {
      setTeams(teams);
    }
  };

  useEffect(() => {
    fetchEventDetails()
    fetchMyTeams();
  }, [])

  useEffect(() => {
    const channel = supabase
      .channel("events")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "events",
        },
        (payload) => {
          console.log(payload, "payload");
          fetchEventDetails()
          // const newSquad = payload.new as Squad;
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
    <>
      {event?.status === "slots confirmed" ? (<Tournament />) :
        (
          <Box p={4}>
            <Flex alignItems="center" justifyContent="space-between" mb={4}>
              <Button variant="unstyled" flex={1} justifyContent="flex-start">
                <IoArrowBack
                  onClick={() => router.back()}
                  color="#E7E9EA"
                  size={25}
                />
              </Button>
              <Text flex={4} fontSize="lg" color="#E7E9EA" fontWeight="bold" textTransform="uppercase">
                {event?.name}
              </Text>
            </Flex>

            <Box w={{
              base: "100%",
              md: "50%",
              xl: "25%",
            }}>
              <img
                style={{ maxWidth: "100%", objectFit: "contain" }}
                alt="Logo"
                src={event?.banner_image_URL} />
            </Box>
            <Box mt={4}>
              <Flex
                justifyContent="space-around"
                p={4}
                borderBottomColor="gray"
                borderBottomWidth="1px"
              >
                <Button size="lg" colorScheme='messenger' onClick={detailsDisc.onOpen} >Details</Button>
                <DetailsModal isOpen={detailsDisc.isOpen} onClose={detailsDisc.onClose} description={event?.description}/>
                <Button size="lg" colorScheme='messenger' onClick={rulesDisc.onOpen} >Rules</Button>
                <RulesModal isOpen={rulesDisc.isOpen} onClose={rulesDisc.onClose} />
              </Flex>

              <Flex flexDir="column" p={4}>
                <Flex flexDir="row" alignItems="center" mb={3}>
                  <IoFootballOutline size={24} color="#E7E9EA" />
                  <Flex flexDir="column" alignItems="flex-start" pl={3}>
                    <Text textTransform="capitalize" fontSize="md" color="#E7E9EA">
                      {event?.category}
                    </Text>
                    <Text fontSize="md" color="gray">
                      Category
                    </Text>
                  </Flex>
                </Flex>

                <Flex flexDir="row" alignItems="center" mb={3}>
                  <GiSoccerKick size={24} color="#E7E9EA" />
                  <Flex flexDir="column" alignItems="flex-start" pl={3}>
                    <Text textTransform="capitalize" fontSize="md" color="#E7E9EA">
                      {event?.type}
                    </Text>
                    <Text fontSize="md" color="gray">
                      Type
                    </Text>
                  </Flex>
                </Flex>


                <Flex flexDir="row" alignItems="center" mb={3}>
                  <GiSoccerField size={24} color="#E7E9EA" />
                  <Flex flexDir="column" alignItems="flex-start" pl={3}>
                    <Text textTransform="capitalize" fontSize="md" color="#E7E9EA">
                      {event?.format}
                    </Text>
                    <Text fontSize="md" color="gray">
                      Format
                    </Text>
                  </Flex>
                </Flex>

                <Flex flexDir="row" alignItems="center" mb={3}>
                  <IoTimeOutline size={24} color="#E7E9EA" />
                  <Flex flexDir="column" alignItems="flex-start" pl={3}>
                    <Text textTransform="capitalize" fontSize="md" color="#E7E9EA">
                      {event?.start_date}
                    </Text>
                    <Text fontSize="md" color="gray">
                      Kick-off
                    </Text>
                  </Flex>
                </Flex>

                <Flex flexDir="row" alignItems="center" mb={3}>
                  <IoLocationOutline size={24} color="#E7E9EA" />
                  <Flex flexDir="column" alignItems="flex-start" pl={3}>
                    <Text textTransform="capitalize" fontSize="md" color="#E7E9EA">
                      {event?.location}
                    </Text>
                    <Text fontSize="md" color="gray">
                      Location
                    </Text>
                  </Flex>
                </Flex>

                <Flex flexDir="row" alignItems="center" mb={3}>
                  <FaRegMoneyBillAlt size={24} color="#E7E9EA" />
                  <Flex flexDir="column" alignItems="flex-start" pl={3}>
                    <Text textTransform="capitalize" fontSize="md" color="#E7E9EA">
                      {event?.entry_fee}
                    </Text>
                    <Text fontSize="md" color="gray">
                      Entry fee
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Box>
            <Center mt={6}>
              <Button size="lg" onClick={joinTournamentDisc.onOpen} >Join Tournament</Button>
              <JoinTournamentModal isOpen={joinTournamentDisc.isOpen} onClose={joinTournamentDisc.onClose} user={user} event={event} teams={teams} />
            </Center>
          </Box>
        )}
    </>
  )
}

export default Event