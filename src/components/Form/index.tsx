import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { useForm } from 'react-hook-form'
import { HomeForm, Error } from './styles'

const newTargetFormValidationSchema = zod.object({
  name: zod.string().min(1, 'Informe um nome'),
  target: zod.string().min(1, 'Informe a meta'),
  sale: zod.string().min(1, 'Informe a venda'),
})

type newTargetFormData = zod.infer<typeof newTargetFormValidationSchema>

interface FormProps {
  markNewTarget: (target: newTargetFormData) => void
}

export function Form({ markNewTarget }: FormProps) {
  const newTargetForm = useForm<newTargetFormData>({
    resolver: zodResolver(newTargetFormValidationSchema),
    defaultValues: {
      name: '',
      target: '',
      sale: '',
    },
  })

  const { register, handleSubmit, reset, formState } = newTargetForm

  function handleNewTarget(data: newTargetFormData) {
    const newTarget = {
      name: data.name,
      target: data.target.replace(',', '.'),
      sale: data.sale.replace(',', '.'),
    }

    markNewTarget(newTarget)
    reset()
  }

  return (
    <HomeForm onSubmit={handleSubmit(handleNewTarget)}>
      <div>
        <label>Nome</label>
        <input
          type="text"
          placeholder="Nome do vendedor"
          id="name"
          {...register('name')}
        />
        {formState.errors.name && (
          <Error>{formState.errors.name?.message}</Error>
        )}
      </div>

      <div>
        <label>Meta</label>
        <input
          type="text"
          placeholder="Meta do vendedor"
          id="target"
          {...register('target')}
        />
        {formState.errors.target && (
          <Error>{formState.errors.target?.message}</Error>
        )}
      </div>

      <div>
        <label>Venda</label>
        <input
          type="text"
          placeholder="Venda até hoje"
          id="sale"
          {...register('sale')}
        />
        {formState.errors.sale && (
          <Error>{formState.errors.sale?.message}</Error>
        )}
      </div>

      <button type="submit">Calcular</button>
    </HomeForm>
  )
}
