import { memo, Fragment, FC, useState, useEffect, useCallback } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Button from '../Button'

interface Props {
  isOpen: boolean
  onChangeOpen: (val: boolean) => void
}

const GameOverDialog: FC<Props> = ({ isOpen, onChangeOpen }) => {
  const handleClose = useCallback(() => onChangeOpen(false), [onChangeOpen])

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={handleClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-700 shadow-xl rounded-lg">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-200"
              >
                Game over
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-100">Try again.</p>
              </div>

              <div className="mt-4 text-center">
                <Button onClick={handleClose}>OK</Button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default memo(GameOverDialog)
