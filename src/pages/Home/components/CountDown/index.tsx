import { differenceInSeconds } from "date-fns";
import { useEffect, useState } from "react";
import { CountdownContainer, Separator } from "./style";

interface CountDownProps {
  activeCycle: any;
  setCycles: any;
  activeCycleId: any;
}

export function CountDown({
  activeCycle,
  setCycles,
  activeCycleId,
}: CountDownProps) {
  const [amountSecondPassed, setAmountSecondPassed] = useState(0);
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  useEffect(() => {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        const secondDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );
        if (secondDifference >= totalSeconds) {
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() };
              } else {
                return cycle;
              }
            })
          );

          setAmountSecondPassed(totalSeconds);

          clearInterval(interval);
        } else {
          setAmountSecondPassed(secondDifference);
        }
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, totalSeconds, activeCycleId]);

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
}
