import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import {Doughnut} from 'react-chartjs-2'
import useStyles from './DetailStyles'
import useTransactions from '../../useTransactions'
import Typography from '@material-ui/core/Typography'
const Details = ({title}) => {
    const classes = useStyles()
  const  { total, chartData  }  = useTransactions(title)
    return (
        <Card className={title === 'Income' ? classes.income : classes.expense  }>
            
            <CardHeader title={title} />
                <CardContent>
                    <Typography variant='h5'>${isNaN(total)? 0 : total}</Typography>
                    <Doughnut data={chartData} />
                </CardContent>
        </Card>
    )
}

export default Details
