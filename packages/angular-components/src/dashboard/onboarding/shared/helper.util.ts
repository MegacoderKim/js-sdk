export const getStepById = (steps, id) => {
  let step = steps.find((step) => {
    return (step.id === id);
  });
  return {
    ...step,
    subSteps: step.subSteps.map((subStep) => {
      return {...subStep};
    })
  }
};

export const getSubStepById = (subSteps, id) => {
  let subStep = subSteps.find((step) => {
    return (step.id === id);
  });
  return {
    ...subStep
  };
};

export const getStepIndex = (steps, id) => {
  return steps.findIndex((step) => {
    return (step.id === id);
  });
};

export const getSubStepsCopy = (subSteps) => {
  return subSteps.map((subStep) => {
    return {...subStep};
  });
};
