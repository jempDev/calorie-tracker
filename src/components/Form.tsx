import { ChangeEvent, Dispatch, useState } from 'react'
import { categories } from '../data/categories'
import { Activity } from '../types'
import { ActivityActions } from '../reducers/activity-reducer'

type FormProps = {
  dispatch: Dispatch<ActivityActions>
}

export default function Form({ dispatch }: FormProps) {
  const [activity, setActivity] = useState<Activity>({
    category: 1,
    name: '',
    calories: 0,
  })

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const isNumberField = ['category', 'calories'].includes(e.target.id)
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    })
  }

  const isValidActivity = () => {
    const { name, calories } = activity
    return name.trim() !== '' && calories > 0
  }

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch({ type: 'save-activity', payload: { newActivity: activity } })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-5 bg-white shadow p-10 rounded-lg '
    >
      <div className='grid grid-cols-1 gap-3'>
        <label htmlFor='category' className='font-bold'>
          Categorias:
        </label>
        <select
          id='category'
          className='border border-slate-300 p-2 rounded-lg w-full bg-white'
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className='grid grid-cols-1 gap-3'>
        <label htmlFor='name' className='font-bold'>
          Actividad:
        </label>
        <input
          id='name'
          type='text'
          className='border border-slate-300 p-2 rounded-lg w-full bg-white'
          placeholder='Ej. Comioda,Jugo de Naranja,Ejercicio, pesas Bicicleta'
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      <div className='grid grid-cols-1 gap-3'>
        <label htmlFor='calories' className='font-bold'>
          Calorias:
        </label>
        <input
          id='calories'
          type='number'
          className='border border-slate-300 p-2 rounded-lg w-full bg-white'
          placeholder='Calorias ej. 300 o 500'
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <input
        type='submit'
        className='bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-50'
        value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
        disabled={!isValidActivity()}
      />
    </form>
  )
}
