import Header from '../components/Header'
import { Chart as  ChartJS} from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
import { withProtected } from '../hoc/route'
import { useState, useEffect, useRef, useContext } from 'react'
import { collection, query, updateDoc, orderBy, Timestamp, onSnapshot, serverTimestamp, addDoc, doc, limit } from 'firebase/firestore'
import { AuthContext } from '../context/AuthContext'
import { db } from '../firebase/firebaseApp'
import styles from '../styles/Expenses.module.css'


const IncomePage = () => {

    const [labels, setLabels] = useState(['incomes'])
    const [datas, setDatas] = useState([])
    const [amount, setAmount] = useState('')
    const [desc, setDesc] = useState('')
    const [createdDate, setCreatedDate] = useState('')
    const [incomes, setIncomes] = useState([])

    const {currentUser, userDoc} = useContext(AuthContext)

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

    const handleSubmit = async e => {
        e.preventDefault()
        if (amount < 1000 || !desc || !createdDate) return
        await addDoc(collection(db, 'users', currentUser.uid, 'incomes'), {
            amount: Number(amount),
            desc: desc,
            createdAt: Timestamp.fromDate(new Date(createdDate))
        })

        await updateDoc(doc(db, 'users', currentUser.uid), {
            last5Income : [
                {
                    amount: Number(amount),
                    desc: desc,
                    createdAt: Timestamp.fromDate(new Date(createdDate))
                }, ...userDoc?.last5Income
            ],
            balance: Number(userDoc?.balance) + Number(amount)
        })
        setAmount('')
        setDesc('')
        setCreatedDate('')
    }

    useEffect(() => {
        const q = query(collection(db, 'users', currentUser.uid, 'incomes'), orderBy('createdAt'), limit(10))
        const unsubscribe = onSnapshot(q, snapshot => {
            let incomeData = []
            let label = []
            let data = []
            snapshot.forEach(doc => {
                incomeData.push(doc.data())
                label.push((new Date(doc.data().createdAt?.toMillis())).toLocaleDateString())
                data.push(doc.data().amount)
            })
            setIncomes(incomeData)
            setDatas(data)
            setLabels(label)
        })
        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <>
        <Header/>
        <div className={styles.expensesPage}>
            <h1>Incomes</h1>
            <main className={styles.main}>
            <div className={styles.chartContainer}>
                {datas.length > 0 ?
                <Bar datasetIdKey='id' data={{
                    labels: labels,
                    datasets: [{
                        data: datas,
                        id: 0,
                        backgroundColor: '#00a153',
                        barThickness: 50,
                        label: 'Incomes'
                    }]
                }}
                options={{
                    scales: {
                        y: {
                          beginAtZero: true,
                          ticks: {
                            color: '#fff'
                          },
                          suggestedMax: 1000000
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
                 : 
                <div className="empty-chart">
                    No Data Recorded
                </div>
                }
            </div>
                <div className={styles.expensesDetail}>
                    <div className={styles.addExpensesContainer}>
                        <form onSubmit={e => handleSubmit(e)}>
                            <h1>Add Incomes</h1>
                            <input type="text" ref={amountRef} placeholder='Amount' onChange={e => handleChange(e)} value={amount} />
                            <input type="text" placeholder='Description' value={desc} onChange={e => setDesc(e.target.value)} />
                            <input type="datetime-local" value={createdDate} onChange={e => setCreatedDate(e.target.value)}/>
                            <button type="submit" disabled={amount < 1000 || !desc || !createdDate} className='primary-btn'>Add</button>
                        </form>
                    </div>
                    <div className={styles.incomesContainer}>
                    <h1>Recent Incomes</h1>
                    <ul className={styles.incomes}>
                    {incomes.length > 0 ? incomes.map((income, index) => {
                        return (
                            <li className="income" key={index}>
                              <h2>{income.desc}</h2>
                              <div className={styles.incomeDetail}>
                                <small>Amount : Rp {income.amount}</small>
                                <small>Date : {(new Date(income.createdAt.toMillis())).toLocaleDateString()}</small>
                              </div>
                            </li>
                        )
                    }): <h3>No Incomes were tracked...</h3>}
                    </ul>
                    </div>
                </div>
            </main>
        </div>
        </>
        
    )
}

export default withProtected(IncomePage)
