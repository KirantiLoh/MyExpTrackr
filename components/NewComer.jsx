import {useState, useRef} from 'react'

const NewComerForm = () => {
  const [amount, setAmount] = useState('')
  
  const amountRef = useRef()

    const handleChange = (e) => {
        if (Number.isNaN(Number(e.target.value))) {
            console.log('Not a Number')
            amountRef.current.style.borderColor = 'var(--error-color)'
        } else {
            setAmount(e.target.value)
            amountRef.current.style.borderColor = 'var(--primary-color)'
        }
    }

  return (
    <div>
      <form >
        <h1>Welcome!</h1>
        <p>Let&apos;s set your new account by inputting your starting balance</p>
        <input type="text" ref={amountRef} placeholder='Amount' onChange={e => handleChange(e)} value={amount} />
      </form>
    </div>
  )
}

export default NewComerForm