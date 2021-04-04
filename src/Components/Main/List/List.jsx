import React, { useContext } from 'react'
import { List as MUIList, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, IconButton, Slide, Avatar } from '@material-ui/core'
import {Delete, MoneyOff} from '@material-ui/icons'
import useStyles from './ListStyle'
import { ExpenseTrackerContext } from '../../../Context/Context'
import { deleteTransaction } from '../../../Context/Actions'
import {formateDate} from '../../../utils/formatDate'

const List = () => {
    const classes = useStyles();
    const [{ transactions }, dispatch] = useContext(ExpenseTrackerContext)

    return (
<MUIList dense ={false} className={classes.list}> 
        {transactions.map(transaction => (
            <Slide direction='down' in mountOnEnter unmountOnExit key={transaction.id}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar className={transaction.type === 'Income' ? classes.avatarIncome: classes.avatarExpense}>
                        <MoneyOff />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={transaction.category} secondary={`$${isNaN(transaction.amount)  ? 0 : transaction.amount} - ${formateDate( transaction.date)}`} /> 
                    <ListItemSecondaryAction>
                        <IconButton edge='end' aria-label='delete' onClick={()=>deleteTransaction(transaction.id, dispatch)}>
                            <Delete />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </Slide>
        ))}
</MUIList>
    )
}

export default List
