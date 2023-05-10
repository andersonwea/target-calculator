import { useState } from 'react'
import { DaysLeft, HomeContainer, HomeForm, Percent, Target } from './styles'

import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { addMonths, differenceInDays, startOfMonth } from 'date-fns'

import { useForm } from 'react-hook-form'

const newTargetFormValidationSchema = zod.object({
  name: zod.string().min(1, 'Informe um nome'),
  target: zod.string(),
  sale: zod.string(),
})

type newTargetFormData = zod.infer<typeof newTargetFormValidationSchema>

interface newTarget {
  name: string
  target: string
  sale: string
}

export function Home() {
  const [newTarget, setNewTarget] = useState<newTarget | undefined>()

  const newTargetForm = useForm<newTargetFormData>({
    resolver: zodResolver(newTargetFormValidationSchema),
    defaultValues: {
      name: '',
      target: '',
      sale: '',
    },
  })

  const { register, handleSubmit, reset } = newTargetForm

  function handleNewTarget(data: newTargetFormData) {
    const newTarget = {
      name: data.name,
      target: data.target,
      sale: data.sale,
    }

    setNewTarget(newTarget)
    reset()
  }

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
      <p>Venda: R$ {newTarget ? parseNumberToFloat(newTarget?.sale) : 0}</p>
      <p>Meta Diária: R$ {parseNumberToFloat(dailyTarget.toFixed(2))}</p>

      <DaysLeft>Faltam {daysLeft} dias</DaysLeft>

      <HomeForm onSubmit={handleSubmit(handleNewTarget)}>
        <div>
          <label>Nome</label>
          <input
            type="text"
            placeholder="Nome do vendedor"
            id="name"
            {...register('name')}
          />
        </div>

        <div>
          <label>Meta</label>
          <input
            type="text"
            placeholder="Meta do vendedor"
            id="target"
            {...register('target')}
          />
        </div>

        <div>
          <label>Venda</label>
          <input
            type="text"
            placeholder="Venda até hoje"
            id="sale"
            {...register('sale')}
          />
        </div>

        <button type="submit">Calcular</button>
      </HomeForm>
    </HomeContainer>
  )
}
