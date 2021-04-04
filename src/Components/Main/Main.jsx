import React, { useContext } from 'react'
import {Card, CardHeader, CardContent, Typography, Grid, Divider} from '@material-ui/core'
import useStyles from './MainStyles'
import Form from './Form/Form'
import List from './List/List'
import { ExpenseTrackerContext } from '../../Context/Context'
import InfoCard from './InfoCard'


const Main = () => {
    const classes = useStyles
    const [{transactions}] = useContext(ExpenseTrackerContext)
    const balance = transactions.reduce((acc, currVal) =>(currVal.type === 'Expense' ? (acc) - Number(currVal.amount) : (acc) +Number(currVal.amount))
    , 0)
    return (
<Card className={classes.root} >
        <CardHeader title='Expense Tracker'  subheader='Powered By Speechly' />
        <CardContent>
        <Typography variant='h5' align='center' > Total Balance ${balance} </Typography>
        <Typography variant='subtitle1' style={{lineHeight:'1.5em', marginTop: '20px'}} align='center' >
            
           <InfoCard />
        </Typography>
        <Divider className={classes.divider} />
       <Form />
        </CardContent>
        <CardContent className={classes.cardContent}>
            <Grid container >
                <Grid item>
                <List />
                </Grid>

            </Grid>
        </CardContent>
</Card>
    )
}

export default Main
