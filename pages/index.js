import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import Header from '../components/Header'
import { db } from '../firebase/firebaseApp'
import { doc,  onSnapshot } from 'firebase/firestore'
import styles from '../styles/Home.module.css'
import { withProtected } from '../hoc/route'
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"


const Home = () => {
  const {currentUser, setLoading, userDoc, setUserDoc} = useContext(AuthContext)

  const [labels, setLabels] = useState([])
  const [expenses, setExpenses] = useState([])
  const [incomes, setIncomes] = useState([])
  const [expensesLabels, setExpensesLabels] = useState([])
  const [incomesLabels, setIncomesLabels] = useState([])
  const [chartData, setChartData] = useState({id: 0, backgroundColor: "#00a153", label: '', data: [], barThickness: 50})
  const [expenseClass, setExpenseClass] = useState(styles.active)
  const [incomeClass, setIncomeClass] = useState('')

  const handleExpenseClick = () => {
    setIncomeClass('')
    setExpenseClass(styles.active)
    setLabels(expensesLabels)
    setChartData(
      {
        id: 0,
        backgroundColor: "#00a153",
        label: 'Expenses',
        data: expenses,
        barThickness: 50
      }
    )
  }

  const handleIncomeClick = () => {
    setExpenseClass('')
    setIncomeClass(styles.active)
    setLabels(incomesLabels)
    setChartData(
      {
        id: 0,
        backgroundColor: "#00a153",
        label: 'Incomes',
        data: incomes,
        barThickness: 50
      }
    )
  }

  useEffect(() => {
    setLoading(true)
    const userRef = doc(db, 'users', currentUser.uid)

    const unsubscribe = onSnapshot(userRef, (doc) => {
        setUserDoc(doc.data())
        let expenseData = []
        let incomeData = []
        let expenseLabel = []
        let incomeLabel = []
        doc.data()?.last5Expenses.forEach((expense) => {
          expenseData.push(expense?.amount)
          expenseLabel.push((new Date(expense?.createdAt.toMillis())).toLocaleDateString())
          })
          doc.data()?.last5Income.forEach((income) => {
            incomeData.push(income?.amount)
            incomeLabel.push((new Date(income?.createdAt.toMillis())).toLocaleDateString())
          })
          setExpenses(expenseData)
          setExpensesLabels(expenseLabel)
          setIncomes(incomeData)
          setIncomesLabels(incomeLabel)
          setLabels(expenseLabel)
          setChartData(
            {
              id: 0,
              backgroundColor: "#00a153",
              label: 'Expenses',
              data: expenseData,
              barThickness: 50
            }
          )
        })
    setLoading(false)


    return () => unsubscribe()

  }, [])

  return (
    <div>
      {currentUser ? (
        <>
        <div className={styles.homePage}>
        <div className={styles.upper}>
        <div className={styles.left}>
            <input type="checkbox" id="chk" />
            <label htmlFor="chk" className={"showSideNav"}>
              <FontAwesomeIcon icon={faBars}/>
            </label>
            <Header currentUser={currentUser}/>
            <h1 className="user">Welcome <span>{userDoc?.name ? userDoc?.name : "..."}</span></h1>
          </div>
          <h1>Balance : <span>Rp {userDoc?.balance ? userDoc?.balance : 0}</span></h1>
        </div>
        <main className={styles.main}>
        <div className={styles.chartContainer}>
            <div className={styles.chartOptions}>
              <h1 className={expenseClass} onClick={() => handleExpenseClick()}>Expenses</h1>
              <h1 className={incomeClass} onClick={() => handleIncomeClick()}>Incomes</h1>
            </div>
            {expenses.length > 0 || incomes.length > 0 ? 
            <>
            <div className={styles.chart}>
          <Bar datasetIdKey="id" data={{
            labels: labels,
            datasets: [
              chartData
            ]
          }} options={
            {
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
            }
          }/>
          </div>
          </>
           :
          <div className='empty-chart'>
            <h1>No datas were tracked...</h1>
          </div>
          }
          </div>
          
          <div className={styles.expenseIncome}>
              <div className={styles.expensesContainer}>
              <h1>Expenses</h1>
              <ul className={styles.expenses}>
                {userDoc?.last5Expenses.length > 0 ? userDoc?.last5Expenses.map((expense, index) => {
                  return (
                    <li key={index} className='expense'>
                      <h2>{expense.desc}</h2>
                      <div className={styles.expenseDetail}>
                      <small>Amount : {expense.amount}</small>
                      <small>Date : {(new Date(expense.createdAt.toMillis())).toLocaleDateString()}</small>
                      </div>
                    </li>
                  )
                }) : <h3>No Expenses were tracked...</h3>}  
              </ul>
              <Link href={'/expenses'}>
                  <a>Load more</a>
                </Link>
            </div>
            <div className={styles.incomesContainer}>
              <h1>Incomes</h1>
              <ul className={styles.incomes}>
                {userDoc?.last5Income.length > 0 ? userDoc?.last5Income.map((income, index) => {
                  return (
                    <li className="income" key={index}>
                      <h2>{income.desc}</h2>
                      <div className={styles.incomeDetail}>
                      <small>Amount : Rp {income.amount}</small>
                      <small>Date : {(new Date(income.createdAt.toMillis())).toLocaleDateString()}</small>
                      </div>
                    </li>
                  )
                }) : <h3>No Incomes were tracked...</h3>}
              </ul>
              <Link href={'/incomes'}>
                  <a>Load more</a>
                </Link>
              </div>
          </div>
        </main>
          
          
        </div>
        </>
      ) :
        <></>
      }
    </div>
  )
}

export default withProtected(Home) 

/*
export const getServerSideProps = async (ctx) => {
  console.log(ctx)
  return ctx
}
*/
