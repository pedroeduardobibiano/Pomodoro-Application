import { HandPalm, Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { differenceInSeconds } from "date-fns";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from "./styles";
import { useEffect, useState } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/CountDown";

//controller //uncontroller

// register(name: string){
//   return{
//     onChange: () => void,
//     onBlur: () =>void,
//     onFocus: () => void,
//   }
// }

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<String | null>(null);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  function handleCreateNewCycle(data: newCycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(newCycle.id);
    setAmountSecondPassed(0);
    reset();
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
    setActiveCycleId(null);
  }

  const currentSeconds = activeCycle ? totalSeconds - amountSecondPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondAmount).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}: ${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <NewCycleForm />
        <CountDown
          activeCycle={activeCycle}
          setCycles={setCycles}
          activeCycleId={activeCycleId}
        />
        {activeCycle ? (
          <StopCountDownButton onClick={handleInterruptCycle} type="button">
            Começar
            <HandPalm size={24} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={isSubmitDisabled} type="submit">
            Começar
            <Play size={24} />
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  );
}
