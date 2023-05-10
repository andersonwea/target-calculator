import { useState } from 'react'
import {
  DaysLeft,
  HomeContainer,
  Percent,
  SalesDetails,
  Target,
} from './styles'

import { addMonths, differenceInDays, startOfMonth } from 'date-fns'

import { Form } from '../../components/Form'

interface newTarget {
  name: string
  target: string
  sale: string
}

export function Home() {
  const [newTarget, setNewTarget] = useState<newTarget | undefined>()

  function parseNumberToFloat(numberToParse: string | undefined) {
    if (numberToParse) {
      const number = parseFloat(numberToParse.replace(',', '.'))
      const formatedNumber = number.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })

      return formatedNumber
    }
  }

  function markNewTarget(target: newTarget) {
    setNewTarget(target)
  }

  const today = new Date()
  const nextMonth = addMonths(today, 1)
  const startOfNextMonth = startOfMonth(nextMonth)
  const daysLeft = differenceInDays(startOfNextMonth, today)

  const dailyTarget =
    newTarget && Number(newTarget.sale) < Number(newTarget.target)
      ? (Number(newTarget.target) - Number(newTarget.sale)) / daysLeft
      : 0

  const targetPercent = newTarget
    ? Number(newTarget.sale) / Number(newTarget.target)
    : 0

  return (
    <HomeContainer>
      <h1>Meta</h1>
      <p>{newTarget?.name}</p>
      <Target>
        R$ {newTarget ? parseNumberToFloat(newTarget?.target) : 0}
      </Target>

      <Percent percent={targetPercent}>
        <span>{targetPercent ? (targetPercent * 100).toFixed(2) : 0} %</span>

        <svg>
          <circle cx="70" cy="70" r="70"></circle>
          <circle cx="70" cy="70" r="70"></circle>
        </svg>
      </Percent>
      <SalesDetails>
        Venda: R$ {newTarget ? parseNumberToFloat(newTarget?.sale) : 0}
      </SalesDetails>
      <SalesDetails>
        Meta Diária: R$ {parseNumberToFloat(dailyTarget.toFixed(2))}
      </SalesDetails>

      <DaysLeft>Faltam {daysLeft} dias</DaysLeft>

      <Form markNewTarget={markNewTarget} />
    </HomeContainer>
  )
}
