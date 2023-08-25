import React, { useEffect, useState } from "react";
import { Box, Text, Button, useDisclosure, Flex } from "../../chakraExports";
import { IoAddOutline } from "react-icons/io5";
import CreateMatchModal from "./CreateMatchModal";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import useTeamStore from "../../../utils/store/teamStore";
import { useRouter } from "next/navigation";

type Match = {
  date: string;
  location: string;
  time: string;
  team_name: string;
  opponent_name: string;
  opponent_id: string;
  match_status: string;
  opponent_status: string;
};

const Matches = () => {
  const supabase = createClientComponentClient();
  const activeTeam = useTeamStore((state) => state.activeTeam);
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [matches, setMatches] = useState<Match[]>([]);

  const getMatches = async () => {
    let { data: matches, error } = await supabase
      .from("matches")
      .select("*")
      .or(
        `team_id.eq.${activeTeam?.team_id},opponent_id.eq.${activeTeam?.team_id}`
      );
    if (matches && matches.length > 0 && error === null) {
      setMatches(matches);
    }
    // console.log(matches, "matchData");
    console.log(error, "matchError");
  };

  const handleAcceptBtn = async (match) => {
    const { data, error } = await supabase
      .from("matches")
      .update({ opponent_status: "accepted" })
      .eq("match_id", `${match.match_id}`)
      .eq("opponent_id", `${match.opponent_id}`)
      .select();
    console.log(data, "currMatch");
    console.log(error, "currError");
  };

  useEffect(() => {
    getMatches();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("new match")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "matches",
        },
        (payload) => {
          getMatches();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);

  return (
    <>
      {matches?.map((match, idx) => {
        return (
          <Box backgroundColor="#161616" borderRadius={7} mb={6} key={idx}>
            {/* upper container */}
            <Flex
              flexDir="column"
              alignItems="flex-start"
              paddingX={4}
              paddingY={2}
              borderBottomColor="gray"
              borderBottomWidth="1px"
            >
              <Text fontSize="xl" color="#E7E9EA">
                Matchday
              </Text>
              <Text fontSize="sm" color="gray">
                {match?.date}
              </Text>
            </Flex>

            {/* lower container */}
            <Flex paddingX={4} paddingY={4} justifyContent="space-between">
              {/* team box */}
              <Box
                flex="2"
                borderRightColor="gray"
                borderRightWidth="1px"
                pr={3}
              >
                <Flex flexDir="column">
                  <Flex justifyContent="space-between" mb={2}>
                    <Text fontSize="lg" color="#E7E9EA">
                      {match?.team_name}
                    </Text>
                    <Text fontSize="md" color="#E7E9EA">
                      1
                    </Text>
                  </Flex>
                  <Flex justifyContent="space-between">
                    <Text fontSize="lg" color="#E7E9EA">
                      {match?.opponent_name}
                    </Text>
                    <Text fontSize="md" color="#E7E9EA">
                      3
                    </Text>
                  </Flex>
                </Flex>
              </Box>

              {/*  score box */}
              <Box
                flex="1"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Text fontSize="md" color="gray">
                  {match?.time}
                </Text>
              </Box>
            </Flex>
            {activeTeam?.team_id === match?.opponent_id &&
              activeTeam?.team_admin &&
              match?.opponent_status === "pending" && (
                <Flex flexDir="row" justifyContent="space-evenly" py={6}>
                  <Button
                    colorScheme="messenger"
                    onClick={() => handleAcceptBtn(match)}
                  >
                    Accept
                  </Button>
                  <Button colorScheme="messenger">Decline</Button>
                </Flex>
              )}
          </Box>
        );
      })}
      <Box position="fixed" bottom={0} right={0} padding={8}>
        <Button variant="unstyled" onClick={onOpen}>
          <IoAddOutline color="#E7E9EA" size={40} />
        </Button>
        <CreateMatchModal isOpen={isOpen} onClose={onClose} />
      </Box>
    </>
  );
};

export default Matches;
