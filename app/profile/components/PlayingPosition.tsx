import React from 'react';
import { Stack, Center, Heading, Input, Button, Select, Text } from '../../chakraExports';
import Link from 'next/link';

function PlayingPosition({ onNext, goBack }) {
  return (
    <Stack spacing={5}>
      <Center>
        <Heading size="md" color="antiquewhite">What is your playing position?</Heading>
      </Center>
      <Select placeholder=' select position' size="lg" bg= "antiquewhite" >
        <option value='option1'>GK</option>
        <option value='option2'>CB</option>
        <option value='option2'>LB</option>
        <option value='option2'>RB</option>
        <option value='option2'>CDM</option>
        <option value='option2'>CM</option>
        <option value='option2'>CAM</option>
        <option value='option2'>LW</option>
        <option value='option2'>RW</option>
        <option value='option2'>ST</option>

      </Select>
      <Button mt={7} colorScheme='messenger' size='lg' onClick={onNext}>
        Continue
      </Button>
      <Center mt={1}><button onClick={goBack}><Text fontSize='lg' color="messenger.300">Go Back</Text></button></Center>

    </Stack>
  );
}

export default PlayingPosition;