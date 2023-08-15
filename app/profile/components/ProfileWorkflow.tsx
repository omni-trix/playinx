"use client"

import React, { useState } from 'react';
import DOBStep from './DOBStep';
import NameStep from './NameStep';
// import GenderStep from './GenderStep'; 
import { Stack } from '../../chakraExports';
import Phone from './Phone';
import PlayingPosition from './PlayingPosition';
import ProgressIndicator from './ProgressIndicator';

function ProfileWorkflow() {
  const [step, setStep] = useState(0);

  const steps = [
    NameStep,
    Phone,
    DOBStep,
    PlayingPosition,
    // Add other step components here
  ];

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  }

  const CurrentStep = steps[step];

  return (
    <>
      <CurrentStep onNext={handleNext} goBack={handleBack} />
      <ProgressIndicator totalSteps={steps.length} currentStep={step} />
    </>
  );
}

export default ProfileWorkflow;