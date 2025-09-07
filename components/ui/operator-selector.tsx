import React from 'react'
import Image from 'next/image'

interface OperatorSelectorProps {
  selectedOperator?: string
  onOperatorChange?: (operator: string) => void
}

export default function OperatorSelector({ selectedOperator = 'orange', onOperatorChange }: OperatorSelectorProps) {
  const operators = [
    {
      id: 'orange',
      name: '+Orange',
      logo: '/Orange.png'
    },
    {
      id: 'movistar',
      name: 'Movistar',
      logo: '/Movistar.png'
    },
    {
      id: 'vodafone',
      name: 'Vodafone',
      logo: '/Vodafone.png'
    }
  ]

  return (
    <div className="mt-4 mb-4">
      <div className="text-center mb-3">
        <span className="text-sm font-medium text-gray-700">Elige tu cobertura favorita:</span>
      </div>
      <div className="flex justify-center gap-2">
        {operators.map((operator) => (
          <button
            key={operator.id}
            onClick={() => onOperatorChange?.(operator.id)}
            className={`relative w-16 h-12 rounded-lg border-2 transition-all duration-200 overflow-hidden ${
              selectedOperator === operator.id
                ? 'border-black bg-yellow-50 shadow-md scale-105' // Changed to black border and yellow background
                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
            }`}
          >
            <Image
              src={operator.logo}
              alt={`Logo de ${operator.name}`}
              fill
              className="object-contain p-1"
              sizes="64px"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
