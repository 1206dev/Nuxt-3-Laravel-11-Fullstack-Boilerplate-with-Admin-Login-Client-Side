import type { InvalidSubmissionHandler } from 'vee-validate'

export const useFormHook = () => {
  const onInvalidSubmit: InvalidSubmissionHandler = ({ errors }) => {
    const firstError = Object.keys(errors)[0]
    const inputElements = document.getElementsByName(firstError)
    if (inputElements.length > 0) {
      inputElements[0].focus()
    }
    else {
      const inputElements = document.getElementsByName(firstError.replace('[', '.').replace(']', ''))
      if (inputElements.length > 0) {
        inputElements[0].focus()
      }
      else {
        const inputElements = document.getElementsByName(firstError.replace('[', '.').replace(']', '') + '.0')
        if (inputElements.length > 0) {
          inputElements[0].focus()
        }
      }
    }
  }
  return {
    onInvalidSubmit: onInvalidSubmit,
  }
}
