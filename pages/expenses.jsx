import Header from '../components/Header'
import { Chart as  ChartJS} from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
import { withProtected } from '../hoc/route'
import { useState, useEffect, useRef, useContext } from 'react'
import { collection, query, updateDoc, orderBy, Timestamp, onSnapshot, serverTimestamp, addDoc, doc, limit } from 'firebase/firestore'
import { AuthContext } from '../context/AuthContext'
import { db } from '../firebase/firebaseApp'
import styles from '../styles/Expenses.module.css'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Modal from '../components/Modal'

const ExpensePage = () => {

    const [labels, setLabels] = useState(['Expenses'])
    const [datas, setDatas] = useState([])
    const [amount, setAmount] = useState('')
    const [desc, setDesc] = useState('')
    const [createdDate, setCreatedDate] = useState('')
    const [expenses, setExpenses] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [showModal, setShowModal] = useState(false)

    const {currentUser, userDoc} = useContext(AuthContext)

    const amountRef = useRef()

    const handleChange = (e) => {
        if (Number.isNaN(Number(e.target.value))) {
            setErrorMessage('Input numbers only')
            amountRef.current.style.borderColor = 'var(--error-color)'
        } else {
            setAmount(e.target.value)
            setErrorMessage('')
            amountRef.current.style.borderColor = 'var(--primary-color)'
        }
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if (amount < 1000 || !desc || !createdDate) return
        let newData = {
            amount: Number(amount),
            desc: desc,
            createdAt: Timestamp.fromDate(new Date(createdDate))
        }
        await addDoc(collection(db, 'users', currentUser.uid, 'expenses'), newData)
        await updateDoc(doc(db, 'users', currentUser.uid), {
            last5Expenses : [
                newData, ...expenses.slice(0, 4)
            ].sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()),
            balance: Number(userDoc?.balance) - Number(amount),
            total_expense: userDoc.total_expense +  Number(amount)
        })
        setShowModal(true)
        setAmount('')
        setDesc('')
        setCreatedDate('')
    }

    useEffect(() => {
        const q = query(collection(db, 'users', currentUser.uid, 'expenses'), orderBy('createdAt'))
        const unsubscribe = onSnapshot(q, snapshot => {
            let label = []
            let data = []
            let expenseData = []
            snapshot.forEach(doc => {
                expenseData.push(doc.data())
                label.push((new Date(doc.data().createdAt?.toMillis())).toLocaleDateString())
                data.push(doc.data().amount)
            })
            setExpenses(expenseData.reverse())
            setDatas(data.reverse())
            setLabels(label.reverse())
        })
        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <>
        <Header/>
        <div className={styles.expensesPage}>
        <div className={styles.left}>
            <Link href={'/'}>
            <a>
              <FontAwesomeIcon icon={faArrowLeft}/>
            </a>
          </Link>
          <h1>Expenses</h1>
        </div>
            <main className={styles.main}>
            <div className={styles.chartContainer}>
                {datas.length > 0 ?
                <>
                <div className={styles.chartOptions}>
                    <h1>Total Expenses : <span>Rp {userDoc.total_expense}</span></h1>
                </div>
                <div className={styles.chart}>
                <Bar datasetIdKey='id' data={{
                    labels: labels,
                    datasets: [{
                        data: datas,
                        id: 0,
                        backgroundColor: '#00a153',
                        barThickness: 50,
                        label: 'Expenses'
                    }]
                }}
                options={{
                    scales: {
                        y: {
                          beginAtZero: true,
                          ticks: {
                            color: '#fff'
                          },
                          suggestedMax: 100000
                        },
                        x: {
                          ticks: {
                            color: "#fff"
                          }
                        }
                      },
                        responsive: true,
                        maintainAspectRatio: false,
                        color: '#fff'
                }}/>
                </div>
                </>
                 : 
                <div className="empty-chart">
                    No Data Recorded
                </div>
                }
            </div>
                <div className={styles.expensesDetail}>
                    <div className={styles.addExpensesContainer}>
                        <form onSubmit={e => handleSubmit(e)}>
                            <h1>Add Expenses</h1>
                            <input type="text" ref={amountRef} placeholder='Amount' onChange={e => handleChange(e)} value={amount} />
                            <p className={styles.errorMessage}>{errorMessage}</p>
                            <input type="text" placeholder='Description' value={desc} onChange={e => setDesc(e.target.value)} />
                            <input type="datetime-local" value={createdDate} onChange={e => setCreatedDate(e.target.value)}/>
                            <button type="submit" disabled={amount < 1000 || !desc || !createdDate} className='primary-btn'>Add</button>
                        </form>
                    </div>
                    <div className={styles.expensesContainer}>
                    <h1>Recent Expenses</h1>
                    <ul className={styles.incomes}>
                    {expenses.length > 0 ? expenses.map((expense, index) => {
                        return (
                            <li className="expense" key={index}>
                              <h2>{expense.desc}</h2>
                              <div className={styles.expenseDetail}>
                                <small>Amount : Rp {expense.amount}</small>
                                <small>Date : {(new Date(expense.createdAt.toMillis())).toLocaleDateString()}</small>
                              </div>
                            </li>
                        )
                    }): <h3>No expenses were tracked...</h3>}
                    </ul>
                    </div>
                </div>
                <Modal message={"Expense successfuly added!"} show={showModal}/>
            </main>
        </div>
        </>
        
    )
}

export default withProtected(ExpensePage)
